/**
 * 수업 페이지 진도 수집기 — 과목 이름은 아래 「과목」 (질문폼 수집기와 별개 프로젝트)
 * ─────────────────────────────────────────────────────────────
 *  수업 페이지(22~26차시)가 학생마다 보내는 진도를 「진도」 시트에
 *  학생 × 차시 한 줄로 덮어써 모읍니다.
 *  교사용 진도 현황판은 교사 코드를 넣어야 읽을 수 있습니다.
 *
 *  처음 한 번만
 *   1. 새 스프레드시트 → 확장 프로그램 → Apps Script → 이 코드 붙여넣고 저장
 *   2. 배포 → 새 배포 → 웹 앱 (실행: 나 · 액세스: 모든 사용자) → 웹 앱 URL 복사
 *   3. 스프레드시트 새로고침 → 「📈 진도 현황」 메뉴 → 「교사 코드 정하기」
 *   4. 메뉴 → 「명단 시트 만들기」 → 명단_붙여넣기용.csv 내용 붙여넣기
 *      (학생은 학번·이름만 넣고, 반은 이 명단에서 찾습니다. 명단을 고치면 10분 안에 반영,
 *       바로 반영하려면 메뉴 → 「명단 고친 것 바로 반영」)
 *
 *  코드를 고친 뒤에는 [배포 관리] → 연필 → 「새 버전」 → 배포
 *   ※ 「새 배포」를 누르면 URL이 바뀌어 수업 페이지가 전송하지 못합니다
 * ─────────────────────────────────────────────────────────────
 */

var 과목 = '소프트웨어와 생활';   // 과목마다 바꾼다 (확인 화면에만 쓰임)
var 진도시트 = '진도';
var 반목록 = [];   // 명단 확인이 안 될 때 학생이 고르는 반(수업 페이지 쪽). 저장·현황판은 명단의 반 이름을 따른다
var 진도헤더 = [
  '키', '차시', '반', '학번', '이름', '현재화면', '화면목록', '본화면',
  '퀴즈맞힘', '퀴즈푼수', '퀴즈전체', '메모칸', '메모글자', '메모',
  '창이탈횟수', '창이탈초', '지금다른창', '조작후초', '처음접속', '마지막신호', '전송수', '페이지'
];
var 열 = {};
진도헤더.forEach(function (h, i) { 열[h] = i; });

/* ══════════════════════════ 받기 ══════════════════════════ */

function doPost(e) {
  var p;
  try {
    p = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return json_({ ok: false, err: 'json' });
  }
  if (p.op === 'put') return json_(저장_(p));
  if (p.op === 'read') return json_(읽기_(p));
  if (p.op === 'who') return json_(누구_(p));
  return json_({ ok: false, err: 'op' });
}

