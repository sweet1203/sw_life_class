#!/usr/bin/env python3
"""배포 전 자동 점검.  python3 tools/check.py [차시ID ...]

- 빌드된 페이지의 JS 문법 (node --check)
- 화면(data-quiz)과 퀴즈(QUIZ) 번호 맞는지, 정답 위치 분포
- 메모 목록(MEMOLIST) 키가 화면의 data-memo / chips 키와 맞는지
- lesson.js 가 찾는 요소 id가 화면에 있는지
- 금지 표현: 차시 번호, 날짜, 사이트 주소 / 선택지의 극단어(항상·절대·모든)
- 질문폼 원본이 있는지
- 퀴즈: 정답만 유난히 긴 보기, 정답이 가장 긴 보기인 비율, 해설·문제의 극단어
- 교과서 「주요 개념 정리하기」·단원 정리 문제를 그대로 옮긴 화면·퀴즈 문장 (작업자료의 교과서_N단원_본문.txt 와 글자 n-gram 비교, 있을 때만)
- 다른 차시 메모를 읽는 곳(memoOf·rd·store.get('ds-…-memo'))의 차시와 키가 있는지
- data-memo 입력칸 옆(같은 부모)에 .saved 가 있는지
오류(✗)가 있으면 종료 코드 1.  --strict 이면 주의(△)도 실패로 친다.
"""
from __future__ import annotations

import json
import pathlib
import re
import subprocess
import sys
import tempfile
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parents[1]
rd = lambda p: pathlib.Path(p).read_text(encoding='utf-8')
WORK = ROOT.parent / '작업자료_프로그래밍'   # 교과서 텍스트(저장소 밖). 없으면 그 점검은 건너뜀(프로그래밍은 교과서_N단원_본문.txt 없이 md pack 사용 → 이 점검은 스킵)
FW_IDS = {'steps', 'score', 'prog', 'main', 'prev', 'next', 'pg', 'result', 'quizReset', 'msum', 'intro'}
errors, warns = [], []
EXTREME = r'(?<![가-힣])(항상|절대|무조건|반드시)'   # 문제·해설용 (「모든 값」 같은 쓰임은 빼고)
_TB = {}


def textbook_grams(unit_no, n=16):
    """교과서 「주요 개념 정리하기·점검하기」와 단원 끝 정리 문제의 글자 n-gram 집합 (공백·문장부호 뺀 글자 기준).
    학습 목표·핵심 질문처럼 그대로 옮겨도 되는 문장은 비교하지 않는다."""
    if unit_no in _TB:
        return _TB[unit_no]
    f = WORK / f'교과서_{unit_no}단원_본문.txt'
    g = None
    if f.exists():
        lines, keep, take = rd(f).splitlines(), [], 0
        for ln in lines:
            if re.match(r'주요 개념 (정리|점검)하기', ln):
                take = 12
                continue
            if ln.startswith('지금까지 배운 내용을 바탕으로 주요 개념을 정리'):
                take = 10 ** 6
                continue
            if ln.startswith('=== 교과서') and take < 10 ** 6:
                take = 0
            if take:
                keep.append(ln)
                take -= 1
        t = re.sub(r'[^0-9A-Za-z가-힣]', '', '\n'.join(keep))
        g = {t[i:i + n] for i in range(len(t) - n + 1)}
    _TB[unit_no] = g
    return g


def memo_keys_of(lid):
    d = ROOT / 'lessons' / lid
    if not (d / 'screens.html').exists():
        return None
    screens, ljs = rd(d / 'screens.html'), rd(d / 'lesson.js')
    return (set(re.findall(r'data-memo="([^"]+)"', screens)) | set(re.findall(r'MEMO\.(\w+)\s*=', ljs))
            | set(re.findall(r"MEMO\[['\"](\w+)['\"]\]\s*=", ljs))
            | set(re.findall(r"chips\('[^']+','([^']+)'", ljs)) | set(re.findall(r"vote\('[^']+','([^']+)'", ljs))
            | set(re.findall(r"done\s*:\s*\{[^}]*?key\s*:\s*'([^']+)'", ljs)))


def err(lid, msg): errors.append(f'✗ {lid}: {msg}')
def warn(lid, msg): warns.append(f'△ {lid}: {msg}')


def node_eval(js: str):
    r = subprocess.run(['node', '-e', js], capture_output=True, text=True)
    return r.returncode, r.stdout, r.stderr


