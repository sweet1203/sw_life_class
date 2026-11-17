/* u4-project 전용 (pj-) — 공용 부품 pyrun · sorter · tabs · vote · chips 사용 */
const PJ_CATS=[{n:'1 문제 탐색 및 정의',k:'#d64535'},{n:'2 시뮬레이션 실행 및 해석',k:'#e0702b'},{n:'3 실제 사례 비교 분석',k:'#c98a0a'},{n:'4 정책 구상',k:'#1f9d74'},{n:'5 정책 발표',k:'#2f6fd0'}];

/* 01 단계에 맞는 활동 찾기 (분류) */
sorter('pjStepGame',{
  cats:PJ_CATS,
  items:[
    {t:'생물 다양성 기사를 읽고 요약한 뒤 가장 관심 있는 기사를 고른다',short:'관심 기사 고르기',c:0,ic:'📰',w:'기사를 읽고 선택하는 일은 문제 탐색 및 정의 단계예요.'},
    {t:'기사를 보며 든 질문을 토의해 모둠의 문제를 정한다',short:'모둠의 문제 정하기',c:0,ic:'🎯',w:'무엇이 문제인지 정하는 일도 문제 탐색 및 정의 단계예요.'},
    {t:'변수를 바꿔 가며 시뮬레이션을 실행해 본다',short:'변수 바꿔 실행',c:1,ic:'🧪',w:'시뮬레이션을 직접 실행하는 일은 2단계예요.'},
    {t:'실행 결과로 알게 된 점을 모둠원과 이야기한다',short:'실행 결과 이야기',c:1,ic:'💬',w:'결과를 해석하는 일도 시뮬레이션 실행 및 해석 단계예요.'},
    {t:'해석 결과로 알게 된 키워드를 검색 엔진에서 검색한다',short:'키워드 검색',c:2,ic:'🔍',w:'실제 사례를 찾는 일은 실제 사례 비교 분석 단계예요.'},
    {t:'뉴스 기사, 통계 데이터, 논문에서 비슷한 사례를 찾아 비교한다',short:'사례 찾아 비교',c:2,ic:'📚',w:'시뮬레이션 결과와 사례를 견주어 보는 일은 3단계예요.'},
    {t:'‘생물 다양성은 왜 중요할까?’를 주제로 모둠 토의를 한다',short:'모둠 토의',c:3,ic:'🗣️',w:'근거를 들어 토의하며 정책을 만들어 가는 일은 정책 구상 단계예요.'},
    {t:'국내외 정책을 조사해 우리 모둠의 정책을 적는다',short:'우리 모둠 정책 정하기',c:3,ic:'🏁',w:'정책을 정하는 일은 정책 구상 단계예요.'},
    {t:'다른 모둠이 발표한 정책을 정리하고 나의 의견을 적는다',short:'다른 모둠 정책 정리',c:4,ic:'📣',w:'발표를 듣고 의견을 나누는 일은 정책 발표 단계예요.'},
    {t:'정책을 세울 때 주의해야 할 점을 모둠원과 이야기한다',short:'주의할 점 이야기',c:4,ic:'⚠️',w:'발표 뒤에 정책을 돌아보는 일도 정책 발표 단계에서 해요.'},
  ],
  end:'<b>정리</b> 정하기(1) → 실행해 읽기(2) → 사례와 견주기(3) → 정책 만들기(4) → 발표하기(5)의 흐름으로 기억하면 좋아요.'
});

