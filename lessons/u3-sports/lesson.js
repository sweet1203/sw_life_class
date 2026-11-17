/* u3-sports 전용 (sp-) — 공용 부품 orangeFlow · miniTable · bars · pyrun · flipCards · vote · chips · tabs 사용 */

/* 03 File 위젯 Info 읽어 보기 */
const SP_INFO=[
  {n:'18944 instances',d:'<b>18944명</b> 선수들의 데이터가 있어요. 한 줄이 선수 한 명이에요.'},
  {n:'72 features (9.0% missing values)',d:'<b>72개의 속성(feature)</b>을 가져요. 9.0% 정도의 결측치가 있어요.'},
  {n:'Data has no target variable.',d:'<b>타깃값(target)은 없어요.</b> 예측하려는 결과 속성이 따로 정해져 있지 않다는 뜻이에요.'},
  {n:'38 meta attributes',d:'<b>38개의 메타(meta) 속성</b>이 있어요. meta는 분석에 쓰지 않고 참고만 하는 속성이에요.'},
];
tabs('spInfoBtn','spInfoView',SP_INFO.map(x=>({ic:'',n:x.n})),(it,i)=>SP_INFO[i].d);

/* 04 오렌지 흐름도 + 설정 표 + 진행 칩 (112~113쪽) */
orangeFlow({svg:'spFlow', table:'spSet',
  nodes:[
    {s:1,t:'File',sub:'players_21.csv',c:'Data',x:10,y:75},
    {s:2,t:'Data Table',sub:'표로 확인',c:'Data',x:240,y:15},
    {s:3,t:'Feature Statistics',sub:'통계 · 도수 분포',c:'Data',x:470,y:15},
    {s:4,t:'Select Rows',sub:'GK · overall > 85',c:'Transform',x:240,y:135},
    {s:5,t:'Data Table (1)',sub:'뽑힌 선수 확인',c:'Data',x:470,y:135},
    {s:6,t:'Bar Plot',sub:'short_name · preferred_foot',c:'Visualize',x:700,y:135}
  ],
  edges:[[1,2],[2,3],[1,4],[4,5],[5,6]],
  done:{box:'spFlowDone', key:'spFlowDone', items:['File로 파일 열기','Data Table로 확인','Feature Statistics 보기','Select Rows 조건 만들기','Data Table (1) 확인','Bar Plot 그리기']}});

/* 04 선수 14명 (players_21.csv에서 값 그대로: short_name · club_position · overall · age · preferred_foot) */
const SP_COLS=['short_name','club_position','overall','age','preferred_foot'];
const SP_ROWS=[
  ['J. Oblak','GK',91,27,'Right'],['Alisson','GK',90,27,'Right'],['T. Courtois','GK',89,28,'Left'],
  ['Ederson','GK',88,26,'Left'],['W. Szczęsny','GK',87,30,'Right'],['S. Sirigu','GK',84,33,'Right'],
  ['R. Lewandowski','ST',91,31,'Right'],['K. Benzema','CF',89,32,'Right'],['A. Griezmann','ST',87,29,'Left'],
  ['D. Mertens','ST',85,33,'Right'],['Iago Aspas','ST',84,32,'Left'],['A. Vega','CF',69,22,'Right'],
  ['K. De Bruyne','RCM',91,29,'Right'],['V. van Dijk','LCB',90,28,'Right']
];
miniTable('spTbl',{cols:SP_COLS, rows:SP_ROWS});
const spResT=miniTable('spResTbl',{cols:SP_COLS, rows:[]});
const SP_POS=[{n:'조건 없음',f:p=>true},{n:'is GK',f:p=>p[1]==='GK'},{n:'ST 또는 CF',f:p=>p[1]==='ST'||p[1]==='CF'}];
const SP_OVR=[{n:'조건 없음',f:p=>true},{n:'85보다 큼 (is greater than 85)',f:p=>p[2]>85},{n:'85 이상',f:p=>p[2]>=85}];
let spPos=1, spOvr=1;
function spDraw(){
  const rows=SP_ROWS.filter(p=>SP_POS[spPos].f(p)&&SP_OVR[spOvr].f(p)).sort((a,b)=>b[2]-a[2]);
  spResT.set(rows);
  bars('spBars',rows.map(p=>[p[0],p[2],p[4]==='Left'?'#d64535':'#2f6fd0']),{horiz:true,max:100,left:104,w:400});
  $('spResMsg').innerHTML=rows.length?'조건에 맞는 선수는 14명 중 <b>'+rows.length+'명</b>이에요. overall이 큰 순서로 늘어놓았어요.':'조건에 맞는 선수가 <b>없어요</b>. 조건을 바꿔 봐요.';
}
function spBtns(box,list,get,set){
  const B=$(box); B.insertAdjacentHTML('beforeend',list.map((x,i)=>'<button type="button" data-i="'+i+'">'+x.n+'</button>').join(''));
  const bs=[...B.querySelectorAll('button')];
  const draw=()=>bs.forEach((b,i)=>b.classList.toggle('on',i===get()));
  bs.forEach((b,i)=>b.onclick=()=>{set(i);draw();spDraw();}); draw();
}
spBtns('spCondPos',SP_POS,()=>spPos,i=>{spPos=i;});
spBtns('spCondOvr',SP_OVR,()=>spOvr,i=>{spOvr=i;});
spDraw();

