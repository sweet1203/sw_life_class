/* u5-project 전용 (pp-) — 공용 부품 pyrun · sorter · chips 사용 */
const PP_CATS=[{n:'1 아이디어 기획',k:'#d64535'},{n:'2 해결 방안 모색',k:'#e0702b'},{n:'3 기능 구현',k:'#c98a0a'},{n:'4 홍보 자료 제작',k:'#1f9d74'},{n:'5 투자자 모집',k:'#2f6fd0'}];

/* 01 단계에 맞는 활동 찾기 */
sorter('ppStepSort',{
  cats:PP_CATS,
  items:[
    {t:'목표, 소프트웨어 명, 특징, 추가 기능, 화면 구성을 개발 계획서에 쓴다',short:'개발 계획서 쓰기',c:0,ic:'📋',w:'우리 모둠의 아이디어를 계획서로 정리하는 일은 아이디어 기획 단계예요.'},
    {t:'앞에서 쓴 〈해 보기〉 의견들을 하나로 모아 모둠의 계획을 세운다',short:'의견을 모아 계획 세우기',c:0,ic:'🧩',w:'교과서는 해 보기 의견을 하나로 모아 개발 계획서를 쓰라고 안내해요.'},
    {t:'추가하려는 기능을 구현할 때 예상되는 문제점을 생각한다',short:'예상되는 문제점 생각',c:1,ic:'🧱',w:'기능을 만들기 전에 걸림돌을 떠올리는 일은 해결 방안 모색 단계예요.'},
    {t:'예상되는 문제점마다 어떻게 해결할지 방안을 적는다',short:'해결 방안 적기',c:1,ic:'💡',w:'문제점과 함께 해결 방안을 쓰는 일도 해결 방안 모색 단계예요.'},
    {t:'우리 모둠의 아이디어를 개발 도구로 나타내 기능을 구현한다',short:'개발 도구로 기능 구현',c:2,ic:'🛠️',w:'아이디어를 직접 만들어 보는 일은 기능 구현 단계예요.'},
    {t:'기능마다 현재 상태와 만족도(별점), 개선안을 적는다',short:'현재 상태·만족도·개선안',c:2,ic:'⭐',w:'구현한 기능을 돌아보고 개선안을 적는 일도 기능 구현 단계예요.'},
    {t:'피치덱에 반드시 포함할 내용과 2차 개발 계획을 정한다',short:'피치덱 내용·2차 개발 계획',c:3,ic:'📑',w:'투자자를 위한 자료에 넣을 내용을 정하는 일은 홍보 자료 제작 단계예요.'},
    {t:'모둠원들과 함께 소프트웨어를 소개하는 슬라이드를 만든다',short:'소개 슬라이드 만들기',c:3,ic:'🖥️',w:'소프트웨어를 소개하는 자료를 만드는 일도 홍보 자료 제작 단계예요.'},
    {t:'다른 모둠의 발표를 듣고 투자 금액과 그 이유를 쓴다',short:'투자 금액·이유 쓰기',c:4,ic:'💰',w:'발표를 듣고 투자 금액을 정하는 일은 투자자 모집 단계예요.'},
    {t:'가장 많은 투자를 받은 모둠과 우리 모둠의 차이점을 이야기한다',short:'차이점 이야기하기',c:4,ic:'💬',w:'투자 결과를 보고 차이점과 피드백을 정리하는 일도 투자자 모집 단계예요.'},
  ],
  end:'<b>정리</b> 기획하기(1) → 걸림돌 생각하기(2) → 만들기(3) → 알리기(4) → 투자받기(5)의 흐름으로 기억하면 좋아요.'
});

/* 04 만족도 별점 */
const PP_STARS=['★☆☆☆☆','★★☆☆☆','★★★☆☆','★★★★☆','★★★★★'];
chips('ppSt1','ppStar1',PP_STARS,false);
chips('ppSt2','ppStar2',PP_STARS,false);
chips('ppSt3','ppStar3',PP_STARS,false);
chips('ppSt4','ppStar4',PP_STARS,false);
function ppAvg(){
  const v=[1,2,3,4].map(i=>(String(MEMO['ppStar'+i]||'').match(/★/g)||[]).length).filter(n=>n>0);
  $('ppAvg').innerHTML=v.length?'별점을 준 기능 <b>'+v.length+'개</b> · 평균 만족도 <b>'+(v.reduce((a,b)=>a+b,0)/v.length).toFixed(1)+'</b> / 5 <span class="muted">· 별이 적은 기능에 개선안을 더 적어 보세요.</span>':'별점을 고르면 우리 모둠의 평균 만족도가 나와요.';
}
[1,2,3,4].forEach(i=>$('ppSt'+i).addEventListener('memo',ppAvg));
ppAvg();

