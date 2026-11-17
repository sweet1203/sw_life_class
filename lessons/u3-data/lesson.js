/* 0 시작 · 기사 카드 */
flipCards('dtNewsFlip',[
  {ic:'🌡️',f:'기상 이변은 「지구 온난화의 파괴적 결과」',b:'폭염·가뭄·홍수가 이어진 2022년, 전 세계 연평균 기온이 관측상 5번째로 높았어요. 유럽에서는 폭염으로 많은 사람이 사망했어요.',x:'교과서 정리 · 데이터 = 기온 데이터, 활용 방안 = 기온 변화 알아보기'},
  {ic:'⚽',f:'토종 AI 경기 분석 스타트업',b:'축구 경기 영상에 인공지능 기술을 접목해 경기 중 일어나는 상황을 판단·분석하는 소프트웨어를 만들어 팀과 선수단에 실시간으로 보내요.'},
  {ic:'👶',f:'출생률 역대 최저치, 인구 자연 감소는 「역대 최대」',b:'2023년 1월 출생아 수는 2만 3,179명으로 1년 전보다 6.0% 줄었고, 사망자 수는 3만 2,703명으로 9.6% 늘었어요.'},
]);

/* 시계 그림 */
function dtClock(id,h,m,label,col){
  const S=$(id), NS='http://www.w3.org/2000/svg', cx=80, cy=84, R=64;
  const pt=(deg,L)=>[cx+L*Math.sin(deg*Math.PI/180), cy-L*Math.cos(deg*Math.PI/180)];
  let g=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff" stroke="#0f2742" stroke-width="3"/>`;
  g+=`<path d="M${cx} ${cy}L${pt(-30,R-4)[0].toFixed(1)} ${pt(-30,R-4)[1].toFixed(1)}A${R-4} ${R-4} 0 0 1 ${pt(0,R-4)[0].toFixed(1)} ${pt(0,R-4)[1].toFixed(1)}Z" fill="#d64535" fill-opacity=".18"/>`;
  for(let i=0;i<12;i++){const a=pt(i*30,R-3), b=pt(i*30,R-10); g+=`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#0f2742" stroke-width="2"/>`;}
  [[12,0],[3,90],[6,180],[9,270]].forEach(([n,d])=>{const p=pt(d,R-22); g+=`<text x="${p[0].toFixed(1)}" y="${(p[1]+5).toFixed(1)}" text-anchor="middle" font-size="14" font-weight="700" fill="${n===12?'#d64535':'#0f2742'}">${n}</text>`;});
  const hd=((h%12)+m/60)*30, md=m*6, hp=pt(hd,34), mp=pt(md,50);
  g+=`<line x1="${cx}" y1="${cy}" x2="${hp[0].toFixed(1)}" y2="${hp[1].toFixed(1)}" stroke="#0f2742" stroke-width="5" stroke-linecap="round"/>`;
  g+=`<line x1="${cx}" y1="${cy}" x2="${mp[0].toFixed(1)}" y2="${mp[1].toFixed(1)}" stroke="${col}" stroke-width="3.5" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="4" fill="#0f2742"/>`;
  g+=`<text x="${cx}" y="178" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2742">${label}</text>`;
  S.innerHTML=g;
}
dtClock('dtClockKr',9,28,'한국 9시 28분','#2f9a5a');
dtClock('dtClockWd',9,35,'세계 평균 9시 35분','#2f6fd0');

