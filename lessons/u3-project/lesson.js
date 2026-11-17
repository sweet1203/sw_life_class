/* u3-project 전용 (pj-) — 공용 부품 pyrun · sorter · bars · chips 사용 */
const PJ_CATS=[{n:'1 문제 탐색 및 정의',k:'#d64535'},{n:'2 데이터 수집',k:'#e0702b'},{n:'3 데이터 처리',k:'#c98a0a'},{n:'4 데이터 시각화',k:'#1f9d74'},{n:'5 분석 결과 해석',k:'#2f6fd0'}];

/* 01 단계에 맞는 활동 찾기 (분류) */
sorter('pjStepGame',{
  cats:PJ_CATS,
  items:[
    {t:'우리나라 주민 등록 인구를 분석해 보고 인구 변화 현황을 알아보기로 정한다',short:'인구 변화 현황 알아보기로 정함',c:0,ic:'🔍',w:'무엇을 분석할지 정하는 일은 문제 탐색 및 정의 단계예요.'},
    {t:'전체 인구수, 출생아 수, 1인 가구 수를 분석하면 인구 추이와 가구 형태 변화를 예측할 수 있다고 정리한다',short:'분석 내용 정리',c:0,ic:'🧾',w:'분석으로 알아낼 수 있는 것을 정리하는 일도 문제 탐색 및 정의 단계예요.'},
    {t:'국가통계포털에서 주민등록인구와 출생아수 데이터를 CSV 파일로 내려받는다',short:'통계 데이터 내려받기',c:1,ic:'📥',w:'필요한 데이터를 모으는 일은 데이터 수집 단계예요.'},
    {t:'인구 관련 정책이나 기사를 스크랩해 메모장에 복사해 둔다',short:'기사 스크랩·텍스트 준비',c:1,ic:'📰',w:'텍스트 데이터를 모으는 일도 데이터 수집 단계예요.'},
    {t:'1행은 삭제하고 2행의 칼럼명을 「연도, 주민 등록 인구수」로 고친다',short:'칼럼명 고치기',c:2,ic:'✏️',w:'내려받은 데이터를 쓸 수 있게 고치는 일은 데이터 처리 단계예요.'},
    {t:'주민 등록 인구수와 출생아 수를 연도 기준으로 한 개의 파일로 합친다',short:'연도 기준으로 합치기',c:2,ic:'🔗',w:'두 데이터를 합치는 일도 데이터 처리 단계예요.'},
    {t:'plt.plot으로 주민 등록 인구수 변화를 선그래프로 그린다',short:'선그래프 그리기',c:3,ic:'📈',w:'그래프로 나타내는 일은 데이터 시각화 단계예요.'},
    {t:'텍스트 데이터를 워드 클라우드로 나타내 핵심 키워드를 찾는다',short:'워드 클라우드로 나타내기',c:3,ic:'☁️',w:'텍스트 데이터를 그림으로 나타내는 일도 데이터 시각화 단계예요.'},
    {t:'그래프를 근거 데이터와 함께 살펴 인구 변화 현황을 해석한다',short:'근거와 함께 해석',c:4,ic:'🧭',w:'결과를 읽고 의미를 정리하는 일은 분석 결과 해석 단계예요.'},
    {t:'해석한 내용으로 인구 정책에 활용할 인포그래픽 기획서를 쓴다',short:'인포그래픽 기획서',c:4,ic:'🖼️',w:'해석한 내용을 바탕으로 결과를 활용하는 계획도 분석 결과 해석 단계에서 해요.'},
  ],
  end:'<b>정리</b> 정하기(1) → 모으기(2) → 고치기(3) → 그리기(4) → 읽기(5)의 흐름으로 기억하면 좋아요.'
});

/* 04 pyrun ① 연도로 짝짓기 · 천 단위 기호 */
pyrun('pjRun1',{rows:16,code:[
"# 교과서는 pandas의 pd.merge로, 여기서는 기본 파이썬(딕셔너리)으로 같은 일을 해요.",
"data1 = {1997: 46684069, 1998: 46991171, 1999: 47335678,",
"         2000: 47732558, 2001: 48021543, 2002: 48229948}   # 주민 등록 인구수",
"data2 = {1997: 675394, 1998: 641594, 1999: 620668,",
"         2000: 640089, 2001: 559934, 2002: 496911}         # 출생아 수",
"",
"merged = []",
"for year in data1:                         # 연도를 기준으로 짝짓기(merge)",
"    if year in data2:",
"        merged.append({'연도': year, '주민 등록 인구수': data1[year], '출생아 수': data2[year]})",
"",
"for row in merged:",
"    print(row['연도'], f\"{row['주민 등록 인구수']:,}\", f\"{row['출생아 수']:,}\")   # 천 단위 기호(,)",
"print(len(merged), '개 연도를 짝지었어요')"
].join('\n')});