/* 02 기사 3개 */
const PJ_ART=[
 {ic:'🌳',n:'기사 1',k:'#2f9a5a',sdg:'SDG 15 · 육상생태계 보전',t:'먹이 사슬과 생물 다양성',
  s:'모든 생물은 그물처럼 서로 관계를 맺고 살아요. 생물 다양성은 먹이 사슬과 건강하고 안정된 생태계의 바탕이에요. 생물종이 줄면 이 관계가 연쇄적으로 무너질 수 있어서, 학교에서도 폐 휴대폰 수거 캠페인, 텃밭 가꾸기, 탈 플라스틱 실천 같은 활동을 하고 있어요.',src:'강원일보, 2021. 5. 24.'},
 {ic:'🌡️',n:'기사 2',k:'#2f6a2f',sdg:'SDG 13 · 기후변화와 대응',t:'1.5℃의 희망',
  s:'산업화 이전보다 지구 온도가 약 1℃ 올라 인류는 온난화를 겪고 있어요. 195개 나라는 파리 협정(2015)에서 온도 상승을 1.5℃ 안으로 막기로 합의했어요. 2℃ 오르면 물 부족, 생물 서식지와 다양성 감소, 북극 해빙 소멸, 해수면 상승 같은 문제가 훨씬 심각해진다고 해요.',src:'대전일보, 2023. 10. 30.'},
 {ic:'🦋',n:'기사 3',k:'#bf8f00',sdg:'SDG 12 · 지속가능한 생산과 소비',t:'기후 변화가 생물 멸종 부른다',
  s:'멸종한 생물종과 멸종 위기종의 생태를 분석했더니, 자연의 보이지 않는 변화 속도가 생물종의 적응력을 넘어서고 있었어요. 생물이 적응하는 속도와 환경이 변하는 속도가 맞지 않으면 적응에 실패해 개체 수가 줄고 결국 멸종에 이를 수 있다고 연구팀은 강조했어요.',src:'서울신문, 2018. 9. 4.'},
];
tabs('pjArtBtn','pjArtView',PJ_ART.map(a=>({ic:a.ic,n:a.n})),(it,i)=>{
  const a=PJ_ART[i];
  return '<div class="pj-art" style="--k:'+a.k+'"><span class="sdg">'+a.sdg+'</span><b class="t">'+a.t+'</b><p>'+a.s+'</p><small>출처 · '+a.src+' (기사 내용을 줄여 쓴 요약이에요)</small></div>';
});
vote('pjArtVote','pjArt',PJ_ART.map(a=>[a.ic+' 기사 '+(PJ_ART.indexOf(a)+1)+' · '+a.t]));
chips('pjRoleChips','pjMyRole',['모둠장','시뮬레이션 전문가','사회 현상 분석가','토의 진행자','정책 설계자','발표자'],true);

