/* ===== 01 제작 소프트웨어 · 넷로고 ===== */
const MO_SW=[
  {ic:'🔷',n:'애니로직',d:'시뮬레이션 모델을 체험하거나 제작할 수 있는 소프트웨어 가운데 하나예요(자료 3). 이 단원의 실습에서는 쓰지 않아요.'},
  {ic:'🧱',n:'세이지모델러',d:'시뮬레이션 모델을 체험하거나 제작할 수 있는 소프트웨어 가운데 하나예요(자료 3). 이 단원의 실습에서는 쓰지 않아요.'},
  {ic:'🐍',n:'파이게임',d:'시뮬레이션 모델을 체험하거나 제작할 수 있는 소프트웨어 가운데 하나예요(자료 3). 이 단원의 실습에서는 쓰지 않아요.'},
  {ic:'🟧',n:'알고두',d:'시뮬레이션 모델을 체험하거나 제작할 수 있는 소프트웨어 가운데 하나예요(자료 3). 이 단원의 실습에서는 쓰지 않아요.'},
  {ic:'🐢',n:'넷로고',d:'<b>이 단원의 실습에 쓰는 소프트웨어</b>예요. 자연, 사회 현상을 시뮬레이션하는 데 유용하고 생태학, 사회학, 교육 분야에서 사용돼요. 오픈 소스로 무료이며, 다양한 시뮬레이션을 탐색하고 구현할 수 있어요.'},
];
tabs('moSwBtn','moSwView',MO_SW.map(s=>({ic:s.ic,n:s.n})),(it,i)=>`<h4>${MO_SW[i].n}</h4><p>${MO_SW[i].d}</p>`);

flipCards('moTipFlip',[
  {ic:'🎚️',f:'TIP · 파라미터',s:'눌러서 보기',b:'파라미터를 사용해 입력 데이터(조건)의 초기 상태를 지정할 수 있어요. 파라미터에서 설정한 수치 데이터가 전달되어 프로그램이 실행돼요.'},
  {ic:'⚠️',f:'주의 · [설정]을 먼저!',s:'눌러서 보기',b:'[설정] 버튼을 먼저 눌러야 [가다] 버튼이 활성화돼요.'},
  {ic:'🔢',f:'실행 순서',s:'눌러서 보기',b:'① 파라미터 설정하기 → ② [설정] 버튼 누르기 → ③ [가다] 버튼 누르기 순서로 해요.'},
]);

sorter('moStepSort',{
  cats:[{n:'1 모델 검색',k:'#8a4fc0'},{n:'2 화면 구성·기능 탐색',k:'#2f6fd0'},{n:'3 코드·모델 정보 확인',k:'#1f9d74'}],
  items:[
    {t:'웹 브라우저에서 바로 탐색할 수 있는 [NetLogo 웹으로 이동]을 선택한다',short:'NetLogo 웹으로 이동',c:0,ic:'🌐',w:'모델을 찾으러 가는 첫 단계예요.'},
    {t:'검색창에 「muscle」을 입력해 근육 발달 모델을 찾는다',short:'「muscle」 검색',c:0,ic:'🔍',w:'원하는 모델을 검색하는 일이라 모델 검색 단계예요.'},
    {t:'파라미터로 시뮬레이션하고 싶은 조건을 설정한다',short:'파라미터 설정',c:1,ic:'🎚️',w:'화면의 슬라이더로 조건을 정하는 일은 화면 구성 및 기능 탐색 단계예요.'},
    {t:'[설정] 버튼을 먼저 눌러 [가다] 버튼이 활성화되게 한다',short:'[설정] 버튼 누르기',c:1,ic:'🔘',w:'버튼 기능을 익히는 단계예요. [설정]을 먼저 눌러야 [가다]를 쓸 수 있어요.'},
    {t:'[가다] 버튼을 눌러 근육 발달 정도를 화면과 그래프로 확인한다',short:'[가다] 버튼 누르기',c:1,ic:'▶️',w:'실행해서 화면과 그래프를 확인하는 것도 화면 구성 및 기능 탐색 단계예요.'},
    {t:'[NetLogo 코드]를 눌러 모델이 어떻게 구현되었는지 확인한다',short:'[NetLogo 코드] 확인',c:2,ic:'💾',w:'코드를 보는 일은 코드 및 모델 정보 확인 단계예요.'},
    {t:'[모델 정보]를 눌러 그 모델에 대한 설명을 읽는다',short:'[모델 정보] 읽기',c:2,ic:'📄',w:'모델에 대한 설명을 보는 일도 코드 및 모델 정보 확인 단계예요.'},
  ],
  end:'<b>정리</b> 준비 학습은 <b>모델 검색 → 화면 구성 및 기능 탐색 → 코드 및 모델 정보 확인</b> 순서예요. 실행할 때는 [설정]을 먼저, 그다음 [가다]를 눌러요.'
});

