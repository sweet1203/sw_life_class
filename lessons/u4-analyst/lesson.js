/* u4-analyst 전용 (an-) — 공용 부품 pyrun · sorter · tabs · flipCards · vote · chips 사용 */

/* ---------- 01 코드 6덩어리 (교과서 150~151쪽 코드 그대로) ---------- */
const AN_CODE=[
 {ic:'1️⃣',n:'setup',k:'#8a4fc0',t:'① setup · 처음 상태 만들기',
  say:'[set up] 버튼을 누르면 초기화되고, number만큼 사람들이 나타나요(사람들의 속성 정의: 모양, 색).',
  pc:'[set up] 버튼을 누르면\n  화면 초기화\n  시간 초기화\n  number값만큼 humans 생성\n  [\n    xy 좌표 랜덤 정하기\n    humans 모양 정하기\n    humans 색 정하기\n  ]',
  code:'to setup\n  clear-all\n  reset-ticks\n  create-humans number\n  [\n    setxy random-xcor random-ycor\n    set shape "person"\n    set color gray\n  ]\nend'},
 {ic:'2️⃣',n:'joy',k:'#c98a0a',t:'② joy · 즐거움 퍼뜨리기',
  say:'시뮬레이션 도중 [즐거움] 버튼을 누르면 human 중 한 사람이 노란색(즐거움)으로 바뀌어요.',
  pc:'[즐거움] 버튼을 누르면\n  humans 에게 요청\n  [\n    human 1명의 색은 노란색\n  ]',
  code:'to joy\n  ask one-of humans [set color yellow]\nend'},
 {ic:'3️⃣',n:'me',k:'#2f6fd0',t:'③ me · 내가 나타나기',
  say:'[나] 버튼을 누르면 화면에 내가 나타나요(나의 속성 정의: 모양, 크기, 색).',
  pc:'[나] 버튼을 누르면\n  users 1명 생성\n  [\n    나의 모양 정하기\n    나의 크기 정하기\n    나의 색 정하기\n  ]',
  code:'to me\n  create-users 1\n  [\n    set shape "person"\n    set size 3\n    set color gray\n  ]\nend',
  x:'<b>참고</b> 다른 사람들의 크기는 1이에요. ‘나’의 크기를 3으로 정해서 더 크게 보여요. 152쪽 해 보기에서 이 숫자를 바꿔 봐요.'},
 {ic:'4️⃣',n:'thanks',k:'#d64535',t:'④ thanks · 고마움 주기',
  say:'[고마움] 버튼을 누르면 나의 색이 빨간색으로 바뀌어요.',
  pc:'[고마움] 버튼을 누르면\n  users에게 요청\n  [\n    나의 색을\n    빨간색으로 바꾸기\n  ]',
  code:'to thanks\n  ask users\n  [\n    set color red\n  ]\nend'},
 {ic:'5️⃣',n:'move',k:'#1f9d74',t:'⑤ move · 나 움직이기',
  say:'네 개 방향의 버튼을 누르면 위, 아래, 왼쪽, 오른쪽으로 ‘나’ 터틀이 움직여요.',
  pc:'[위][아래][왼쪽][오른쪽] 버튼을 클릭하거나\nW, S, A, D 버튼을 누르면 나(users) 터틀이\n네 방향으로 움직임.',
  code:'to move [new-heading]\n  ask users\n  [\n    set heading new-heading\n    fd 2\n  ]\nend',
  x:'<b>참고</b> 방향 버튼마다 move 뒤에 방향 값을 넣어요. [위]는 move 0, [오른쪽]은 move 90, [아래]는 move 180, [왼쪽]은 move 270이에요(146~149쪽 버튼 설정).'},
 {ic:'6️⃣',n:'go',k:'#e0702b',t:'⑥ go · 사람들 움직이고 감정 주고받기',
  say:'[go] 버튼을 누르면 패치에서 사람들이 무작위로 움직여요. 모든 터틀은 노란색(빨간색) 터틀을 만나면 자신의 색을 노란색(빨간색)으로 바꾸고 tick값을 1 증가시켜요(행동 규칙). 결과는 플롯과 모니터로 확인해요.',
  pc:'[go] 버튼을 누르면\n  human 랜덤 움직임\n  모든 터틀에게 요청\n  [\n    만약 노란색 터틀을 만나면\n      나의 색을 노란색으로 정하기\n    만약 빨간색 터틀을 만나면\n      나의 색을 빨간색으로 정하기\n  ]\n  tick 값 1 증가',
  code:'to go\n  ask humans\n  [\n    forward random 5\n  ]\n  ask turtles\n  [\n    if any? other turtles-here with [color = yellow]\n    [set color yellow]\n    if any? other turtles-here with [color = red]\n    [set color red]\n  ]\n  tick\nend',
  x:'<b>해 보기</b> 145쪽 해 보기에서 받고 싶은 감정, 주고 싶은 감정을 어떤 색으로 적었나요? 코드의 yellow와 red를 다른 색으로 바꾸어 보세요!'},
];
tabs('anTabBtn','anTabView',AN_CODE.map(c=>({ic:c.ic,n:c.n})),(it,i)=>{
  const c=AN_CODE[i];
  return '<div class="an-tw" style="--k:'+c.k+'"><b class="an-tt">'+c.t+'</b><p>'+c.say+'</p><h5>의사 코드 (우리말로 풀어 쓴 순서)</h5><div class="an-pc">'+esc(c.pc)+'</div><h5>넷로고 코드</h5><pre class="code">'+esc(c.code)+'</pre>'+(c.x?'<div class="an-ex">'+c.x+'</div>':'')+'</div>';
});