function doGet() {
  return ContentService.createTextOutput(
    과목 + ' 진도 수집기가 정상 작동 중입니다. (' + new Date().toLocaleString('ko-KR') + ')'
  );
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

/* ══════════════════════════ 저장 ══════════════════════════ */

function 저장_(p) {
  var lesson = String(p.lesson || ''), cls = String(p.cls || ''), no = String(p.no || '');
  var name = String(p.name || '').replace(/\s+/g, '').slice(0, 10);
  if (!/^[a-z0-9][a-z0-9-]{0,39}$/.test(lesson) || !/^\d{5}$/.test(no) || !name) {
    return { ok: false, err: 'who' };
  }
  var memo = Array.isArray(p.memo) ? p.memo.slice(0, 40).map(function (m) {
    return [String(m[0] || '').slice(0, 60), String(m[1] || '').slice(0, 1500)];
  }) : [];
  var filled = memo.filter(function (m) { return m[1].trim(); });
  var chars = filled.reduce(function (a, m) { return a + m[1].trim().length; }, 0);
  var names = Array.isArray(p.names) ? p.names.slice(0, 30).map(function (x) { return String(x).slice(0, 40); }) : [];
  var seen = Array.isArray(p.seen) ? p.seen.filter(function (x) { return x >= 0 && x < 40; }) : [];
  var key = lesson + '|' + no + '|' + name;
  var 명단 = 명단맵_();
  if (명단[no] && 명단[no][1] === name) cls = 명단[no][0];   // 반은 명단을 따른다

  if (!cls || cls.length > 10) return { ok: false, err: 'cls' };   // 반 이름은 명단을 따른다

  var lock = LockService.getScriptLock();
  try { lock.waitLock(10000); } catch (err) { return { ok: false, err: 'busy' }; }
  try {
    var sh = 시트_();
    var row = 행찾기_(sh, key);
    var now = new Date();
    var first = now, count = 0;
    if (row) {
      var old = sh.getRange(row, 1, 1, 진도헤더.length).getValues()[0];
      first = old[열['처음접속']] || now;
      count = Number(old[열['전송수']]) || 0;
    } else {
      row = sh.getLastRow() + 1;
    }
    var v = [
      key, lesson, cls, no, name,
      Number(p.scr) || 0, names.join(' | '), seen.join(','),
      Number(p.qOk) || 0, Number(p.qDone) || 0, Number(p.qTot) || 0,
      filled.length + '/' + memo.length, chars, JSON.stringify(memo),
      Number(p.leaves) || 0, Number(p.awaySec) || 0, p.away ? '다른 창' : '',
      Number(p.idle) || 0, first, now, count + 1, String(p.title || '').slice(0, 60)
    ];
    sh.getRange(row, 1, 1, v.length).setValues([v]);
    CacheService.getScriptCache().put('r:' + key, String(row), 21600);
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

function 시트_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(진도시트);
  if (!sh) {
    sh = ss.insertSheet(진도시트, 0);
    sh.appendRow(진도헤더);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, 진도헤더.length).setFontWeight('bold').setBackground('#e8eaf6');
    sh.getRange('D:D').setNumberFormat('@');
    sh.setColumnWidth(열['메모'] + 1, 320);
    sh.hideColumns(1);
  }
  return sh;
}

function 행찾기_(sh, key) {
  var cached = CacheService.getScriptCache().get('r:' + key);
  if (cached) {
    var r = Number(cached);
    if (r > 1 && r <= sh.getLastRow() && sh.getRange(r, 1).getValue() === key) return r;
  }
  var last = sh.getLastRow();
  if (last < 2) return 0;
  var keys = sh.getRange(2, 1, last - 1, 1).getValues();
  for (var i = 0; i < keys.length; i++) if (keys[i][0] === key) return i + 2;
  return 0;
}

/* ══════════════════ 학번·이름 → 반 (명단 확인) ══════════════════ */

function 누구_(p) {
  var no = String(p.no || '').trim(), name = String(p.name || '').replace(/\s+/g, '');
  var m = 명단맵_();
  if (!Object.keys(m).length) return { ok: false, err: 'noroster' };
  if (m[no] && m[no][1] === name) return { ok: true, cls: m[no][0] };
  Utilities.sleep(500);
  return { ok: false, err: 'notfound' };
}

/** 명단 시트 → { 학번: [반, 이름] } (10분 캐시) */
function 명단맵_() {
  var cache = CacheService.getScriptCache();
  var c = cache.get('roster');
  if (c) return JSON.parse(c);
  var m = {};
  var rs = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('명단');
  if (rs && rs.getLastRow() > 1) {
    rs.getRange(2, 1, rs.getLastRow() - 1, 3).getValues().forEach(function (r) {
      var cl = String(r[0]).trim(), no = ('0' + String(r[1]).trim()).slice(-5), nm = String(r[2]).replace(/\s+/g, '');
      if (/^\d{5}$/.test(no) && cl && nm) m[no] = [cl, nm];
    });
  }
  cache.put('roster', JSON.stringify(m), 600);
  return m;
}

/* ══════════════════════════ 현황판 읽기 ══════════════════════════ */

function 읽기_(p) {
  var code = PropertiesService.getScriptProperties().getProperty('TEACHER_CODE');
  if (!code) return { ok: false, err: 'nocode' };
  if (String(p.code || '') !== code) { Utilities.sleep(1500); return { ok: false, err: 'code' }; }
  var lesson = String(p.lesson || ''), cls = String(p.cls || '');
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(진도시트);
  var rows = [];
  if (sh && sh.getLastRow() > 1) {
    sh.getRange(2, 1, sh.getLastRow() - 1, 진도헤더.length).getValues().forEach(function (r) {
      if (String(r[열['차시']]) !== lesson) return;
      if (cls && r[열['반']] !== cls) return;
      var memo = [];
      try { memo = JSON.parse(r[열['메모']] || '[]'); } catch (err) {}
      rows.push({
        cls: r[열['반']], no: String(r[열['학번']]), name: r[열['이름']],
        scr: r[열['현재화면']], seen: String(r[열['본화면']] || '').split(',').filter(String).map(Number),
        names: String(r[열['화면목록']] || '').split(' | '),
        qOk: r[열['퀴즈맞힘']], qDone: r[열['퀴즈푼수']], qTot: r[열['퀴즈전체']],
        memo: memo, leaves: r[열['창이탈횟수']], awaySec: r[열['창이탈초']], away: !!r[열['지금다른창']],
        idle: r[열['조작후초']],
        first: r[열['처음접속']] instanceof Date ? r[열['처음접속']].getTime() : 0,
        last: r[열['마지막신호']] instanceof Date ? r[열['마지막신호']].getTime() : 0,
        n: r[열['전송수']]
      });
    });
  }
  var roster = [];
  var rs = ss.getSheetByName('명단');
  if (rs && rs.getLastRow() > 1) {
    rs.getRange(2, 1, rs.getLastRow() - 1, 3).getValues().forEach(function (r) {
      var c = String(r[0]).trim(), no = String(r[1]).trim(), nm = String(r[2]).trim();
      if (!/^\d{4,5}$/.test(no) || !c) return;
      if (cls && c !== cls) return;
      roster.push({ cls: c, no: ('0' + no).slice(-5), name: nm });
    });
  }
  return { ok: true, now: Date.now(), rows: rows, roster: roster };
}

/* ══════════════════════════ 메뉴 ══════════════════════════ */

function onOpen() {
  SpreadsheetApp.getUi().createMenu('📈 진도 현황')
    .addItem('교사 코드 정하기', '교사코드정하기')
    .addItem('명단 시트 만들기', '명단시트만들기')
    .addItem('진도 시트 정렬 (차시·반·학번)', '진도정렬')
    .addItem('명단 고친 것 바로 반영', '명단새로읽기')
    .addSeparator()
    .addItem('새 학기 시작 (지난 기록 보관)', '새학기시작')
    .addToUi();
}

/** 지난 학기 「진도」·「명단」을 보관 탭으로 옮기고 빈 시트로 시작한다. 수집 주소는 그대로. */
function 새학기시작() {
  var ui = SpreadsheetApp.getUi();
  var r = ui.prompt('새 학기 시작',
    '지금 「진도」와 「명단」 탭을 보관 탭으로 옮깁니다. 보관 탭에 붙일 이름을 적어 주세요 (예: 지난학기, 1학기).',
    ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  var tag = r.getResponseText().trim().replace(/[^\w가-힣-]/g, '');
  if (!tag) { ui.alert('이름을 적어 주세요.'); return; }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    [진도시트, '명단'].forEach(function (n) {
      var sh = ss.getSheetByName(n);
      if (!sh) return;
      var nm = '보관_' + tag + '_' + n;
      if (ss.getSheetByName(nm)) throw new Error('「' + nm + '」 탭이 이미 있습니다. 다른 이름을 써 주세요.');
      sh.setName(nm);
    });
    시트_();
    var m = ss.insertSheet('명단');
    m.appendRow(['반', '학번', '이름']);
    m.setFrozenRows(1);
    m.getRange('A1:C1').setFontWeight('bold').setBackground('#e8eaf6');
    m.getRange('B:B').setNumberFormat('@');
    CacheService.getScriptCache().remove('roster');
  } finally {
    lock.releaseLock();
  }
  ui.alert('새 학기를 시작했습니다.\n\n「명단」 탭에 이번 학기 학생 명단(반 · 학번 · 이름)을 붙여넣어 주세요.');
}

function 명단새로읽기() {
  CacheService.getScriptCache().remove('roster');
  var n = Object.keys(명단맵_()).length;
  SpreadsheetApp.getUi().alert('명단 ' + n + '명을 다시 읽었습니다.');
}

function 교사코드정하기() {
  var ui = SpreadsheetApp.getUi();
  var r = ui.prompt('교사 코드 정하기',
    '진도 현황판을 열 때 넣을 코드입니다. 6자 이상, 학생이 짐작하기 어려운 것으로 정하세요.',
    ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  var c = r.getResponseText().trim();
  if (c.length < 6) { ui.alert('6자 이상으로 정해 주세요.'); return; }
  PropertiesService.getScriptProperties().setProperty('TEACHER_CODE', c);
  시트_();
  ui.alert('교사 코드를 저장했습니다.');
}

function 명단시트만들기() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  if (ss.getSheetByName('명단')) { ui.alert('「명단」 시트가 이미 있습니다.'); return; }
  var sh = ss.insertSheet('명단');
  sh.appendRow(['반', '학번', '이름']);
  sh.setFrozenRows(1);
  sh.getRange('A1:C1').setFontWeight('bold').setBackground('#e8eaf6');
  sh.getRange('B:B').setNumberFormat('@');
  ui.alert('「명단」 시트를 만들었습니다.\n\nA2 칸부터 반(인C/인F/인G) · 학번 · 이름 순으로 붙여넣어 주세요.\n' +
           '(질문폼 수집 시트의 「명단」과 같은 형식입니다)');
}

function 진도정렬() {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(진도시트);
  if (!sh || sh.getLastRow() < 3) return;
  sh.getRange(2, 1, sh.getLastRow() - 1, 진도헤더.length)
    .sort([{ column: 열['차시'] + 1 }, { column: 열['반'] + 1 }, { column: 열['학번'] + 1 }]);
}
