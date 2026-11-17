/* 01 계산 따라 해 보기 (순수 파이썬 흉내) */
pyrun('hbRun1',{rows:13,code:[
"# 센서가 읽은 값(read_u16)을 리스트로 흉내 내요. 0~65535 사이 숫자로 바꿔 보세요.",
"values = [30000, 45000, 12000, 20000, 5000]",
"",
"for heartbeat_value in values:",
"    heart_rate = (heartbeat_value / 65535) * 3.3   # 0V ~ 3.3V 범위의 전압으로 변환",
"    bpm = (60 / 2) * heart_rate                    # 심박수(bpm) 계산",
"    print('심박동 수치: ', bpm)",
"",
"    if bpm < 40 or bpm > 120:",
"        print('비정상적인 심박동 수치: ', bpm)",
"    else:",
"        print('정상적인 심박동 수치: ', bpm)"].join('\n')});

/* 03 비정상이면 경고음 흉내 */
pyrun('hbRun2',{rows:14,code:[
"values = [30000, 45000, 12000, 20000, 5000]",
"",
"for heartbeat_value in values:",
"    heart_rate = (heartbeat_value / 65535) * 3.3",
"    bpm = (60 / 2) * heart_rate",
"",
"    if bpm < 40 or bpm > 120:",
"        print('비정상적인 심박동 수치: ', bpm)",
"        print('삐- 경고음(523Hz)')          # 버저가 울리는 것을 글로 흉내",
"    else:",
"        print('정상적인 심박동 수치: ', bpm)"].join('\n')});

/* 02 523Hz 소리 1초 (Web Audio, 선택) */
(function(){
  const b=$('hbBeepBtn'), m=$('hbBeepMsg'); if(!b) return;
  b.onclick=()=>{
    try{
      const AC=window.AudioContext||window.webkitAudioContext;
      if(!AC){m.textContent='이 기기에서는 소리를 낼 수 없어요. 괜찮아요, 다음으로 넘어가요.';return;}
      const ctx=new AC(), o=ctx.createOscillator(), g=ctx.createGain();
      o.type='square'; o.frequency.value=523; g.gain.value=0.05;
      o.connect(g); g.connect(ctx.destination); o.start();
      b.disabled=true; m.textContent='523Hz 소리가 나고 있어요 (1초)';
      setTimeout(()=>{try{o.stop();ctx.close();}catch(e){} b.disabled=false; m.textContent='';},1000);
    }catch(e){m.textContent='이 기기에서는 소리를 낼 수 없어요. 괜찮아요, 다음으로 넘어가요.';}
  };
})();

/* 05 돌아보기 · 성취도 점검 */
chips('hbStepCheck','hbStepPicked',['1 준비 학습','2 회로 구성','3 프로그래밍','4 실행 결과'],true);
chips('hbAch','hbAchPick',['웨어러블 장치의 개념과 융합 사례를 설명할 수 있다 (65쪽)','웨어러블 장치를 개발하는 데 필요한 기술을 설명할 수 있다 (66쪽)','웨어러블 장치를 만들고 공유할 수 있다 (67~70쪽)','가상 시뮬레이터를 활용하여 미디어 아트 작품을 만들 수 있다 (71쪽)','다양한 분야에서 활용되고 있는 소프트웨어의 가치를 인식할 수 있다 (65쪽)'],true);

/* 06 교과 융합 진로 탐색 */
const HB_JOBS=[
  {ic:'♻️',f:'업사이클링 디자이너',b:'버려지는 자원에서 가능성을 찾아 지속 가능하고 고부가 가치를 창출할 수 있는 제품으로 재탄생시켜요. 환경 보호와 지속 가능성에 대한 요구가 계속되면서 폭넓은 분야에서 활동하고 있어요.',x:'필요 역량 · 기획력, 창의력, 디자인 능력, 제작 및 가공 능력'},
  {ic:'🖼️',f:'디지털 전시 큐레이터',b:'가상 공간에서 즐길 수 있는 전시를 큐레이팅(전시 기획, 작품 수집 및 관리, 작품 가격 책정)해요. 작품과 대중의 거리를 좁히고 다양한 예술가를 만날 수 있는 전시에 대한 수요가 증가하면서 역할이 부각되고 있어요.',x:'필요 역량 · 전시 및 콘텐츠 기획 능력, 웹 편집 능력, 창의력'},
  {ic:'🎬',f:'멀티미디어 콘텐츠 제작자',b:'모바일, 영상, 웹, 프로그래밍 등 다양한 미디어 콘텐츠를 해당 소프트웨어를 사용해 제작해요. 멀티미디어 제작이 산업 전반으로 확대되고 있어 수요는 계속해서 확산될 것으로 전망해요.',x:'필요 역량 · 기획력, 예술적 감수성, 창의력, 제작 능력'},
  {ic:'🩺',f:'스마트 헬스케어 기기 개발자',b:'개인이 스스로 운동량, 심전도, 심장 박동 등을 체크하면서 건강을 관리할 수 있는 건강 측정 기기를 개발해요. 스마트 헬스케어 분야에 대한 연구와 투자가 확대되는 추세로 전망이 밝은 편이에요.',x:'필요 역량 · 기초 의료 및 IT 기기 관련 지식, 공감 소통 능력'},
];
flipCards('hbJobFlip',HB_JOBS);
vote('hbJobVote','hbJobInterest',HB_JOBS.map(j=>[j.ic+' '+j.f]),i=>{
  $('hbJobRes').innerHTML='<b>'+HB_JOBS[i].f+'</b> · '+HB_JOBS[i].x+'. 이 중에서 지금의 나에게 가장 필요한 것은 무엇일까요?';
});

/* 07 마무리 */
const MEMOLIST=[['planMemo','나의 계획 · 심박수와 기기'],['hbCalc','계산을 바꿔 보고 알게 된 점'],['hbCompare','평상시와 운동 후 심박수 비교'],['hbSound','523Hz 소리를 듣고 든 생각'],['hbMelody','멜로디 연주 아이디어'],['hbAlarm','경고음이 울리는 센서값 범위'],['hbPlan2','네오픽셀+버저 코드 계획'],['hbStepPicked','돌아본 활동 단계'],['hbFeel','느낀 점'],['hbAchPick','성취도 점검: 할 수 있는 것'],['hbJobInterest','관심 가는 융합 진로 직업'],['hbJobWhy','그 직업을 고른 이유'],['keyQ','오늘의 질문에 대한 내 답']];
onShow[7]=()=>memoSummary('msum',MEMOLIST);
