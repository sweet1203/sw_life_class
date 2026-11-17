/* u4-social 전용 (sc-) — 공용 부품 flipCards · sorter · pyrun 사용 */

/* 01 셸링 분리 모델 체험: 10×10 마을, 집 45+45, 빈칸 10 */
const SC_N=10, SC_MAXT=100, SC_C=[null,'#ee8d4f','#2fa58c'];
let scG=[], scT=0, scW=30, scTm=null, scDone='';
function scShuf(a){for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]];}return a;}
function scNear(i){const r=(i/SC_N)|0,c=i%SC_N,o=[];for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(!dr&&!dc)continue;const rr=r+dr,cc=c+dc;if(rr>=0&&rr<SC_N&&cc>=0&&cc<SC_N)o.push(rr*SC_N+cc);}return o;}
const SC_NB=Array.from({length:SC_N*SC_N},(_,i)=>scNear(i));
function scStat(i){let s=0,t=0;SC_NB[i].forEach(j=>{if(scG[j]){t++;if(scG[j]===scG[i])s++;}});return [s,t];}
function scUnhappy(i){if(!scG[i])return false;const [s,t]=scStat(i);return t>0&&s*100<scW*t;}
function scStop(){if(scTm){clearInterval(scTm);scTm=null;}}
function scReset(){
  scStop(); scT=0; scDone='';
  scG=scShuf([].concat(Array(45).fill(1),Array(45).fill(2),Array(10).fill(0)));
  scDraw(); $('scMsg').textContent='「한 번」이나 「▶ 끝까지」를 눌러 이사를 시작해 보세요.';
}
function scDraw(){
  let h='<rect x="0" y="0" width="300" height="300" fill="#fff" stroke="#c9c2d6"/>';
  for(let k=1;k<SC_N;k++){h+='<path d="M'+k*30+' 0V300M0 '+k*30+'H300" stroke="#e6e1ee" stroke-width="1"/>';}
  let un=0,sum=0,cnt=0;
  scG.forEach((g,i)=>{
    if(!g)return; const x=(i%SC_N)*30,y=((i/SC_N)|0)*30;
    h+='<path d="M'+(x+4)+' '+(y+14)+'L'+(x+15)+' '+(y+4)+'L'+(x+26)+' '+(y+14)+'V'+(y+26)+'H'+(x+4)+'Z" fill="'+SC_C[g]+'"/>';
    const [s,t]=scStat(i); if(t>0){sum+=s/t;cnt++;}
    if(scUnhappy(i)){un++;h+='<circle cx="'+(x+24)+'" cy="'+(y+7)+'" r="4" fill="#d64535" stroke="#fff" stroke-width="1"/>';}
  });
  $('scSvg').innerHTML=h;
  $('scTick').textContent=scT; $('scUn').textContent=un; $('scAvg').textContent=(cnt?Math.round(100*sum/cnt):0)+'%';
  return un;
}
function scStep(){
  if(scT>=SC_MAXT||scDone) return false;
  const un=[];scG.forEach((g,i)=>{if(scUnhappy(i))un.push(i);});
  if(!un.length){scDone='ok';return false;}
  const emp=[];scG.forEach((g,i)=>{if(!g)emp.push(i);});
  scShuf(un).forEach(i=>{const k=(Math.random()*emp.length)|0,j=emp[k];scG[j]=scG[i];scG[i]=0;emp[k]=i;});
  scT++; return true;
}
function scAfter(){
  const un=scDraw();
  if(un===0){scStop();scDone='ok';$('scMsg').textContent='불만인 집이 없어서 멈췄어요. 같은 색끼리 모인 모습을 살펴보세요.';}
  else if(scT>=SC_MAXT){scStop();scDone='max';$('scMsg').textContent='최대 '+SC_MAXT+'틱에서 멈췄어요. 아직 불만인 집이 '+un+'채 남았어요.';}
  else $('scMsg').textContent='이사가 계속되고 있어요.';
}
$('scB1').onclick=()=>{scStop();scStep();scAfter();};
$('scB10').onclick=()=>{scStop();for(let k=0;k<10&&scStep();k++);scAfter();};
$('scBGo').onclick=()=>{scStop();scTm=setInterval(()=>{if(cur!==1){scStop();return;}scStep();scAfter();},180);};
$('scBStop').onclick=()=>{scStop();$('scMsg').textContent='멈췄어요.';};
$('scBReset').onclick=scReset;
$('scWant').oninput=function(){scW=+this.value;$('scWantV').textContent=scW+'%';scReset();};
onShow[1]=()=>{scStop();};
scReset();