/* 01 어느 코드의 일일까? (분류) */
sorter('anSortGame',{
  cats:[{n:'setup',k:'#8a4fc0'},{n:'joy',k:'#c98a0a'},{n:'me',k:'#2f6fd0'},{n:'thanks',k:'#d64535'},{n:'move',k:'#1f9d74'},{n:'go',k:'#e0702b'}],
  items:[
    {t:'화면과 시간을 초기화하고, number만큼 회색 사람들을 만든다',short:'화면·시간 초기화, 사람 만들기',c:0,ic:'🧹',w:'처음 상태를 만드는 일은 setup이에요.'},
    {t:'사람들 가운데 한 명을 노란색으로 바꾼다',short:'한 명을 노란색으로',c:1,ic:'😄',w:'one-of humans로 한 사람을 골라 노란색으로 바꾸는 것은 joy예요.'},
    {t:'화면에 크기가 정해진 회색 ‘나’가 나타난다',short:'‘나’ 나타나기',c:2,ic:'🙋',w:'users 1명을 만들고 모양·크기·색을 정하는 것은 me예요.'},
    {t:'‘나’의 색이 빨간색으로 바뀐다',short:'나의 색 빨강',c:3,ic:'🙏',w:'users에게 빨간색을 정해 주는 것은 thanks예요.'},
    {t:'‘나’가 정해진 방향으로 두 칸 움직인다',short:'나 두 칸 이동',c:4,ic:'🧭',w:'heading을 정하고 fd 2로 가는 것은 move예요.'},
    {t:'W, A, S, D 키로도 누를 수 있다',short:'W A S D 키',c:4,ic:'⌨️',w:'위·왼쪽·아래·오른쪽 버튼은 move 코드를 방향 값만 바꿔 실행해요.'},
    {t:'사람들이 무작위로 움직이고, 만난 색으로 바뀌고, tick이 1 늘어난다',short:'움직임·색 바뀜·tick',c:5,ic:'🏃',w:'매 틱마다 해야 하는 일을 모아 둔 것은 go예요.'},
    {t:'number 값에 따라 처음 나타나는 사람 수가 정해진다',short:'number만큼 사람 생성',c:0,ic:'🔢',w:'create-humans number가 들어 있는 setup에서 사람 수가 정해져요.'},
    {t:'시뮬레이션 도중에도 눌러서 새 감정을 퍼뜨릴 수 있다',short:'도중에 감정 심기',c:1,ic:'💬',w:'joy는 시뮬레이션 도중에도 누를 수 있어요.'},
  ],
  end:'<b>정리</b> setup(처음) → joy·me·thanks·move(내가 누르는 버튼) → go(매 틱 반복)로 기억하면 좋아요.'
});

