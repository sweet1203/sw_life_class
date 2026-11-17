#!/usr/bin/env python3
"""차시 screens.html 의 마무리 formgo 문항을 뽑아 forms/forms.json 을 다시 만든다.

    python3 tools/gen_forms.py

course.json 순서대로, lessons/<id>/ 가 있고 screens.html 에 class="formgo" <ol><li>…</li></ol> 이 있으면
그 <li> 문장(태그 제거, <span class="muted"> 보조설명 제거)을 questions 로 넣는다.
기존 forms.json 의 course·endpoint·classes 머리말은 그대로 둔다. 이미 손으로 고친 폼이 있으면 그 questions 를 유지한다(--overwrite 로 덮어씀).
"""
from __future__ import annotations

import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
rd = lambda p: pathlib.Path(p).read_text(encoding='utf-8')
ROMAN = {'Ⅰ': '1', 'Ⅱ': '2', 'Ⅲ': '3', 'Ⅳ': '4', 'Ⅴ': '5'}


def formgo_questions(html: str):
    m = re.search(r'class="formgo".*?<ol>(.*?)</ol>', html, re.S)
    if not m:
        return None
    qs = []
    for li in re.findall(r'<li>(.*?)</li>', m.group(1), re.S):
        li = re.sub(r'<span class="muted">.*?</span>', '', li, flags=re.S)  # (화면 n 참고) 보조설명 제거
        txt = re.sub(r'<[^>]+>', '', li)            # 태그 제거
        txt = re.sub(r'\s+', ' ', txt).strip()
        if txt:
            qs.append(txt)
    return qs or None


def main(argv):
    overwrite = '--overwrite' in argv
    c = json.loads(rd(ROOT / 'course.json'))
    fpath = ROOT / 'forms' / 'forms.json'
    cur = json.loads(rd(fpath))
    old = {f['id']: f for f in cur.get('forms', [])}
    out = []
    for u in c['units']:
        sec_unit = u['name']
        for l in u['lessons']:
            fid = l.get('form')
            d = ROOT / 'lessons' / l['id']
            if not fid or not (d / 'screens.html').exists():
                if fid in old:
                    out.append(old[fid])        # 아직 안 만든 차시도 기존 폼 유지
                continue
            qs = formgo_questions(rd(d / 'screens.html'))
            if fid in old and old[fid].get('questions') and not overwrite:
                out.append(old[fid])            # 손으로 고친 폼 유지
                continue
            if not qs:
                continue
            out.append({
                'id': fid,
                'unit': sec_unit,
                'section': ROMAN.get(sec_unit[0], ''),
                'pages': l['pages'] + '쪽',
                'title': l['title'],
                'questions': qs,
            })
    cur['forms'] = out
    fpath.write_text(json.dumps(cur, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    print(f'forms.json 갱신: {len(out)}개 폼 — ' + ', '.join(f['id'] for f in out))


if __name__ == '__main__':
    main(sys.argv[1:])