def check_lesson(c, l):
    lid = l['id']
    d = ROOT / 'lessons' / lid
    screens = rd(d / 'screens.html')
    quiz = rd(d / 'quiz.js')
    ljs = rd(d / 'lesson.js')
    built = ROOT / 'site' / lid / 'index.html'
    if not built.exists():
        err(lid, '빌드된 페이지 없음 (tools/build.py 먼저)')
    else:
        page = rd(built)
        js = '\n'.join(re.findall(r'<script>(.*?)</script>', page, re.S))
        with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as f:
            f.write(js)
        r = subprocess.run(['node', '--check', f.name], capture_output=True, text=True)
        if r.returncode:
            err(lid, 'JS 문법 오류\n' + r.stderr[-600:])
        if 'localhost' in page:
            err(lid, '로컬 시험 주소(localhost)로 빌드됨 → DS_PEP 없이 다시 빌드')
    # 퀴즈
    code, out, e = node_eval(quiz + '\nconsole.log(JSON.stringify(QUIZ))')
    if code:
        err(lid, 'quiz.js 실행 오류 ' + e[-300:])
        return
    Q = json.loads(out)
    n_pages = len(re.findall(r'<section class="page"', screens))
    used = set(re.findall(r'data-quiz="(\d+)"', screens))
    for k in Q:
        if k not in used:
            err(lid, f'QUIZ[{k}] 가 있는데 화면에 data-quiz="{k}" 없음')
        if int(k) >= n_pages:
            err(lid, f'QUIZ[{k}] 화면 번호가 화면 수({n_pages})를 넘음')
    for k in used:
        if k not in Q:
            err(lid, f'data-quiz="{k}" 인데 QUIZ[{k}] 없음')
    pos = [0, 0, 0, 0, 0]
    longest = 0
    for k, items in Q.items():
        for i, it in enumerate(items):
            if not (0 <= it['a'] < len(it['o'])):
                err(lid, f'QUIZ[{k}][{i}] 정답 번호가 선택지 밖')
                continue
            pos[it['a']] += 1
            for o in it['o']:
                if re.search(r'(?<![가-힣])(항상|절대|모든|무조건|반드시)', o):
                    warn(lid, f'QUIZ[{k}][{i}] 선택지 극단어: {o}')
            if re.search(r'(첫째|둘째|셋째|넷째|첫 번째|두 번째|세 번째|네 번째|앞의 두|앞의 둘|뒤의 두|마지막)(와|과)? ?(셋째 )?보기|앞의 둘|[①②③④]번 보기', it.get('w', '')):
                err(lid, f'QUIZ[{k}][{i}] 해설이 보기 위치를 가리킴(보기는 섞여 나옴): {it["w"][:40]}')
            if len(set(it['o'])) != len(it['o']):
                err(lid, f'QUIZ[{k}][{i}] 같은 선택지 중복')
            for fld, nm in (('q', '문제'), ('w', '해설')):
                for hit in re.findall(EXTREME, it.get(fld, '')):
                    if fld == 'q' or not re.search(hit + r'\s*(그런|맞는|옳은)\s*(건|것은)\s*아니', it.get(fld, '')):
                        warn(lid, f'QUIZ[{k}][{i}] {nm}에 극단어 「{hit}」: {it.get(fld, "")[:40]}')
            L = [len(re.sub(r'<[^>]+>', '', o)) for o in it['o']]
            others = [x for j, x in enumerate(L) if j != it['a']]
            if others and L[it['a']] > max(others):
                longest += 1
                if L[it['a']] >= 1.5 * max(others) and L[it['a']] - max(others) >= 8:
                    warn(lid, f'QUIZ[{k}][{i}] 정답만 유난히 긴 보기 ({L[it["a"]]}자 / 다른 보기 최대 {max(others)}자)')
    total = sum(pos)
    if total:
        spread = ' '.join(f'{"①②③④⑤"[i]}{n}' for i, n in enumerate(pos) if n or i < 3)
        print(f'  {lid}: 퀴즈 {total}문항, 정답 위치 {spread}, 정답이 가장 긴 보기 {longest}문항')
        if total >= 6 and longest / total > 0.45:
            warn(lid, f'정답이 가장 긴 보기인 문항이 {longest}/{total} — 길이만 보고도 맞힐 수 있음')
        # 보기 순서는 화면에서 학생마다 섞이므로 위치 분포는 참고용
    # 메모
    memo_keys = set(re.findall(r'data-memo="([^"]+)"', screens)) | set(re.findall(r'MEMO\.(\w+)\s*=', ljs)) | set(re.findall(r"chips\('[^']+','([^']+)'", ljs)) | set(re.findall(r"vote\('[^']+','([^']+)'", ljs)) | set(re.findall(r"done\s*:\s*\{[^}]*?key\s*:\s*'([^']+)'", ljs))
    m = re.search(r'const MEMOLIST=\[(.*?)\];', ljs, re.S)
    if m:
        for k in re.findall(r"\['([^']+)'", m.group(1)):
            if k not in memo_keys:
                err(lid, f'MEMOLIST 키 {k} 가 화면에 없음')
        listed = set(re.findall(r"\['([^']+)'", m.group(1)))
        for k in memo_keys - listed:
            warn(lid, f'메모 {k} 가 마무리 메모 모아 보기(MEMOLIST)에 없음')
    elif memo_keys:
        warn(lid, 'MEMOLIST 없음 (마무리 메모 모아 보기가 비어 보임)')
    # 다른 차시 메모 읽기
    cross = set(re.findall(r"(?:memoOf|rd)\('([a-z0-9-]+)','(\w+)'\)", ljs))
    cross |= set(re.findall(r"store\.get\('ds-([a-z0-9-]+?)-memo'[^)]*\)[^;]*?\)\s*\.(\w+)", ljs))
    for olid, key in sorted(cross):
        ks = memo_keys_of(olid)
        if ks is None:
            err(lid, f'다른 차시 메모 {olid}.{key} 를 읽는데 lessons/{olid}/ 없음')
        elif key not in ks:
            err(lid, f'다른 차시 메모 {olid}.{key} 를 읽는데 그 차시에 메모 키 {key} 없음')
    # .saved 자리: bindMemos 는 입력칸의 부모 안에서 .saved 를 찾음
    for key in memo_without_saved(screens):
        warn(lid, f'메모 {key} 입력칸의 부모 안에 <div class="saved"></div> 없음 — 「저장됨」 표시가 안 나옴')
    # 교과서 문장 그대로 옮기기
    unit_no = 'ⅠⅡⅢⅣ'.find(c_unit_name(c, lid)[:1]) + 1
    grams = textbook_grams(unit_no) if unit_no else None
    if grams:
        vis = re.sub(r'<script.*?</script>|<style.*?</style>', ' ', screens, flags=re.S)
        vis = re.sub(r'<[^>]+>', '\n', vis) + '\n' + '\n'.join(x for items in Q.values() for it in items for x in [it['q'], *it['o']])
        for sent in re.split(r'(?<=[.?!다요])\s+|\n+', vis):
            t = re.sub(r'[^0-9A-Za-z가-힣]', '', sent)
            if len(t) < 36:
                continue
            gs = [t[i:i + 16] for i in range(len(t) - 15)]
            cov = sum(g in grams for g in gs) / len(gs)
            if cov >= 0.75:
                warn(lid, f'교과서 정리 문제·주요 개념 문장과 거의 같음({cov:.0%}) — 바꿔 쓰기: {sent.strip()[:50]}')
    # 요소 id
    ids = set(re.findall(r'id="([^"]+)"', screens)) | set(re.findall(r'id="([^"$]+)"', ljs)) | FW_IDS
    for x in sorted(set(re.findall(r"\$\('([A-Za-z0-9_-]+)'\)", ljs)) | set(re.findall(r"(?:sorter|flipCards|chips|vote|pyrun)\('([A-Za-z0-9_-]+)'", ljs))):
        if x not in ids:
            err(lid, f'lesson.js 가 찾는 #{x} 가 화면에 없음')
    # 금지 표현 (화면에 보이는 글)
    text = re.sub(r'<[^>]+>', ' ', screens)
    for pat, what in [(r'\d+\s*차시', '차시 번호'), (r'\d{1,2}\s*월\s*\d{1,2}\s*일', '날짜'), (r'vercel\.app|https?://', '사이트 주소'), (r'수행\s*평가|세특|세부\s*능력', '평가·세특 문구')]:
        for hit in re.findall(pat, text):
            err(lid, f'화면에 {what}: {hit}')
    if '{{FORM_URL}}' in screens and not l.get('form'):
        err(lid, '질문폼 버튼이 있는데 course.json 에 form 이 없음')