/* 05 피치덱 구성 순서 */
const PP_ORD=[{n:'❶',k:'#d64535'},{n:'❷',k:'#e0702b'},{n:'❸',k:'#c98a0a'},{n:'❹',k:'#1f9d74'},{n:'❺',k:'#2f6fd0'}];
sorter('ppPitchSort',{cats:PP_ORD,items:[
  {t:'모둠 소개 · 모둠명 및 모둠원의 역할과 강점을 소개한다',short:'모둠 소개',c:0,ic:'👥',w:'먼저 모둠과 모둠원의 역할·강점을 소개해요.'},
  {t:'문제 · 해결하고자 하는 문제를 안내한다',short:'문제',c:1,ic:'❓',w:'다음으로 우리가 해결하려는 문제를 안내해요.'},
  {t:'솔루션 · 문제 해결 방안과, 해결 방안이 어떤 점에서 혁신적인지 설명한다',short:'솔루션',c:2,ic:'💡',w:'문제 다음에 해결 방안과 혁신적인 점을 설명해요.'},
  {t:'제품 · 제품의 구성과 특징을 소개하고 경쟁 상품과의 차별성을 강조한다',short:'제품',c:3,ic:'📱',w:'솔루션 다음에 제품의 구성·특징과 차별성을 소개해요.'},
  {t:'목표 · 향후 추가 개발 및 목표를 제시한다',short:'목표',c:4,ic:'🎯',w:'마지막으로 앞으로의 추가 개발과 목표를 제시해요.'},
],end:'<b>정리</b> 모둠 소개 → 문제 → 솔루션 → 제품 → 목표 순서는 교과서의 <b>구성 예시</b>예요. 우리 모둠에 맞게 바꿔도 좋아요.'});

/* 06 투자 체험 */
(function(){
  const N=4, el=id=>$(id), F=n=>Number(n).toLocaleString('en-US')+'원';
  const budget=()=>parseInt(String(el('ppBudget').value||'').replace(/[^0-9]/g,''),10)||0;
  function setup(){
    const B=budget(), step=(B>0&&B%100===0)?B/100:1;
    for(let i=1;i<=N;i++){
      const s=el('ppIv'+i); let v=+(MEMO['ppIv'+i]||s.value||0);
      s.max=B; s.step=step; s.disabled=B===0;
      if(v>B) v=B; s.value=v;
    }
  }
  function calc(){
    const B=budget(); let sum=0;
    for(let i=1;i<=N;i++){ const v=+el('ppIv'+i).value||0; sum+=v; el('ppAm'+i).textContent=F(v); }
    const left=B-sum, box=el('ppSum'); box.className='pp-sum';
    if(B===0){ box.textContent='총 투자 예산을 먼저 써 보세요.'; return; }
    let best=0, who=-1; for(let i=1;i<=N;i++){ const v=+el('ppIv'+i).value||0; if(v>best){best=v;who=i;} }
    const nm=i=>(el('ppTn'+i).value||'').trim()||('모둠 '+i);
    let msg='총 투자 예산 <b>'+F(B)+'</b> · 투자 합계 <b>'+F(sum)+'</b> · 남은 예산 <b>'+F(Math.max(left,0))+'</b>';
    if(left===0){ box.classList.add('ok'); msg+='<br>✅ 예산을 남김없이 모두 썼어요.'; }
    else if(left>0) msg+='<br>아직 쓰지 않은 예산이 있어요. 예산은 남김없이 사용해야 해요.';
    else { box.classList.add('over'); msg+='<br>⚠️ 예산을 '+F(-left)+' 넘었어요. 금액을 줄여 보세요.'; }
    if(who>0) msg+='<br>가장 많이 투자한 모둠: <b>'+esc(nm(who))+'</b> ('+F(best)+')';
    box.innerHTML=msg;
  }
  setup(); calc();
  $('ppBudget').addEventListener('input',()=>{setup();calc();});
  for(let i=1;i<=N;i++){ el('ppIv'+i).addEventListener('input',calc); el('ppTn'+i).addEventListener('input',calc); }
  setTimeout(()=>{setup();calc();},0);
})();