/* ---------- 03 풀 · 토끼 · 매 연습용 단순 모델 ---------- */
const PJ_MAX=120, PJ_START={g:100,r:20,h:4};
let pjS={...PJ_START}, pjT=0, pjHist=[{...PJ_START}], pjGrH=[10], pjTimer=null;
const pjMsg=t=>{$('pjMsg').textContent=t;};
function pjNext(S,gr){
  const g=Math.min(100,Math.max(0,S.g+gr-0.5*S.r));          // 풀: 자라고, 토끼가 먹어요
  const rg=Math.max(0,0.24*S.g-1.0*S.h), hg=0.2*S.r;          // 토끼·매가 향할 목표
  return {g:g, r:S.r+0.3*(rg-S.r), h:S.h+0.3*(hg-S.h)};
}
function pjDraw(){
  const W=420,H=230,L=36,R=10,T=10,B=28;
  let mx=110; pjHist.forEach(s=>{mx=Math.max(mx,s.g/PJ_START.g*100,s.r/PJ_START.r*100,s.h/PJ_START.h*100);}); mx=Math.ceil(mx/10)*10;
  const xm=Math.max(40,Math.ceil(pjT/20)*20), X=t=>L+t/xm*(W-L-R), Y=v=>T+(H-T-B)*(1-v/mx);
  let g='';
  for(let v=0;v<=mx;v+=(mx>130?50:25)) g+='<line x1="'+L+'" y1="'+Y(v)+'" x2="'+(W-R)+'" y2="'+Y(v)+'" stroke="#e6e3dc"/><text x="'+(L-4)+'" y="'+(Y(v)+3)+'" text-anchor="end">'+v+'</text>';
  [0,xm/2,xm].forEach(t=>{g+='<text x="'+X(t)+'" y="'+(H-14)+'" text-anchor="middle">'+t+'</text>';});
  g+='<text x="'+((L+W-R)/2)+'" y="'+(H-3)+'" text-anchor="middle">틱</text><path d="M'+L+' '+T+'V'+(H-B)+'H'+(W-R)+'" fill="none" stroke="#16202c" stroke-width="1.2"/>';
  for(let i=1;i<pjGrH.length;i++) if(pjGrH[i]!==pjGrH[i-1]) g+='<line x1="'+X(i)+'" y1="'+T+'" x2="'+X(i)+'" y2="'+(H-B)+'" stroke="#9aa5b4" stroke-dasharray="3 3"/><text x="'+X(i)+'" y="'+(T+8)+'" text-anchor="middle">성장 '+pjGrH[i]+'</text>';
  [['g','#2f9a5a'],['r','#e0702b'],['h','#8a4fc0']].forEach(([k,col])=>{
    g+='<polyline fill="none" stroke="'+col+'" stroke-width="2.4" points="'+pjHist.map((s,i)=>X(i).toFixed(1)+','+Y(s[k]/PJ_START[k]*100).toFixed(1)).join(' ')+'"/>';
  });
  $('pjPlot').setAttribute('viewBox','0 0 '+W+' '+H); $('pjPlot').innerHTML=g;
  $('pjMonT').textContent=pjT; $('pjMonG').textContent=Math.round(pjS.g); $('pjMonR').textContent=Math.round(pjS.r); $('pjMonH').textContent=Math.round(pjS.h);
}
function pjStep(n){
  for(let i=0;i<n&&pjT<PJ_MAX;i++){
    const gr=+$('pjGr').value; pjS=pjNext(pjS,gr); pjT++; pjHist.push({...pjS}); pjGrH.push(gr);
  }
  pjDraw();
}
function pjStop(msg){
  if(pjTimer){clearInterval(pjTimer); pjTimer=null;}
  $('pjAuto').textContent='▶ 자동'; if(msg) pjMsg(msg);
}
function pjReset(){
  pjStop(); pjS={...PJ_START}; pjT=0; pjHist=[{...PJ_START}]; pjGrH=[+$('pjGr').value]; pjDraw();
  pjMsg('처음 균형 상태예요. 풀 성장을 낮춰 보고 [1틱]이나 [▶ 자동]을 눌러요.');
}
$('pjGr').oninput=()=>{$('pjGrV').textContent=$('pjGr').value;};
$('pjStep1').onclick=()=>{pjStop(); if(pjT>=PJ_MAX) pjMsg('최대 '+PJ_MAX+'틱까지만 실행해요. [다시]로 처음부터 해 봐요.'); else {pjStep(1); pjMsg(pjT+'틱이 지났어요.');}};
$('pjStep10').onclick=()=>{pjStop(); if(pjT>=PJ_MAX) pjMsg('최대 '+PJ_MAX+'틱까지만 실행해요. [다시]로 처음부터 해 봐요.'); else {pjStep(10); pjMsg(pjT+'틱이 지났어요.');}};
$('pjAuto').onclick=()=>{
  if(pjTimer) return;
  if(pjT>=PJ_MAX){pjMsg('최대 '+PJ_MAX+'틱까지만 실행해요. [다시]로 처음부터 해 봐요.'); return;}
  $('pjAuto').textContent='실행 중…'; pjMsg('자동으로 실행 중이에요. 풀 성장을 바꿔 보거나 [멈춤]을 눌러요.');
  pjTimer=setInterval(()=>{pjStep(1); if(pjT>=PJ_MAX) pjStop('최대 '+PJ_MAX+'틱에서 멈췄어요.');},140);
};
$('pjStop').onclick=()=>pjStop('멈췄어요.');
$('pjReset').onclick=pjReset;
(function(){ /* 화면을 떠나면 자동 실행을 멈춰요 */
  const sec=$('pjPlot').closest('.page');
  new MutationObserver(()=>{if(!sec.classList.contains('on')) pjStop();}).observe(sec,{attributes:true,attributeFilter:['class']});
})();
pjReset();

