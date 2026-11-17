/* temp.csv 서울(108) · 빈 값이 있는 줄(1907·1950·1953년)을 뺀 111개 · 교과서 데이터 그대로 */
const UV_Y=[1908,1909,1910,1911,1912,1913,1914,1915,1916,1917,1918,1919,1920,1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,1941,1942,1943,1944,1945,1946,1947,1948,1949,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022];
const UV_HI=[33.6,35.6,33.3,34.5,34.0,31.7,35.6,34.8,33.2,36.7,36.1,37.5,35.6,36.0,36.3,35.9,37.4,33.7,33.0,35.0,35.2,36.7,37.4,36.0,37.2,35.9,33.4,33.5,34.3,35.1,35.6,38.2,34.3,34.3,36.0,38.2,36.0,37.0,36.7,33.5,34.4,37.7,34.3,35.0,35.0,33.5,37.2,36.2,34.4,35.3,35.0,33.7,34.5,35.2,34.7,35.0,34.2,32.9,35.0,33.2,35.6,35.2,33.9,35.3,34.8,35.0,36.1,32.6,31.7,35.2,35.5,34.3,35.2,35.4,32.8,31.6,36.6,35.3,35.5,34.7,32.8,31.9,38.4,33.7,35.4,36.1,32.8,35.4,35.1,35.3,34.8,32.2,36.2,35.0,34.7,33.2,35.4,34.4,33.8,34.1,36.7,33.9,35.8,36.0,36.6,35.4,39.6,36.8,35.4,36.5,36.1];   /* 최고 기온 */
const UV_AVG=[10.4,10.6,10.3,10.6,10.1,10.0,12.0,10.8,10.9,9.8,10.5,11.1,11.4,10.9,10.8,10.6,11.0,10.7,10.5,11.0,11.1,11.4,11.8,10.9,11.6,10.5,10.1,11.2,9.8,11.4,10.9,11.7,10.8,11.1,10.9,11.7,10.9,10.4,11.3,9.6,11.7,11.7,11.4,11.5,10.1,10.4,11.6,12.0,12.1,12.4,11.7,11.3,12.2,11.4,11.5,11.6,11.8,10.9,11.4,11.5,11.9,12.0,11.1,12.5,11.5,12.3,12.4,12.5,10.8,11.2,12.5,12.4,11.6,11.6,11.2,11.9,12.1,13.0,12.8,12.3,12.5,12.0,13.5,12.2,12.2,12.9,13.8,13.2,12.7,12.8,12.9,12.8,13.3,12.1,13.0,13.3,12.9,12.9,12.1,12.0,12.2,12.5,13.4,13.6,13.6,13.0,12.9,13.5,13.2,13.7,13.2];  /* 평균 기온 */
const UV_LO=[-15.8,-14.6,-19.9,-21.5,-18.6,-19.6,-14.0,-21.3,-19.0,-21.1,-21.8,-19.3,-22.3,-15.3,-21.0,-20.4,-18.7,-17.4,-18.6,-23.1,-22.2,-17.5,-17.4,-22.5,-14.1,-18.4,-18.7,-16.9,-20.1,-16.0,-19.0,-19.6,-17.7,-20.4,-17.9,-18.6,-16.2,-19.1,-17.0,-17.3,-18.0,-14.9,-13.9,-17.2,-15.7,-17.3,-18.2,-19.8,-17.0,-16.5,-11.5,-18.4,-16.2,-18.2,-18.0,-18.4,-15.1,-15.9,-20.2,-16.1,-12.0,-17.4,-15.5,-11.8,-18.5,-16.8,-16.0,-13.0,-16.2,-16.5,-14.1,-13.9,-15.1,-16.7,-19.2,-15.1,-12.9,-11.2,-17.1,-15.0,-9.7,-11.2,-12.6,-11.1,-13.8,-13.7,-15.4,-12.3,-12.1,-18.6,-12.0,-15.5,-16.7,-14.0,-14.1,-8.6,-13.1,-12.9,-15.3,-17.8,-17.1,-16.4,-13.2,-13.0,-18.0,-12.6,-17.8,-10.9,-12.9,-18.6,-13.7];   /* 최저 기온 */
const UV_ALO=[5.8,5.8,5.7,6.0,5.1,4.9,7.7,6.6,6.4,4.8,5.6,6.0,6.3,6.1,5.9,5.7,5.8,5.8,5.6,5.9,5.9,6.2,6.6,6.3,7.2,6.4,5.8,6.6,5.3,6.9,6.4,6.7,6.0,6.3,5.9,6.4,6.0,5.7,6.6,5.0,6.9,7.4,7.1,7.1,5.8,6.1,7.3,7.9,7.8,8.1,7.3,7.2,8.4,7.0,7.4,7.7,7.6,7.0,7.5,7.8,8.0,8.2,7.2,8.6,7.4,8.1,8.4,8.6,6.8,7.2,8.3,8.3,7.6,7.7,7.4,7.9,8.0,9.0,9.0,8.2,8.5,8.1,9.5,8.2,8.3,8.7,9.8,9.0,8.6,8.9,9.1,9.2,9.5,8.4,9.3,9.7,9.1,9.1,8.5,8.4,8.5,8.7,9.3,9.3,9.4,8.8,8.8,9.3,9.4,9.6,9.2];  /* 평균 최저 기온 */

