
/* 파이썬 실행 칸: 학생이 코드를 고쳐 바로 돌려 보는 부품 (Pyodide, CDN에서 불러옴).
   pyrun('박스id', {code:'...', rows:8, stdin:'3\n5', readonly:false})
   - code   : 처음에 보여 줄 코드 (여러 줄 문자열)
   - rows   : 편집칸 높이(줄). 없으면 코드 줄 수로 정함
   - stdin  : input() 이 위에서부터 한 줄씩 받을 값 (코드에 input 이 있으면 입력칸이 자동으로 생김)
   - readonly: true 면 편집 없이 실행만 (코드는 그대로 보여 줌)
   파이썬은 처음 실행할 때 한 번만 불러오고, 그다음부터는 바로 돈다. 인터넷이 없으면 안내만 보인다. */
const PY_VER = '0.26.4';
const PY_BASE = `https://cdn.jsdelivr.net/pyodide/v${PY_VER}/full/`;
let _pyLoad = null;                 /* Pyodide 로딩 Promise(한 번만) */
let _pyLock = Promise.resolve();    /* 모든 실행 칸이 파이썬 하나를 공유하므로 한 번에 하나씩만 실행 */
const _pyWaiters = [];              /* 로딩 중일 때 상태 글을 바꿔 줄 콜백들 */

function _loadPy() {
  if (_pyLoad) return _pyLoad;
  _pyLoad = new Promise((resolve, reject) => {
    const tell = m => _pyWaiters.forEach(f => { try { f(m); } catch (e) {} });
    const s = document.createElement('script');
    s.src = PY_BASE + 'pyodide.js';
    s.onload = async () => {
      try {
        tell('파이썬 준비 중…');
        const py = await loadPyodide({ indexURL: PY_BASE });
        resolve(py);
      } catch (e) { reject(e); }
    };
    s.onerror = () => reject(new Error('스크립트를 불러오지 못함'));
    document.head.appendChild(s);
  });
  return _pyLoad;
}

function pyrun(box, cfg) {
  cfg = cfg || {};
  const B = $(box); if (!B) return;
  const code0 = String(cfg.code || '').replace(/^\n+/, '').replace(/\s+$/, '');
  const rows = cfg.rows || Math.min(16, Math.max(3, code0.split('\n').length + 1));
  const needIn = /\binput\s*\(/.test(code0) || cfg.stdin != null;
  const ro = !!cfg.readonly;
  B.classList.add('pyrun');
  B.innerHTML =
    `<textarea class="pr-code" spellcheck="false" rows="${rows}" ${ro ? 'readonly' : ''} aria-label="파이썬 코드"></textarea>` +
    (needIn ? `<div class="pr-in"><label>입력값 <small>input() 이 위에서부터 한 줄씩 받아요</small></label>` +
      `<textarea class="pr-stdin" spellcheck="false" rows="2" aria-label="입력값" placeholder="한 줄에 하나씩"></textarea></div>` : '') +
    `<div class="pr-bar"><button class="btn sm pr-go">▶ 실행</button>` +
    (ro ? '' : `<button class="btn ghost sm pr-reset">처음 코드로</button>`) +
    `<span class="pr-stat"></span></div>` +
    `<pre class="pr-out" aria-live="polite" hidden></pre>`;
  const ed = B.querySelector('.pr-code'), out = B.querySelector('.pr-out'),
    stat = B.querySelector('.pr-stat'), goBtn = B.querySelector('.pr-go'),
    reset = B.querySelector('.pr-reset'), sin = B.querySelector('.pr-stdin');
  ed.value = code0;
  if (cfg.stdin != null && sin) sin.value = String(cfg.stdin);
  /* 탭키로 네 칸 들여쓰기 */
  if (!ro) ed.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const a = ed.selectionStart, b = ed.selectionEnd;
      ed.value = ed.value.slice(0, a) + '    ' + ed.value.slice(b);
      ed.selectionStart = ed.selectionEnd = a + 4;
    }
  });
  if (reset) reset.onclick = () => {
    ed.value = code0; if (sin) sin.value = cfg.stdin != null ? String(cfg.stdin) : '';
    out.hidden = true; out.textContent = ''; out.classList.remove('err');
  };

  async function run() {
    const setStat = m => stat.textContent = m;
    setStat('파이썬 불러오는 중…'); _pyWaiters.push(setStat);
    let py;
    try { py = await _loadPy(); }
    catch (e) {
      setStat(''); out.hidden = false; out.classList.add('err');
      out.textContent = '⚠ 파이썬을 불러오지 못했어요. 인터넷 연결을 확인하고 「실행」을 다시 눌러 주세요.';
      goBtn.disabled = false; return;
    } finally { const i = _pyWaiters.indexOf(setStat); if (i >= 0) _pyWaiters.splice(i, 1); }
    setStat('실행 중…');
    const lines = [];
    py.setStdout({ batched: s => lines.push(s + '\n') });  /* 0.26: batched 는 줄바꿈을 뺀 한 줄씩 줌 */
    py.setStderr({ batched: s => lines.push(s + '\n') });
    const feed = (sin ? sin.value : '').split('\n');
    try {
      py.globals.set('_pyrun_feed', feed);
      py.globals.set('_pyrun_src', ed.value);
      await py.runPythonAsync(
        'import builtins as _b\n' +
        '_f=[str(x) for x in list(_pyrun_feed)]\n' +
        '_ix=[0]\n' +
        'def _inp(prompt=""):\n' +
        '    if prompt: print(prompt, end="")\n' +
        '    if _ix[0] < len(_f):\n' +
        '        v=_f[_ix[0]]; _ix[0]+=1; return v\n' +
        '    raise EOFError("입력값이 더 없어요. 위 입력값 칸에 값을 더 적어 주세요.")\n' +
        '_b.input=_inp\n');
      await py.runPythonAsync("exec(compile(_pyrun_src,'<내 코드>','exec'), {'__name__':'__main__'})");
      out.classList.remove('err');
    } catch (err) {
      /* 파이썬 내부(Pyodide) 프레임은 지우고 학생이 쓴 코드 줄만 남긴다 */
      const raw = String(err && err.message || err).split('\n'), keep = [];
      for (let i = 0; i < raw.length; i++) {
        const m = raw[i].match(/^ *File "([^"]*)"/);
        if (m && (m[1].indexOf('/lib/') === 0 || m[1].indexOf('_pyodide') >= 0 || m[1] === '<exec>')) {
          while (i + 1 < raw.length && /^\s+/.test(raw[i + 1]) && !/^\s*File "/.test(raw[i + 1])) i++;
          continue;
        }
        keep.push(raw[i]);
      }
      lines.push(keep.join('\n').trim() || '오류가 났어요.');
      out.classList.add('err');
    } finally {
      try { py.globals.delete('_pyrun_feed'); py.globals.delete('_pyrun_src'); } catch (e) {}
    }
    setStat('');
    out.hidden = false;
    out.textContent = lines.join('').replace(/\n+$/, '') || '(출력이 없어요)';
    goBtn.disabled = false;
  }
  /* 다른 칸이 실행 중이면 끝날 때까지 기다렸다가(직렬화) 실행 — 파이썬 하나를 공유하기 때문 */
  goBtn.onclick = () => {
    goBtn.disabled = true;
    stat.textContent = '실행 준비 중…';
    _pyLock = _pyLock.then(run, run);
  };
}
