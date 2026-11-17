/* 01 단계에 맞는 활동 찾기 (분류) */
sorter('stepGame',{
  cats:[{n:'1 문제 탐색',k:'#d64535'},{n:'2 문제 정의',k:'#e0702b'},{n:'3 아이디어 도출',k:'#c98a0a'},{n:'4 프로토타입 제작',k:'#1f9d74'},{n:'5 공유 및 평가',k:'#2f6fd0'}],
  items:[
    {t:'최대한 많은 문제 상황을 조사한다',short:'문제 상황 조사',c:0,ic:'🔍',w:'많은 문제 상황을 조사하는 것은 1단계 문제 탐색이에요.'},
    {t:'더 많은 사람이 피해를 입는 문제를 우선순위로 정한다',short:'피해가 큰 문제 우선',c:0,ic:'📊',w:'문제 탐색에서 피해를 입는 사람이 많은 문제를 먼저 골라요.'},
    {t:'주제와 문제 상황, 발생되는 문제를 정리한다',short:'주제·문제 상황 정리',c:1,ic:'🧾',w:'주제, 문제 상황, 발생되는 문제를 적는 것은 2단계 문제 정의예요.'},
    {t:'문제 해결에 필요한 센서와 액추에이터를 탐색한다',short:'센서·액추에이터 탐색',c:2,ic:'📡',w:'필요한 센서와 액추에이터를 찾고 설계도를 그리는 것은 3단계 아이디어 도출이에요.'},
    {t:'제작 과정을 순서대로 정리하고 그 순서에 따라 만든다',short:'제작 과정 정리·제작',c:3,ic:'🔧',w:'제작 과정을 단계별로 정리해서 만드는 것은 4단계예요.'},
    {t:'개발한 창작물을 모둠별로 소개하고 다른 모둠의 발표를 정리한다',short:'창작물 소개·발표 정리',c:4,ic:'📣',w:'창작물을 소개하고 다른 모둠 발표를 정리하는 것도 5단계예요.'},
  ],
  end:'<b>정리</b> 찾기(1) → 정하기(2) → 구상하기(3) → 만들기(4) → 나누기(5)의 흐름으로 기억하면 좋아요.'
});

/* 02 기사 · 역할 */
chips('artPick','artPickKey',['기사 1','기사 2','기사 3','기사 4'],false);
chips('roleChips','myRole',['프로젝트 리더','하드웨어 및 소프트웨어 엔지니어','사회적 연구 및 커뮤니케이션 담당자','그 밖의 역할'],false);

/* 04 센서·액추에이터 후보 (이 단원에서 만난 부품) */
chips('senChips','senPick',['초음파 센서','온습도 센서','압력 센서','심박 측정 센서','미세 먼지 센서'],true);
chips('actChips','actPick',['피에조 버저','네오픽셀 LED','DC 모터','서보 모터'],true);

/* 06 돌아보기 */
chips('stageCheck','stagePick',['1 문제 탐색','2 문제 정의','3 아이디어 도출','4 프로토타입 제작','5 공유 및 평가'],true);
chips('compCheck','compPick',['창의·융합','의사소통','추상화','협업','문제 해결'],true);

