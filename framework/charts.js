
/* ===== 공용 그림·실습 부품 (framework/charts.js) =====
   차시는 설정값만 넘긴다. 쓰는 법은 docs/widgets.md
   orangeFlow · scatter · bars · boxes · miniTable · stat(평균·표준편차·상관·회귀·k-평균) · memoOf */

/* 다른 차시에서 적어 둔 메모 읽기 (check.py 가 차시·키가 있는지 확인) */
function memoOf(lid,key){ try{ return String((store.get('ds-'+lid+'-memo'+WHO.sfx,{})||{})[key]||'').trim(); }catch(e){ return ''; } }

/* 통계 계산 */
const stat={
  mean:a=>a.length?a.reduce((s,v)=>s+v,0)/a.length:NaN,
  sd(a,sample){const m=stat.mean(a);return Math.sqrt(a.reduce((s,v)=>s+(v-m)**2,0)/(a.length-(sample?1:0)));},
  q(a,p){const s=a.slice().sort((x,y)=>x-y),i=(s.length-1)*p,lo=Math.floor(i);return s[lo]+(s[Math.min(lo+1,s.length-1)]-s[lo])*(i-lo);},
  r(P){const n=P.length;if(n<2)return null;const mx=stat.mean(P.map(p=>p[0])),my=stat.mean(P.map(p=>p[1]));let sxy=0,sxx=0,syy=0;P.forEach(([x,y])=>{sxy+=(x-mx)*(y-my);sxx+=(x-mx)**2;syy+=(y-my)**2;});return sxx&&syy?sxy/Math.sqrt(sxx*syy):null;},
  /* 최소제곱 직선 y = a + b·x, 결정 계수 r2, 평균 제곱 오차 mse */
  fit(P){const n=P.length;if(n<2)return null;const mx=stat.mean(P.map(p=>p[0])),my=stat.mean(P.map(p=>p[1]));let sxy=0,sxx=0;P.forEach(([x,y])=>{sxy+=(x-mx)*(y-my);sxx+=(x-mx)**2;});if(!sxx)return null;const b=sxy/sxx,a=my-b*mx;return {a,b,...stat.err(P,a,b)};},
  err(P,a,b){let se=0,st=0;const my=stat.mean(P.map(p=>p[1]));P.forEach(([x,y])=>{se+=(y-(a+b*x))**2;st+=(y-my)**2;});return {mse:se/P.length,rmse:Math.sqrt(se/P.length),r2:st?1-se/st:NaN};},
  /* k-평균 한 단계: 점마다 가까운 중심 → 중심을 그 점들의 평균으로 */
  assign:(P,C)=>P.map(p=>{let bi=0,bd=Infinity;C.forEach((c,i)=>{const d=(p[0]-c[0])**2+(p[1]-c[1])**2;if(d<bd){bd=d;bi=i;}});return bi;}),
  center:(P,L,C)=>C.map((c,i)=>{const m=P.filter((_,j)=>L[j]===i);return m.length?[stat.mean(m.map(p=>p[0])),stat.mean(m.map(p=>p[1]))]:c.slice();}),
  /* 군집 안 거리 제곱합(SSE)과 평균 실루엣 점수 */
  sse:(P,L,C)=>P.reduce((s,p,j)=>s+(p[0]-C[L[j]][0])**2+(p[1]-C[L[j]][1])**2,0),
  silhouette(P,L){const k=Math.max(...L)+1;if(k<2)return NaN;const d=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);let s=0;P.forEach((p,i)=>{const avg=c=>{const m=P.filter((_,j)=>L[j]===c&&j!==i);return m.length?stat.mean(m.map(q=>d(p,q))):NaN;};const a=avg(L[i]);let b=Infinity;for(let c=0;c<k;c++)if(c!==L[i]){const v=avg(c);if(v<b)b=v;}s+=(isNaN(a)||!isFinite(b))?0:(b-a)/Math.max(a,b);});return s/P.length;},
  fmt:(v,d=2)=>v==null||isNaN(v)?'—':(v<0?'−':'')+Math.abs(v).toFixed(d)
};
const PAL=['#2f6fd0','#d64535','#1f9d74','#f2a516','#9b4fc4','#e0702b','#5b6776'];