/* 06 pyrun · 예산 배분 확인 (연습용 숫자) */
pyrun('ppRun',{rows:19,code:[
"# 연습용 숫자예요. 우리 반에서 정한 값으로 바꿔 보세요.",
"총예산 = 1000000",
"투자 = {'가 모둠': 300000, '나 모둠': 450000, '다 모둠': 150000, '라 모둠': 100000}",
"",
"합계 = 0",
"for 모둠, 금액 in 투자.items():",
"    합계 = 합계 + 금액",
"    print(모둠, f'{금액:,}원')",
"",
"남은돈 = 총예산 - 합계",
"print('투자 합계', f'{합계:,}원')",
"print('남은 돈', f'{남은돈:,}원')",
"if 남은돈 == 0:",
"    print('예산을 남김없이 모두 썼어요')",
"elif 남은돈 > 0:",
"    print('아직 쓰지 않은 예산이 있어요')",
"else:",
"    print('예산을 넘었어요')",
"print('가장 많이 받은 모둠:', max(투자, key=투자.get))"
].join('\n')});

/* 07 단계별 살펴볼 역량 */
const PP_COMP=['창의·융합','의사소통','협업','문제 해결'];
chips('ppEv1','ppEvK1',PP_COMP,true);
chips('ppEv2','ppEvK2',PP_COMP,true);
chips('ppEv3','ppEvK3',PP_COMP,true);
chips('ppEv4','ppEvK4',PP_COMP,true);
chips('ppEv5','ppEvK5',PP_COMP,true);

/* 09 활동을 수행 단계에 맞게 분류 */
const PP_UCATS=[{n:'주제 탐색·요구 분석',k:'#d64535'},{n:'주제 선정',k:'#e0702b'},{n:'해결 아이디어 구안',k:'#c98a0a'},{n:'설계 및 제작',k:'#1f9d74'},{n:'소프트웨어 평가',k:'#2f6fd0'}];
sorter('ppUnitSort',{
  cats:PP_UCATS,
  items:[
    {t:'구글 트렌드로 두 검색어에 대한 사람들의 관심도를 비교한다',short:'구글 트렌드로 관심도 비교',c:0,ic:'🔍',w:'교과서는 구글 트렌드 활용을 주제 탐색과 사용자 요구 분석에서 소개해요.'},
    {t:'사용자 요구를 분석하면서 다양한 의견을 수렴한다',short:'다양한 의견 수렴',c:0,ic:'👂',w:'사용자 요구를 분석하는 일은 주제 탐색과 사용자 요구 분석 단계예요.'},
    {t:'불편함을 해결할 수 있는 주제를 고른다',short:'불편함을 해결할 주제 고르기',c:1,ic:'🎯',w:'어떤 주제로 할지 정하는 일은 주제 선정 단계예요.'},
    {t:'미래에도 계속 중요하게 유지될 수 있는 주제인지 따져 본다',short:'계속 중요한 주제인지 따지기',c:1,ic:'🔭',w:'주제를 고를 때 따져 보는 점이므로 주제 선정 단계예요.'},
    {t:'토론하며 여러 구성원의 의견을 모아 해결 아이디어를 낸다',short:'토론으로 아이디어 내기',c:2,ic:'🗣️',w:'아이디어를 내는 일은 해결 아이디어 구안 단계예요.'},
    {t:'소프트웨어로 구현할 수 있는 해결 아이디어를 제시한다',short:'구현 가능한 아이디어 제시',c:2,ic:'💡',w:'구현할 수 있는 아이디어를 정하는 일도 해결 아이디어 구안 단계예요.'},
    {t:'앱 사용 절차를 순서도로 그려 알고리즘을 설계한다',short:'순서도로 알고리즘 설계',c:3,ic:'🧭',w:'설계는 소프트웨어 설계 및 제작 단계에 들어가요.'},
    {t:'앱인벤터로 화면과 기능을 만든다',short:'앱인벤터로 만들기',c:3,ic:'🛠️',w:'앱을 만드는 일은 소프트웨어 설계 및 제작 단계예요.'},
    {t:'스마트폰에서 앱을 실행해 오류를 찾아 고친다',short:'테스트하고 오류 고치기',c:3,ic:'🧪',w:'테스트와 배포도 설계 및 제작 단계에 들어가요.'},
    {t:'사회적, 기능적, 윤리적 관점에서 소프트웨어의 가치를 따져 본다',short:'세 가지 가치로 평가',c:4,ic:'⚖️',w:'공개되었을 때의 영향을 생각해 보는 일은 소프트웨어 평가 단계예요.'},
  ],
  end:'<b>정리</b> 탐색·요구 분석 → 주제 선정 → 아이디어 구안 → 설계 및 제작 → 평가의 흐름이에요.'
});