/* ---------- 02 내가 정한 값 ---------- */
chips('anSizeChips','anSize',['1','2','3','4','5'],false);
chips('anSpeedChips','anSpeed',['3','5','7'],false);

/* ---------- 03 감정 전염 시뮬레이션 (교과서 넷로고 코드의 규칙을 흉내) ---------- */
const AN_S=33, AN_MAX=300, AN_COL={gray:'#9a9a9a',yellow:'#f6c915',red:'#e5412d'};
let anPpl=[], anT=0, anHist=[], anTimer=null, anAcc=1, anSlow=false, anNum0=10, anFlag={}, anRows=[];
const anSpeed=()=>{const v=+MEMO.anSpeed; return v===3||v===5||v===7?v:5;};
const anSize=()=>{const v=+MEMO.anSize; return v>=1&&v<=5?v:3;};
const anWrap=v=>(((v+AN_S/2)%AN_S)+AN_S)%AN_S-AN_S/2;
const anPx=v=>Math.min(AN_S-1,Math.max(0,Math.floor(v+AN_S/2)));
const anCnt=c=>anPpl.filter(p=>p.c===c).length;
const anMsg=t=>{$('anMsg').textContent=t;};
const anAllSame=()=>anPpl.length>0&&anPpl[0].c!=='gray'&&anPpl.every(p=>p.c===anPpl[0].c);

/* 화면을 떠나면 자동 실행을 멈춰요 */
function anWatchLeave(el,stop){
  const sec=el.closest('.page');
  new MutationObserver(()=>{if(!sec.classList.contains('on')) stop();}).observe(sec,{attributes:true,attributeFilter:['class']});
}

function anDrawWorld(){
  let g='<rect width="330" height="330" fill="#000"/>';
  [...anPpl].sort((a,b)=>(a.u?1:0)-(b.u?1:0)).forEach(p=>{
    const k=1.15*(p.u?p.s:1), cx=(p.x+AN_S/2)*10, cy=(AN_S/2-p.y)*10;
    g+='<g transform="translate('+(cx-5*k).toFixed(1)+','+(cy-5*k).toFixed(1)+') scale('+k.toFixed(2)+')" fill="'+AN_COL[p.c]+'"><circle cx="5" cy="2.3" r="1.8"/><rect x="2.8" y="4.3" width="4.4" height="5.2" rx="1.6"/></g>';
  });
  $('anWorld').innerHTML=g;
}
function anDrawPlot(){
  const W=360,H=170,L=34,R=10,T=8,B=26, xm=Math.max(50,Math.ceil(anT/50)*50), ym=Math.max(10,Math.ceil(anPpl.length/10)*10);
  const X=t=>L+t/xm*(W-L-R), Y=v=>T+(H-T-B)*(1-v/ym);
  let g='';
  [0,ym/2,ym].forEach(v=>{g+='<line x1="'+L+'" y1="'+Y(v)+'" x2="'+(W-R)+'" y2="'+Y(v)+'" stroke="#e6e3dc"/><text x="'+(L-4)+'" y="'+(Y(v)+3)+'" text-anchor="end">'+v+'</text>';});
  [0,xm/2,xm].forEach(t=>{g+='<text x="'+X(t)+'" y="'+(H-12)+'" text-anchor="middle">'+t+'</text>';});
  g+='<text x="'+((L+W-R)/2)+'" y="'+(H-2)+'" text-anchor="middle">틱</text>';
  g+='<path d="M'+L+' '+T+'V'+(H-B)+'H'+(W-R)+'" fill="none" stroke="#16202c" stroke-width="1.2"/>';
  [[0,'#e6b800'],[1,'#e5412d']].forEach(([k,col])=>{
    if(anHist.length>0) g+='<polyline fill="none" stroke="'+col+'" stroke-width="2" points="'+anHist.map((h,i)=>X(i).toFixed(1)+','+Y(h[k]).toFixed(1)).join(' ')+'"/>';
  });
  $('anPlot').setAttribute('viewBox','0 0 '+W+' '+H); $('anPlot').innerHTML=g;
}
function anRender(){
  anDrawWorld(); anDrawPlot();
  $('anMonT').textContent=anT; $('anMonY').textContent=anCnt('yellow'); $('anMonR').textContent=anCnt('red');
  anGuide();
}
function anSync(){anHist[anT]=[anCnt('yellow'),anCnt('red')];}

