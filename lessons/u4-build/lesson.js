/* u4-build 전용 (bd-) — 공용 부품 sorter · chips · miniTable · pyrun 사용 */

/* 02 관찰 내용 → 핵심 요소 */
sorter('bdPick',{
  cats:[{n:'핵심 요소로 남겨요',k:'#2f9a5a'},{n:'핵심 요소에서 빼요',k:'#d0602f'}],
  items:[
    {t:'감정을 주고받는 사람 수',short:'감정을 주고받는 사람 수',c:0,ic:'👥',w:'교과서의 핵심 요소에 「감정을 주고받는 사람 수」가 있어요.'},
    {t:'나',short:'나',c:0,ic:'🙋',w:'핵심 요소에 「나」가 있어요.'},
    {t:'다른 사람',short:'다른 사람',c:0,ic:'🧍',w:'핵심 요소에 「다른 사람」이 있어요.'},
    {t:'감정',short:'감정',c:0,ic:'💛',w:'관찰 내용의 「감정」은 핵심 요소에서 「주는 감정」과 「받는 감정」으로 나뉘어 남아요.'},
    {t:'대면',short:'대면',c:1,ic:'🤝',w:'핵심 요소 목록에는 없어요. 직접 만났을 때의 감정 전이가 목적이라서, 만나는 방식은 따로 두지 않았다고 볼 수 있어요.'},
    {t:'비대면',short:'비대면',c:1,ic:'💻',w:'핵심 요소 목록에는 없어요. 관찰 내용에만 있고 핵심 요소로는 남기지 않았어요.'}
  ],
  end:'<b>정리</b> 관찰한 것을 모두 담으면 복잡해져요. 목적에 꼭 필요한 것만 <b>핵심 요소</b>로 골라 단순하게 나타내는 것이 추상화예요.'
});