/* 05 주민 등록 인구수·출생아 수 (파일 값 그대로: 주민등록인구수_…csv · 출생아수_…csv) */
const PJ_YEARS=[1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022];
const PJ_POP=[46684069,46991171,47335678,47732558,48021543,48229948,48386823,48583805,48782274,48991779,49268928,49540367,49773145,50515666,50734284,50948272,51141463,51327916,51529338,51696216,51778544,51826059,51849861,51829023,51638809,51439038];
const PJ_BIRTH=[675394,641594,620668,640089,559934,496911,495036,476958,438707,451759,496822,465892,444849,470171,471265,484550,436455,435435,438420,406243,357771,326822,302676,272337,260562,249186];
/* 1인 가구 [연도, 비율(%), 1인 가구(가구), 일반 가구(가구)] — 1인가구비율_…csv 값 그대로 */
const PJ_HH=[[2000,15.5,2224433,14311807],[2005,20.0,3170675,15887128],[2010,23.9,4142165,17339422],[2015,27.2,5203440,19111030],[2016,27.9,5397615,19367696],[2017,28.6,5618677,19673875],[2018,29.3,5848594,19979188],[2019,30.2,6147516,20343188],[2020,31.7,6643354,20926710],[2021,33.4,7165788,21448463],[2022,34.5,7502350,21773507]];
const PJ_F=n=>Number(n).toLocaleString('en-US');

/* 05 선그래프 + 연도 읽기 */
function pjLineDraw(yr){
  const W=460,H=270,L=70,R=14,T=14,B=34, y0=46e6, y1=52e6, X=y=>L+(y-1997)/(2022-1997)*(W-L-R), Y=v=>T+(H-T-B)*(1-(v-y0)/(y1-y0));
  let g='';
  [46e6,48e6,50e6,52e6].forEach(v=>{g+='<line x1="'+L+'" y1="'+Y(v)+'" x2="'+(W-R)+'" y2="'+Y(v)+'" stroke="#e6e3dc"/><text x="'+(L-6)+'" y="'+(Y(v)+4)+'" class="ay">'+PJ_F(v)+'</text>';});
  [1997,2000,2005,2010,2015,2020,2022].forEach(y=>{g+='<text x="'+X(y)+'" y="'+(H-14)+'" class="ax">'+y+'</text>';});
  g+='<path d="M'+L+' '+T+'V'+(H-B)+'H'+(W-R)+'" fill="none" stroke="#16202c" stroke-width="1.4"/>';
  g+='<polyline fill="none" stroke="#2f6fd0" stroke-width="2.5" points="'+PJ_YEARS.map((y,i)=>X(y).toFixed(1)+','+Y(PJ_POP[i]).toFixed(1)).join(' ')+'"/>';
  const i=yr-1997;
  g+='<line x1="'+X(yr)+'" y1="'+T+'" x2="'+X(yr)+'" y2="'+(H-B)+'" stroke="#d64535" stroke-dasharray="4 3"/><circle cx="'+X(yr)+'" cy="'+Y(PJ_POP[i])+'" r="5" fill="#d64535"/>';
  g+='<text x="'+(W/2+L/2)+'" y="'+(H-1)+'" class="ax">연도</text>';
  $('pjLine').setAttribute('viewBox','0 0 '+W+' '+H); $('pjLine').innerHTML=g;
  const d=i>0?PJ_POP[i]-PJ_POP[i-1]:null;
  $('pjReadout').innerHTML='<b>'+yr+'년</b> · 주민 등록 인구수 <b>'+PJ_F(PJ_POP[i])+'</b>명'+(d==null?'':' · 전년보다 <b>'+PJ_F(Math.abs(d))+'</b>명 '+(d>=0?'늘었어요':'줄었어요'))+' · 출생아 수 <b>'+PJ_F(PJ_BIRTH[i])+'</b>명';
}
$('pjYear').oninput=()=>{const y=+$('pjYear').value; pjLineDraw(y); pjBarDraw();};

