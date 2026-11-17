#!/usr/bin/env python3
"""로컬 미리보기: site/ 를 내주고 /pep 에서 진도 수집기(put·read·who)를 흉내 낸다.

    DS_PEP=http://localhost:8796/pep python3 tools/build.py   # 로컬 수집기 주소로 빌드
    python3 tools/preview.py                                  # http://localhost:8796/
    교사 코드: testcode1 · 명단: 20101 가나다(인C), 20102 라마바(인C), 20201 사아자(인F)
배포 전에는 꼭 DS_PEP 없이 다시 빌드한다.
"""
import http.server, json, pathlib, time
ROOT = pathlib.Path(__file__).resolve().parents[1] / 'site'
DB, LOG = {}, []
ROSTER = [{'cls': '인C', 'no': '20101', 'name': '가나다'}, {'cls': '인C', 'no': '20102', 'name': '라마바'}, {'cls': '인F', 'no': '20201', 'name': '사아자'}]


class H(http.server.SimpleHTTPRequestHandler):
    def __init__(s, *a, **k): super().__init__(*a, directory=str(ROOT), **k)
    def log_message(s, *a): pass

    def out(s, o):
        b = json.dumps(o, ensure_ascii=False).encode()
        s.send_response(200); s.send_header('Content-Type', 'application/json'); s.send_header('Content-Length', str(len(b))); s.end_headers(); s.wfile.write(b)

    def do_POST(s):
        if s.path != '/pep':
            return s.send_error(404)
        p = json.loads(s.rfile.read(int(s.headers.get('Content-Length', 0))).decode('utf-8'))
        LOG.append(p.get('op'))
        if p['op'] == 'put':
            k = (p['lesson'], p['no'], p['name']); old = DB.get(k, {})
            DB[k] = {**p, 'first': old.get('first', time.time() * 1000), 'last': time.time() * 1000, 'away': bool(p.get('away'))}
            return s.out({'ok': True})
        if p['op'] == 'who':
            m = [r for r in ROSTER if r['no'] == p.get('no') and r['name'] == p.get('name')]
            return s.out({'ok': True, 'cls': m[0]['cls']} if m else {'ok': False, 'err': 'notfound'})
        if p['op'] == 'read':
            if p.get('code') != 'testcode1':
                return s.out({'ok': False, 'err': 'code'})
            rows = [{k2: v for k2, v in r.items() if k2 not in ('op', 'lesson', 'title')} for k, r in DB.items()
                    if k[0] == p['lesson'] and (not p['cls'] or r['cls'] == p['cls'])]
            return s.out({'ok': True, 'now': time.time() * 1000, 'rows': rows, 'roster': [x for x in ROSTER if not p['cls'] or x['cls'] == p['cls']]})
        s.out({'ok': False, 'err': 'op'})

    def do_GET(s):
        if s.path == '/_log':
            return s.out({'log': LOG[-50:], 'db': {'|'.join(k): v for k, v in DB.items()}})
        super().do_GET()


http.server.ThreadingHTTPServer(('127.0.0.1', 8796), H).serve_forever()