class _Tree(HTMLParser):
    VOID = {'input', 'br', 'img', 'hr', 'meta', 'link', 'source', 'wbr', 'col'}

    def __init__(self):
        super().__init__()
        self.stack, self.n, self.memo, self.saved = [0], 0, [], set()

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.n += 1
        par = self.stack[-1]
        if 'data-memo' in a and tag in ('input', 'textarea', 'select'):
            self.memo.append((a['data-memo'], par))
        if 'saved' in (a.get('class') or '').split():
            self.saved.add(par)
        if tag not in self.VOID:
            self.stack.append(self.n)

    def handle_endtag(self, tag):
        if tag not in self.VOID and len(self.stack) > 1:
            self.stack.pop()


def memo_without_saved(screens):
    t = _Tree()
    t.feed(screens)
    return [k for k, par in t.memo if par not in t.saved]


def c_unit_name(c, lid):
    for u in c['units']:
        if any(l['id'] == lid for l in u['lessons']):
            return u['name']
    return ''


def main(argv):
    strict = '--strict' in argv
    argv = [a for a in argv if a != '--strict']
    c = json.loads(rd(ROOT / 'course.json'))
    forms = {f['id'] for f in json.loads(rd(ROOT / 'forms' / 'forms.json'))['forms']}
    ids = []
    for u in c['units']:
        for l in u['lessons']:
            ids.append(l['id'])
            if argv and l['id'] not in argv:
                continue
            if (ROOT / 'lessons' / l['id'] / 'screens.html').exists():
                check_lesson(c, l)
                if l.get('form') and l['form'] not in forms:
                    err(l['id'], f"질문폼 {l['form']} 이 forms/forms.json 에 없음")
            elif l['status'] in ('ready', 'draft'):
                err(l['id'], f"status={l['status']} 인데 lessons/{l['id']}/ 없음")
    if len(ids) != len(set(ids)):
        err('course.json', '차시 ID 중복')
    for line in errors + warns:
        print(line)
    print(f'오류 {len(errors)} · 주의 {len(warns)}')
    sys.exit(1 if errors or (strict and warns) else 0)


if __name__ == '__main__':
    main(sys.argv[1:])