/* 03 pyrun ① 같은 규칙, 파이썬 */
pyrun('pjRun1',{rows:19,code:`# 연습용 단순 모델: 규칙은 우리가 정한 것이며, 실제 생태 수치가 아니에요
grass, rabbit, hawk = 100.0, 20.0, 4.0     # 처음 상태: 거의 균형
GROWTH = 10        # 풀이 한 틱에 자라는 양 (처음 20틱)
LOW = 3            # 20틱부터 줄인 풀 성장 (10, 5, 0 으로 바꿔 보세요)
TICKS = 40         # 실행할 틱 수

print('틱   풀  토끼  매')
for tick in range(TICKS + 1):
    growth = GROWTH if tick < 20 else LOW
    if tick % 5 == 0:
        print(tick, ' ', round(grass), ' ', round(rabbit), ' ', round(hawk))
    new_grass = min(100, max(0, grass + growth - 0.5 * rabbit))   # 자라고, 토끼가 먹어요
    rabbit_goal = max(0, 0.24 * grass - 1.0 * hawk)               # 풀이 많고 매가 적으면 늘어요
    hawk_goal = 0.2 * rabbit                                      # 토끼가 많으면 매도 늘어요
    rabbit = rabbit + 0.3 * (rabbit_goal - rabbit)
    hawk = hawk + 0.3 * (hawk_goal - hawk)
    grass = new_grass
`});