/* ===== 01 그래프 4가지 · 코드 가이드 ===== */
flipCards('uvGuide',[
  {ic:'📥',f:'import matplotlib.pyplot as plt',b:'이 코드는 한 번만 실행하면 그 다음부터는 그래프를 그릴 때 실행하지 않아도 돼요.'},
  {ic:'🏷️',f:'plt.그래프명(데이터명[\'칼럼명\'])',b:'그래프 이름만 바꾸면 돼요.',x:'선그래프 plot · 막대 그래프 bar · 산점도 scatter · 히스토그램 hist'},
  {ic:'↔️',f:'plt.plot(x, y)',b:'x, y는 x축과 y축을 의미해요.'},
  {ic:'⚠️',f:'주의 · x와 y의 개수',b:'plt.plot([10,20],[55,67])와 같이 x축 데이터와 y축 데이터를 직접 입력해서 그래프를 그릴 수도 있어요. 이때 x축 값과 y축 값의 개수는 반드시 같아야 해요.'},
]);

/* ===== 공통 : SVG 축 그리기 ===== */
function uvClear(svg){while(svg.firstChild)svg.removeChild(svg.firstChild);}
function uvFrame(svg,o){
  const W=o.W||480,H=o.H||300,L=o.L||48,R=o.R||12,T=o.T||14,B=o.B||46;
  uvClear(svg);
  const sx=v=>L+(v-o.xr[0])/(o.xr[1]-o.xr[0])*(W-L-R);
  const sy=v=>H-B-(v-o.yr[0])/(o.yr[1]-o.yr[0])*(H-T-B);
  const fm=o.yf||(v=>String(v).replace('-','−'));
  o.yt.forEach(v=>{
    el('line',{x1:L,x2:W-R,y1:sy(v),y2:sy(v),stroke:'#e3e7ec','stroke-width':1},svg);
    el('text',{x:L-6,y:sy(v)+4,'text-anchor':'end','font-size':13,fill:'#5b6776'},svg,fm(v));
  });
  o.xt.forEach(v=>{
    el('line',{x1:sx(v),x2:sx(v),y1:H-B,y2:H-B+4,stroke:'#5b6776'},svg);
    el('text',{x:sx(v),y:H-B+17,'text-anchor':'middle','font-size':13,fill:'#5b6776'},svg,String(v).replace('-','−'));
  });
  el('line',{x1:L,x2:L,y1:T,y2:H-B,stroke:'#5b6776'},svg);
  el('line',{x1:L,x2:W-R,y1:H-B,y2:H-B,stroke:'#5b6776'},svg);
  if(o.xl) el('text',{x:(L+W-R)/2,y:H-8,'text-anchor':'middle','font-size':14,'font-weight':700,fill:'#0f2742'},svg,o.xl);
  if(o.yl){const t=el('text',{x:13,y:(T+H-B)/2,'text-anchor':'middle','font-size':14,'font-weight':700,fill:'#0f2742',transform:`rotate(-90 13 ${(T+H-B)/2})`},svg,o.yl);}
  return {sx,sy,W,H,L,R,T,B};
}

