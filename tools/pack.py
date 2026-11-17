#!/usr/bin/env python3
"""제작 에이전트에게 줄 차시 자료 묶음 만들기 (소프트웨어와 생활판).

    python3 tools/pack.py u1-software [u1-future ...]
    python3 tools/pack.py u1            (단원 전체 차시)

이 과목 교과서·지도서 PDF는 글자 층이 없는 **이미지 PDF**라서(pdftotext 결과 0줄, 선생님 md 변환본도 0바이트),
원문 글은 **수업용 PPT(pptx)의 글**에서 뽑는다. 출판사 PPT는 교과서 문장을 그대로 옮기고 슬라이드마다 「NN 쪽」을 적어 둠.
course.json 의 쪽수(pages)에 걸치는 슬라이드만 모아 작업자료_소프트웨어와생활/pack/<차시ID>.md 로 쓴다.
그림·표·정확한 문장은 함께 적어 주는 **부분 교과서 PDF**(교사용, 8~20쪽짜리)를 Read 도구로 직접 보고 확인한다.
"""
from __future__ import annotations

import html
import json
import pathlib
import re
import sys
import zipfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
WORK = ROOT.parent / '작업자료_소프트웨어와생활'
MAT = ROOT.parent / '고등일반_소프트웨어와 생활' / '단원별 자료' / '수업 자료'
SECS = ['0_도입', '1_개념학습', '2_융합진로', '3_프로젝트', '4_대단원마무리']
PAGE_RE = re.compile(r'(\d{2,3})\s*쪽')


def page_range(s: str):
    a, _, b = s.partition('~')
    return set(range(int(a), int(b or a) + 1))


def slides(pptx: pathlib.Path):
    z = zipfile.ZipFile(pptx)
    names = sorted((n for n in z.namelist() if re.fullmatch(r'ppt/slides/slide\d+\.xml', n)),
                   key=lambda n: int(re.search(r'(\d+)', n).group()))
    for n in names:
        d = z.read(n).decode('utf-8', 'replace')
        paras = []
        for p in re.findall(r'<a:p>.*?</a:p>', d, flags=re.S):
            t = ''.join(re.findall(r'<a:t>([^<]*)</a:t>', p)).strip()
            if t:
                paras.append(html.unescape(t).replace('​', ''))
        yield paras


def section_pack(unit_no: int, pages: set[int]):
    """단원 폴더의 각 절(도입~마무리) PPT에서 쪽이 겹치는 슬라이드를 모은다."""
    out, pdfs = [], []
    for sec in SECS:
        d = MAT / f'{unit_no}단원' / f'{unit_no}-{sec}'
        ppt = next(d.glob('*PPT*.pptx'), None) if d.exists() else None
        if not ppt:
            continue
        cur, got = None, []
        for i, paras in enumerate(slides(ppt), 1):
            nums = [int(x) for x in PAGE_RE.findall(' '.join(paras)) if 10 <= int(x) <= 240]
            if nums:
                cur = nums[0]
            # 쪽 표시가 없는 슬라이드는 앞 슬라이드의 쪽을 이어받는다(첫 슬라이드들=학습 목표).
            first = min(pages)
            if (cur in pages) or (cur is None and first in _sec_pages(ppt)):
                got.append(f'#### 슬라이드 {i} (≈{cur or "앞"}쪽)\n' + '\n'.join(paras))
        if got:
            out.append(f'### {unit_no}-{sec} 수업용 PPT\n' + '\n\n'.join(got))
            # 학생용 교과서 먼저(내용 기준), 교사용(빨간 예시 답·지도 팁)은 참고 — 예시 답을 정답 해설로 옮기지 않기
            pdfs += [str(p) for p in d.glob('*교과서 PDF*.pdf') if '교사용' not in p.name]
            pdfs += [f'{p} (교사용·참고)' for p in d.glob('*교사용 교과서 PDF*.pdf')]
    return out, pdfs


_cache: dict = {}


def _sec_pages(ppt):
    if ppt not in _cache:
        _cache[ppt] = {int(x) for ps in slides(ppt) for x in PAGE_RE.findall(' '.join(ps)) if 10 <= int(x) <= 240}
    return _cache[ppt]


def main(argv):
    c = json.loads((ROOT / 'course.json').read_text(encoding='utf-8'))
    targets = [(int(u['id'][1:]), u, l) for u in c['units'] for l in u['lessons']
               if l['id'] in argv or u['id'] in argv]
    if not targets:
        sys.exit('차시 ID나 단원 ID(u1~u5)를 주세요')
    (WORK / 'pack').mkdir(parents=True, exist_ok=True)
    for no, u, l in targets:
        body, pdfs = section_pack(no, page_range(l['pages']))
        guide = MAT / f'{no}단원'
        md = (f"# {l['id']} · {l['title']} (교과서 {l['pages']}쪽, {u['name']})\n\n"
              "## 0. 원문 확인용 PDF (이미지 PDF — Read 도구로 쪽을 직접 보기, pages 인자 20쪽 이하)\n"
              + '\n'.join(f'- `{p}`' for p in dict.fromkeys(pdfs)) +
              f"\n- 지도서: `{next(guide.glob('*지도서 PDF*.pdf'), '(없음)')}`\n\n"
              "## 1. 수업용 PPT 글 (교과서 문장을 옮긴 것, 쪽 표시 포함)\n"
              + ('\n\n'.join(body) or '(맞는 슬라이드 없음 — PDF를 직접 보기)') + '\n')
        o = WORK / 'pack' / f"{l['id']}.md"
        o.write_text(md, encoding='utf-8')
        print(f"작업자료_소프트웨어와생활/pack/{l['id']}.md  {len(md):,}자")


if __name__ == '__main__':
    main(sys.argv[1:])