/* 02 작동 순서 따라가기 */
const BD_N=9, BD_CELL=30, BD_MAXMV=30;
let bdP=[], bdMv=0;
function bdRnd(n){return (Math.random()*n)|0;}
function bdInit(){
  const cells=[]; for(let i=0;i<BD_N*BD_N;i++) cells.push(i);
  for(let i=cells.length-1;i>0;i--){const j=bdRnd(i+1);[cells[i],cells[j]]=[cells[j],cells[i]];}
  bdP=cells.slice(0,8).map(c=>({x:c%BD_N,y:(c/BD_N)|0,y2:0,c:0}));   // c 0 회색 · 1 노랑
  bdMv=0;
}
function bdDraw(){
  let h='<rect x="0" y="0" width="270" height="270" fill="#fff" stroke="#b9aecb"/>';
  for(let k=1;k<BD_N;k++) h+='<path d="M'+k*BD_CELL+' 0V270M0 '+k*BD_CELL+'H270" stroke="#ece7f3" stroke-width="1"/>';
  const seen={};
  bdP.forEach(p=>{
    const key=p.x+','+p.y, n=seen[key]=(seen[key]||0)+1, off=(n-1)*5;
    const cx=p.x*BD_CELL+15+off, cy=p.y*BD_CELL+15+off, col=p.c?'#e0b400':'#9a9a9a';
    h+='<circle cx="'+cx+'" cy="'+(cy-5)+'" r="5" fill="'+col+'"/><path d="M'+(cx-8)+' '+(cy+11)+'Q'+cx+' '+(cy-2)+' '+(cx+8)+' '+(cy+11)+'Z" fill="'+col+'"/>';
  });
  $('bdSvg').innerHTML=h;
  $('bdMv').textContent=bdMv+' / '+BD_MAXMV;
  $('bdYel').textContent=bdP.filter(p=>p.c).length;
  const full=bdMv>=BD_MAXMV;
  $('bdB2').disabled=full; $('bdB4').disabled=full;
}
function bdMove(){
  if(bdMv>=BD_MAXMV) return false;
  const D=[[0,-1],[0,1],[-1,0],[1,0]];
  bdP.forEach(p=>{const d=D[bdRnd(4)],nx=p.x+d[0],ny=p.y+d[1]; if(nx>=0&&nx<BD_N&&ny>=0&&ny<BD_N){p.x=nx;p.y=ny;}});
  bdMv++; return true;
}
function bdMeet(){
  const ys=bdP.filter(p=>p.c); let n=0;
  const nxt=bdP.map(p=>p.c||ys.some(q=>Math.abs(q.x-p.x)+Math.abs(q.y-p.y)<=1)?1:0);
  bdP.forEach((p,i)=>{if(nxt[i]&&!p.c)n++;p.c=nxt[i];});
  return n;
}
$('bdB0').onclick=()=>{bdInit();bdDraw();$('bdMsg').textContent='① 감정을 주고받기 전이라서 모두 회색이에요(가정: 기본 감정은 없다).';};
$('bdB1').onclick=()=>{
  const g=bdP.filter(p=>!p.c);
  if(!g.length){$('bdMsg').textContent='모두 노란색이에요.';return;}
  if(bdP.some(p=>p.c)){$('bdMsg').textContent='이미 감정을 가진 사람이 있어요. 이제 ②, ③을 눌러 보세요.';return;}
  g[bdRnd(g.length)].c=1; bdDraw(); $('bdMsg').textContent='한 사람이 노란색 감정을 가졌어요. 이제 ② 움직이고 ③ 전달해 보세요.';
};
$('bdB2').onclick=()=>{bdMove();bdDraw();$('bdMsg').textContent=bdMv>=BD_MAXMV?'② 최대 '+BD_MAXMV+'번까지 했어요. 「① 처음」으로 다시 시작해 보세요.':'② 사람들이 랜덤으로 한 칸씩 움직였어요.';};
$('bdB3').onclick=()=>{
  if(!bdP.some(p=>p.c)){$('bdMsg').textContent='먼저 「감정 하나 주기」를 눌러야 전달할 감정이 생겨요.';return;}
  const n=bdMeet(); bdDraw(); $('bdMsg').textContent=n?'③ 만난 사람 '+n+'명의 색이 노란색으로 바뀌었어요.':'③ 지금은 만난 사람이 없어서 색이 그대로예요. ②로 더 움직여 보세요.';
};
$('bdB4').onclick=()=>{
  if(!bdP.some(p=>p.c)){$('bdMsg').textContent='먼저 「감정 하나 주기」를 눌러야 해요.';return;}
  let k=0; for(;k<5&&bdMove();k++) bdMeet();
  bdDraw(); $('bdMsg').textContent='④ ②와 ③을 '+k+'번 반복했어요. 노란 사람이 '+bdP.filter(p=>p.c).length+'명이에요.'+(bdMv>=BD_MAXMV?' (최대 횟수에 닿았어요.)':'');
};
bdInit(); bdDraw(); $('bdMsg').textContent='① 감정을 주고받기 전이라서 모두 회색이에요(가정: 기본 감정은 없다).';

/* 02 감정 색 고르기 (칩) */
(function(){
  const COL=[['노랑','#e0b400'],['빨강','#d64535'],['초록','#2f9a5a'],['파랑','#2f6fd0'],['주황','#ee8d4f'],['분홍','#e86fa5']];
  chips('bdGiveC','bdGiveColor',COL.map(c=>c[0]),false);
  chips('bdGetC','bdGetColor',COL.map(c=>c[0]),false);
  ['bdGiveC','bdGetC'].forEach(id=>[...$(id).children].forEach((b,i)=>b.style.setProperty('--c',COL[i][1])));
})();