/* ===== 01 네 가지 그래프 바꿔 그리기 (최고 기온) ===== */
(function(){
  const svg=$('uvPlot');
  const yrT=[1920,1940,1960,1980,2000,2020];
  const CAP=[
    '<b>선그래프 (plt.plot)</b> · x좌표를 연도로 하고 y좌표를 최고 기온으로 하는 선그래프예요. 해마다 오르내리는 흐름이 선으로 이어져 보여요.',
    '<b>막대 그래프 (plt.bar)</b> · x좌표를 연도로 하고 y좌표를 최고 기온으로 하는 막대 그래프예요. 막대가 0에서 시작하니 막대 길이가 거의 같아 보여서, 해마다 달라진 모습을 알아보기 어려워요.',
    '<b>산점도 (plt.scatter)</b> · x좌표를 연도로 하고 y좌표를 최고 기온으로 하는 산점도예요. 해마다 점이 하나씩 찍혀요.',
    '<b>히스토그램 (plt.hist)</b> · x좌표를 온도로 하고 y좌표를 빈도로 하는 최고 기온(빨강), 평균 기온(초록), 최저 기온(파랑)의 히스토그램이에요. 각 온도별 빈도수를 바탕으로 분포 상태를 파악할 수 있어요. 연도는 나타나지 않아요.'
  ];
  function hist(arr){const m={};arr.forEach(v=>{const b=Math.floor(v);m[b]=(m[b]||0)+1;});return m;}
  function draw(k){
    if(k<3){
      const bar=k===1, yr=bar?[0,40]:[31,40];
      const f=uvFrame(svg,{xr:[1900,2030],yr,xt:yrT,yt:bar?[0,10,20,30,40]:[32,34,36,38,40],xl:'year',yl:'temp'});
      if(k===0){
        el('polyline',{points:UV_Y.map((y,i)=>f.sx(y)+','+f.sy(UV_HI[i])).join(' '),fill:'none',stroke:'#2f6fd0','stroke-width':1.8,'stroke-linejoin':'round'},svg);
      }else if(bar){
        const w=Math.max(1.5,(f.W-f.L-f.R)/130*.7);
        UV_Y.forEach((y,i)=>el('rect',{x:f.sx(y)-w/2,y:f.sy(UV_HI[i]),width:w,height:f.sy(0)-f.sy(UV_HI[i]),fill:'#2f6fd0'},svg));
      }else{
        UV_Y.forEach((y,i)=>el('circle',{cx:f.sx(y),cy:f.sy(UV_HI[i]),r:3,fill:'#2f6fd0','fill-opacity':.85},svg));
      }
    }else{
      const S=[[UV_LO,'#2f4fb0','최저 기온'],[UV_AVG,'#1f9d74','평균 기온'],[UV_HI,'#d64535','최고 기온']];
      const hs=S.map(s=>hist(s[0])); let mx=0; hs.forEach(h=>{for(const b in h)mx=Math.max(mx,h[b]);});
      const top=Math.ceil((mx+1)/5)*5;
      const f=uvFrame(svg,{xr:[-25,45],yr:[0,top],xt:[-20,-10,0,10,20,30,40],yt:Array.from({length:top/5+1},(_,i)=>i*5),xl:'temp',yl:'count'});
      hs.forEach((h,i)=>{for(const b in h){const x0=f.sx(+b),x1=f.sx(+b+1);
        el('rect',{x:x0,y:f.sy(h[b]),width:Math.max(1,x1-x0-.6),height:f.sy(0)-f.sy(h[b]),fill:S[i][1],'fill-opacity':.9},svg);}});
      S.forEach((s,i)=>{el('rect',{x:f.sx(-8),y:f.T+30+i*18,width:11,height:11,fill:s[1]},svg);
        el('text',{x:f.sx(-8)+16,y:f.T+40+i*18,'font-size':13,fill:'#0f2742'},svg,s[2]);});
    }
  }
  tabs('uvBtns','uvCap',[{ic:'📈',n:'선그래프'},{ic:'📊',n:'막대 그래프'},{ic:'⚫',n:'산점도'},{ic:'🏔️',n:'히스토그램'}],(it,i)=>{draw(i);return CAP[i];});
  $('uvBtns').classList.add('uv-btns');
})();