/* 01 데이터 분석 */
flipCards('dtWordFlip',[
  {ic:'🗄️',f:'빅데이터',b:'기존의 데이터 처리 응용 소프트웨어로 처리하기 어려울 정도로 방대한 양의 데이터예요.',x:'특징은 보통 3V로 요약해요. 양(volume)·속도(velocity)·다양성(variety). 최근에는 복잡성(complexity)을 더해 3V+C라고도 해요.'},
  {ic:'🧬',f:'반정형 데이터',b:'정형 데이터와 비정형 데이터 사이에 있는 데이터로, 데이터 구조와 형식을 변경할 수 있어요.',x:'예) XML, JSON, HTML 등의 데이터 형식'},
  {ic:'🔭',f:'인사이트',b:'「통찰」, 즉 본질을 꿰뚫어 봄을 뜻해요. 데이터 분석은 인사이트를 얻어 내는 데 유용해요.'},
]);
bars('dtShare',[['정형 데이터',20,'#3b4fb0'],['비정형 데이터',80,'#1f9d74']],{horiz:true,max:100,unit:'%',left:110});
sorter('dtTypeSort',{
  cats:[{n:'정형 데이터',k:'#3b4fb0'},{n:'비정형 데이터',k:'#1f9d74'},{n:'반정형 데이터',k:'#d0602f'}],
  items:[
    {t:'숫자가 행과 열로 정리된 표',short:'숫자 표',c:0,ic:'🔢',w:'행과 열로 표현할 수 있는 숫자 데이터라 정형 데이터예요.'},
    {t:'날짜가 칸마다 적힌 표',short:'날짜 표',c:0,ic:'📅',w:'숫자·날짜·문자는 정형 데이터의 대표적인 예예요.'},
    {t:'이름 같은 문자가 칸마다 적힌 표',short:'문자 표',c:0,ic:'🔤',w:'문자도 행과 열로 정리되어 있으면 정형 데이터예요.'},
    {t:'문서(보고서)',short:'보고서',c:1,ic:'📄',w:'행과 열로 표현되지 않고 형태가 불규칙해 비정형 데이터예요.'},
    {t:'사진 같은 이미지',short:'이미지',c:1,ic:'🖼️',w:'이미지는 비정형 데이터의 예예요.'},
    {t:'녹음한 음성',short:'음성',c:1,ic:'🎙️',w:'음성은 비정형 데이터예요.'},
    {t:'동영상 같은 비디오',short:'비디오',c:1,ic:'🎬',w:'비디오는 비정형 데이터예요.'},
    {t:'이메일의 본문',short:'이메일 본문',c:1,ic:'✉️',w:'이메일의 본문은 형태가 불규칙한 비정형 데이터예요.'},
    {t:'XML 형식의 데이터',short:'XML',c:2,ic:'🏷️',w:'XML은 교과서가 든 반정형 데이터 형식이에요.'},
    {t:'JSON · HTML 형식의 데이터',short:'JSON · HTML',c:2,ic:'🌐',w:'JSON, HTML도 정형과 비정형 사이에 있는 반정형 데이터 형식이에요.'},
  ],
  end:'<b>정리</b> 행과 열로 표현하면 <b>정형</b>, 형태가 불규칙하면 <b>비정형</b>, 둘 사이의 XML·JSON·HTML은 <b>반정형</b>이에요.'
});