/* ===== 02 근육 발달 화면 모형 (SVG) ===== */
const MO_ZONE=[
  {ic:'🎛️',n:'입력 데이터',d:'<b>입력 데이터(값 설정)</b> · 시뮬레이션하고 싶은 <b>조건을 정해 주는 곳</b>이에요. 슬라이더로 강도, 수면 시간, 운동 사이의 일, 느린 섬유 값을 고르고 <b>[설정]</b>을 먼저 누른 뒤 <b>[가다]</b>를 눌러요. 이렇게 값을 정하는 것이 파라미터 설정이고, 파라미터에서 정한 수치가 프로그램으로 전달돼요.'},
  {ic:'⏱️',n:'실행 횟수(틱)',d:'<b>실행 횟수(시간) 증가</b> · 「틱」은 시뮬레이션이 <b>몇 번 진행됐는지(시간)</b> 보여 줘요. 실행하는 동안 숫자가 늘어나요. 이 모형에서는 143이에요.'},
  {ic:'🟩',n:'출력 결과(화면)',d:'<b>출력 결과(화면)</b> · 크기가 달라지는 원은 <b>근육 섬유</b>를 나타내요. <b>녹색이 밝을수록</b> 근육 형성에 좋은 환경이고, <b>노란색이 밝을수록</b> 근육 파괴 가능성이 많은 환경이에요.'},
  {ic:'📈',n:'해석 도구(그래프)',d:'<b>해석 도구(그래프)</b> · 시간이 흐르면서 결과가 어떻게 변하는지 보여 줘서 <b>결과를 해석</b>하도록 도와줘요. 이 모형에는 Muscle Development(근육 발달)와 Hormones(호르몬) 그래프 두 개가 있어요.'},
];
const moZoneG=[];
(function(){
  const svg=$('moMuscle');
  el('rect',{x:0,y:0,width:360,height:396,rx:10,fill:'#f4f6f9'},svg);
  function zone(i,x,y,w,h){
    const g=el('g',{class:'zn',tabindex:'0',role:'button','aria-label':MO_ZONE[i].n},svg);
    el('rect',{class:'zr',x:x,y:y,width:w,height:h,rx:8},g);
    g.addEventListener('click',()=>moZonePick(i));
    g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();moZonePick(i);}});
    moZoneG.push(g); return g;
  }
  function badge(g,x,y,n){el('circle',{class:'bd',cx:x,cy:y,r:9},g); el('text',{class:'bn',x:x,y:y+4,'text-anchor':'middle'},g,String(n));}
  /* 1 입력 데이터 */
  let g=zone(0,6,28,166,208);
  el('rect',{x:14,y:38,width:70,height:24,rx:5,fill:'#cfe0f5',stroke:'#7aa2d6'},g);
  el('text',{class:'lb',x:49,y:54,'text-anchor':'middle'},g,'설정');
  el('rect',{x:92,y:38,width:70,height:24,rx:5,fill:'#cfe0f5',stroke:'#7aa2d6'},g);
  el('text',{class:'lb',x:127,y:54,'text-anchor':'middle'},g,'가다');
  [['운동 강도','95',.95],['수면 시간','8 시간',.67],['운동 사이의 일','5 날',.3],['느린 섬유','50',.5]].forEach((s,k)=>{
    const y0=76+k*40;
    el('text',{class:'lb',x:16,y:y0+10},g,s[0]);
    el('text',{class:'vl',x:162,y:y0+10},g,s[1]);
    el('rect',{x:16,y:y0+17,width:146,height:6,rx:3,fill:'#d5dbe3'},g);
    el('rect',{x:16,y:y0+17,width:146*s[2],height:6,rx:3,fill:'#4a90d9'},g);
    el('circle',{cx:16+146*s[2],cy:y0+20,r:6,fill:'#2f6fd0'},g);
  });
  badge(g,8,30,1);
  /* 2 틱 */
  g=zone(1,180,28,174,30);
  el('text',{x:267,y:49,'text-anchor':'middle',style:'font-size:14px;font-weight:800;fill:#33404f'},g,'틱: 143');
  badge(g,182,30,2);
  /* 3 출력 화면 */
  g=zone(2,180,64,174,172);
  el('rect',{x:184,y:68,width:166,height:164,rx:4,fill:'#58b36a'},g);
  const yel=new Set(['9,0','10,0','9,1','10,1','4,3','6,5','10,7','8,9','9,9','9,10','10,10']);
  let seed=7;
  const rnd=()=>{seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;};
  const cw=166/11, ch=164/11;
  for(let r=0;r<11;r++)for(let c=0;c<11;c++){
    const cx=184+(c+.5)*cw, cy=68+(r+.5)*ch;
    if(yel.has(c+','+r)) el('rect',{x:cx-cw/2+1,y:cy-ch/2+1,width:cw-2,height:ch-2,fill:'#f2d73b',opacity:.9},g);
    el('circle',{cx:cx,cy:cy,r:(1.6+rnd()*4.6).toFixed(1),fill:'#a31f1f'},g);
  }
  badge(g,182,66,3);
  /* 4 그래프 */
  g=zone(3,6,246,348,144);
  el('rect',{x:12,y:252,width:168,height:132,rx:4,fill:'#fff',stroke:'#cfd6df'},g);
  el('text',{class:'gt',x:96,y:268},g,'Muscle Development');
  el('path',{d:'M30 276 V358 H172',fill:'none',stroke:'#6b7685','stroke-width':1.2},g);
  el('path',{d:'M30 350 L172 326',fill:'none',stroke:'#d64535','stroke-width':2},g);
  el('text',{class:'gs',x:100,y:374,'text-anchor':'middle'},g,'Time');
  el('rect',{x:186,y:252,width:162,height:132,rx:4,fill:'#fff',stroke:'#cfd6df'},g);
  el('text',{class:'gt',x:267,y:268},g,'Hormones');
  el('path',{d:'M204 276 V350 H342',fill:'none',stroke:'#6b7685','stroke-width':1.2},g);
  let d='M204 340';
  for(let k=0;k<28;k++){const x=204+k*4.9, y=340-k*0.8-(k%7)*3.2; d+=` L${x.toFixed(1)} ${y.toFixed(1)}`;}
  el('path',{d:d,fill:'none',stroke:'#222','stroke-width':1.4},g);
  el('path',{d:'M204 346 H342',fill:'none',stroke:'#b9d34a','stroke-width':2},g);
  el('path',{d:'M204 369 H218',stroke:'#222','stroke-width':2},g); el('text',{class:'gs',x:222,y:372},g,'anabolic');
  el('path',{d:'M276 369 H290',stroke:'#b9d34a','stroke-width':2},g); el('text',{class:'gs',x:294,y:372},g,'catabolic');
  badge(g,8,248,4);
})();
function moZonePick(i){const b=document.querySelectorAll('#moZoneBtn button')[i]; if(b) b.click();}
tabs('moZoneBtn','moZoneView',MO_ZONE.map((z,i)=>({ic:z.ic,n:(i+1)+' '+z.n})),(it,i)=>{
  moZoneG.forEach((g,j)=>g.classList.toggle('on',j===i));
  return `<p>${MO_ZONE[i].d}</p>`;
});