/* ===== 02 평균 최저 기온 선그래프 + 구간 고르기 ===== */
(function(){
  const svg=$('uvRng'), read=$('uvRngRead');
  const RNG=[[1908,2022,'전체 (1908~2022)'],[1980,1999,'1980~1999 (교과서 ⑥)'],[2000,2022,'2000~2022']];
  function draw(k){
    const [a,b]=RNG[k]; const xs=[],ys=[];
    UV_Y.forEach((y,i)=>{if(y>=a&&y<=b){xs.push(y);ys.push(UV_ALO[i]);}});
    const mn=Math.min(...ys), mx=Math.max(...ys);
    const lo=Math.floor(mn), hi=Math.ceil(mx), step=(hi-lo)<=4?.5:1;
    const yt=[]; for(let v=lo;v<=hi+1e-9;v+=step)yt.push(Math.round(v*10)/10);
    const xstep=(b-a)>60?20:5; const xt=[]; for(let v=Math.ceil(a/xstep)*xstep;v<=b;v+=xstep)xt.push(v);
    const pad=(b-a)*.04;
    const f=uvFrame(svg,{H:290,xr:[a-pad,b+pad],yr:[lo,hi],xt,yt,xl:'연도',yl:'온도',yf:v=>v.toFixed(step<1?1:0)});
    el('polyline',{points:xs.map((x,i)=>f.sx(x)+','+f.sy(ys[i])).join(' '),fill:'none',stroke:k===1?'#1f9d74':'#2f6fd0','stroke-width':2,'stroke-linejoin':'round'},svg);
    if(xs.length<=30) xs.forEach((x,i)=>el('circle',{cx:f.sx(x),cy:f.sy(ys[i]),r:3,fill:k===1?'#1f9d74':'#2f6fd0'},svg));
    el('text',{x:f.L+(f.W-f.L-f.R)/2,y:f.T+12,'text-anchor':'middle','font-size':14,'font-weight':700,fill:'#0f2742'},svg,k===1?'서울의 1980~1990년대 평균 최저 기온':(k===0?'서울의 평균 최저 기온':'서울의 2000년 이후 평균 최저 기온'));
    read.innerHTML=`<div>고른 줄 수<b>${ys.length}개</b></div><div>가장 낮은 값<b>${mn.toFixed(1)}°C</b></div><div>가장 높은 값<b>${mx.toFixed(1)}°C</b></div><div>세로축 범위<b>${lo}~${hi}</b></div>`;
  }
  tabs('uvRngBtns','uvRngRead',RNG.map(r=>({ic:'',n:r[2]})),(it,i)=>{draw(i);return read.innerHTML;});
  $('uvRngBtns').classList.add('uv-btns');
  draw(0);
})();

pyrun('uvRun1',{rows:17,code:`# 교과서는 pandas로, 여기서는 같은 일을 기본 파이썬으로 해 봐요
# 서울의 평균 최저 기온 1975~2004년 (temp.csv 값)
start = 1975
low = [8.6, 7.4, 8.1, 8.4, 8.6, 6.8, 7.2, 8.3, 8.3, 7.6, 7.7, 7.4, 7.9, 8.0, 9.0,
       9.0, 8.2, 8.5, 8.1, 9.5, 8.2, 8.3, 8.7, 9.8, 9.0, 8.6, 8.9, 9.1, 9.2, 9.5]

data1 = []                        # 조건에 맞는 것만 모을 빈 리스트
for i in range(len(low)):
    year = start + i
    if year >= 1980 and year < 2000:   # 1980 이상 2000 미만
        data1.append((year, low[i]))

print('고른 줄 수 :', len(data1))
for year, v in data1:
    print(year, '■' * int((v - 6) * 5), v)   # 6도부터 센 글자 막대
`});