/* ---------- 08 대단원 마무리 ---------- */
chips('ox1','pjOx1',['O','X'],false);
chips('ox2','pjOx2',['O','X'],false);
chips('ox3','pjOx3',['O','X'],false);
chips('ox4','pjOx4',['O','X'],false);
chips('ox5','pjOx5',['O','X'],false);
const PJ_RD=['창의적 사고','협력적 소통','자기 관리','지식 정보 처리','공동체적 역량'];
chips('rd0','pjRd0',['1','2','3','4','5'],false);
chips('rd1','pjRd1',['1','2','3','4','5'],false);
chips('rd2','pjRd2',['1','2','3','4','5'],false);
chips('rd3','pjRd3',['1','2','3','4','5'],false);
chips('rd4','pjRd4',['1','2','3','4','5'],false);
function pjRadar(){
  const cx=180, cy=150, R=90, ang=i=>-Math.PI/2+i*2*Math.PI/5, P=(i,r)=>[cx+Math.cos(ang(i))*r, cy+Math.sin(ang(i))*r];
  let g='';
  for(let k=1;k<=5;k++) g+='<polygon fill="none" stroke="#d9d6cd" points="'+PJ_RD.map((_,i)=>P(i,R*k/5).join(',')).join(' ')+'"/>';
  PJ_RD.forEach((n,i)=>{const e=P(i,R), t=P(i,R+18); g+='<line x1="'+cx+'" y1="'+cy+'" x2="'+e[0]+'" y2="'+e[1]+'" stroke="#d9d6cd"/><text x="'+t[0]+'" y="'+(t[1]+4)+'" style="font-size:12px;font-weight:700">'+n+'</text>';});
  const v=PJ_RD.map((_,i)=>Math.max(0,Math.min(5,parseInt(MEMO['pjRd'+i],10)||0)));
  if(v.some(x=>x>0)){
    g+='<polygon fill="rgba(138,79,192,.28)" stroke="#8a4fc0" stroke-width="2" points="'+v.map((x,i)=>P(i,R*x/5).join(',')).join(' ')+'"/>';
    v.forEach((x,i)=>{const p=P(i,R*x/5); g+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3.5" fill="#8a4fc0"/>';});
  }
  $('pjRadar').setAttribute('viewBox','0 0 360 300'); $('pjRadar').innerHTML=g;
}
[0,1,2,3,4].forEach(i=>$('rd'+i).addEventListener('memo',pjRadar));
pjRadar();

/* ---------- 09 마무리 ---------- */
const MEMOLIST=[['planMemo','나의 계획 · 사라지는 생물과 우리 생활'],['pjCon1','고려할 점 · 1단계'],['pjCon2','고려할 점 · 2단계'],['pjCon3','고려할 점 · 3단계'],['pjCon4','고려할 점 · 4단계'],['pjCon5','고려할 점 · 5단계'],['pjSum1','기사 1 요약'],['pjSum2','기사 2 요약'],['pjSum3','기사 3 요약'],['pjArt','내가 선택한 기사'],['pjMyRole','내가 맡고 싶은 역할'],['pjStrength','나의 장점'],['pjRoleDo','내가 맡은 역할과 하는 일'],['pjTeam','모둠원의 이름 · 장점 · 역할'],['pjProblem','우리 모둠에서 정의한 문제'],['pjScen','내가 실행해 본 시나리오'],['pjQuest','궁금했던 점(질문)'],['pjVar','내가 선택한 변수'],['pjResult','실행 결과'],['pjLearn1','알게 된 점 · 나'],['pjLearn2','알게 된 점 · 모둠 친구들'],['pjInterp','시뮬레이션 실행 결과 해석'],['pjDeep','심화 · 추가하고 싶은 변수와 기능'],['pjCaseMine','내가 찾은 실제 사례'],['pjCaseFriend','모둠 친구들이 찾은 사례'],['pjCaseLink','시뮬레이션과 사례의 연관성'],['pjDQ1','모둠 질문 ①'],['pjDQ2','모둠 질문 ②'],['pjDPrep','토의 준비 내용(나)'],['pjDSum','토의 내용 정리(모둠)'],['pjPolMine','내가 조사한 국내외 정책'],['pjPolTeam','모둠 친구들이 조사한 정책'],['pjPolOur','우리 모둠의 정책'],['pjPi1','발표 정리 · 모둠 ① 정책 소개'],['pjPo1','발표 정리 · 모둠 ① 나의 의견'],['pjPi2','발표 정리 · 모둠 ② 정책 소개'],['pjPo2','발표 정리 · 모둠 ② 나의 의견'],['pjPi3','발표 정리 · 모둠 ③ 정책 소개'],['pjPo3','발표 정리 · 모둠 ③ 나의 의견'],['pjCareful','정책 수립 시 주의해야 할 점'],['pjCoreT','핵심 개념 · 시뮬레이션 주제'],['pjCoreF','핵심 개념 · 융합 분야'],['pjCoreR','핵심 개념 · 역할'],['pjCoreC','핵심 개념 · 필요 역량'],['pjApp1','응용 사례 1'],['pjApp2','응용 사례 2'],['pjApp3','응용 사례 3'],['pjJob1','진로 탐색 · 인문·사회'],['pjJob2','진로 탐색 · 과학·공학'],['pjJob3','진로 탐색 · 예체능 외'],['pjMapA','마인드맵 · 개념'],['pjMapB','마인드맵 · 필요성'],['pjMapC','마인드맵 · 장점'],['pjMapD','마인드맵 · 활용 분야'],['pjOx1','O/X ❶'],['pjOx2','O/X ❷'],['pjOx3','O/X ❸'],['pjOx4','O/X ❹'],['pjOx5','O/X ❺'],['pjSq1','구현 과정 ㉠'],['pjSq2','구현 과정 ㉡'],['pjSq3','구현 과정 ㉢'],['pjSq4','구현 과정 ㉣'],['pjSq5','구현 과정 ㉤'],['pjRd0','평가 · 창의적 사고'],['pjRd1','평가 · 협력적 소통'],['pjRd2','평가 · 자기 관리'],['pjRd3','평가 · 지식 정보 처리'],['pjRd4','평가 · 공동체적 역량'],['keyQ','오늘의 질문에 대한 내 답']];
onShow[9]=()=>memoSummary('msum',MEMOLIST);
