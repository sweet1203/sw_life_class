#!/usr/bin/env python3
"""코스웨어 빌드 (과목 이름·주소는 course.json): course.json + lessons/ + forms/ + teacher/ → site/

    python3 tools/build.py            전체 빌드
    python3 tools/build.py u1-ai-concept   차시 하나만 (질문폼·교사 페이지는 항상 다시 만듦)

차시 폴더(lessons/<차시ID>/):
    lesson.json   {"title", "tag", "accent"(선택)}
    screens.html  화면들 (<section class="page" ...>)
    quiz.js       const QUIZ={화면번호:[{q,o,a,w},...]}  (QK·MK는 빌드가 넣음)
    lesson.js     이 차시만의 체험 코드 (MEMOLIST, onShow 등)
    lesson.css    (선택)
screens.html 안에서 쓸 수 있는 자리표시: {{FORM_URL}} {{PAGES}} {{TITLE}} {{NO}}
"""
from __future__ import annotations

import html
import json
import os
import pathlib
import re
import shutil
import sys
import unicodedata

ROOT = pathlib.Path(__file__).resolve().parents[1]
FW = ROOT / 'framework'
SITE = ROOT / 'site'
rd = lambda p: pathlib.Path(p).read_text(encoding='utf-8')


def course():
    return json.loads(rd(ROOT / 'course.json'))


def all_lessons(c):
    for u in c['units']:
        for l in u['lessons']:
            yield u, l


INIT = '''
/* 시작 */
bindMemos();
updScore();
const h0=parseInt((location.hash.match(/^#p(\\d+)$/)||[])[1],10);
go(isNaN(h0)?0:h0);
</script>
'''


def build_lesson(c, unit, l):
    d = ROOT / 'lessons' / l['id']
    meta = json.loads(rd(d / 'lesson.json'))
    title = meta.get('title', l['title'])
    sub = lambda s: (s.replace('{{FORM_URL}}', f"../forms/{l['form']}.html" if l.get('form') else '#')
                      .replace('{{PAGES}}', l['pages']).replace('{{TITLE}}', title).replace('{{NO}}', l['no']))
    head = rd(FW / 'shell_head.html').replace('{{TITLE}}', html.escape(title))
    head = head.replace('<meta name="viewport"', '<meta name="robots" content="noindex">\n<meta name="viewport"', 1)
    widgets = 'widgets.css' if meta.get('widgetsCss', True) else 'widgets_min.css'
    css = ''.join(rd(FW / n) for n in ['base.css', widgets, 'charts.css', 'pyrun.css', 'track.css', 'guard.css'])
    if (d / 'lesson.css').exists():
        css += rd(d / 'lesson.css')
    top = rd(FW / 'shell_top.html').replace(
        '<a class="brand" href="../" title="수업 자료실로">← 수업 자료실</a>',
        f'<span class="brand">{html.escape(c["course"])}</span>')
    quiz = rd(d / 'quiz.js')
    assert 'const QK' not in quiz and 'const MK' not in quiz, 'quiz.js에는 QUIZ만 둡니다'
    pep = os.environ.get('DS_PEP') or c.get('progressEndpoint', '')
    pre = f"const LESSON='{l['id']}', PEP='{pep}';\n" + rd(FW / 'track_pre.js')
    keys = f"const QK='ds-{l['id']}-quiz'+WHO.sfx;\nconst MK='ds-{l['id']}-memo'+WHO.sfx;\n"
    extra = rd(d / 'pre.js') if (d / 'pre.js').exists() else ''
    js = (rd(FW / 'core_head.js') + extra + pre + quiz + '\n' + keys + rd(FW / 'core.js') + rd(FW / 'widgets.js') + rd(FW / 'pyrun.js') + rd(FW / 'charts.js')
          + rd(d / 'lesson.js') + rd(FW / 'track.js').replace('__TEACH_H__', c.get('teacherHash', '')).replace('__CLASSES__', json.dumps(c.get('classes', []), ensure_ascii=False)) + INIT)
    out = head + css + top + sub(rd(d / 'screens.html')) + rd(FW / 'shell_foot.html') + js
    out += rd(FW / 'guard.html') + '</body>\n</html>\n'
    o = SITE / l['id']
    o.mkdir(parents=True, exist_ok=True)
    if (d / 'assets').is_dir():   # 차시 부속 파일(모델·노트북 등)은 그대로 복사
        shutil.copytree(d / 'assets', o, dirs_exist_ok=True)
    (o / 'index.html').write_text(out, encoding='utf-8')
    return o / 'index.html'


def tok(s):
    return html.escape(unicodedata.normalize('NFC', str(s)), quote=True)