/* ===== 02 숲 화재 흉내 ===== */
const MO_N=21, MO_MAXT=200, MO_COL=['#efe9dc','#3c9d4e','#f04e23','#7a746a'];
let moG=[], moG0=[], moTick=0, moBurned=0, moTrees0=0, moTimer=null;
const moCells=[];
function moMakeGrid(d,rnd){
  const g=[]; let trees=0;
  for(let y=0;y<MO_N;y++){g.push([]);for(let x=0;x<MO_N;x++){
    if(x===0) g[y].push(2);                       /* 왼쪽 끝 열은 모두 불 */
    else if(rnd()<d){g[y].push(1);trees++;} else g[y].push(0);
  }}
  return {g:g,trees:trees};
}
function moStepGrid(g){                           /* 한 틱: 불붙은 칸 → 상하좌우 나무에 옮겨 붙고, 탄 칸은 재 */
  const fires=[];
  for(let y=0;y<MO_N;y++)for(let x=0;x<MO_N;x++) if(g[y][x]===2) fires.push([x,y]);
  if(!fires.length) return -1;
  let n=0;
  fires.forEach(([x,y])=>{[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{
    const nx=x+dx, ny=y+dy;
    if(nx>=0&&nx<MO_N&&ny>=0&&ny<MO_N&&g[ny][nx]===1){g[ny][nx]=2;n++;}
  });});
  fires.forEach(([x,y])=>{g[y][x]=3;});
  return n;
}
function moHasFire(){return moG.some(r=>r.indexOf(2)>=0);}
function moDraw(){
  for(let y=0;y<MO_N;y++)for(let x=0;x<MO_N;x++) moCells[y*MO_N+x].setAttribute('fill',MO_COL[moG[y][x]]);
  $('moTick').textContent=moTick;
  $('moPct').textContent=moTrees0?(moBurned/moTrees0*100).toFixed(1):'0';
}
function moMsg(m){$('moState').textContent=m;}
function moReport(){
  if(!moHasFire()) moMsg(`불이 모두 꺼졌어요. ${moTick}틱 동안 나무의 ${$('moPct').textContent}%가 탔어요.`);
  else if(moTick>=MO_MAXT) moMsg('최대 틱(200)에서 멈췄어요.');
  else moMsg('');
}
function moStopAuto(){if(moTimer){clearInterval(moTimer);moTimer=null;} $('moAuto').disabled=false;}
function moStep(){
  if(moTick>=MO_MAXT||!moHasFire()) return false;
  const n=moStepGrid(moG); if(n<0) return false;
  moBurned+=n; moTick++; return true;
}
function moSetup(newForest){
  moStopAuto();
  if(newForest){const m=moMakeGrid(+$('moDen').value/100,Math.random); moG=m.g; moTrees0=m.trees; moG0=moG.map(r=>r.slice());}
  else moG=moG0.map(r=>r.slice());
  moTick=0; moBurned=0; moDraw();
  moMsg(newForest?'새 숲을 만들었어요. [한 틱]이나 [▶ 끝까지]를 눌러 봐요.':'같은 숲에서 다시 시작해요.');
}
(function(){
  const svg=$('moFire');
  for(let y=0;y<MO_N;y++)for(let x=0;x<MO_N;x++) moCells.push(el('rect',{x:x*14,y:y*14,width:13.2,height:13.2,rx:2,fill:MO_COL[0]},svg));
  $('moDen').addEventListener('input',()=>{$('moDenOut').textContent=$('moDen').value+'%';});
  $('moSet').onclick=()=>moSetup(true);
  $('moAgain').onclick=()=>moSetup(false);
  $('moOne').onclick=()=>{moStopAuto(); moStep(); moDraw(); moReport();};
  $('moTen').onclick=()=>{moStopAuto(); for(let k=0;k<10&&moStep();k++){} moDraw(); moReport();};
  $('moStop').onclick=()=>{moStopAuto(); moMsg('멈췄어요.');};
  $('moAuto').onclick=()=>{
    if(moTimer||moTick>=MO_MAXT||!moHasFire()){moReport();return;}
    $('moAuto').disabled=true;
    moTimer=setInterval(()=>{
      if(!pages[2].classList.contains('on')){moStopAuto();return;}   /* 화면을 떠나면 멈춤 */
      if(!moStep()){moStopAuto(); moReport(); return;}
      moDraw();
      if(!moHasFire()||moTick>=MO_MAXT){moStopAuto(); moReport();}
    },120);
  };
  moSetup(true);
})();
onShow[2]=()=>moStopAuto();