/* 오렌지3 위젯 연결 흐름도 + 설정 표 + (선택) 진행 칩
   orangeFlow({svg:'id', table:'id', nodes:[{s:1,t:'File',sub:'파일.csv',c:'Data',x,y}], edges:[[1,2]], w, h, done:{box,key,items}})
   c: Data · Transform · Visualize · Model · Evaluate · Unsupervised · Associate · Explore
   설정 표는 화면에 <table class="tbl of-set" id="…"><tr data-s="1">…</tr></table> 로 두면 위젯을 누를 때 그 줄이 강조된다. */
const OF_COL={Data:'#f2b84b',Transform:'#f0875a',Visualize:'#fdb3a0',Model:'#f6a3c6',Evaluate:'#c5a1e8',Unsupervised:'#7fb2e0',Associate:'#8fd3c1',Explore:'#a7d36f'};
function orangeFlow(o){
  const S=$(o.svg), BW=o.bw||180, BH=48, N={}, id=o.svg;
  o.nodes.forEach(n=>N[n.s]=n);
  const W=o.w||Math.max(...o.nodes.map(n=>n.x))+BW+10, H=o.h||Math.max(...o.nodes.map(n=>n.y))+BH+10;
  let g=`<defs><marker id="${id}A" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#8a94a3"/></marker></defs>`;
  o.edges.forEach(([a,b,lab])=>{const p=N[a],q=N[b],x1=p.x+BW,y1=p.y+BH/2,x2=q.x-2,y2=q.y+BH/2;
    g+=`<path d="M${x1} ${y1}C${x1+40} ${y1} ${x2-40} ${y2} ${x2} ${y2}" class="fe" marker-end="url(#${id}A)"/>`;
    if(lab) g+=`<text x="${(x1+x2)/2}" y="${(y1+y2)/2-6}" class="fl">${esc(lab)}</text>`;});
  o.nodes.forEach(n=>{const k=OF_COL[n.c]||'#ccc';
    g+=`<g class="fn" data-s="${n.s}" tabindex="0" role="button" aria-label="${n.s}번 ${esc(n.t)}"><rect x="${n.x}" y="${n.y}" width="${BW}" height="${BH}" rx="10" class="fb" style="stroke:${k}"/><rect x="${n.x}" y="${n.y}" width="28" height="${BH}" rx="10" fill="${k}"/><rect x="${n.x+18}" y="${n.y}" width="10" height="${BH}" fill="${k}"/><text x="${n.x+14}" y="${n.y+29}" class="fnum">${n.s}</text><text x="${n.x+36}" y="${n.y+(n.sub?20:29)}" class="ft">${esc(n.t)}</text>${n.sub?`<text x="${n.x+36}" y="${n.y+37}" class="fs">${esc(n.sub)}</text>`:''}</g>`;});
  S.setAttribute('viewBox',`0 0 ${W} ${H}`); S.innerHTML=g;
  S.parentElement.classList.add('of-box'); S.style.minWidth=Math.min(W,o.minw||640)+'px';
  const T=o.table?$(o.table):null;
  const pick=s=>{S.querySelectorAll('.fn').forEach(x=>x.classList.toggle('on',x.dataset.s==s));
    if(T){T.querySelectorAll('tr[data-s]').forEach(tr=>tr.classList.toggle('hl',tr.dataset.s==s)); const tr=T.querySelector(`tr[data-s="${s}"]`); if(tr) tr.scrollIntoView({behavior:'smooth',block:'nearest'});}};
  S.querySelectorAll('.fn').forEach(x=>{x.onclick=()=>pick(x.dataset.s); x.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(x.dataset.s);}};});
  if(T){T.classList.add('of-set'); T.querySelectorAll('tr[data-s]').forEach(tr=>tr.onclick=()=>pick(tr.dataset.s));}
  if(o.legend!==false){const used=[...new Set(o.nodes.map(n=>n.c))]; const L=document.createElement('div'); L.className='of-legend';
    L.innerHTML=used.map(c=>`<span style="--k:${OF_COL[c]}">${c}</span>`).join('')+'<small>색은 오렌지3 왼쪽 위젯 카테고리예요.</small>'; S.parentElement.after(L);}
  if(o.done) chips(o.done.box,o.done.key,o.done.items,true);
  return {pick};
}