/* 08 단원 개념 분류 */
sorter('unitSort',{
  cats:[{n:'미디어 아트',k:'#9b4fc4'},{n:'센서·액추에이터',k:'#d0602f'},{n:'피코와 파이썬',k:'#1f9d74'},{n:'웨어러블 장치',k:'#2f6fd0'}],
  items:[
    {t:'관람자와 작품 사이에 상호 작용을 유도해 작품이 변하고 반응해요',short:'관람자와 상호 작용',c:0,ic:'🎨',w:'인터랙티브 아트의 설명이에요. 미디어 아트의 한 갈래예요.'},
    {t:'모터, 기어, 동력원을 사용해 작품이 움직이고 변하는 효과를 표현해요',short:'움직이는 작품',c:0,ic:'⚙️',w:'키네틱 아트의 설명이에요. 미디어 아트의 한 갈래예요.'},
    {t:'빛, 소리, 온도, 압력 같은 환경 정보의 변화를 전기 신호로 바꿔 줘요',short:'변화를 전기 신호로',c:1,ic:'📡',w:'센서의 설명이에요.'},
    {t:'전기 신호를 빛, 소리, 힘 같은 물리적인 형태로 바꿔 줘요',short:'전기 신호를 빛·소리·힘으로',c:1,ic:'💡',w:'액추에이터의 설명이에요.'},
    {t:'센서로부터 물체까지의 거리를 초음파로 측정해요',short:'초음파로 거리 측정',c:1,ic:'📏',w:'초음파 센서가 하는 일이에요.'},
    {t:'마이크로컨트롤러에서 효율적으로 실행되도록 파이썬의 기능을 일부 제한한 간결한 언어예요',short:'마이크로파이썬',c:2,ic:'🐍',w:'마이크로파이썬의 설명이에요. 피코를 제어하는 언어예요.'},
    {t:'ADC로 읽은 센서값을 전압으로, 다시 bpm으로 계산해요',short:'ADC로 읽고 bpm 계산',c:2,ic:'🔢',w:'심박 측정 센서의 값을 피코에서 처리하는 코드예요.'},
    {t:'buzzer.freq( )로 버저의 주파수를 정해요',short:'버저 주파수 설정',c:2,ic:'🔔',w:'피코에서 버저를 제어하는 코드예요.'},
    {t:'심박수가 정상 범위를 벗어나면 경고음이 울리는 장치예요',short:'경고음 모니터링 장치',c:3,ic:'💓',w:'이 단원에서 만든 웨어러블 모니터링 장치예요.'},
    {t:'개인의 건강이나 수면, 생활 패턴 등을 측정하고 분석해 데이터를 제공해요',short:'건강·생활 패턴 측정',c:3,ic:'⌚',w:'웨어러블 장치가 하는 일이에요.'},
  ],
  end:'<b>정리</b> 미디어 아트 → 센서·액추에이터 → 피코와 파이썬 → 웨어러블 장치로 이어지는 단원이었어요.'
});

/* 08 낱말 ↔ 뜻 짝 맞추기 */
const PJM=[
  ['센서','빛, 소리, 온도, 압력 같은 환경 정보의 변화를 전기 신호로 바꿔 주는 기계 장치'],
  ['액추에이터','시스템을 움직이거나 제어하는 데 쓰이는 기계 장치(구동기)'],
  ['피지컬 컴퓨팅','센서와 액추에이터로 물리적인 현상을 감지하고 제어하는 기술'],
  ['인터랙티브 아트','관람자와 작품 사이의 상호 작용으로 작품이 변하고 반응하는 예술'],
  ['키네틱 아트','모터, 기어, 동력원으로 작품이 움직이는 효과를 표현하는 예술'],
  ['모션 캡처','몸에 센서를 붙이거나 적외선을 이용해 인체의 움직임을 디지털로 기록하는 작업'],
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
    lb.forEach(b=>b.onclick=()=>{ if(b.classList.contains('ok')) return; lb.forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); selL=+b.dataset.i; msg.textContent='이 낱말의 뜻을 오른쪽에서 골라요.'; });
    rb.forEach(b=>b.onclick=()=>{
      if(b.classList.contains('ok')) return;
      if(selL<0){ msg.textContent='먼저 왼쪽 낱말을 눌러요.'; return; }
      if(+b.dataset.i===selL){
        const lbtn=lb.find(x=>+x.dataset.i===selL);
        [lbtn,b].forEach(x=>{x.classList.remove('sel'); x.classList.add('ok'); x.style.setProperty('--c',PJM_COL[selL]);});
        done++; selL=-1; msg.textContent=done===PJM.length?'모두 짝을 찾았어요! 🎉':'맞아요! ('+done+' / '+PJM.length+')';
      } else { b.classList.add('no'); setTimeout(()=>b.classList.remove('no'),500); msg.textContent='다시 생각해 봐요. 낱말을 다시 눌러 골라도 돼요.'; }
    });
  }
  $('pjmReset').onclick=draw; draw();
})();