pyrun('moRun1',{code:`# 교과서는 넷로고로, 여기서는 같은 규칙을 파이썬으로 흉내 내요
import random
SIZE = 15
DENSITY = 0.6                  # 나무 밀도 (0.5, 0.6, 0.7로 바꿔 보기)
MAX_TICK = 100
# '.' 빈 땅, 'T' 나무, 'F' 불, 'x' 탄 자리
grid = [['T' if random.random() < DENSITY else '.' for x in range(SIZE)] for y in range(SIZE)]
fires = []
for y in range(SIZE):          # 왼쪽 끝 열에 불 붙이기
    grid[y][0] = 'F'
    fires.append((0, y))
total = sum(row.count('T') for row in grid)   # 불이 번지기 전 나무 수
burned = 0
tick = 0
for t in range(MAX_TICK):      # 정해진 횟수만 반복
    if not fires:
        break
    new_fires = []
    for (x, y) in fires:
        for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:    # 상하좌우
            nx, ny = x + dx, y + dy
            if 0 <= nx < SIZE and 0 <= ny < SIZE and grid[ny][nx] == 'T':
                grid[ny][nx] = 'F'
                new_fires.append((nx, ny))
                burned += 1
        grid[y][x] = 'x'       # 탄 자리는 재가 돼요
    fires = new_fires
    tick += 1
for row in grid:
    print(''.join(row))
print('틱', tick, '| 탄 나무', burned, '/', total, '=', round(burned * 100 / max(total, 1)), '%')
`});