/* 산점도 탐색기
   const sp=scatter({svg:'id', x:[0,10,2], y:[0,100,20], xl:'x 이름', yl:'y 이름', edit:true, max:40, onChange(P){…}})
   onChange 는 set()과 학생이 점을 옮길 때만 불림(line·centers·resid 는 안 부름 → onChange 안에서 sp.line 해도 됨)
   sp.set([[x,y,색 또는 군집번호],…]) · sp.line(a,b,'색',점선?) · sp.lines([...]) · sp.centers([[x,y],…]) · sp.resid(true) · sp.points() */
function scatter(o){
  const S=$(o.svg), W=o.w||460, H=o.h||340, L=52, R=14, T=12, B=46, pw=W-L-R, ph=H-T-B;
  const [x0,x1,xs]=o.x, [y0,y1,ys]=o.y;
  const X=v=>L+(v-x0)/(x1-x0)*pw, Y=v=>T+ph-(v-y0)/(y1-y0)*ph, IX=x=>x0+(x-L)/pw*(x1-x0), IY=y=>y0+(T+ph-y)/ph*(y1-y0);
  const cl=(v,a,b)=>Math.max(a,Math.min(b,v)), dg=o.dec??1, rd=v=>+v.toFixed(dg), lab=v=>String(+v.toFixed(2)).replace('-','−');
  let P=[], LN=[], C=[], RES=false, drag=-1;
  S.setAttribute('viewBox',`0 0 ${W} ${H}`); S.classList.add('sp-svg');
  let g=`<rect x="${L}" y="${T}" width="${pw}" height="${ph}" fill="#fbfaf7"/>`;
  for(let v=x0;v<=x1+1e-9;v+=xs) g+=`<line x1="${X(v)}" y1="${T}" x2="${X(v)}" y2="${T+ph}" stroke="#eceae4"/><text x="${X(v)}" y="${T+ph+16}" text-anchor="middle" font-size="11" fill="#5b6776">${lab(v)}</text>`;
  for(let v=y0;v<=y1+1e-9;v+=ys) g+=`<line x1="${L}" y1="${Y(v)}" x2="${L+pw}" y2="${Y(v)}" stroke="#eceae4"/><text x="${L-6}" y="${Y(v)+4}" text-anchor="end" font-size="11" fill="#5b6776">${lab(v)}</text>`;
  g+=`<path d="M${L} ${T}V${T+ph}H${L+pw}" fill="none" stroke="#16202c" stroke-width="2"/><text x="${L+pw/2}" y="${H-6}" text-anchor="middle" font-size="12.5" font-weight="700" fill="#16202c">${o.xl} →</text><text x="14" y="${T+ph/2}" text-anchor="middle" font-size="12.5" font-weight="700" fill="#16202c" transform="rotate(-90 14 ${T+ph/2})">${o.yl} →</text><defs><clipPath id="${o.svg}C"><rect x="${L}" y="${T}" width="${pw}" height="${ph}"/></clipPath></defs><g class="ln" clip-path="url(#${o.svg}C)"></g><g class="pts"></g><g class="cs"></g>`;
  S.innerHTML=g;
  const col=p=>typeof p[2]==='number'?PAL[p[2]%PAL.length]:(p[2]||o.color||'#1f9d74');
  function draw(fin,quiet){
    let lg='';
    if(RES&&LN[0]) P.forEach(p=>{const yh=LN[0].a+LN[0].b*p[0]; lg+=`<line x1="${X(p[0])}" y1="${Y(p[1])}" x2="${X(p[0])}" y2="${Y(yh)}" stroke="#d64535" stroke-width="1.5" stroke-dasharray="3 3"/>`;});
    LN.forEach(l=>lg+=`<line x1="${X(x0)}" y1="${Y(l.a+l.b*x0)}" x2="${X(x1)}" y2="${Y(l.a+l.b*x1)}" stroke="${l.c||'#16202c'}" stroke-width="2.5"${l.dash?' stroke-dasharray="7 5"':''}/>`);
    S.querySelector('.ln').innerHTML=lg;
    S.querySelector('.pts').innerHTML=P.map((p,i)=>`<circle data-i="${i}" cx="${X(p[0])}" cy="${Y(p[1])}" r="${o.edit?7:5.5}" fill="${col(p)}" fill-opacity=".82" stroke="#fff" stroke-width="1.5"${o.edit?' class="sp-pt"':''}/>`).join('');
    S.querySelector('.cs').innerHTML=C.map((c,i)=>`<g transform="translate(${X(c[0])} ${Y(c[1])})"><path d="M-9 -9L9 9M9 -9L-9 9" stroke="#fff" stroke-width="7"/><path d="M-9 -9L9 9M9 -9L-9 9" stroke="${PAL[i%PAL.length]}" stroke-width="4"/></g>`).join('');
    if(o.onChange&&!quiet) o.onChange(P,fin);
  }
  const pt=e=>{const m=S.getScreenCTM(); if(!m) return [0,0]; const q=new DOMPoint(e.clientX,e.clientY).matrixTransform(m.inverse()); return [q.x,q.y];};
  if(o.edit){
    S.style.touchAction='none';
    S.addEventListener('pointerdown',e=>{const c=e.target.closest('circle[data-i]');
      if(c){drag=+c.dataset.i; S.setPointerCapture(e.pointerId); return;}
      const [x,y]=pt(e); if(x<L||x>L+pw||y<T||y>T+ph) return;
      if(P.length>=(o.max||40)) return;
      P.push([rd(cl(IX(x),x0,x1)),rd(cl(IY(y),y0,y1))]); draw(true);});
    S.addEventListener('pointermove',e=>{if(drag<0)return; const [x,y]=pt(e); P[drag]=[rd(cl(IX(x),x0,x1)),rd(cl(IY(y),y0,y1)),P[drag][2]]; draw(false);});
    const up=()=>{if(drag>=0){drag=-1; draw(true);}}; S.addEventListener('pointerup',up); S.addEventListener('pointercancel',up);
    S.addEventListener('dblclick',e=>{const c=e.target.closest('circle[data-i]'); if(c){P.splice(+c.dataset.i,1); draw(true);}});
  }
  draw(false);
  return {set(pts){P=pts.map(p=>p.slice()); draw(false); return this;}, points:()=>P.map(p=>p.slice()),
    line(a,b,c,dash){LN=a==null?[]:[{a,b,c,dash}]; draw(false,1); return this;}, lines(ls){LN=ls; draw(false,1); return this;},
    centers(cs){C=cs||[]; draw(false,1); return this;}, resid(on){RES=on; draw(false,1); return this;}, X, Y};
}