/* 01 pyrun · 한 줄 마을 */
pyrun('scRun',{rows:30,code:["# 교과서는 넷로고로, 여기서는 같은 규칙을 파이썬으로 흉내 내요. (난수라 실행할 때마다 결과가 달라요)", "import random", "", "WANT = 0.5       # 원하는 비율 (0.3, 0.7로 바꿔 보세요)", "ROUNDS = 50      # 최대 라운드", "", "def same_ratio(town, i):          # 좌우 2칸 이웃 중 나와 같은 색 비율", "    near = [town[j] for j in range(max(0, i - 2), min(30, i + 3)) if j != i and town[j] != '.']", "    if not near:", "        return 1.0", "    return sum(1 for c in near if c == town[i]) / len(near)", "", "def average(town):", "    r = [same_ratio(town, i) for i in range(30) if town[i] != '.']", "    return round(100 * sum(r) / len(r))", "", "town = list('O' * 13 + 'X' * 13 + '.' * 4)", "random.shuffle(town)", "print('처음', ''.join(town), '같은 색 이웃', average(town), '%')", "", "rounds = 0", "for r in range(ROUNDS):", "    unhappy = [i for i in range(30) if town[i] != '.' and same_ratio(town, i) < WANT]", "    if not unhappy:               # 불만인 집이 없으면 멈춰요", "        break", "    for i in unhappy:             # 불만인 집은 빈칸 하나로 이사", "        j = random.choice([k for k in range(30) if town[k] == '.'])", "        town[j], town[i] = town[i], '.'", "    rounds += 1", "print('끝  ', ''.join(town), '같은 색 이웃', average(town), '%', '(', rounds, '라운드 )')"].join('\n')});

/* 02 사회 현상 분석가가 하는 일 (자료 5) */
flipCards('scJobs',[
  {ic:'🤝',f:'상호 작용 연구',b:'개인, 집단의 행동, 학교, 가정, 사회 등 여러 환경에서 발생하는 사회적 상호 작용을 연구하여 정책적 대안을 탐색해요.'},
  {ic:'📋',f:'데이터 수집',b:'인터넷 조사, 면접 조사, 전화 조사, 우편 조사, 통계 조사 등의 방법을 사용해 데이터를 수집하고 조사해요.'},
  {ic:'🔎',f:'문제 분석',b:'복잡한 사회 현상에 대한 원인과 결과를 연구하며 사회 문제나 기존 정책에 대한 문제 등 다양한 문제에 대한 해결 방법을 제안해요.'},
  {ic:'🧠',f:'사회 현상 분석 및 추론',b:'가설을 테스트하고 변수를 조작하여 어떤 요소의 변화가 전체 시스템에 어떻게 영향을 미치는지 관찰하고 분석해요.'}
]);

/* 03 구현 단계 ↔ 고려할 점 짝 맞추기 */
sorter('scMatch',{
  cats:[{n:'1 문제 정의',k:'#8a4fc0'},{n:'2 개념적 모델링',k:'#2fa0a8'},{n:'3 화면 구성',k:'#c98a0a'},{n:'4 모델 구현',k:'#d0602f'},{n:'5 실행·해석',k:'#2f9a5a'}],
  items:[
    {t:'문제를 더 깊이 있게 이해한다.',short:'문제를 깊이 이해',c:0,ic:'🎯',w:'주제를 정하고 문제를 정의한 뒤, 관련 데이터를 수집해 문제를 더 깊이 이해해요.'},
    {t:'핵심 요소를 추상화하여 기능을 계획한다.',short:'핵심 요소 추상화 · 기능 계획',c:1,ic:'🧮',w:'개념적 모델링에서 핵심 요소를 추출해 현실을 추상화하고 시뮬레이션 기능을 계획해요.'},
    {t:'버튼 입력, 조건 설정, 출력 화면을 고려한다.',short:'버튼 · 조건 · 출력 화면',c:2,ic:'🖥️',w:'조건을 입력하는 버튼과 슬라이더, 결과를 출력하는 플롯과 모니터로 화면을 구성해요.'},
    {t:'알고리즘, 수학적 표현을 활용해 프로그램을 작성한다.',short:'알고리즘 · 프로그램 작성',c:3,ic:'⌨️',w:'시뮬레이션 동작을 알고리즘으로 설계하고 프로그램을 작성해요.'},
    {t:'가정을 토대로 다양한 시나리오를 테스트하고 함께 실행하며 해석한다.',short:'시나리오 테스트 · 해석',c:4,ic:'📈',w:'조건을 다르게 설정해 여러 번 실행해 보고 결과를 해석해요.'}
  ],
  end:'<b>정리</b> 짝은 [자료 6]의 단계별 설명을 보고 판단했어요. 각 단계에서 하는 일이 다음 단계의 바탕이 돼요.'
});