/* ===== 03 실습 ===== */
sorter('moOrderSort',{
  cats:[{n:'① 운동 강도 조절',k:'#8a4fc0'},{n:'② 수면 시간 조절',k:'#2f6fd0'},{n:'③ 운동 사이 시간 조절',k:'#1f9d74'},{n:'④ 설정 누르고 실행',k:'#e0702b'}],
  items:[
    {t:'운동을 얼마나 세게 할지 값을 정한다',short:'운동의 세기 정하기',c:0,ic:'🏋️',w:'[운동 강도]의 값을 조절하는 일이라 ①이에요.'},
    {t:'하루에 잠을 몇 시간 잘지 값을 정한다',short:'잠자는 시간 정하기',c:1,ic:'😴',w:'[수면 시간]의 값을 조절하는 일이라 ②예요.'},
    {t:'운동과 운동 사이에 쉬는 시간을 정한다',short:'쉬는 시간 정하기',c:2,ic:'🛋️',w:'운동 사이 쉬는 시간인 [운동 사이 시간]의 값을 조절하는 일이라 ③이에요.'},
    {t:'값을 다 정한 뒤 설정을 누르고 시뮬레이션을 시작한다',short:'설정 누르고 시작',c:3,ic:'▶️',w:'설정을 누르고 시뮬레이션을 실행시키는 일이라 ④예요.'},
    {t:'슬라이더로 강도 값을 올리거나 내린다',short:'강도 슬라이더 움직이기',c:0,ic:'🎚️',w:'강도 값을 조절하는 것이라 ①이에요.'},
    {t:'수면 시간 슬라이더를 7~8시간 근처로 맞춘다',short:'수면 시간 슬라이더 맞추기',c:1,ic:'🌙',w:'수면 시간 값을 조절하는 것이라 ②예요.'},
    {t:'쉬는 날을 늘렸다 줄였다 하며 값을 바꿔 본다',short:'쉬는 날 값 바꾸기',c:2,ic:'📅',w:'운동 사이 시간 값을 조절하는 것이라 ③이에요.'},
    {t:'조건이 정해지면 결과를 보기 위해 실행 버튼을 누른다',short:'실행 버튼 누르기',c:3,ic:'🔘',w:'설정을 누르고 시뮬레이션을 실행시키는 마지막 단계라 ④예요.'},
  ],
  end:'<b>정리</b> 핵심 요소 세 가지(운동 강도·수면 시간·운동 사이 시간)의 값을 차례로 조절한 뒤, 설정을 누르고 시뮬레이션을 실행해요.'
});
flipCards('moCodeFlip',[
  {ic:'🐾',f:'breed [ muscle-fibers muscle-fiber ]',s:'눌러서 보기',b:'「근육 섬유」라는 이름의 개체 종류를 만들어요. muscle-fibers는 여러 개를, muscle-fiber는 하나를 가리킬 때 쓰는 이름이에요.'},
  {ic:'📦',f:'muscle-fibers-own [ … ]',s:'눌러서 보기',b:'근육 섬유마다 가지고 있는 값을 적는 곳이에요. 여기서는 fiber-size와 max-size를 가져요.',x:'주석: fiber-size는 넷로고에 이미 있는 size와 단위가 달라서 따로 이름을 붙였대요.'},
  {ic:'🟩',f:'patches-own [ … ]',s:'눌러서 보기',b:'바닥을 이루는 칸(패치) 하나하나가 가지고 있는 값을 적는 곳이에요.'},
  {ic:'🧪',f:'anabolic-hormone · catabolic-hormone',s:'눌러서 보기',b:'anabolic-hormone은 근육을 만드는(muscle building) 호르몬, catabolic-hormone은 근육을 분해하는(muscle breaking down) 호르몬이에요.',x:'135쪽 모델의 Hormones 그래프에도 anabolic과 catabolic이 나와요.'},
  {ic:'💬',f:';; 로 시작하는 글',s:'눌러서 보기',b:'설명을 적어 둔 주석이에요. 컴퓨터는 실행하지 않고, 코드를 읽는 사람을 위해 적어 둬요.'},
]);