/* 막대그래프  bars('svgId',[['이름',값,'색'?],…],{max, unit, dec, w, h, horiz}) */
function bars(id,data,o={}){
  const S=$(id), W=o.w||460, n=data.length, horiz=o.horiz, rowH=30, H=o.h||(horiz?n*rowH+20:260);
  const mx=o.max||Math.max(...data.map(d=>d[1]))*1.1||1, dec=o.dec??0, u=o.unit||'';
  let g='';
  if(horiz){const L=o.left||120, pw=W-L-60;
    data.forEach(([k,v,c],i)=>{const y=10+i*rowH; g+=`<text x="${L-8}" y="${y+18}" text-anchor="end" font-size="12.5" fill="#16202c">${esc(k)}</text><rect x="${L}" y="${y+4}" width="${Math.max(0,v/mx*pw)}" height="${rowH-10}" rx="5" fill="${c||PAL[0]}"/><text x="${L+v/mx*pw+6}" y="${y+18}" font-size="12" font-weight="700" fill="#16202c">${(+v).toFixed(dec)}${u}</text>`;});
  }else{const L=36, B=40, T=18, ph=H-B-T, bw=(W-L-10)/n;
    g+=`<path d="M${L} ${T}V${T+ph}H${W-6}" fill="none" stroke="#16202c" stroke-width="1.5"/>`;
    data.forEach(([k,v,c],i)=>{const x=L+i*bw+bw*.15, h=Math.max(0,v/mx*ph); g+=`<rect x="${x}" y="${T+ph-h}" width="${bw*.7}" height="${h}" rx="4" fill="${c||PAL[i%PAL.length]}"/><text x="${x+bw*.35}" y="${T+ph-h-5}" text-anchor="middle" font-size="12" font-weight="700" fill="#16202c">${(+v).toFixed(dec)}${u}</text><text x="${x+bw*.35}" y="${T+ph+16}" text-anchor="middle" font-size="12" fill="#16202c">${esc(k)}</text>`;});
  }
  S.setAttribute('viewBox',`0 0 ${W} ${H}`); S.classList.add('sp-svg'); S.innerHTML=g;
}

