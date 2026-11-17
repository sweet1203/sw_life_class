/* 01 준비 학습 · 낱말 카드 */
flipCards('prepFlip',[
  {ic:'🍓',f:'라즈베리파이 피코',b:'초소형 마이크로컨트롤러로, 파이썬 프로그래밍을 지원해요. 이 단원의 실습은 피코로 해요.'},
  {ic:'⚙️',f:'펌웨어',b:'하드웨어의 기본적인 제어와 구동을 담당하는 프로그램이에요. 피코에는 마이크로파이썬 펌웨어 파일(.uf2)을 먼저 넣어요.'},
  {ic:'🐍',f:'파이썬',b:'풍부한 라이브러리를 제공하므로 다른 언어에 비해 프로그램을 더욱 간단하고 빠르게 작성할 수 있는 프로그래밍 언어'},
  {ic:'🔬',f:'마이크로파이썬',b:'피지컬 컴퓨팅 실습을 위해 마이크로컨트롤러에서 효율적으로 실행되도록 파이썬의 기능을 일부 제한한 간결한 프로그래밍 언어'},
  {ic:'🧰',f:'토니(Thonny)',b:'파이썬 초보자를 위한 통합 개발 환경(IDE)이에요. 단순하고 꼭 필요한 기능 위주로 구성되어 가벼운 실습에 알맞아요.'},
  {ic:'📍',f:'핀아웃',b:'피코의 많은 핀(단자)이 각각 조금씩 다른 기능을 가지도록 설계된 것. 예) 36번 핀은 3V3(OUT), 38번 핀은 GND'},
]);

sorter('setupSort',{
  cats:[{n:'펌웨어 설치',k:'#d0602f'},{n:'통합 개발 환경(IDE) 설치',k:'#2f6fd0'},{n:'라이브러리 설치',k:'#1f9d74'}],
  items:[
    {t:'micropython.org의 다운로드 메뉴에서 pico를 찾아 최신 .uf2 파일을 내려받는다',short:'.uf2 파일 내려받기',c:0,ic:'⬇️',w:'피코에 넣을 마이크로파이썬 펌웨어 파일(.uf2)을 구하는 일이니 펌웨어 설치 단계예요.'},
    {t:'BOOTSEL 버튼을 누른 채 USB로 컴퓨터와 피코를 연결해 RPI-RP2 장치로 인식시킨다',short:'BOOTSEL + USB 연결',c:0,ic:'🔌',w:'펌웨어 파일을 넣기 위해 피코를 RPI-RP2 드라이브로 보이게 하는 과정이니 펌웨어 설치 단계예요.'},
    {t:'Thonny 홈페이지에서 내 운영체제에 맞는 파일을 내려받아 설치한다',short:'Thonny 설치',c:1,ic:'🧰',w:'코드를 쓰고 올릴 도구를 설치하는 일이니 통합 개발 환경 설치 단계예요.'},
    {t:'Interpreter 탭에서 MicroPython (Raspberry Pi Pico)을 고르고 통신 포트를 정한다',short:'인터프리터·포트 선택',c:1,ic:'🔧',w:'Thonny가 피코와 대화하도록 설정하는 일이니 통합 개발 환경 설치 단계에 들어가요.'},
    {t:'Tools → Manage packages에서 neopixel을 검색해 설치한다',short:'neopixel 설치',c:2,ic:'📦',w:'실습에 필요한 라이브러리를 추가하는 일이니 라이브러리 설치 단계예요.'},
    {t:'같은 방법으로 dht를 검색해 설치한다',short:'dht 설치',c:2,ic:'🌡️',w:'온습도 센서 실습에 필요한 라이브러리이니 라이브러리 설치 단계예요.'},
  ],
  end:'<b>정리</b> 피코 안에 파이썬 환경을 넣는 것은 <b>펌웨어</b>, 컴퓨터에서 코드를 쓰는 도구는 <b>Thonny</b>, 부품 제어를 돕는 도구 모음은 <b>라이브러리</b>예요.'
});