/* 09 낱말 ↔ 뜻 짝 맞추기 */
const PPM=[
  ['테스트','기능이 정확하게 작동하는지 확인하고 오류를 찾아 고치는 단계'],
  ['패키징 및 배포','스마트폰에서 앱을 직접 실행할 수 있게 프로그램을 만들어 설치하는 과정'],
  ['소프트웨어 평가','공개되었을 때 사용자에게 미칠 영향을 따져 보는 일'],
  ['윤리적 가치','소프트웨어 개발과 사용에 대한 도덕적인 원칙과 가치'],
  ['피치덱','투자 유치를 위해 짧은 시간 동안 발표하는 홍보 자료'],
  ['예상되는 문제점','기능을 구현하기 위해 필요한 모든 활동'],
];
const PPM_COL=['#d64535','#e0702b','#c98a0a','#1f9d74','#2f6fd0','#9b4fc4'];
(function(){
  const L=$('ppmL'), R=$('ppmR'), msg=$('ppmMsg'); let selL=-1, done=0;
  const shuf=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
  function draw(){
    selL=-1; done=0; msg.textContent='';
    const li=shuf(PPM.map((_,i)=>i)), ri=shuf(PPM.map((_,i)=>i));
    L.innerHTML=li.map(i=>'<button type="button" data-i="'+i+'">'+PPM[i][0]+'</button>').join('');
    R.innerHTML=ri.map(i=>'<button type="button" data-i="'+i+'">'+PPM[i][1]+'</button>').join('');
    const lb=[...L.children], rb=[...R.children];
    lb.forEach(b=>b.onclick=()=>{ if(b.classList.contains('ok')) return; lb.forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); selL=+b.dataset.i; msg.textContent='이 낱말의 뜻을 오른쪽에서 골라요.'; });
    rb.forEach(b=>b.onclick=()=>{
      if(b.classList.contains('ok')) return;
      if(selL<0){ msg.textContent='먼저 왼쪽 낱말을 눌러요.'; return; }
      if(+b.dataset.i===selL){
        const lbtn=lb.find(x=>+x.dataset.i===selL);
        [lbtn,b].forEach(x=>{x.classList.remove('sel'); x.classList.add('ok'); x.style.setProperty('--c',PPM_COL[selL]);});
        done++; selL=-1; msg.textContent=done===PPM.length?'모두 짝을 찾았어요! 🎉':'맞아요! ('+done+' / '+PPM.length+')';
      } else { b.classList.add('no'); setTimeout(()=>b.classList.remove('no'),500); msg.textContent='다시 생각해 봐요. 낱말을 다시 눌러 골라도 돼요.'; }
    });
  }
  $('ppmReset').onclick=draw; draw();
})();

/* 09 스스로 확인하기 O/X · 내 생각 (정답 표시 없음) */
chips('ox1','ox1Key',['O','X'],false);
chips('ox2','ox2Key',['O','X'],false);
chips('ox3','ox3Key',['O','X'],false);
chips('ox4','ox4Key',['O','X'],false);
chips('ox5','ox5Key',['O','X'],false);