/* 02 데이터 수집 */
sorter('dtCollectSort',{
  cats:[{n:'웹 스크래핑',k:'#2f6fd0'},{n:'설문 조사',k:'#d0602f'},{n:'센서 데이터 수집',k:'#9b4fc4'},{n:'공개 데이터 활용',k:'#2f9a5a'}],
  items:[
    {t:'웹 페이지 안의 특정 데이터를 수집하고 싶다',short:'웹 페이지 속 특정 데이터',c:0,ic:'🕸️',w:'웹 페이지 내 특정 데이터를 수집하고자 할 때는 웹 스크래핑을 해요.'},
    {t:'사람들의 의견을 직접 수집하고 싶다',short:'사람들의 의견',c:1,ic:'📝',w:'사람들의 의견을 직접 모을 때는 설문 조사가 알맞아요.'},
    {t:'사물 인터넷 디바이스를 통해 직접 데이터를 수집하고 싶다',short:'사물 인터넷 디바이스',c:2,ic:'📡',w:'사물 인터넷 디바이스로 직접 모으는 것은 센서 데이터 수집이에요.'},
    {t:'신뢰도 있는 데이터를 활용해 데이터 분석(예측)을 하고 싶다',short:'신뢰도 있는 데이터로 예측',c:3,ic:'🏛️',w:'신뢰도 있는 데이터로 분석(예측)을 하고자 할 때는 공개 데이터를 활용해요.'},
  ],
  end:'<b>정리</b> 목적에 따라 <b>웹 스크래핑·설문 조사·센서 데이터 수집·공개 데이터 활용</b> 가운데 알맞은 방법을 골라요.'
});
const DT_SITES=[
  {ic:'🏛️',n:'공공데이터포털',k:'#2f6fd0',d:'공공 기관이 생성 또는 취득하여 관리하는 공공 데이터를 한곳에서 제공해요.',e:'소상공인시장진흥공단 상가 정보'},
  {ic:'📈',n:'국가통계포털',k:'#2f9a5a',d:'국내, 국제, 북한의 주요 통계를 한곳에 모아 이용자가 원하는 통계를 한번에 찾을 수 있도록 제공해요.',e:'주민 등록 인구수'},
  {ic:'☀️',n:'기상자료개방포털',k:'#d0602f',d:'모든 날씨 데이터를 한곳에서 찾을 수 있도록 기상청에서 자료를 제공해요.',e:'기온 데이터'},
  {ic:'🏅',n:'캐글',k:'#9b4fc4',d:'데이터 과학 및 머신러닝 경진 대회 플랫폼으로, 전 세계 데이터 과학자들이 만든 데이터셋이 올라와 있어요.',e:'FIFA 선수 데이터'},
  {ic:'🤖',n:'데이콘',k:'#d64535',d:'국내 AI 해커톤 플랫폼으로, 캐글과 같이 데이터에 관심을 갖고 있는 사람들에게 서비스를 제공해요.',e:'버스 운행 시간 예측'},
  {ic:'🗺️',n:'통계지리정보서비스',k:'#1f7a8a',d:'이용자가 통계 정보와 지리 정보를 융복합하여 새로운 서비스를 만들 수 있도록 관련 데이터를 제공해요.',e:'집계 구별 통계(인구, 주택 등)'},
];
tabs('dtSiteBtn','dtSiteView',DT_SITES.map(s=>({ic:s.ic,n:s.n})),(it,i)=>{
  const s=DT_SITES[i];
  return `<div class="dt-site" style="--k:${s.k}"><b>${s.ic} ${s.n}</b><p>${s.d}</p><span class="ex">예시 · ${s.e}</span></div>`;
});

/* 03 데이터 처리 */
flipCards('dtFixFlip',[
  {ic:'⬜',f:'결측치',b:'데이터에 비어 있는 값이에요. 값이 없는 칸이 있으면 계산이나 그래프에서 문제가 생길 수 있어요.'},
  {ic:'❓',f:'이상한 값',b:'다른 값들과 비교해 이상하게 크거나 작은 값처럼, 맞는지 의심해 봐야 하는 값이에요.'},
  {ic:'👯',f:'중복된 값',b:'같은 데이터가 두 번 이상 들어 있는 경우예요. 그대로 두면 결과가 틀어질 수 있어요.'},
]);
flipCards('dtCareFlip',[
  {ic:'🛡️',f:'데이터 신뢰성',b:'데이터의 편향이나 오류가 발생하지 않아야 해요.'},
  {ic:'🔁',f:'데이터 일관성',b:'데이터가 항상 동일한 내용으로 유지되어야 해요.'},
  {ic:'🔓',f:'데이터 가용성',b:'데이터가 손상되지 않고 필요할 때 접근할 수 있어야 해요.'},
]);
(function(){
  const rows=[[1907,'',-20.1,25.4],[1908,10.4,-15.8,33.6],[1909,10.6,-14.6,35.6],[1910,10.3,-19.9,33.3],['1910 (연습용)',10.3,-19.9,33.3],[1911,10.6,-21.5,34.5],[1912,10.1,-18.6,34],['1914 (연습용)',120,-14,35.6],[1913,10,-19.6,31.7]];
  const why={0:'1907년 평균 기온 칸이 비어 있어요(결측치).',4:'1910년 줄과 값이 똑같은 줄이 또 있어요(중복된 값).',7:'평균 기온 120 ℃는 말이 안 되게 높은 값이에요(이상한 값).'};
  const mt=miniTable('dtFixTbl',{cols:['연도','평균 기온','최저 기온','최고 기온'],rows,pick:true});
  $('dtFixBtn').onclick=()=>{
    const p=mt.picked(), fb=$('dtFixFb'); if(!p.length){fb.textContent='먼저 정리가 필요해 보이는 줄을 골라요.';return;}
    const good=p.filter(i=>i in why), bad=p.filter(i=>!(i in why)), left=Object.keys(why).length-good.length;
    let h='';
    if(good.length) h+=`<b>맞게 골랐어요</b><br>${good.map(i=>'· '+why[i]).join('<br>')}<br>`;
    if(bad.length) h+=`<b>다시 살펴볼 줄</b> · ${bad.map(i=>(typeof rows[i][0]==='number'?rows[i][0]+'년':rows[i][0])).join(', ')} 줄은 문제가 없어 보여요.<br>`;
    h+=left?`아직 못 찾은 줄이 <b>${left}개</b> 더 있어요.`:'정리가 필요한 줄을 모두 찾았어요!';
    fb.innerHTML=h;
  };
})();