/* 02 실습 1 */
flipCards('led1Flip',[
  {ic:'📥',f:'from machine import Pin',b:'machine 모듈에 있는 여러 클래스 중 입출력 핀의 설정과 제어를 담당하는 Pin 클래스를 가져와요.'},
  {ic:'⏱️',f:'import time',b:'MicroPython에서 시간과 관련된 작업(시간 지연, 시간 측정 등)을 하는 time 모듈을 가져와요.',x:'예) time.sleep(1) : 1초 대기'},
  {ic:'💡',f:'led = Pin(25, Pin.OUT)',b:'25번 핀을 출력 모드로 하는 led 객체를 만들어요.'},
  {ic:'🔁',f:'while True:',b:'무한 반복을 시작해요. 들여쓴 줄들이 계속 되풀이돼요.'},
  {ic:'🟡',f:'led.value(1) · led.value(0)',b:'1이면 LED 켜기, 0이면 LED 끄기예요. 그 뒤에 time.sleep(1)로 1초씩 기다려요.'},
]);
pyrun('ledRun',{code:`# while True 대신 3번만 반복해요
led = 0
for i in range(3):
    led = 1          # led.value(1) : LED 켜기
    print(i + 1, '번째 : LED 켜기 (값', led, ')')
    print('        1초 대기')
    led = 0          # led.value(0) : LED 끄기
    print(i + 1, '번째 : LED 끄기 (값', led, ')')
    print('        1초 대기')
`});

/* 03 실습 2 */
flipCards('neoFlip',[
  {ic:'📥',f:'from neopixel import NeoPixel',b:'네오픽셀을 쓰기 위한 모듈을 불러와요.'},
  {ic:'🔢',f:'NUM_LEDS · PIN_NUM',b:'NUM_LEDS는 사용할 LED 개수, PIN_NUM은 DIN 핀으로 쓸 입출력(GPIO) 핀 번호예요.'},
  {ic:'🧱',f:'NeoPixel(Pin(PIN_NUM), NUM_LEDS, bpp = 3)',b:'RGB 모드(bpp=3)를 써서 NeoPixel 객체를 만들어요.'},
  {ic:'🎨',f:'pixels.fill((255, 0, 0))',b:'빨간색(R, G, B)으로 LED를 켜요. 괄호 안 세 숫자가 R, G, B 값이에요.',x:'(0, 0, 0)이면 LED가 꺼져요.'},
  {ic:'✅',f:'pixels.write()',b:'바꾼 내용을 LED에 적용해요. fill만 하고 write를 하지 않으면 색이 바뀌지 않아요.'},
]);

/* 03 색 미리보기 · R G B 막대 */
(function(){
  const sw=$('pcSwatch'), tx=$('pcSwatchTxt'), ln=$('pcLine');
  const ids=['pcR','pcG','pcB'];
  function draw(){
    const v=ids.map(i=>+$(i).value);
    $('pcRv').textContent=v[0]; $('pcGv').textContent=v[1]; $('pcBv').textContent=v[2];
    sw.style.background=`rgb(${v[0]},${v[1]},${v[2]})`;
    const lum=0.299*v[0]+0.587*v[1]+0.114*v[2];
    tx.style.color=lum>150?'#0f2742':'#fff';
    tx.textContent=`(${v.join(', ')})`;
    ln.textContent=`pixels.fill((${v.join(', ')}))`;
  }
  ids.forEach(i=>$(i).addEventListener('input',draw));
  draw();
})();

pyrun('colorRun',{code:`# 색 이름 : (R, G, B) 튜플
colors = {'빨강': (255, 0, 0), '꺼짐': (0, 0, 0), '노랑': (255, 255, 0), '흰색': (255, 255, 255)}

for name in colors:
    r, g, b = colors[name]
    print(name, '→ pixels.fill(', colors[name], ')   R =', r, ' G =', g, ' B =', b)
`});