/* 05 막대그래프 (겹쳐 그리기 / 출생아 수만) */
let pjMode=0;
function pjBarDraw(){
  const W=460,H=270,L=70,R=10,T=14,B=34, mx=pjMode===0?52e6:7e5, n=PJ_YEARS.length, bw=(W-L-R)/n, yr=+$('pjYear').value;
  const Y=v=>T+(H-T-B)*(1-v/mx); let g='';
  const ticks=pjMode===0?[0,1e7,2e7,3e7,4e7,5e7]:[0,1e5,2e5,3e5,4e5,5e5,6e5,7e5];
  ticks.forEach(v=>{g+='<line x1="'+L+'" y1="'+Y(v)+'" x2="'+(W-R)+'" y2="'+Y(v)+'" stroke="#e6e3dc"/><text x="'+(L-6)+'" y="'+(Y(v)+4)+'" class="ay">'+PJ_F(v)+'</text>';});
  PJ_YEARS.forEach((y,i)=>{
    const x=L+i*bw+bw*.12, w=bw*.76;
    if(pjMode===0) g+='<rect x="'+x+'" y="'+Y(PJ_POP[i])+'" width="'+w+'" height="'+(Y(0)-Y(PJ_POP[i]))+'" fill="#2f6fd0"/>';
    g+='<rect x="'+x+'" y="'+Y(PJ_BIRTH[i])+'" width="'+w+'" height="'+Math.max(1,Y(0)-Y(PJ_BIRTH[i]))+'" fill="#e0702b"/>';
    if(y===yr) g+='<rect x="'+(x-1.5)+'" y="'+T+'" width="'+(w+3)+'" height="'+(H-B-T)+'" fill="none" stroke="#d64535" stroke-width="2"/>';
    if([1997,2000,2005,2010,2015,2020,2022].includes(y)) g+='<text x="'+(x+w/2)+'" y="'+(H-14)+'" class="ax">'+y+'</text>';
  });
  g+='<path d="M'+L+' '+T+'V'+(H-B)+'H'+(W-R)+'" fill="none" stroke="#16202c" stroke-width="1.4"/><text x="'+(W/2+L/2)+'" y="'+(H-1)+'" class="ax">연도</text>';
  $('pjBar').setAttribute('viewBox','0 0 '+W+' '+H); $('pjBar').innerHTML=g;
  $('pjBarLeg').innerHTML=(pjMode===0?'<span><i style="background:#2f6fd0"></i>주민 등록 인구수</span>':'')+'<span><i style="background:#e0702b"></i>출생아 수</span><span class="muted">빨간 테두리는 위에서 고른 연도(<b>'+yr+'년</b>)예요.</span>';
}
(function(){
  const B=$('pjBarMode'); const L=['인구수와 출생아 수 함께','출생아 수만'];
  B.innerHTML=L.map((t,i)=>'<button type="button" data-i="'+i+'">'+t+'</button>').join('');
  const bs=[...B.querySelectorAll('button')];
  const set=i=>{pjMode=i; bs.forEach((b,j)=>b.classList.toggle('on',j===i)); pjBarDraw();};
  bs.forEach((b,i)=>b.onclick=()=>set(i)); set(0);
})();
pjLineDraw(+$('pjYear').value);

/* 06 pyrun ② 1인 가구 비율 */
pyrun('pjRun2',{rows:11,code:[
"# 1인 가구 비율(%) = 1인 가구 ÷ 일반 가구 × 100  (2000~2022년 가운데 일부)",
"households = {2000: (2224433, 14311807), 2010: (4142165, 17339422),",
"              2020: (6643354, 20926710), 2022: (7502350, 21773507)}",
"csv_rate = {2000: 15.5, 2010: 23.9, 2020: 31.7, 2022: 34.5}   # 내려받은 파일에 적힌 비율",
"",
"for year, (one, total) in households.items():",
"    rate = one / total * 100",
"    same = round(rate, 1) == csv_rate[year]",
"    print(year, f'{one:,} ÷ {total:,} × 100 =', round(rate, 1), '%', '(파일과 같아요)' if same else '(달라요)')"
].join('\n')});
bars('pjHH',PJ_HH.map(r=>[String(r[0]),r[1],'#2f9a5a']),{dec:1,unit:'%',max:40,w:460,h:250});