function anSetup(){
  anStop();
  anNum0=+$('anNum').value; anT=0; anHist=[]; anPpl=[];
  for(let i=0;i<anNum0;i++) anPpl.push({x:AN_S*(Math.random()-.5),y:AN_S*(Math.random()-.5),h:Math.random()*360,c:'gray',u:false,s:1});
  anFlag={num:1,setup:1}; anSync(); anRender();
  anMsg(anNum0+'명이 나타났어요. [즐거움]을 눌러 감정을 하나 심고, [go]로 실행해 봐요.');
}
function anJoy(){
  const hs=anPpl.filter(p=>!p.u);
  if(!hs.length){anMsg('먼저 [set up]을 눌러 사람들이 나타나게 해요.'); return;}
  hs[Math.floor(Math.random()*hs.length)].c='yellow';
  anFlag.joy=1; anSync(); anRender(); anMsg('한 사람이 노란색(즐거움)이 되었어요.');
}
function anMe(){
  if(!anPpl.length&&!anFlag.setup){anMsg('먼저 [set up]을 눌러요.'); return;}
  if(anPpl.filter(p=>p.u).length>=5){anMsg('‘나’는 다섯 명까지만 만들 수 있어요.'); return;}
  anPpl.push({x:0,y:0,h:Math.random()*360,c:'gray',u:true,s:anSize()});
  anFlag.me=1; anSync(); anRender(); anMsg('‘나’가 한가운데에 나타났어요(크기 '+anSize()+'). 방향 버튼이나 W A S D 키로 움직여 봐요.');
}
function anThanks(){
  const us=anPpl.filter(p=>p.u);
  if(!us.length){anMsg('먼저 [나] 버튼으로 ‘나’를 만들어요.'); return;}
  us.forEach(p=>p.c='red'); anFlag.thanks=1; anSync(); anRender(); anMsg('‘나’가 빨간색(고마움)이 되었어요.');
}
function anMove(h){
  const us=anPpl.filter(p=>p.u);
  if(!us.length){anMsg('먼저 [나] 버튼으로 ‘나’를 만들어요.'); return;}
  us.forEach(p=>{p.h=h; const r=h*Math.PI/180; p.x=anWrap(p.x+2*Math.sin(r)); p.y=anWrap(p.y+2*Math.cos(r));});
  anDrawWorld();
}
function anTick(){
  const sp=anSpeed();
  anPpl.forEach(p=>{if(!p.u){const d=Math.floor(Math.random()*sp), r=p.h*Math.PI/180; p.x=anWrap(p.x+d*Math.sin(r)); p.y=anWrap(p.y+d*Math.cos(r));}});
  shuffle(anPpl).forEach(p=>{
    const here=anPpl.filter(q=>q!==p&&anPx(q.x)===anPx(p.x)&&anPx(q.y)===anPx(p.y));
    if(here.some(q=>q.c==='yellow')&&(anAcc>=1||Math.random()<anAcc)) p.c='yellow';
    if(here.some(q=>q.c==='red')) p.c='red';
  });
  anT++; anSync();
}
function anGo(n){
  if(!anFlag.setup){anMsg('먼저 [set up]을 눌러요.'); return;}
  anStop();
  if(anT>=AN_MAX){anMsg('최대 '+AN_MAX+'틱까지만 실행해요. [set up]으로 처음부터 다시 해 봐요.'); return;}
  for(let i=0;i<n&&anT<AN_MAX;i++) anTick();
  anFlag.go=1; anRender();
  anMsg(anAllSame()?'모두 같은 색이 되었어요! ('+anT+'틱)':anT+'틱이 지났어요.');
}
function anAuto(){
  if(!anFlag.setup){anMsg('먼저 [set up]을 눌러요.'); return;}
  if(anTimer) return;
  if(anT>=AN_MAX){anMsg('최대 '+AN_MAX+'틱까지만 실행해요. [set up]으로 처음부터 다시 해 봐요.'); return;}
  anFlag.go=1; $('anAuto').textContent='실행 중…'; anMsg('자동으로 실행 중이에요. 멈추려면 [멈춤]을 눌러요.');
  anTimer=setInterval(()=>{
    anTick(); anRender();
    if(anAllSame()) anStop('모두 같은 색이 되어 멈췄어요! ('+anT+'틱)');
    else if(anT>=AN_MAX) anStop('최대 '+AN_MAX+'틱에서 멈췄어요.');
  },anSlow?330:110);
}
function anStop(msg){
  if(anTimer){clearInterval(anTimer); anTimer=null;}
  $('anAuto').textContent='▶ 자동'; if(msg) anMsg(msg);
}
anWatchLeave($('anWorld'),()=>anStop());