/* 04 넷로고 화면 모형 */
const SC_PARTS={
  tick:{n:'ticks',d:'<b>ticks</b> · 시뮬레이션 내에서의 시간 단위예요. 시뮬레이션이 실행되면 한 번의 단계마다 숫자가 1씩 증가해요.'},
  input:{n:'입력',d:'<b>입력</b> · 테스트하고 싶은 number값을 슬라이더로 조정해요. set up 버튼을 누른 후, go 버튼을 누르면 모델이 실행돼요. 오른쪽의 나·고마움·방향 버튼도 입력이에요.'},
  output:{n:'출력',d:'<b>출력</b> · 위쪽에 있는 플롯(plot)은 결과를 그래프로 출력하며 좌표의 속성을 x, y로 정할 수 있어요. 아래에 있는 모니터는 시뮬레이션 실행 도중 변화하는 값을 실시간으로 보여 줘요.'},
  turtle:{n:'터틀',d:'<b>터틀</b> · 시뮬레이션에서 움직이는 개체로, 위치나 방향뿐만 아니라 색, 크기, 속도 등 여러 속성을 가질 수 있어요. 터틀의 모양과 행동 및 규칙은 프로그램에서 정할 수 있어요.'},
  patch:{n:'패치',d:'<b>패치</b> · 시뮬레이션을 구성하는 사각형 모양의 바닥 영역으로, 격자형 단일 패치들이 모여 전체 패치를 구성해요. 위치와 색 등의 속성을 가지며 터틀의 움직임과 상호 작용하는 환경이에요.'}
};
(function(){
  const keys=Object.keys(SC_PARTS), gs=[...document.querySelectorAll('#scNl .sc-g')], B=$('scParts');
  B.innerHTML=keys.map(k=>'<button type="button" data-k="'+k+'">'+SC_PARTS[k].n+'</button>').join('');
  const bs=[...B.querySelectorAll('button')];
  function pick(k){
    bs.forEach(b=>b.classList.toggle('on',b.dataset.k===k));
    gs.forEach(g=>g.classList.toggle('on',g.dataset.k===k));
    $('scInfo').innerHTML=k?SC_PARTS[k].d:'위 그림의 영역이나 버튼을 눌러 보세요.';
  }
  bs.forEach(b=>b.onclick=()=>pick(b.dataset.k));
  gs.forEach(g=>{g.onclick=()=>pick(g.dataset.k);g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(g.dataset.k);}};});
  pick('');
})();

sorter('scPartGame',{
  cats:[{n:'ticks',k:'#5b6776'},{n:'입력',k:'#2f6fd0'},{n:'출력',k:'#2f9a5a'},{n:'터틀',k:'#d0602f'},{n:'패치',k:'#8a4fc0'}],
  items:[
    {t:'슬라이더로 number값을 조정한다',short:'number 슬라이더',c:1,ic:'🎚️',w:'테스트하고 싶은 값을 정하는 슬라이더는 입력이에요.'},
    {t:'set up 버튼을 누른 뒤 go 버튼을 누른다',short:'set up · go 버튼',c:1,ic:'🔘',w:'버튼으로 모델을 실행하니 입력이에요.'},
    {t:'결과를 그래프로 나타내는 플롯',short:'플롯',c:2,ic:'📈',w:'플롯은 결과를 그래프로 출력해요.'},
    {t:'실행 도중 바뀌는 값을 실시간으로 보여 주는 모니터',short:'모니터',c:2,ic:'🔢',w:'모니터는 변화하는 값을 실시간으로 보여 주는 출력이에요.'},
    {t:'시뮬레이션에서 움직이는 개체, 색·크기·속도 같은 속성을 가진다',short:'움직이는 개체',c:3,ic:'🧍',w:'움직이는 개체는 터틀이에요.'},
    {t:'격자형으로 모여 시뮬레이션의 바닥을 이루는 사각형 영역',short:'사각형 바닥 영역',c:4,ic:'🟫',w:'사각형 바닥 영역은 패치예요.'},
    {t:'한 번 단계가 실행될 때마다 1씩 늘어나는 숫자',short:'1씩 늘어나는 숫자',c:0,ic:'⏱️',w:'시간 단위를 나타내는 ticks예요.'}
  ],
  end:'<b>정리</b> 사용자가 조건을 넣는 것이 <b>입력</b>, 결과를 보는 것이 <b>출력</b>이고, 움직이는 <b>터틀</b>과 바닥인 <b>패치</b>가 모델의 세계를 이루며 시간은 <b>ticks</b>로 세요.'
});

/* 05 마무리 */
const MEMOLIST=[['scExp','상호 작용으로 행동이 바뀐 경험'],['scPhen','상호 작용으로 나타나는 사회 현상'],['planMemo','나의 계획'],['scFeel','셸링 체험에서 본 모습과 생각'],['scObs','사람들이 주고받는 것'],['scStep1','1단계 해야 할 일'],['scStep2','2단계 해야 할 일'],['scStep3','3단계 해야 할 일'],['scStep4','4단계 해야 할 일'],['scStep5','5단계 해야 할 일'],['keyQ','오늘의 질문에 대한 내 답']];
onShow[5]=()=>memoSummary('msum',MEMOLIST);