/* 상자 그림  boxes('svgId',[['이름',[값…],'색'?],…],{min,max,step,unit,w}) — 가로 상자, 1.5×IQR 밖 값은 점 */
function boxes(id,groups,o={}){
  const S=$(id), W=o.w||460, rowH=44, L=o.left||90, R=16, H=groups.length*rowH+34, pw=W-L-R;
  const all=groups.flatMap(g=>g[1]), lo=o.min??Math.min(...all), hi=o.max??Math.max(...all), X=v=>L+(v-lo)/(hi-lo)*pw;
  let g=''; const st=o.step||(hi-lo)/5;
  for(let v=lo;v<=hi+1e-9;v+=st) g+=`<line x1="${X(v)}" y1="6" x2="${X(v)}" y2="${H-26}" stroke="#eceae4"/><text x="${X(v)}" y="${H-10}" text-anchor="middle" font-size="11" fill="#5b6776">${+v.toFixed(2)}${o.unit||''}</text>`;
  groups.forEach(([k,a,c],i)=>{const y=8+i*rowH+rowH/2-4, q1=stat.q(a,.25), q2=stat.q(a,.5), q3=stat.q(a,.75), iq=q3-q1, fl=a.filter(v=>v>=q1-1.5*iq), fh=a.filter(v=>v<=q3+1.5*iq), wl=Math.min(...fl), wh=Math.max(...fh), k2=c||PAL[i%PAL.length];
    g+=`<text x="${L-8}" y="${y+4}" text-anchor="end" font-size="12.5" fill="#16202c">${esc(k)}</text><line x1="${X(wl)}" y1="${y}" x2="${X(wh)}" y2="${y}" stroke="${k2}" stroke-width="2"/><rect x="${X(q1)}" y="${y-12}" width="${Math.max(1,X(q3)-X(q1))}" height="24" rx="4" fill="${k2}" fill-opacity=".25" stroke="${k2}" stroke-width="2"/><line x1="${X(q2)}" y1="${y-12}" x2="${X(q2)}" y2="${y+12}" stroke="${k2}" stroke-width="3"/>`+a.filter(v=>v<wl||v>wh).map(v=>`<circle cx="${X(v)}" cy="${y}" r="4" fill="#fff" stroke="#d64535" stroke-width="2"/>`).join('');});
  S.setAttribute('viewBox',`0 0 ${W} ${H}`); S.classList.add('sp-svg'); S.innerHTML=g;
}

/* 작은 표  miniTable('boxId',{cols:['이름',…], rows:[[…],…], edit:[열번호…], pick:true, onChange(rows), onPick(i)}) — 칸을 고치거나 줄을 고를 수 있음 */
function miniTable(box,o){
  const B=$(box); B.classList.add('mt-wrap'); let rows=o.rows.map(r=>r.slice()), sel=new Set();
  function draw(){
    B.innerHTML=`<table class="tbl mt"><tr>${o.pick?'<th></th>':''}${o.cols.map(c=>`<th>${c}</th>`).join('')}</tr>${rows.map((r,i)=>`<tr data-i="${i}" class="${sel.has(i)?'on':''}">${o.pick?`<td><input type="checkbox" aria-label="${i+1}번째 줄 고르기" ${sel.has(i)?'checked':''}></td>`:''}${r.map((v,j)=>(o.edit||[]).includes(j)?`<td><input class="mt-in" data-j="${j}" value="${esc(v)}" inputmode="decimal" aria-label="${esc(o.cols[j])}"></td>`:`<td>${v}</td>`).join('')}</tr>`).join('')}</table>`;
    B.querySelectorAll('.mt-in').forEach(inp=>inp.oninput=()=>{const i=+inp.closest('tr').dataset.i, j=+inp.dataset.j, v=inp.value.trim(); rows[i][j]=v===''||isNaN(+v)?v:+v; o.onChange&&o.onChange(rows);});
    B.querySelectorAll('input[type=checkbox]').forEach(cb=>cb.onchange=()=>{const i=+cb.closest('tr').dataset.i; cb.checked?sel.add(i):sel.delete(i); cb.closest('tr').classList.toggle('on',cb.checked); o.onPick&&o.onPick([...sel].sort((a,b)=>a-b));});
  }
  draw();
  return {rows:()=>rows.map(r=>r.slice()), set(r){rows=r.map(x=>x.slice()); sel.clear(); draw();}, picked:()=>[...sel]};
}