/* 실행 순서 안내 (누른 단계는 ✓) */
function anGuide(){
  const f=anFlag, N=['①','②','③','④','⑤','⑥'];
  const S=[
    ['1. 한 가지 감정 확산 관찰하기',[['슬라이더 number값 설정',f.num],['[set up] 버튼 클릭',f.setup],['[즐거움] 버튼 클릭',f.joy],['[go] 버튼 클릭',f.go]]],
    ['2. 두 가지 감정 확산 관찰하기',[['슬라이더 number값 설정',f.num],['[set up] 버튼 클릭',f.setup],['[즐거움] 버튼 클릭',f.joy],['[나] 버튼 클릭',f.me],['[고마움] 버튼 클릭',f.thanks],['[go] 버튼 클릭',f.go]]]];
  $('anGuide').innerHTML=S.map(s=>'<div><b>'+s[0]+'</b><ol>'+s[1].map((x,i)=>'<li class="'+(x[1]?'ok':'')+'">'+N[i]+' '+x[0]+'</li>').join('')+'</ol></div>').join('');
}

/* 버튼 연결 */
$('anNum').oninput=()=>{$('anNumV').textContent=$('anNum').value; anFlag.num=1; anGuide();};
$('anSetup').onclick=anSetup; $('anJoy').onclick=anJoy; $('anMe').onclick=anMe; $('anThanks').onclick=anThanks;
$('anUp').onclick=()=>anMove(0); $('anRight').onclick=()=>anMove(90); $('anDown').onclick=()=>anMove(180); $('anLeft').onclick=()=>anMove(270);
$('anGo1').onclick=()=>anGo(1); $('anGo10').onclick=()=>anGo(10); $('anAuto').onclick=anAuto; $('anStop').onclick=()=>anStop('멈췄어요.');
document.addEventListener('keydown',e=>{
  if(!$('anWorld').closest('.page').classList.contains('on')) return;
  if(e.target.matches&&e.target.matches('input,select,textarea')) return;
  if(e.ctrlKey||e.metaKey||e.altKey) return;
  const h={w:0,d:90,s:180,a:270}[(e.key||'').toLowerCase()];
  if(h==null) return;
  e.preventDefault(); anMove(h);
});
/* 선택 버튼(자동 속도 · 수용 정도) */
function anSeg(box,labels,start,pick){
  const B=$(box); B.innerHTML=labels.map((t,i)=>'<button type="button">'+t+'</button>').join('');
  const bs=[...B.querySelectorAll('button')];
  const set=i=>{bs.forEach((b,j)=>b.classList.toggle('on',j===i)); pick(i);};
  bs.forEach((b,i)=>b.onclick=()=>set(i)); set(start);
}
anSeg('anSpeedSeg',['자동 실행 보통','자동 실행 느리게'],0,i=>{anSlow=i===1; if(anTimer){anStop(); anAuto();}});
anSeg('anAccSeg',['100%','30%'],0,i=>{anAcc=i===0?1:.3;});
$('anSpeedChips').addEventListener('memo',()=>{$('anSpdShow').textContent=anSpeed()-1;});
$('anSpdShow').textContent=anSpeed()-1;