pyrun('uvRun2',{rows:19,code:`# 서울의 연대별 평균 최저 기온 (temp.csv 값을 연대별로 묶음)
from statistics import mean

decades = {
    1910: [5.7, 6.0, 5.1, 4.9, 7.7, 6.6, 6.4, 4.8, 5.6, 6.0],
    1920: [6.3, 6.1, 5.9, 5.7, 5.8, 5.8, 5.6, 5.9, 5.9, 6.2],
    1930: [6.6, 6.3, 7.2, 6.4, 5.8, 6.6, 5.3, 6.9, 6.4, 6.7],
    1940: [6.0, 6.3, 5.9, 6.4, 6.0, 5.7, 6.6, 5.0, 6.9, 7.4],
    1950: [7.1, 7.1, 5.8, 6.1, 7.3, 7.9],
    1960: [7.8, 8.1, 7.3, 7.2, 8.4, 7.0, 7.4, 7.7, 7.6, 7.0],
    1970: [7.5, 7.8, 8.0, 8.2, 7.2, 8.6, 7.4, 8.1, 8.4, 8.6],
    1980: [6.8, 7.2, 8.3, 8.3, 7.6, 7.7, 7.4, 7.9, 8.0, 9.0],
    1990: [9.0, 8.2, 8.5, 8.1, 9.5, 8.2, 8.3, 8.7, 9.8, 9.0],
    2000: [8.6, 8.9, 9.1, 9.2, 9.5, 8.4, 9.3, 9.7, 9.1, 9.1],
    2010: [8.5, 8.4, 8.5, 8.7, 9.3, 9.3, 9.4, 8.8, 8.8, 9.3],
}
for start in decades:
    m = mean(decades[start])
    print(start, '년대', round(m, 2), '■' * int((m - 5) * 8))
`});

/* ===== 03 착시 체험 ===== */
const UV_SC=[83,85,88,89];   /* 연습용으로 만든 점수 */
function uvScore(svg,mn,mx,step,o){
  o=o||{};
  const ticks=[]; for(let v=mn;v<=mx+1e-9;v+=step)ticks.push(Math.round(v*100)/100);
  const f=uvFrame(svg,{W:o.W||300,H:o.H||220,L:o.L||38,R:14,T:14,B:44,xr:[0.5,4.5],yr:[mn,mx],xt:[1,2,3,4],yt:ticks,xl:'시험 순서',yl:'점수',yf:v=>String(Math.round(v*10)/10)});
  el('polyline',{points:UV_SC.map((v,i)=>f.sx(i+1)+','+f.sy(v)).join(' '),fill:'none',stroke:'#d0602f','stroke-width':2.5},svg);
  UV_SC.forEach((v,i)=>el('circle',{cx:f.sx(i+1),cy:f.sy(v),r:4,fill:'#d0602f'},svg));
  return f;
}
uvScore($('uvIll1'),50,90,10);
uvScore($('uvIll2'),82,90,2);
(function(){
  const sl=$('uvMin'), svg=$('uvIll3'), cap=$('uvIllCap');
  function draw(){
    const mn=+sl.value, span=90-mn;
    const step=span>40?10:span>16?5:span>8?2:1;
    uvScore(svg,mn,90,step,{W:480,H:240,L:46});
    $('uvMinV').textContent=mn+'점';
    const rise=Math.round((UV_SC[3]-UV_SC[0])/span*100);
    cap.innerHTML=`세로축 <b>${mn}~90점</b>(${step}점 단위)으로 그리면, 점수가 <b>83점 → 89점으로 6점</b> 오른 것이 그래프 높이의 <b>약 ${rise}%</b>로 보여요. 점수는 그대로인데 시작을 높일수록 가파르게 보여요.`;
  }
  sl.addEventListener('input',draw); draw();
})();

/* ===== 04 마무리 ===== */
const MEMOLIST=[['planV','나의 계획 · 기온은 어떻게 변해 왔을까'],['pickG','네 가지 그래프를 바꿔 보며 알게 된 점'],['decadeNote','연대별 평균을 보고 알게 된 점'],['regionPlan','내가 사는 지역 · 그리고 싶은 그래프'],['periodRes','기간별 분석'],['tempRes','기온별 분석'],['talkMemo','토의하며 알게 된 점'],['illusionMemo','그래프를 볼 때 확인할 것'],['keyQ','오늘의 질문에 대한 내 답']];
onShow[4]=()=>memoSummary('msum',MEMOLIST);