/* 03 인터페이스 모형 */
const BD_UI={
  setup:{st:'1단계 · 버튼',t:'조건 설정 버튼 (setup)',r:[['Commands','<code>setup</code>']],n:'[setup] 버튼을 누르면 테스트하고자 하는 조건값으로 설정돼요.'},
  go:{st:'1단계 · 버튼',t:'실행 버튼 (go)',r:[['Commands','<code>go</code>'],['Forever','체크 ✔'],['View updates','on ticks']],n:'[setup] 버튼을 누른 후 [go] 버튼을 누르면 모델이 실행돼요. go에 해당하는 코드를 무한 반복하기 위해 Forever에 체크해요. [View updates]를 [on ticks]로 설정하면 tick값이 증가할 때마다 결괏값이 갱신돼요.'},
  joy:{st:'1단계 · 버튼',t:'받고 싶은 감정 버튼 (즐거움)',r:[['Commands','<code>joy</code>'],['Display name','즐거움']],n:'받고 싶은 감정을 영어(joy)로 입력하고, 버튼에 보일 이름은 한국어(즐거움)로 입력해요.'},
  thanks:{st:'1단계 · 버튼',t:'주고 싶은 감정 버튼 (고마움)',r:[['Commands','<code>thanks</code>'],['Display name','고마움']],n:'주고 싶은 감정을 영어(thanks)로 입력하고, 버튼에 보일 이름은 한국어(고마움)로 입력해요.'},
  me:{st:'1단계 · 버튼',t:'[나] 버튼',r:[['Commands','<code>me</code>'],['Display name','나']],n:'이 버튼을 누르면 크기가 큰 사람인 「나」가 나타나요.'},
  up:{st:'1단계 · 버튼',t:'방향 버튼 · 위',r:[['Commands','<code>move 0</code>'],['Display name','위'],['Action key','W']],n:'move 뒤에 방향의 각도를 입력해요. Action key를 입력하면 키보드로도 조작할 수 있어요.'},
  right:{st:'1단계 · 버튼',t:'방향 버튼 · 오른쪽',r:[['Commands','<code>move 90</code>'],['Display name','오른쪽'],['Action key','D']],n:'move 뒤에 방향의 각도를 입력해요. Action key를 입력하면 키보드로도 조작할 수 있어요.'},
  down:{st:'1단계 · 버튼',t:'방향 버튼 · 아래',r:[['Commands','<code>move 180</code>'],['Display name','아래'],['Action key','S']],n:'move 뒤에 방향의 각도를 입력해요. Action key를 입력하면 키보드로도 조작할 수 있어요.'},
  left:{st:'1단계 · 버튼',t:'방향 버튼 · 왼쪽',r:[['Commands','<code>move 270</code>'],['Display name','왼쪽'],['Action key','A']],n:'move 뒤에 방향의 각도를 입력해요. Action key를 입력하면 키보드로도 조작할 수 있어요.'},
  slider:{st:'2단계 · 슬라이더',t:'슬라이더 (사람 수)',r:[['Global variable','<code>number</code>'],['Minimum','0'],['Maximum','100'],['Value','10']],n:'슬라이더의 막대를 움직이면 사람 수(number)의 값을 바꿀 수 있어요. 영향을 주고받는 사람의 수를 고를 수 있도록 최솟값과 최댓값을 입력하고, Value에는 기본값으로 10을 입력해요.'},
  plot:{st:'3단계 · 플롯',t:'플롯 (감정 전달된 사람 수)',r:[['Name','감정 전달된 사람 수'],['Pen 1 · 노란색','<code>plot count turtles with [color = yellow]</code>'],['Pen 2 · 빨간색','<code>plot count turtles with [color = red]</code>']],n:'그래프의 선 색상을 지정하는 코드를 Pen update commands에 입력하고, Color에서 내가 정한 감정의 색을 골라요. Add Pen으로 두 번째 선을 더해요.'},
  monJoy:{st:'4단계 · 모니터',t:'모니터 (즐거움)',r:[['Reporter','<code>count turtles with [color = yellow]</code>'],['Display Name','즐거움']],n:'시뮬레이션 실행 도중 즐거움에 해당하는 수를 실시간으로 보여 줘요.'},
  monThx:{st:'4단계 · 모니터',t:'모니터 (고마움)',r:[['Reporter','<code>count turtles with [color = red]</code>'],['Display Name','고마움']],n:'시뮬레이션 실행 도중 고마움에 해당하는 수를 실시간으로 보여 줘요.'}
};
(function(){
  const bs=[...document.querySelectorAll('#bdUi [data-k]')];
  function pick(k){
    bs.forEach(b=>b.classList.toggle('on',b.dataset.k===k));
    const u=BD_UI[k];
    $('bdInfo').innerHTML=u?'<h4><span class="st">'+u.st+'</span>'+u.t+'</h4><table>'+u.r.map(x=>'<tr><td>'+x[0]+'</td><td>'+x[1]+'</td></tr>').join('')+'</table><div>'+u.n+'</div>':'위 그림의 부품을 눌러 보세요.';
  }
  bs.forEach(b=>b.onclick=()=>pick(b.dataset.k));
  pick('');
})();