/* 실행 기록표 */
$('anRec').onclick=()=>{
  if(!anFlag.setup){anMsg('먼저 실행한 뒤에 기록해요.'); return;}
  anRows.push([anNum0,anAcc>=1?'100%':'30%',anT,anCnt('yellow'),anCnt('red'),anAllSame()?'예':'아니요']);
  if(anRows.length>8) anRows.shift();
  $('anRecTb').innerHTML='<tr><th>number</th><th>수용 정도</th><th>틱</th><th>노랑</th><th>빨강</th><th>모두 같은 색?</th></tr>'+anRows.map(r=>'<tr>'+r.map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('');
};
anRender(); anMsg('[set up]을 눌러 사람들이 나타나게 해요.');

/* 03 pyrun ① 사람 수 비교 */
pyrun('anRun1',{rows:30,code:`# 교과서는 넷로고로, 여기서는 같은 규칙을 파이썬으로 흉내 내요
import random, math
SIZE = 33        # 세상 크기: 33 x 33 패치 (가장자리는 반대편과 이어져요)
NUMBER = 10      # 사람 수 (10과 100으로 바꿔 비교해 보세요)
TICKS = 300      # 최대 틱

half = SIZE / 2
people = []      # 한 사람 = [x, y, 방향, 색]
for i in range(NUMBER):                      # [set up]
    people.append([random.uniform(-half, half), random.uniform(-half, half), random.uniform(0, 360), 'gray'])
random.choice(people)[3] = 'yellow'          # [즐거움]: 한 명이 노란색

def patch(p):                                # 사람이 서 있는 패치
    return (min(SIZE - 1, int(p[0] + half)), min(SIZE - 1, int(p[1] + half)))

done = None
for tick in range(1, TICKS + 1):             # [go]를 TICKS번 누른 것과 같아요
    for p in people:                         # forward random 5: 자기 방향으로 0~4칸
        d = random.randrange(5)
        p[0] = (p[0] + d * math.sin(math.radians(p[2])) + half) % SIZE - half
        p[1] = (p[1] + d * math.cos(math.radians(p[2])) + half) % SIZE - half
    yellow = {patch(p) for p in people if p[3] == 'yellow'}
    random.shuffle(people)                   # 한 명씩 무작위 순서로 색을 확인해요
    for p in people:                         # 노란 사람과 같은 패치에 있으면 노란색
        if p[3] != 'yellow' and patch(p) in yellow:
            p[3] = 'yellow'
            yellow.add(patch(p))
    n = sum(1 for p in people if p[3] == 'yellow')
    if tick % 30 == 0:
        print(tick, '틱 · 노란 사람', n, '/', NUMBER)
    if n == NUMBER:
        done = tick
        break
print('모두 노란색이 된 틱 :', done if done else '300틱 안에는 아직 안 됐어요')
`});

/* 03 pyrun ② 수용 정도 */
pyrun('anRun2',{rows:28,code:`# 교과서는 넷로고로, 여기서는 같은 규칙을 파이썬으로 흉내 내요
import random, math
SIZE = 33
NUMBER = 100          # 사람 수
TICKS = 300           # 최대 틱

def run(accept):      # accept: 노란색을 받아들일 확률 (1.0 = 100%, 0.3 = 30%)
    half = SIZE / 2
    people = [[random.uniform(-half, half), random.uniform(-half, half), random.uniform(0, 360), 'gray'] for i in range(NUMBER)]
    people[0][3] = 'yellow'
    for tick in range(1, TICKS + 1):
        for p in people:
            d = random.randrange(5)
            p[0] = (p[0] + d * math.sin(math.radians(p[2])) + half) % SIZE - half
            p[1] = (p[1] + d * math.cos(math.radians(p[2])) + half) % SIZE - half
        yellow = {(min(SIZE - 1, int(p[0] + half)), min(SIZE - 1, int(p[1] + half))) for p in people if p[3] == 'yellow'}
        random.shuffle(people)
        for p in people:
            here = (min(SIZE - 1, int(p[0] + half)), min(SIZE - 1, int(p[1] + half)))
            if p[3] != 'yellow' and here in yellow and random.random() < accept:   # and random-float 1 < 0.3
                p[3] = 'yellow'
                yellow.add(here)
        if all(p[3] == 'yellow' for p in people):
            return tick
    return None

for accept in [1.0, 0.3]:
    tick = run(accept)
    print('수용 정도', int(accept * 100), '% →', str(tick) + '틱' if tick else '300틱 안에는 모두 노란색이 되지 않았어요')
`});

/* ---------- 04 성취도 점검 ---------- */
chips('anCheck','anCheckPick',['시뮬레이션 모델의 개념과 구현 단계를 설명할 수 있다','현상의 원리를 시뮬레이션 모델로 표현할 수 있다','시뮬레이션 모델의 화면과 기능을 계획할 수 있다','시뮬레이션 프로그램을 활용해 시뮬레이션 모델을 구현할 수 있다','소프트웨어를 활용해 현실 세계 모델링에 도전해 볼 수 있다'],true);

/* ---------- 05 교과 융합 진로 탐색 ---------- */
const AN_JOBS=[
 {ic:'🎮',n:'시뮬레이션 게임 기획자',b:'게임 제작을 위한 아이디어, 스토리, 캐릭터를 설정해 흥미로운 게임을 기획해요. 문화 산업 분야는 경기에 민감하지만, 전 세계적으로 게임 산업은 커지고 있는 추세예요.',c:['창의력','예술적 감수성','상상력','협업 능력']},
 {ic:'💻',n:'시뮬레이션 개발자',b:'다양한 분야에서 사용되는 시뮬레이션 프로그램을 개발하고 유지·보수해요. 시뮬레이션 기술이 여러 산업 분야에 적용되고 있어 직업 전망이 밝은 편이에요.',c:['문제 해결 능력','자동화 능력','협업 능력']},
 {ic:'🏙️',n:'디지털 트윈 전문가',b:'실제 사물과 환경을 디지털 공간에 똑같이 구현하는 디지털 트윈 기술을 활용해 시뮬레이션해요. 산업 혁신을 위한 핵심 기술로 주목받아 미래 유망 분야로 꼽혀요.',c:['디지털 기술 활용 능력','문제 해결 능력','분석력']},
 {ic:'🔎',n:'사회 현상 분석가',b:'인간의 행동, 사회적 상호 작용 등을 연구하고 사회적 문제에 대한 해결 방법과 정책적 대안을 탐색해요. 급변하는 사회에서 미래를 예측하고 준비하기 위한 연구는 활발해질 것이라 전망이 밝은 편이에요.',c:['논리적 분석력','문제 해결력','창의력']},
];
flipCards('anJobFlip',AN_JOBS.map(j=>({ic:j.ic,f:j.n,b:j.b,x:'<b>필요 역량</b> '+j.c.join(' · ')})));
vote('anJobVote','anJob',AN_JOBS.map(j=>[j.ic+' '+j.n]),i=>{
  $('anJobRes').innerHTML='<b>'+AN_JOBS[i].n+'</b>에는 <b>'+AN_JOBS[i].c.join(', ')+'</b>이(가) 필요해요. 이 가운데 지금의 나에게 가장 필요한 것은 무엇일까요?';
});

/* ---------- 06 마무리 ---------- */
const MEMOLIST=[['planMemo','나의 계획 · 사람이 많을 때와 적을 때'],['anSize','02 · 내가 고른 나의 크기'],['anSpeed','02 · 내가 고른 사람들의 속도'],['anFeelRecv','02 · 받고 싶은 감정의 이름과 색'],['anFeelGive','02 · 주고 싶은 감정의 이름과 색'],['anWhyVal','02 · 크기와 속도를 정한 까닭'],['anG10','03 · number 10일 때 그래프'],['anG100','03 · number 100일 때 그래프'],['anQ1','03 · 동화되는 시간이 number에 따라 다른 점'],['anQ2','03 · 우세한 감정과 다른 감정 전달'],['anDense','03 · 인구 밀도에 따른 감정 전달 해석'],['anRebuild','03 · 바꾸고 싶은 버튼·플롯·모니터'],['anAccept','03 · 수용 정도 100%와 30% 비교'],['anModel','04 · 모델 분석(알게 된 점)'],['anCaseK','04 · 사례 적용 · 알게 된 점'],['anCaseS','04 · 사례 적용 · 사회 현상 사례'],['anExt','04 · 기능 확장'],['anCheckPick','04 · 성취도 점검: 할 수 있는 것'],['anJob','05 · 관심 가는 직업'],['anJobWhy','05 · 나에게 필요한 역량'],['keyQ','오늘의 질문에 대한 내 답']];
onShow[6]=()=>memoSummary('msum',MEMOLIST);