pyrun('colorTry',{code:`# 해 보기 : 빨강 → 파랑 → 초록 순서로 바뀌게 해 보세요
# ___ 자리에 (R, G, B) 튜플을 넣어요
colors = [___, ___, ___]

for c in colors:
    print('pixels.fill(', c, ')')
    print('pixels.write()')
    print('1초 대기')
`});

/* 04 실습 3 */
flipCards('dhtFlip',[
  {ic:'📥',f:'import dht',b:'온습도 센서를 쓰기 위한 dht 모듈을 불러와요.'},
  {ic:'🔌',f:'sensor = dht.DHT11(Pin(22))',b:'22번 핀에 연결된 DHT11 센서를 초기화해요.'},
  {ic:'📏',f:'sensor.measure()',b:'센서에서 측정을 시작해요.'},
  {ic:'🌡️',f:'temp = sensor.temperature()',b:'온도를 읽어 temp에 넣어요.'},
  {ic:'💧',f:'hum = sensor.humidity()',b:'습도를 읽어 hum에 넣어요.'},
  {ic:'🖨️',f:'print(…) · time.sleep(1)',b:'온도와 습도를 출력하고, 1초마다 다시 측정해요.'},
]);
pyrun('dhtRun',{code:`# (온도, 습도) 흉내 값 - 진짜 센서 값이 아니에요
measures = [(25, 40), (26, 42), (26, 41)]

for temp, hum in measures:
    print('Temperature: ', temp, ' °C')
    print('Humidity: ', hum, ' %')
    if temp < 0 or temp > 50:
        print('  (DHT11의 온도 측정 범위 0~50 °C를 벗어났어요)')
`});

/* 05 실습 4 · 빈칸 활동 (정답 없음) */
pyrun('frameRun',{rows:16,code:`# 센서 대신 온도 리스트를 하나씩 꺼내요 (흉내 값)
temps = [18, 22, 24, 26, 30]

for temperature in temps:
    if temperature < ___:
        color = (___, ___, ___)
        print(temperature, '도 → 파란색', color)
    elif ___ <= temperature <= ___:
        color = (___, ___, ___)
        print(temperature, '도 → 초록색', color)
    else:
        color = (___, ___, ___)
        print(temperature, '도 → 빨간색', color)
`});

/* 06 시뮬레이터 · 16칸 따라가 보기 */
(function(){
  const svg=$('pcRing'), NS='http://www.w3.org/2000/svg', N=16, cs=[];
  for(let i=0;i<N;i++){
    const a=-Math.PI/2+i*2*Math.PI/N, c=document.createElementNS(NS,'circle');
    c.setAttribute('cx',(100+72*Math.cos(a)).toFixed(1)); c.setAttribute('cy',(100+72*Math.sin(a)).toFixed(1)); c.setAttribute('r','12');
    c.setAttribute('stroke','#0f2742'); c.setAttribute('stroke-width','2'); c.setAttribute('fill','#2a2f3a');
    svg.appendChild(c);
    const t=document.createElementNS(NS,'text'); t.setAttribute('x',(100+50*Math.cos(a)).toFixed(1)); t.setAttribute('y',(104+50*Math.sin(a)).toFixed(1));
    t.setAttribute('font-size','10'); t.setAttribute('text-anchor','middle'); t.setAttribute('fill','#6b7585'); t.textContent=i; svg.appendChild(t);
    cs.push(c);
  }
  let step=0;
  const msg=$('pcRingTxt'), nx=$('pcRingNext');
  function draw(){
    cs.forEach((c,i)=>{ const on=step<=N?i<step:i>=step-N; c.setAttribute('fill',on?'#ff3b30':'#2a2f3a'); });
    if(step===0) msg.innerHTML='버튼을 눌러 시작해요.';
    else if(step<=N) msg.innerHTML=`<b>켜기</b> i = ${step-1}<br><code>pixels[${step-1}] = (255, 0, 0)</code>`;
    else msg.innerHTML=`<b>끄기</b> i = ${step-N-1}<br><code>pixels[${step-N-1}] = (0, 0, 0)</code>`;
    if(step===2*N) msg.innerHTML+='<br>모두 꺼졌어요. 피코에서는 <code>while True</code>라서 처음부터 다시 반복해요.';
    nx.disabled=step>=2*N;
  }
  nx.onclick=()=>{ if(step<2*N){step++;draw();} };
  $('pcRingReset').onclick=()=>{step=0;draw();};
  draw();
})();