/* 04 pyrun · 같은 일을 기본 파이썬으로 */
pyrun('spRun',{rows:22,code:[
"# 교과서는 오렌지의 Select Rows·Bar Plot, 여기서는 기본 파이썬으로 같은 일을 해요.",
"cols = ['short_name', 'club_position', 'overall', 'age', 'preferred_foot']",
"rows = [",
"    ('J. Oblak', 'GK', 91, 27, 'Right'), ('Alisson', 'GK', 90, 27, 'Right'),",
"    ('T. Courtois', 'GK', 89, 28, 'Left'), ('Ederson', 'GK', 88, 26, 'Left'),",
"    ('W. Szczęsny', 'GK', 87, 30, 'Right'), ('S. Sirigu', 'GK', 84, 33, 'Right'),",
"    ('R. Lewandowski', 'ST', 91, 31, 'Right'), ('K. Benzema', 'CF', 89, 32, 'Right'),",
"    ('A. Griezmann', 'ST', 87, 29, 'Left'), ('D. Mertens', 'ST', 85, 33, 'Right'),",
"    ('Iago Aspas', 'ST', 84, 32, 'Left'), ('A. Vega', 'CF', 69, 22, 'Right'),",
"    ('K. De Bruyne', 'RCM', 91, 29, 'Right'), ('V. van Dijk', 'LCB', 90, 28, 'Right'),",
"]",
"players = [dict(zip(cols, r)) for r in rows]   # 선수 한 명 = 딕셔너리",
"",
"picked = []",
"for p in players:                                # Select Rows: 조건에 맞는 줄만 고르기",
"    if p['club_position'] == 'GK' and p['overall'] > 85:",
"        picked.append(p)",
"",
"picked.sort(key=lambda p: p['overall'], reverse=True)   # overall 큰 순서로 정렬",
"for p in picked:",
"    print(p['short_name'], p['overall'], p['preferred_foot'], '#' * (p['overall'] - 80))",
"print(len(picked), '명을 골랐어요')"
].join('\n')});

/* 05 데이터 윤리 카드 */
flipCards('spEthics',[
  {ic:'🔐',f:'데이터 보안은 철저하게',b:'캐글에서 내려받은 선수들의 데이터를 분석한 결과는 내가 좋아하는 선수나 팀의 전력을 분석하고 앞으로의 발전 가능성을 예측하는 데 쓸 수 있어요. 하지만 분석에 쓰는 데이터에는 개인 정보 같은 민감한 내용이 들어 있을 수 있어서 주의가 필요해요. 개인 정보를 다루게 된다면 필요한 내용만 보안상 안전하게 조치해서 수집하고 관리해야 해요.'},
  {ic:'⚖️',f:'데이터 수집과 활용은 올바르게',b:'스포츠 팀이나 기업 등에서 관리하는 데이터는 그 자체가 중요한 자산이에요. 개인이나 단체의 실력과 성과를 관리하는 데 쓰이기 때문이에요. 그래서 올바른 절차로 얻은 데이터만 써야 하고, 조작되거나 편향된 데이터가 없는지 검증하는 절차도 필요해요.'}
]);

/* 06 포지션 위치 SVG (114쪽 그림을 약어 배치로 다시 그림) */
(function(){
  const G={A:'#ffd9c7',M:'#cfe3ff',D:'#fff0a8'};
  const P=[['LS',100,34,'A'],['ST',150,34,'A'],['RS',200,34,'A'],['LF',66,66,'A'],['RF',234,66,'A'],['LW',92,96,'A'],['CF',150,96,'A'],['RW',208,96,'A'],
    ['LAM',70,138,'M'],['CAM',150,138,'M'],['RAM',230,138,'M'],['LM',36,176,'M'],['LCM',93,176,'M'],['CM',150,176,'M'],['RCM',207,176,'M'],['RM',264,176,'M'],
    ['LDM',78,216,'M'],['CDM',150,216,'M'],['RDM',222,216,'M'],['LWB',36,258,'D'],['RWB',264,258,'D'],
    ['LB',36,296,'D'],['LCB',93,296,'D'],['CB',150,296,'D'],['RCB',207,296,'D'],['RB',264,296,'D']];
  let h=P.map(([t,x,y,g])=>'<circle cx="'+x+'" cy="'+y+'" r="16" fill="'+G[g]+'" stroke="#16202c" stroke-width="1.2"/><text x="'+x+'" y="'+(y+4)+'" class="t1">'+t+'</text>').join('');
  h+='<rect x="120" y="326" width="60" height="30" rx="8" fill="#f6c0c0" stroke="#16202c" stroke-width="1.2"/><text x="150" y="346" class="t1">GK</text>';
  $('spPitch').innerHTML=h;
})();