/* 03 방향 버튼 설정 표 */
miniTable('bdDir',{cols:['Commands','Display name','Action key'],rows:[['move 0','위','W'],['move 90','오른쪽','D'],['move 180','아래','S'],['move 270','왼쪽','A']]});

/* 03 입력 / 출력 */
sorter('bdIoGame',{
  cats:[{n:'입력',k:'#2f6fd0'},{n:'출력',k:'#2f9a5a'}],
  items:[
    {t:'set up 버튼, go 버튼',short:'set up · go 버튼',c:0,ic:'🔘',w:'사용자가 눌러서 기능을 고르는 버튼은 입력이에요.'},
    {t:'number 슬라이더',short:'number 슬라이더',c:0,ic:'🎚️',w:'사용자가 슬라이더 값을 설정하면 값이 전달되어 프로그램이 실행되니 입력이에요.'},
    {t:'감정 전달된 사람 수 그래프(플롯)',short:'플롯',c:1,ic:'📈',w:'프로그램 실행 결과를 그래프로 출력하니 출력이에요.'},
    {t:'즐거움·고마움 모니터',short:'모니터',c:1,ic:'🔢',w:'모니터 이름에 해당하는 수치를 출력하니 출력이에요.'},
    {t:'즐거움·고마움 버튼',short:'감정 버튼',c:0,ic:'💛',w:'사용자가 버튼을 클릭하면 해당 이벤트가 실행되니 입력이에요.'},
    {t:'방향 버튼(위·아래·왼쪽·오른쪽)',short:'방향 버튼',c:0,ic:'🧭',w:'눌러서 「나」를 움직이는 버튼이니 입력이에요.'}
  ],
  end:'<b>정리</b> 사용자가 조건을 넣으면 <b>입력</b>(버튼·슬라이더), 프로그램 결과를 보여 주면 <b>출력</b>(플롯·모니터)이에요.'
});

/* 03 pyrun */
pyrun('bdRun',{rows:22,code:["# 교과서는 넷로고로, 여기서는 같은 규칙을 파이썬으로 흉내 내요. (난수라 실행할 때마다 달라요)", "import random", "", "number = 10                       # 슬라이더 number 값 (1 이상으로 바꿔 보세요)", "", "# [setup] 버튼: 회색 사람 number명을 만든다", "colors = ['gray'] * number", "print('setup 후     :', colors)", "", "# [즐거움] 버튼: 사람 중 한 명을 노란색으로 (넷로고: ask one-of humans [set color yellow])", "who = random.randrange(number)", "colors[who] = 'yellow'", "print('즐거움 버튼  :', who + 1, '번째 사람이 노란색')", "", "# [나] 버튼: 크기가 큰 「나」가 나타난다. [고마움] 버튼: 나의 색이 빨간색", "colors.append('gray')", "colors[-1] = 'red'", "", "# 모니터: count turtles with [color = yellow] / [color = red]", "print('즐거움 모니터 :', colors.count('yellow'))", "print('고마움 모니터 :', colors.count('red'))", "print('전체 터틀     :', len(colors))"].join('\n')});

/* 04 마무리 */
const MEMOLIST=[['planMemo','나의 계획'],['bdRef','거울 뉴런'],['bdInf','감정 전염'],['bdExp','감정을 주고받았던 경험'],['bdGiveColor','주고 싶은 감정의 색'],['bdGive','주고 싶은 감정의 이름'],['bdGetColor','받고 싶은 감정의 색'],['bdGet','받고 싶은 감정의 이름'],['bdFn1','버튼의 기능'],['bdFn2','슬라이더의 기능'],['bdFn3','플롯의 기능'],['bdFn4','모니터의 기능'],['keyQ','오늘의 질문에 대한 내 답']];
onShow[4]=()=>memoSummary('msum',MEMOLIST);
