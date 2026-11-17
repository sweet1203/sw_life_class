#!/usr/bin/env python3
"""새 과목 코스웨어 저장소 뼈대 만들기 (이 저장소의 공통 틀만 복사, 차시는 비움)

    python3 tools/new_course.py <새 폴더> --name "데이터과학" --site https://dsdataclass.vercel.app/

복사하는 것: framework/ · tools/ · teacher/ · apps_script/ · forms/template.html · docs/ · vercel.json · .gitignore
새로 만드는 것: course.json(차시 없음) · forms/forms.json(폼 없음) · lessons/ · assessments/ · README.md
교사 모드 확인값(teacherHash)은 그대로 가져간다(같은 선생님). 진도 수집기 주소·질문폼 수집기 주소는 비워 둔다.
자세한 순서: docs/새_과목_만들기.md
"""
from __future__ import annotations

import argparse
import json
import pathlib
import re
import shutil
import sys

SRC = pathlib.Path(__file__).resolve().parents[1]
SKIP_TOOLS = {'split_legacy.py', 'split_dl.py'}   # 인공지능기초 이식 때만 쓴 도구


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('dest')
    ap.add_argument('--name', required=True, help='과목 이름 (화면 왼쪽 위·선생님 목록 제목)')
    ap.add_argument('--site', required=True, help='배포 주소, 끝에 / 붙이기')
    a = ap.parse_args()
    dest = pathlib.Path(a.dest).expanduser().resolve()
    if dest.exists() and any(dest.iterdir()):
        sys.exit(f'{dest} 가 비어 있지 않습니다. 빈 폴더를 지정하세요.')
    site = a.site if a.site.endswith('/') else a.site + '/'
    dest.mkdir(parents=True, exist_ok=True)

    for d in ['framework', 'teacher', 'docs']:
        shutil.copytree(SRC / d, dest / d)
    shutil.copytree(SRC / 'tools', dest / 'tools',
                    ignore=lambda p, names: [n for n in names if n in SKIP_TOOLS or n == '__pycache__'])
    (dest / 'apps_script').mkdir()
    gs = (SRC / 'apps_script' / 'Code.gs').read_text(encoding='utf-8')
    gs = re.sub(r"var 과목 = '[^']*';", f"var 과목 = '{a.name}';", gs, count=1)
    gs = re.sub(r"var 반목록 = \[[^\]]*\];", "var 반목록 = [];", gs, count=1)
    (dest / 'apps_script' / 'Code.gs').write_text(gs, encoding='utf-8')
    (dest / 'forms').mkdir()
    shutil.copy(SRC / 'forms' / 'template.html', dest / 'forms' / 'template.html')
    for f in ['vercel.json', '.gitignore']:
        shutil.copy(SRC / f, dest / f)

    # 학기 시작 체크리스트에서 인공지능기초 전용 항목(산불 사진) 빼기
    ck = dest / 'docs' / '학기_시작_체크리스트.md'
    lines = [l for l in ck.read_text(encoding='utf-8').splitlines() if '산불' not in l]
    out, n = [], 0
    for l in lines:
        m = re.match(r'^(\d+)\. ', l)
        if m:
            n += 1
            l = f'{n}. ' + l[m.end():]
        out.append(l)
    ck.write_text('\n'.join(out) + '\n', encoding='utf-8')

    src_c = json.loads((SRC / 'course.json').read_text(encoding='utf-8'))
    course = {
        '_설명': src_c['_설명'],
        'course': a.name,
        'site': site,
        'classes': [],
        '_classes': src_c.get('_classes', ''),
        'progressEndpoint': '',
        '_progressEndpoint': '진도 수집 시트의 Apps Script 웹 앱 주소(…/exec). 비어 있으면 진도를 보내지 않는다',
        'teacherHash': src_c.get('teacherHash', ''),
        '_teacherHash': src_c.get('_teacherHash', ''),
        'assessments': [],
        '_assessments': src_c.get('_assessments', ''),
        'units': [],
        '_units': '단원: {"id","name","color","lessons":[{"no","id","title","pages","form","status"}]} · 차시 id = 주소, 한 번 정하면 바꾸지 않기',
    }
    (dest / 'course.json').write_text(json.dumps(course, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    src_f = json.loads((SRC / 'forms' / 'forms.json').read_text(encoding='utf-8'))
    forms = {'_설명': src_f.get('_설명', ''), 'course': a.name, 'endpoint': '',
             '_endpoint': '질문폼 수집기 웹 앱 주소. 인공지능기초와 같은 수집기를 쓸지 정한 뒤 넣는다',
             'classes': [], 'forms': []}
    (dest / 'forms' / 'forms.json').write_text(json.dumps(forms, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    (dest / 'lessons').mkdir()
    (dest / 'lessons' / '.gitkeep').write_text('')
    (dest / 'assessments' / 'ideas').mkdir(parents=True)
    (dest / 'assessments' / 'pages').mkdir()
    (dest / 'assessments' / 'ideas' / 'README.md').write_text(
        f'# {a.name} 수행평가 아이디어 모음\n\n학기 초 평가계획을 세울 때 여기서 고르고, 고른 것만 그 학기에 안내 페이지를 만든다.\n'
        '채점 기준 상세·현장 문항은 공개 저장소에 두지 않는다.\n', encoding='utf-8')
    readme = (SRC / 'README.md').read_text(encoding='utf-8')
    readme = readme.split('\n', 1)[1]
    readme = f'# {dest.name} — {a.name} 수업 코스웨어\n' + readme
    readme = re.sub(r'씨마스 『인공지능 기초』\(3학점 48시간\)', f'『{a.name}』', readme)
    readme = readme.replace('https://dsaiclass.vercel.app/', site)
    # 인공지능기초가 아닌 다른 과목 저장소에서 복사할 때도 원본 과목 이름·주소가 남지 않게
    readme = readme.replace(src_c.get('site', ''), site) if src_c.get('site') else readme
    readme = readme.replace(f"『{src_c.get('course', '')}』", f'『{a.name}』') if src_c.get('course') else readme
    (dest / 'README.md').write_text(readme, encoding='utf-8')
    print(f'만들었습니다: {dest}\n다음: course.json 에 단원·차시를 넣고, docs/새_과목_만들기.md 순서를 따르세요.')


if __name__ == '__main__':
    main()