/* 시나리오 점검기 */
(function(){
  const ks=['a','b','c'], names=['운동 강도','수면 시간','운동 사이 시간'];
  function upd(){
    const diff=[];
    ks.forEach((k,j)=>{
      const v1=+$('moS1'+k).value, v2=+$('moS2'+k).value;
      $('moV1'+k).textContent=v1; $('moV2'+k).textContent=v2;
      if(v1!==v2) diff.push(names[j]);
    });
    const box=$('moDiff'); box.className='mo-diff';
    if(diff.length===0){box.innerHTML='<b>다른 값: 0개</b> · 두 시나리오가 똑같아요. 하나만 다르게 바꿔 봐요.';}
    else if(diff.length===1){box.classList.add('good'); box.innerHTML=`<b>다른 값: 1개</b> (${diff[0]}) · 한 가지만 다르게 했어요. 결과가 달라진다면 <b>${diff[0]}</b>이(가) 준 영향이라고 보기 쉬워요.`;}
    else{box.classList.add('warn'); box.innerHTML=`<b>다른 값: ${diff.length}개</b> (${diff.join(', ')}) · 여러 값이 한꺼번에 달라요. 결과가 달라져도 어느 요소 때문인지 알기 어려워요. 한 가지만 다르게 해 봐요.`;}
  }
  ['1','2'].forEach(s=>ks.forEach(k=>$('moS'+s+k).addEventListener('input',upd)));
  upd();
})();

/* ===== 04 성취도 점검 ===== */
vote('moAch1','moAch1Sel',[['예'],['아니요']]);
vote('moAch2','moAch2Sel',[['예'],['아니요']]);
vote('moAch3','moAch3Sel',[['예'],['아니요']]);
vote('moAch4','moAch4Sel',[['예'],['아니요']]);
vote('moAch5','moAch5Sel',[['예'],['아니요']]);