/* 08 스스로 확인하기 O/X · 내 생각 (정답 표시 없음) */
['ox1','ox2','ox3','ox4','ox5'].forEach(id=>chips(id,id+'Key',['O','X'],false));
chips('growCheck','growChecked',['기존 사례에서 확장해 소프트웨어 융합 문제 해결 아이디어를 새롭게 제시했다','우리 주변의 사회 문제를 소프트웨어로 해결하는 방법을 찾아냈다','소프트웨어 융합을 문제 해결에 적용하는 데 필요한 역량을 알게 되었다','문제를 탐색하고 해결하기 위한 역할 분담에서 소통과 협력의 중요성을 인지했다','소프트웨어의 활용 사례를 사람과 소통하는 사회 현상으로 바라보게 되었다'],true);

/* 09 마무리 */
const MEMOLIST=[['planMemo','나의 계획 · 이 프로젝트에 참여하는 자세'],['stp2','내가 생각한 2단계 고려할 점'],['stp3','내가 생각한 3단계 고려할 점'],['stp4','내가 생각한 4단계 고려할 점'],['stp5','내가 생각한 5단계 고려할 점'],['artPickKey','고른 기사'],['artSum','기사 요약'],['myRole','내가 맡은 역할'],['teamRoles','모둠원 · 장점 · 역할'],['defTopic','주제'],['defSituation','문제 상황'],['defProblem','발생되는 문제'],['defCause','문제의 원인'],['ideaSolution','문제 해결 방안'],['ideaRole','피지컬 컴퓨팅의 역할'],['senPick','고른 센서'],['actPick','고른 액추에이터'],['ideaParts','센서·액추에이터와 이유'],['ideaCircuit','회로 연결과 기능'],['protoS1','제작 1단계'],['protoS2','제작 2단계'],['protoS3','제작 3단계'],['protoS4','제작 4단계'],['protoIssue','막힌 점과 해결 방법'],['ourPitch','발표할 내용 한 줄'],['teamA','모둠 ① 소개'],['teamAPro','모둠 ① 장점'],['teamAFeas','모둠 ① 실현 가능성'],['teamACon','모둠 ① 아쉬운 점'],['teamB','모둠 ② 소개'],['teamBPro','모둠 ② 장점'],['teamBFeas','모둠 ② 실현 가능성'],['teamBCon','모둠 ② 아쉬운 점'],['stagePick','잘 해냈다고 느끼는 단계'],['compPick','쓰인 교과 역량'],['retro','다음에는 이렇게'],['coreName','창작물 이름'],['coreF1','융합 분야 ①'],['coreR1','역할 ①'],['coreS1','필요 역량 ①'],['coreF2','융합 분야 ②'],['coreR2','역할 ②'],['coreS2','필요 역량 ②'],['app1','응용 사례 ❶'],['app2','응용 사례 ❷'],['app3','응용 사례 ❸'],['job1','인문·사회 직업'],['job2','과학·공학 직업'],['job3','예체능 외 직업'],['vt1','비주얼 싱킹 ① 내가 만난 소프트웨어'],['vt2','비주얼 싱킹 ② 상호 작용 요소'],['vt3','비주얼 싱킹 ③ 분석'],['vt4','비주얼 싱킹 ④ 나의 변화'],['wearName','웨어러블 장치명'],['wearFunc','기능'],['wearNeed','필요성'],['wearMerit','장점'],['wearField','활용 분야'],['growChecked','단원 학습으로 자란 점'],['keyQ','오늘의 질문에 대한 내 답']];
onShow[9]=()=>memoSummary('msum',MEMOLIST);