def build_forms():
    data = json.loads(rd(ROOT / 'forms' / 'forms.json'))
    tpl = rd(ROOT / 'forms' / 'template.html')
    opts = '\n'.join(f'<option value="{tok(c)}">{tok(c)}</option>' for c in data['classes'])
    # 반 이름이 정해져 있으면 고르게 하고, 비어 있으면 숨긴다(수집기가 「명단」에서 학번·이름으로 반을 찾음)
    cls_field = ('<label for="className">반</label>\n        <select id="className" name="className" required>\n'
                 '          <option value="" selected disabled>반 선택</option>\n' + opts + '\n        </select>'
                 if data['classes'] else '<input type="hidden" name="className" value="">')
    (SITE / 'forms').mkdir(parents=True, exist_ok=True)
    made = []
    for f in data['forms']:
        blocks = '\n'.join(f'''<section class="question-block">
            <h2>질문 {i}</h2>
            <p class="question-text">{tok(q)}</p>
            <input type="hidden" name="question{i}" value="{tok(q)}">
            <label for="answer{i}">답변 {i}</label>
            <textarea id="answer{i}" name="answer{i}" data-no-paste="true" required placeholder="수업 내용과 자신의 생각이 드러나게 직접 작성하세요."></textarea>
          </section>''' for i, q in enumerate(f['questions'], 1))
        rep = {**f, 'course': data['course'], 'endpoint': data['endpoint'], 'warningDisplay': 'none',
               'classField': cls_field, 'questions': blocks}
        s = tpl
        for k, v in rep.items():
            s = s.replace('{{' + k + '}}', str(v) if k in ('classField', 'questions') else tok(v))
        assert '{{' not in s, re.findall(r'{{\w+}}', s)
        (SITE / 'forms' / f"{f['id']}.html").write_text(s, encoding='utf-8')
        made.append(f['id'])
    return made


def build_teacher(c):
    built = [(u, l) for u, l in all_lessons(c) if l['status'] in ('ready', 'draft')]
    lessons = [[l['id'], f"{l['no']} · {l['title']}"] for u, l in built]
    units = [{'name': u['name'], 'color': u['color'],
              'lessons': [{k: l.get(k) for k in ('no', 'id', 'title', 'pages', 'form', 'status')} for l in u['lessons']]}
             for u in c['units']]
    (SITE / 'teacher' / 'progress').mkdir(parents=True, exist_ok=True)
    dash = rd(ROOT / 'teacher' / 'progress.html')
    dash = dash.replace('__PEP__', os.environ.get('DS_PEP') or c['progressEndpoint']).replace('__LESSONS__', json.dumps(lessons, ensure_ascii=False))
    (SITE / 'teacher' / 'progress' / 'index.html').write_text(dash, encoding='utf-8')
    hub = rd(ROOT / 'teacher' / 'hub.html').replace('__UNITS__', json.dumps(units, ensure_ascii=False)).replace('__ASSESS__', json.dumps(c.get('assessments', []), ensure_ascii=False)).replace('__SITE__', c['site']).replace('__COURSE__', html.escape(c['course']))
    (SITE / 'teacher' / 'index.html').write_text(hub, encoding='utf-8')
    root = (rd(ROOT / 'teacher' / 'root.html')
            .replace('__UNITS__', json.dumps(units, ensure_ascii=False))
            .replace('__SITE__', c['site'])
            .replace('__COURSE__', html.escape(c['course'])))
    (SITE / 'index.html').write_text(root, encoding='utf-8')


def main(argv):
    c = course()
    SITE.mkdir(exist_ok=True)
    want = set(argv)
    for u, l in all_lessons(c):
        if want and l['id'] not in want:
            continue
        if (ROOT / 'lessons' / l['id'] / 'screens.html').exists():
            print('lesson', build_lesson(c, u, l).relative_to(ROOT))
        elif want:
            sys.exit(f"{l['id']}: lessons/{l['id']}/screens.html 없음")
    for p in sorted((ROOT / 'assessments' / 'pages').glob('*/index.html')):
        o = SITE / p.parent.name; o.mkdir(parents=True, exist_ok=True)
        (o / 'index.html').write_text(rd(p), encoding='utf-8')
        print('assessment', p.parent.name)
    print('forms', ', '.join(build_forms()))
    build_teacher(c)
    print('teacher ok')
    if os.environ.get('DS_PEP'):
        print('⚠ 로컬 시험 주소로 빌드했습니다. 배포 전에 DS_PEP 없이 다시 빌드하세요.')


if __name__ == '__main__':
    main(sys.argv[1:])