/* 08 활동을 5단계에 맞게 분류 */
sorter('pjUnitSort',{
  cats:PJ_CATS,
  items:[
    {t:'5연패에 빠진 축구팀의 첫 승리를 위해 선발팀을 구성해야 한다고 정한다',short:'선발팀 구성 문제 정하기',c:0,ic:'⚽',w:'풀어야 할 문제를 정하는 일은 문제 탐색 및 정의 단계예요.'},
    {t:'캐글에서 players_21.csv 파일을 내려받는다',short:'선수 데이터 내려받기',c:1,ic:'📥',w:'필요한 데이터를 모으는 일은 데이터 수집 단계예요.'},
    {t:'선수들의 사생활을 침해하거나 민감한 내용이 들어 있지 않은지 살핀다',short:'민감한 내용 살피기',c:1,ic:'🔐',w:'교과서는 수집할 때 사생활 침해나 민감한 내용이 없는지 살피라고 해요.'},
    {t:'엑셀에서 파일 원본을 UTF-8로 골라 글자가 깨지지 않게 연다',short:'UTF-8로 열기',c:2,ic:'🔤',w:'파일을 열고 확인하는 일은 데이터 처리 단계예요.'},
    {t:'오렌지의 File 위젯으로 파일을 열고 Info를 확인한다',short:'File 위젯으로 열기',c:2,ic:'🍊',w:'데이터가 어떻게 생겼는지 살피는 일은 데이터 처리 단계예요.'},
    {t:'Select Rows로 뽑은 선수들을 Bar Plot으로 나타낸다',short:'Select Rows → Bar Plot',c:3,ic:'📊',w:'그래프로 나타내는 일은 데이터 시각화 단계예요.'},
    {t:'주민 등록 인구수와 출생아 수를 plt.bar로 막대그래프에 그린다',short:'인구·출생아 막대그래프',c:3,ic:'📈',w:'그래프로 나타내는 일은 데이터 시각화 단계예요.'},
    {t:'분석 결과를 선수를 고르는 하나의 기준으로만 삼지 않고 종합해 활용한다',short:'결과를 종합해 활용',c:4,ic:'🧭',w:'결과의 의미를 해석하고 활용하는 일은 분석 결과 해석 단계예요.'},
    {t:'근거 데이터와 함께 우리나라 인구 변화 현황을 해석한다',short:'인구 변화 해석',c:4,ic:'🖼️',w:'결과의 의미를 해석하는 일은 분석 결과 해석 단계예요.'},
  ],
  end:'<b>정리</b> 문제 정하기 → 데이터 모으기 → 고치기 → 그리기 → 읽기. 스포츠도 인구도 같은 흐름이었어요.'
});

/* 08 도구 ↔ 하는 일 짝 맞추기 */
const PJM=[
  ['File 위젯','오렌지에서 데이터 파일을 불러와요'],
  ['Data Table 위젯','데이터를 표 형태로 확인해요'],
  ['Feature Statistics 위젯','속성별 통계 정보와 도수 분포를 한꺼번에 봐요'],
  ['Select Rows 위젯','조건에 맞는 행(선수)만 뽑아요'],
  ['Bar Plot 위젯','뽑아낸 데이터를 막대그래프로 나타내요'],
  ['pd.merge','연도 같은 열을 기준으로 두 데이터를 한 개로 합쳐요'],
];
const PJM_COL=['#d64535','#e0702b','#c98a0a','#1f9d74','#2f6fd0','#9b4fc4'];
(function(){
  const L=$('pjmL'), R=$('pjmR'), msg=$('pjmMsg'); let selL=-1, done=0;
  const shuf=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
  function draw(){
    selL=-1; done=0; msg.textContent='';
    const li=shuf(PJM.map((_,i)=>i)), ri=shuf(PJM.map((_,i)=>i));
    L.innerHTML=li.map(i=>'<button type="button" data-i="'+i+'">'+PJM[i][0]+'</button>').join('');
    R.innerHTML=ri.map(i=>'<button type="button" data-i="'+i+'">'+PJM[i][1]+'</button>').join('');
    const lb=[...L.children], rb=[...R.children];
    lb.forEach(b=>b.onclick=()=>{ if(b.classList.contains('ok')) return; lb.forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); selL=+b.dataset.i; msg.textContent='이 도구가 하는 일을 오른쪽에서 골라요.'; });
    rb.forEach(b=>b.onclick=()=>{
      if(b.classList.contains('ok')) return;
      if(selL<0){ msg.textContent='먼저 왼쪽 도구를 눌러요.'; return; }
      if(+b.dataset.i===selL){
        const lbtn=lb.find(x=>+x.dataset.i===selL);
        [lbtn,b].forEach(x=>{x.classList.remove('sel'); x.classList.add('ok'); x.style.setProperty('--c',PJM_COL[selL]);});
        done++; selL=-1; msg.textContent=done===PJM.length?'모두 짝을 찾았어요! 🎉':'맞아요! ('+done+' / '+PJM.length+')';
      } else { b.classList.add('no'); setTimeout(()=>b.classList.remove('no'),500); msg.textContent='다시 생각해 봐요. 도구를 다시 눌러 골라도 돼요.'; }
    });
  }
  $('pjmReset').onclick=draw; draw();
})();