/* ===== 05 전문가 인터뷰 ===== */
const MO_INT=[
  {ic:'🛠️',n:'하는 일',t:'시뮬레이션 전문가로서 하는 일은 무엇인가요?',a:'도시 사회에서 발생하는 문제를 해결하기 위한 <b>정책을 보다 과학적으로 세울 수 있도록 지원하는 기술</b>을 개발해요. 예를 들면 세종특별자치시의 교통 및 복지 문제를 해결하기 위해 현황을 빠르게 파악할 수 있는 <b>가상 시뮬레이션 기반의 디지털 트윈 기술</b>을 개발했어요. 이 기술은 광역 급행 버스 노선 신설, 교량 신설 위치 분석, 공영 자전거 운영 개선 등 실제 정책을 세울 때 활용되었어요.'},
  {ic:'⚖️',n:'장점과 힘든 점',t:'일을 하며 느끼는 직업의 장단점은 무엇인가요?',a:'<b>장점</b>은 새로운 연구를 수행하면서 실제 도시 사회의 문제를 기술적으로 해결해 보람을 느낄 수 있다는 점이에요. <b>힘든 점</b>은 다양한 데이터를 찾고 모으는 데 많은 노력이 필요하다는 점이에요. 이 부분은 연구자, 정책가, 데이터 보유자들의 노력으로 차츰 나아질 것이라고 기대한대요.'},
  {ic:'🎓',n:'필요한 지식·역량',t:'이 분야로 진출하려면 어떤 지식과 역량이 필요한가요?',a:'가장 많이 활용하는 기술 분야는 <b>데이터 처리, 데이터베이스, 가상 시뮬레이션(모델링 및 시뮬레이션), 공간 정보</b>예요. 전공으로는 컴퓨터 공학, 산업 공학, 정보 통신 공학 같은 정보 통신 기술 관련 학문 지식이 필요해요. 또 도시 사회 문제를 해결하기 위해 교통 공학, 행정, 복지 등 사회·과학 분야와 <b>융합하거나 협력할 수 있는 역량과 자세</b>가 있으면 좋다고 해요.'},
  {ic:'🔭',n:'미래 전망',t:'미래 전망은 어떤가요?',a:'도시 사회에서는 인구, 고령화, 교통, 교육, 주거, 환경 등 여러 분야에서 문제가 생기고, 분야들 사이의 연관성도 높아지고 있어요. 그래서 정책을 세우는 일이 갈수록 더 복잡해질 것으로 보여요. 이를 지원하는 기술적인 지원이 더 필요할 것이므로 미래 전망은 <b>밝은 편</b>이라고 생각한대요.'},
];
tabs('moIntBtn','moIntView',MO_INT.map(q=>({ic:q.ic,n:q.n})),(it,i)=>`<h4>${MO_INT[i].t}</h4><p>${MO_INT[i].a}</p>`);

/* ===== 06 마무리 ===== */
const MEMOLIST=[['moPlan','나의 계획 · 운동에 필요한 조건'],['moObs','화면과 그래프의 달라짐 관찰'],['moFireNote','숲 화재 흉내 · 밀도와 탄 나무 비율'],['moFScreen','화재 모델 · 화면 구성'],['moFGoal','화재 모델 · 목적'],['moFFunc','화재 모델 · 구현 기능'],['moMField','심화 · 관심 분야 모델'],['moMScreen','심화 · 화면 구성'],['moMGoal','심화 · 목적'],['moMFunc','심화 · 구현 기능'],['moSc1','시나리오 1 · 조건과 결과'],['moSc2','시나리오 2 · 조건과 결과'],['moBest','심화 · 가장 잘 이루어지는 값'],['moField','모델 구상 1 · 관심 분야'],['moWhy','모델 구상 1 · 시뮬레이션이 필요한 이유'],['moScreen','모델 구상 2 · 화면 구성'],['moFunc','모델 구상 2 · 구현 기능'],['moHelp','모델 구상 3 · 활용'],['moRole','모델 구상 4 · 미래 사회의 역할'],['moAch1Sel','성취도 점검 1'],['moAch2Sel','성취도 점검 2'],['moAch3Sel','성취도 점검 3'],['moAch4Sel','성취도 점검 4'],['moAch5Sel','성취도 점검 5'],['moInt','인터뷰 · 흥미로운 점과 역량'],['keyQ','오늘의 질문에 대한 내 답']];
onShow[6]=()=>memoSummary('msum',MEMOLIST);
