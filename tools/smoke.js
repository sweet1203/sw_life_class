/* 브라우저 자동 시험 (배포 전).
   1) DS_PEP=http://localhost:8765/pep python3 tools/build.py  → 미리보기(.claude/launch.json 의 ds-data-preview) 열기
   2) 미리보기 탭의 콘솔(또는 javascript_tool)에서 이 파일 내용을 실행한 뒤
        await smoke(['u3-model','u3-regression'], 1280)   // 폭을 바꿔 375 로도
   3) 끝나면 DS_PEP 없이 다시 빌드.
   차시마다 iframe 으로 열고 모든 화면을 go(i) 로 넘기며 오류·가로 넘침을 모은다. */
async function smoke(ids, width = 1280) {
  const out = [];
  for (const id of ids) {
    const f = document.createElement('iframe');
    f.style.cssText = `width:${width}px;height:820px;position:absolute;left:-99999px;top:0`;
    document.body.appendChild(f);
    await new Promise(r => { f.onload = r; f.src = `/${id}/?smoke=${Date.now()}`; });
    const w = f.contentWindow, errs = [];
    w.addEventListener('error', e => errs.push(e.message));
    w.addEventListener('unhandledrejection', e => errs.push(String(e.reason)));
    const n = w.document.querySelectorAll('.page').length;
    if (typeof w.go !== 'function') errs.push('go() 없음 — 페이지 스크립트가 멈췄을 수 있음');
    for (let i = 0; i < n && typeof w.go === 'function'; i++) {
      try { w.go(i); } catch (e) { errs.push(`화면 ${i}: ${e.message}`); }
      await new Promise(r => setTimeout(r, 150));
      const d = w.document.documentElement;
      if (d.scrollWidth > d.clientWidth + 2) errs.push(`화면 ${i}: 가로 넘침 ${d.scrollWidth}>${d.clientWidth}`);
      const pg = w.document.querySelectorAll('.page')[i];
      if (pg) pg.querySelectorAll('svg').forEach(s => { if (!s.innerHTML.trim()) errs.push(`화면 ${i}: 빈 그림 #${s.id || '?'}`); });
    }
    out.push({ id, 화면: n, 문제: errs });
    f.remove();
  }
  return out;
}