/* 04 데이터 시각화 */
const DT_ICON={
  line:'<svg viewBox="0 0 40 40"><path d="M5 34V6M5 34H36" stroke="#16202c" stroke-width="2" fill="none"/><polyline points="8,28 15,18 22,22 30,10 35,14" stroke="#2f6fd0" stroke-width="3" fill="none"/></svg>',
  hist:'<svg viewBox="0 0 40 40"><path d="M4 34H37" stroke="#16202c" stroke-width="2"/><g fill="#7a6ad0"><rect x="6" y="24" width="5" height="10"/><rect x="11" y="16" width="5" height="18"/><rect x="16" y="7" width="5" height="27"/><rect x="21" y="12" width="5" height="22"/><rect x="26" y="22" width="5" height="12"/><rect x="31" y="29" width="5" height="5"/></g></svg>',
  scat:'<svg viewBox="0 0 40 40"><path d="M5 34V6M5 34H36" stroke="#16202c" stroke-width="2" fill="none"/><g fill="#d0602f"><circle cx="11" cy="28" r="2.5"/><circle cx="16" cy="23" r="2.5"/><circle cx="20" cy="26" r="2.5"/><circle cx="25" cy="17" r="2.5"/><circle cx="30" cy="12" r="2.5"/><circle cx="14" cy="30" r="2.5"/></g></svg>',
  bar:'<svg viewBox="0 0 40 40"><path d="M4 34H37" stroke="#16202c" stroke-width="2"/><g fill="#2f9a5a"><rect x="7" y="18" width="6" height="16"/><rect x="16" y="8" width="6" height="26"/><rect x="25" y="22" width="6" height="12"/></g></svg>',
  pie:'<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="#7a6ad0"/><path d="M20 20L20 5A15 15 0 0 1 33 28Z" fill="#2f9a5a"/><path d="M20 20L33 28A15 15 0 0 1 8 30Z" fill="#d0602f"/></svg>',
  bub:'<svg viewBox="0 0 40 40"><g fill="#2f9a5a" fill-opacity=".8"><circle cx="13" cy="25" r="8"/><circle cx="28" cy="13" r="5"/></g><circle cx="29" cy="29" r="3.5" fill="#7a6ad0"/></svg>',
  heat:'<svg viewBox="0 0 40 40"><g><rect x="6" y="6" width="9" height="9" fill="#9ad0f0"/><rect x="15" y="6" width="9" height="9" fill="#ffd54a"/><rect x="24" y="6" width="9" height="9" fill="#9ad0f0"/><rect x="6" y="15" width="9" height="9" fill="#ffd54a"/><rect x="15" y="15" width="9" height="9" fill="#d64535"/><rect x="24" y="15" width="9" height="9" fill="#ff9d3a"/><rect x="6" y="24" width="9" height="9" fill="#9ad0f0"/><rect x="15" y="24" width="9" height="9" fill="#ff9d3a"/><rect x="24" y="24" width="9" height="9" fill="#9ad0f0"/></g></svg>',
  map:'<svg viewBox="0 0 40 40"><path d="M20 36C13 27 9 22 9 16A11 11 0 0 1 31 16C31 22 27 27 20 36Z" fill="#1f7a8a"/><circle cx="20" cy="16" r="4.5" fill="#fff"/></svg>',
  radar:'<svg viewBox="0 0 40 40"><g fill="none" stroke="#9aa5b4" stroke-width="1"><polygon points="20,5 34,15 29,32 11,32 6,15"/><polygon points="20,13 27,18 25,26 15,26 13,18"/></g><polygon points="20,8 31,16 24,29 13,28 10,17" fill="#2f9a5a" fill-opacity=".45" stroke="#2f9a5a" stroke-width="2"/></svg>',
  word:'<svg viewBox="0 0 40 40"><g font-weight="700" fill="#2f6fd0"><text x="4" y="22" font-size="16">환경</text><text x="22" y="14" font-size="9" fill="#2f9a5a">에너지</text><text x="20" y="32" font-size="11" fill="#d0602f">기후</text></g></svg>'
};
flipCards('dtGraphFlip',[
  {ic:DT_ICON.line,f:'선그래프',s:'추세 표현',b:'시간에 따른 변화를 관찰할 때 써요. 두 변수의 관계를 선으로 연결하여 시각화해요.',x:'예시 · 나의 고사별 과목 성적'},
  {ic:DT_ICON.hist,f:'히스토그램',s:'추세 표현',b:'자료의 분포 상태를 한눈에 비교할 때 써요. 수치형 데이터를 동일한 폭으로 그룹화하여 시각화해요.',x:'예시 · 반 학생들의 구간별 국어 점수'},
  {ic:DT_ICON.scat,f:'산점도',s:'상관관계',b:'변수 간의 관계를 나타낼 때 써요. 변수 간의 관계를 좌표상의 점으로 시각화해요.',x:'예시 · 반 학생들의 영어와 수학 성적의 상관관계'},
  {ic:DT_ICON.bar,f:'막대그래프',s:'비교 목적',b:'항목 간의 수량을 전체적으로 비교할 때 써요. 범주형 데이터를 막대그래프로 시각화해요.',x:'예시 · 우리 반 학생들의 연간 요일별 지각생 수'},
  {ic:DT_ICON.pie,f:'원그래프',s:'비교 목적',b:'점유율을 나타낼 때 써요. 전체(100%)에 대한 각 부분 데이터의 비율을 원형으로 시각화해요.',x:'예시 · 반 회장 선거 투표 결과'},
  {ic:DT_ICON.bub,f:'버블 차트',s:'비교 목적',b:'핵심 변수를 한눈에 파악하고자 할 때 써요. 두 가지 이상의 변수를 비교하기 위해 원의 크기로 시각화해요.',x:'예시 · 제품별 매출 수익'},
  {ic:DT_ICON.heat,f:'히트맵',s:'상관관계',b:'색상으로 밀도와 가중치를 나타낼 때 써요. 다양한 정보를 일정한 이미지 위에 색상 분포 형태로 시각화해요.',x:'예시 · 운동선수의 활동량'},
  {ic:DT_ICON.map,f:'데이터 맵',s:'공간 정보 파악',b:'지리적 위치와 관련한 데이터를 표현할 때 써요. 지역, 지명과 관련 있는 데이터를 시각화해요.',x:'예시 · 지역별 인구 분포 지도'},
  {ic:DT_ICON.radar,f:'방사형 그래프',s:'비교 목적',b:'여러 데이터의 상대적인 관계를 비교할 때 써요. 동심원 위에 점을 찍어 만들어진 도형으로 변수 분포를 시각화해요.',x:'예시 · 성격 테스트 결과 그래프'},
  {ic:DT_ICON.word,f:'워드 클라우드',s:'비교 목적',b:'텍스트 데이터의 특징을 도출할 때 써요. 비정형 데이터 안의 키워드 같은 핵심 단어를 시각화해요.',x:'예시 · 환경 기사 주요 단어'},
]);
sorter('dtGraphSort1',{
  cats:[{n:'선그래프',k:'#2f6fd0'},{n:'히스토그램',k:'#7a6ad0'},{n:'산점도',k:'#d0602f'},{n:'막대그래프',k:'#2f9a5a'},{n:'원그래프',k:'#d64535'},{n:'버블 차트',k:'#1f7a8a'}],
  items:[
    {t:'나의 고사별 과목 성적',short:'고사별 과목 성적',c:0,ic:'📈',w:'시간(고사)에 따른 변화를 볼 때는 선그래프를 써요.'},
    {t:'반 학생들의 구간별 국어 점수',short:'구간별 국어 점수',c:1,ic:'🎓',w:'점수를 같은 폭의 구간으로 묶어 분포를 보는 것은 히스토그램이에요.'},
    {t:'반 학생들의 영어와 수학 성적의 상관관계',short:'영어·수학 성적 관계',c:2,ic:'✏️',w:'두 변수의 관계를 점으로 나타내는 산점도가 알맞아요.'},
    {t:'우리 반 학생들의 연간 요일별 지각생 수',short:'요일별 지각생 수',c:3,ic:'⏰',w:'항목(요일) 간의 수량을 비교하는 것은 막대그래프예요.'},
    {t:'반 회장 선거 투표 결과',short:'반 회장 투표 결과',c:4,ic:'🗳️',w:'전체에 대한 각 후보의 비율을 보여 주는 원그래프가 알맞아요.'},
    {t:'제품별 매출 수익',short:'제품별 매출 수익',c:5,ic:'💰',w:'두 가지 이상의 변수를 원의 크기로 비교하는 버블 차트의 예시예요.'},
  ],
  end:'<b>정리</b> 변화는 <b>선</b>, 분포는 <b>히스토그램</b>, 관계는 <b>산점도</b>, 수량 비교는 <b>막대</b>, 비율은 <b>원</b>, 크기 비교는 <b>버블</b>이에요.'
});
sorter('dtGraphSort2',{
  cats:[{n:'히트맵',k:'#d64535'},{n:'데이터 맵',k:'#1f7a8a'},{n:'방사형 그래프',k:'#2f9a5a'},{n:'워드 클라우드',k:'#2f6fd0'}],
  items:[
    {t:'운동선수의 활동량',short:'운동선수의 활동량',c:0,ic:'🏃',w:'색상으로 밀도를 나타내는 히트맵의 예시예요.'},
    {t:'지역별 인구 분포 지도',short:'지역별 인구 분포',c:1,ic:'🗺️',w:'지역과 관련된 데이터를 지도 위에 표현하는 데이터 맵이에요.'},
    {t:'성격 테스트 결과 그래프',short:'성격 테스트 결과',c:2,ic:'🧠',w:'여러 항목을 동심원 위에 표시해 비교하는 방사형 그래프의 예시예요.'},
    {t:'환경 기사 주요 단어',short:'환경 기사 주요 단어',c:3,ic:'📰',w:'텍스트에서 핵심 단어를 크기로 보여 주는 워드 클라우드예요.'},
  ],
  end:'<b>정리</b> 색 분포는 <b>히트맵</b>, 지도는 <b>데이터 맵</b>, 여러 항목 비교는 <b>방사형</b>, 글 속 핵심 단어는 <b>워드 클라우드</b>예요.'
});
(function(){
  const rows=[['월',5],['화',3],['수',2],['목',3],['금',6]];
  const draw=r=>bars('dtBarSvg',r.map(x=>[x[0],Math.max(0,+x[1]||0)]),{max:10,unit:'명'});
  miniTable('dtBarTbl',{cols:['요일','지각생 수(명)'],rows,edit:[1],onChange:draw});
  draw(rows);
})();

/* 06 마무리 */
const MEMOLIST=[['dtNewsSoccer','기사 · 축구 스타트업의 데이터·활용 방안'],['dtNewsBirth','기사 · 출생아 수의 데이터·활용 방안'],['dtHypo','기후 변화에 대한 나만의 가설'],['dtInform','기후 변화의 심각성을 알리는 방법'],['dtPurpose','알리기 위해 찾을 데이터'],['dtOpenData','관심 분야의 공개 데이터'],['dtShareTalk','친구와 나눈 데이터 이야기'],['keyQ','오늘의 질문에 대한 내 답']];
onShow[6]=()=>memoSummary('msum',MEMOLIST);