/* 09 스스로 평가하기 · 방사형 그래프 */
const PP_RD=['창의적 사고','협력적 소통','자기 관리','지식 정보 처리','공동체적 역량'];
chips('rd0','ppRd0',['1','2','3','4','5'],false);
chips('rd1','ppRd1',['1','2','3','4','5'],false);
chips('rd2','ppRd2',['1','2','3','4','5'],false);
chips('rd3','ppRd3',['1','2','3','4','5'],false);
chips('rd4','ppRd4',['1','2','3','4','5'],false);
function ppRadar(){
  const cx=180, cy=150, R=90, ang=i=>-Math.PI/2+i*2*Math.PI/5, P=(i,r)=>[cx+Math.cos(ang(i))*r, cy+Math.sin(ang(i))*r];
  let g='';
  for(let k=1;k<=5;k++) g+='<polygon fill="none" stroke="#d9d6cd" points="'+PP_RD.map((_,i)=>P(i,R*k/5).join(',')).join(' ')+'"/>';
  PP_RD.forEach((n,i)=>{const e=P(i,R), t=P(i,R+18); g+='<line x1="'+cx+'" y1="'+cy+'" x2="'+e[0]+'" y2="'+e[1]+'" stroke="#d9d6cd"/><text x="'+t[0]+'" y="'+(t[1]+4)+'" style="font-size:12px;font-weight:700">'+n+'</text>';});
  const v=PP_RD.map((_,i)=>Math.max(0,Math.min(5,parseInt(MEMO['ppRd'+i],10)||0)));
  if(v.some(x=>x>0)){
    g+='<polygon fill="rgba(192,57,122,.25)" stroke="#c0397a" stroke-width="2" points="'+v.map((x,i)=>P(i,R*x/5).join(',')).join(' ')+'"/>';
    v.forEach((x,i)=>{const p=P(i,R*x/5); g+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3.5" fill="#c0397a"/>';});
  }
  $('ppRadar').setAttribute('viewBox','0 0 360 300'); $('ppRadar').innerHTML=g;
}
[0,1,2,3,4].forEach(i=>$('rd'+i).addEventListener('memo',ppRadar));
ppRadar();

/* 10 마무리 */
const MEMOLIST=[['planMemo','나의 계획 · 키오스크 앱에 더하고 싶은 기능'],['ppCon1','고려할 점 · 1단계'],['ppCon2','고려할 점 · 2단계'],['ppCon3','고려할 점 · 3단계'],['ppCon4','고려할 점 · 4단계'],['ppCon5','고려할 점 · 5단계'],['ppGoal','개발 계획서 · 목표'],['ppName','개발 계획서 · 소프트웨어 명'],['ppFeat','개발 계획서 · 특징'],['ppScreen','개발 계획서 · 화면 구성'],['ppAdd1','개발 계획서 · 추가 기능 1'],['ppAdd2','개발 계획서 · 추가 기능 2'],['ppAdd3','개발 계획서 · 추가 기능 3'],['ppAdd4','개발 계획서 · 추가 기능 4'],
 ['ppF1','추가 기능 ①'],['ppP1','예상되는 문제점 ①'],['ppS1','해결 방안 ①'],['ppF2','추가 기능 ②'],['ppP2','예상되는 문제점 ②'],['ppS2','해결 방안 ②'],['ppF3','추가 기능 ③'],['ppP3','예상되는 문제점 ③'],['ppS3','해결 방안 ③'],['ppF4','추가 기능 ④'],['ppP4','예상되는 문제점 ④'],['ppS4','해결 방안 ④'],
 ['ppCur1','기능 1 · 현재 상태'],['ppStar1','기능 1 · 만족도'],['ppImp1','기능 1 · 개선안'],['ppCur2','기능 2 · 현재 상태'],['ppStar2','기능 2 · 만족도'],['ppImp2','기능 2 · 개선안'],['ppCur3','기능 3 · 현재 상태'],['ppStar3','기능 3 · 만족도'],['ppImp3','기능 3 · 개선안'],['ppCur4','기능 4 · 현재 상태'],['ppStar4','기능 4 · 만족도'],['ppImp4','기능 4 · 개선안'],
 ['ppTeam','홍보 자료 · 모둠명'],['ppMust','홍보 자료 · 반드시 홍보할 내용'],['ppPlan2','홍보 자료 · 2차 개발 계획'],
 ['ppBudget','투자 · 총 투자 예산(연습용)'],['ppTn1','투자 · 모둠명 1'],['ppTf1','투자 · 모둠 1 소프트웨어 특징'],['ppIv1','투자 · 모둠 1 투자 금액'],['ppTr1','투자 · 모둠 1 투자 이유'],['ppTn2','투자 · 모둠명 2'],['ppTf2','투자 · 모둠 2 소프트웨어 특징'],['ppIv2','투자 · 모둠 2 투자 금액'],['ppTr2','투자 · 모둠 2 투자 이유'],['ppTn3','투자 · 모둠명 3'],['ppTf3','투자 · 모둠 3 소프트웨어 특징'],['ppIv3','투자 · 모둠 3 투자 금액'],['ppTr3','투자 · 모둠 3 투자 이유'],['ppTn4','투자 · 모둠명 4'],['ppTf4','투자 · 모둠 4 소프트웨어 특징'],['ppIv4','투자 · 모둠 4 투자 금액'],['ppTr4','투자 · 모둠 4 투자 이유'],['ppDiff','투자 · 차이점'],['ppFeed','투자 · 우리 모둠에 대한 피드백'],
 ['ppEvK1','돌아보기 · 아이디어 기획 역량'],['ppEvT1','돌아보기 · 아이디어 기획'],['ppEvK2','돌아보기 · 해결 방안 모색 역량'],['ppEvT2','돌아보기 · 해결 방안 모색'],['ppEvK3','돌아보기 · 기능 구현 역량'],['ppEvT3','돌아보기 · 기능 구현'],['ppEvK4','돌아보기 · 홍보 자료 제작 역량'],['ppEvT4','돌아보기 · 홍보 자료 제작'],['ppEvK5','돌아보기 · 투자자 모집 역량'],['ppEvT5','돌아보기 · 투자자 모집'],
 ['ppAppName','핵심 개념 · 키오스크 앱 이름'],['ppFld1','핵심 개념 · 융합 분야 1'],['ppRole1','핵심 개념 · 역할 1'],['ppCap1','핵심 개념 · 필요 역량 1'],['ppFld2','핵심 개념 · 융합 분야 2'],['ppRole2','핵심 개념 · 역할 2'],['ppCap2','핵심 개념 · 필요 역량 2'],['ppApp1','응용 사례 1'],['ppApp2','응용 사례 2'],['ppApp3','응용 사례 3'],
 ['ppJ11','진로 · 인문 사회 · 구상 단계'],['ppJ12','진로 · 인문 사회 · 제작 단계'],['ppJ13','진로 · 인문 사회 · 사용 단계'],['ppJ21','진로 · 과학 공학 · 구상 단계'],['ppJ22','진로 · 과학 공학 · 제작 단계'],['ppJ23','진로 · 과학 공학 · 사용 단계'],['ppJ31','진로 · 예체능 외 · 구상 단계'],['ppJ32','진로 · 예체능 외 · 제작 단계'],['ppJ33','진로 · 예체능 외 · 사용 단계'],
 ['ppPro','정리 1 · 장점'],['ppCon','정리 1 · 단점'],['ppConc','정리 1 · 결론'],['ppSum1','정리 2 · 주제 탐색과 사용자 요구 분석'],['ppSum2','정리 2 · 주제 선정'],['ppSum3','정리 2 · 해결 아이디어 구안'],['ppSum4','정리 2 · 소프트웨어 설계 및 제작'],['ppSum5','정리 2 · 소프트웨어 평가'],
 ['ox1Key','O/X ❶'],['ox2Key','O/X ❷'],['ox3Key','O/X ❸'],['ox4Key','O/X ❹'],['ox5Key','O/X ❺'],['ppRd0','평가 · 창의적 사고'],['ppRd1','평가 · 협력적 소통'],['ppRd2','평가 · 자기 관리'],['ppRd3','평가 · 지식 정보 처리'],['ppRd4','평가 · 공동체적 역량'],['keyQ','오늘의 질문에 대한 내 답']];
onShow[10]=()=>memoSummary('msum',MEMOLIST);