/* 06 성취도 점검 */
chips('spAch','spAchPick',['데이터를 목적에 맞게 시각화하고 분석할 수 있다 (110~113쪽)','원하는 데이터를 탐색하고 수집할 수 있다 (110쪽)','시각화 결과를 바탕으로 현상을 합리적으로 해석할 수 있다 (113쪽)','데이터 분석 결과를 윤리적으로 활용해야 하는 이유를 설명할 수 있다 (113쪽)'],true);

/* 07 교과 융합 진로 탐색 */
const SP_JOBS=[
  {ic:'🌪️',f:'스마트 재난 관리 전문가',b:'IT 기술과 첨단 장비를 융합하여 재난 관리 시스템을 기획하고 개발해요. 기후 변화 등으로 예상하지 못한 재난의 발생 빈도가 높아지고 있어, 더 많은 일자리가 생길 것으로 전망돼요.',x:'필요 역량 · 책임감, 공감 소통 능력, 공간 지각력, 수리·논리력'},
  {ic:'🌍',f:'기후 변화 대응 전문가',b:'기후 변화가 기업이나 정부 정책에 미치는 영향을 분석하고 더 나은 대안을 제시해요. 세계적으로 기후 문제가 중요한 쟁점이 되면서 앞으로 그 역할이 더욱 커질 것으로 보여요.',x:'필요 역량 · 통계 지식, 탐구력, 자연 친화력, 수리·논리력'},
  {ic:'🔎',f:'디지털 포렌식 전문가',b:'각종 저장 매체 또는 인터넷상에 남아 있는 디지털 정보를 수집하고 분석해 범죄 단서를 찾아내요. 사이버 범죄가 증가함에 따라 국가 기관뿐만 아니라 민간 부문으로도 확대될 전망이에요.',x:'필요 역량 · 창의력, 수리·논리력, 추진력, 지구력'},
  {ic:'⚽',f:'스포츠 기록 분석 연구원',b:'경기의 모든 요소를 수치화된 데이터로 기록하고 분석해 팀이나 선수의 기록과 전략을 파악해요. 우리나라는 스포츠에 대한 관심이 매우 높은 편이라 수요 역시 지속될 것으로 보여요.',x:'필요 역량 · 스포츠에 대한 흥미, 통찰력, 소프트웨어 활용 능력'},
];
flipCards('spJobFlip',SP_JOBS);
vote('spJobVote','spJobInterest',SP_JOBS.map(j=>[j.ic+' '+j.f]),i=>{
  $('spJobRes').innerHTML='<b>'+SP_JOBS[i].f+'</b> · '+SP_JOBS[i].x.replace('필요 역량 · ','필요 역량은 ')+'. 이 중에서 지금의 나에게 가장 필요한 것은 무엇일까요?';
});

/* 08 마무리 */
const MEMOLIST=[['spHyp','나만의 가설'],['spEvid','가설을 뒷받침할 근거 자료'],['planMemo','나의 계획 · 좋아하는 선수나 팀'],['spFactor','팀 구성에서 중요한 요소'],['spCollect','수집해 분석할 데이터'],['spAttr','분석에 활용하면 좋을 속성'],['spFlowDone','오렌지 흐름 진행'],['spExtract','내가 뽑아 본 조건과 결과'],['spEthMemo','데이터를 다룰 때 조심할 점'],['spT1c','선발팀 · 공격수 기준'],['spT1n','선발팀 · 공격수 인원'],['spT1m','선발팀 · 공격수 이름'],['spT2c','선발팀 · 미드필더 기준'],['spT2n','선발팀 · 미드필더 인원'],['spT2m','선발팀 · 미드필더 이름'],['spT3c','선발팀 · 수비수 기준'],['spT3n','선발팀 · 수비수 인원'],['spT3m','선발팀 · 수비수 이름'],['spT4c','선발팀 · 골키퍼 기준'],['spT4n','선발팀 · 골키퍼 인원'],['spT4m','선발팀 · 골키퍼 이름'],['spAchPick','성취도 점검: 할 수 있는 것'],['spJobInterest','관심 가는 융합 진로 직업'],['spJobWhy','그 직업을 고른 이유'],['keyQ','오늘의 질문에 대한 내 답']];
onShow[8]=()=>memoSummary('msum',MEMOLIST);