/* 08 스스로 확인하기 O/X · 내 생각 (정답 표시 없음) */
chips('ox1','ox1Key',['O','X'],false);
chips('ox2','ox2Key',['O','X'],false);
chips('ox3','ox3Key',['O','X'],false);
chips('ox4','ox4Key',['O','X'],false);
chips('ox5','ox5Key',['O','X'],false);

/* 08 스스로 평가하기 · 방사형 그래프 */
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
    g+='<polygon fill="rgba(47,154,90,.28)" stroke="#2f9a5a" stroke-width="2" points="'+v.map((x,i)=>P(i,R*x/5).join(',')).join(' ')+'"/>';
    v.forEach((x,i)=>{const p=P(i,R*x/5); g+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3.5" fill="#2f9a5a"/>';});
  }
  $('pjRadar').setAttribute('viewBox','0 0 360 300'); $('pjRadar').innerHTML=g;
}
[0,1,2,3,4].forEach(i=>$('rd'+i).addEventListener('memo',pjRadar));
pjRadar();

/* 09 마무리 */
const MEMOLIST=[['planMemo','나의 계획 · 인구 변화 예상'],['pjCon1','고려할 점 · 1단계'],['pjCon2','고려할 점 · 2단계'],['pjCon3','고려할 점 · 3단계'],['pjCon4','고려할 점 · 4단계'],['pjCon5','고려할 점 · 5단계'],['pjTopic','우리 모둠의 세부 주제'],['pjStat','통계 데이터 수집 정리'],['pjText','텍스트 데이터 수집 정리'],['pjExtra','추가 데이터 수집 정리'],['pjProc','데이터 처리하며 알게 된 점'],['pjLineRead','선그래프에서 읽은 것'],['pjBarRead','막대그래프에서 알게 된 점'],['pjVizCode','시각화 · 그래프 코드와 데이터 코드'],['pjVizResult','시각화 결과로 알게 된 것'],['pjKeyword','워드 클라우드 핵심 키워드'],['pjEvid','근거 데이터'],['pjInterp','결과 해석'],['pjInfoTopic','기획서 · 분석 주제'],['pjInfoGoal','기획서 · 제작 목적'],['pjInfoWho','기획서 · 공개 대상'],['pjInfoEffect','기획서 · 기대 효과'],['pjInfoData','기획서 · 인포그래픽 데이터'],['pjFld','핵심 개념 · 분석 주제와 융합 분야'],['pjRole','핵심 개념 · 역할'],['pjCap','핵심 개념 · 필요 역량'],['pjApp1','응용 사례 1'],['pjApp2','응용 사례 2'],['pjApp3','응용 사례 3'],['pjJob1','진로 탐색 · 인문·사회'],['pjJob2','진로 탐색 · 과학·공학'],['pjJob3','진로 탐색 · 예체능 외'],['pjSum1','정리 · 문제 탐색 및 정의'],['pjSum2','정리 · 데이터 수집'],['pjSum3','정리 · 데이터 처리'],['pjSum4','정리 · 데이터 시각화'],['pjSum5','정리 · 분석 결과 해석'],['pjAdv1','장점 · 의료 관련 데이터 분석'],['pjAdv2d','기온·기후 관련 수집 데이터'],['pjAdv2','장점 · 기온·기후 관련 데이터 분석'],['pjAdv3f','내가 고른 분야'],['pjAdv3d','내가 고른 분야 · 수집 데이터'],['pjAdv3','내가 고른 분야 · 장점'],['ox1Key','O/X ❶'],['ox2Key','O/X ❷'],['ox3Key','O/X ❸'],['ox4Key','O/X ❹'],['ox5Key','O/X ❺'],['pjRd0','평가 · 창의적 사고'],['pjRd1','평가 · 협력적 소통'],['pjRd2','평가 · 자기 관리'],['pjRd3','평가 · 지식 정보 처리'],['pjRd4','평가 · 공동체적 역량'],['keyQ','오늘의 질문에 대한 내 답']];
onShow[9]=()=>memoSummary('msum',MEMOLIST);