/* 07 돌아보기 */
const PC_STAGES=['① 준비 학습','② 회로 구성','③ 프로그래밍','④ 실행 결과'];
chips('stageGood','stageGoodSel',PC_STAGES,true);
chips('stageAgain','stageAgainSel',PC_STAGES,true);
vote('ach1','ach1Sel',[['예'],['아니요']]);
vote('ach2','ach2Sel',[['예'],['아니요']]);
vote('ach3','ach3Sel',[['예'],['아니요']]);
vote('ach4','ach4Sel',[['예'],['아니요']]);

/* 08 인터뷰 */
flipCards('intFlip',[
  {ic:'🎨',f:'미디어 아트를 만들게 된 계기는?',b:'호기심이 많아 회화를 전공하면서도 조각·설치·동양화·도예 같은 여러 분야를 함께 공부했어요. 미디어 아트에도 관심이 많아 자연스럽게 작품으로 만들게 되었어요.'},
  {ic:'📚',f:'미술 말고 필요한 지식은?',b:'영상 촬영과 편집, 영상 모니터를 입체 구조물에 설치하기 위한 전기 회로, 전시장 설치를 위한 타공·용접·목공 같은 설비 분야 지식이 필요했어요. 어렵지만 배우는 과정을 즐겼다고 해요.'},
  {ic:'🛠️',f:'작업은 어떤 순서로?',b:'그림·조각·미디어·설치를 합친 작품이에요. 먼저 주제를 정하고 아이디어 스케치로 모습을 계획해요. 그다음 영상 촬영·편집, 입체 구조물 제작, 모니터 선택, 설치와 페인팅을 차례로 해서 완성해요.'},
  {ic:'🖼️',f:'작품을 더 쉽게 즐기려면?',b:'관람 전에 작품 정보를 미리 알아보고 감상하면 즐거움이 커져요. 백남준 같은 유명 작가부터 처음 들어 보는 작가까지 찾아보고, 미디어 아트 전용 전시관을 직접 방문해 보는 것도 좋아요.'},
]);

/* 09 마무리 */
const MEMOLIST=[['planIdea','나의 계획 · 만들고 싶은 작품'],['prepStuck','준비 학습에서 막힌 점'],['rgbFind','R·G·B 움직여 보며 알게 된 점'],['colorTryMemo','해 보기 · 채운 값과 실행 결과'],['dhtWhere','온습도를 재고 싶은 장소'],['frameResult','실습 4 · 온도별 색 결과'],['frameIdea','내가 만들고 싶은 액자'],['artPlan','네오픽셀 작품 계획'],['stageGoodSel','잘 해냈다고 느낀 단계'],['stageAgainSel','다시 확인하고 싶은 단계'],['feel','느낀 점'],['ach1Sel','성취도 점검 1'],['ach2Sel','성취도 점검 2'],['ach3Sel','성취도 점검 3'],['ach4Sel','성취도 점검 4'],['intThink','인터뷰 · 더 필요한 지식'],['intWish','인터뷰 · 보고 싶은 전시·작가'],['keyQ','오늘의 질문에 대한 내 답']];
onShow[9]=()=>memoSummary('msum',MEMOLIST);
