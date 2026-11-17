
/* 공용 부품: 메모·카드·분류 게임·탭·투표·칩 */
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]];}return a;};
const store={get(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v;}catch(e){return d;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};

/* 메모: data-memo가 있는 입력칸은 이 기기에 저장 */
let MEMO=store.get(MK,{});
function bindMemos(){
  document.querySelectorAll('[data-memo]').forEach(t=>{
    const k=t.dataset.memo; if(MEMO[k]!=null) t.value=MEMO[k];
    let tm; t.addEventListener('input',()=>{MEMO[k]=t.value; clearTimeout(tm); tm=setTimeout(()=>{store.set(MK,MEMO); const s=t.parentElement.querySelector('.saved'); if(s){s.textContent='이 기기에 저장됨'; setTimeout(()=>s.textContent='',1400);} t.dispatchEvent(new Event('memo'));},300);});
  });
}
function memoSummary(box,list){
  const h=list.map(([k,label])=>{const v=(MEMO[k]||'').trim(); return `<dt>${esc(label)}</dt><dd class="${v?'':'e'}">${v?esc(v):'(아직 안 씀)'}</dd>`;}).join('');
  $(box).innerHTML=`<h4>오늘 화면에 적어 둔 내 메모</h4><dl>${h}</dl>`;
}

/* 뒤집는 카드 */
function flipCards(box,items){
  $(box).innerHTML=items.map(c=>`<div class="tcard" tabindex="0"><div class="in"><div class="f"><i>${c.ic||''}</i><b>${c.f}</b>${c.s?`<small>${c.s}</small>`:''}</div><div class="b">${c.b}${c.x?`<div class="x">${c.x}</div>`:''}</div></div></div>`).join('');
  $(box).querySelectorAll('.tcard').forEach(t=>{const f=()=>t.classList.toggle('flip'); t.onclick=f; t.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f();}};});
}

/* 분류 게임: 문장을 보고 알맞은 묶음 고르기 */
function sorter(box,cfg){
  const B=$(box);
  function start(){
    const order=shuffle(cfg.items.map((_,i)=>i)); let pos=0, ok=0; const placed=cfg.cats.map(()=>[]);
    B.innerHTML=`<div class="sit"><div class="cnt"></div><div class="ic"></div><div class="sq"></div><div class="row btns">${cfg.cats.map((c,j)=>`<button class="btn sm cat" style="--k:${c.k}" data-j="${j}">${c.n}</button>`).join('')}</div><div class="fb"></div><div class="row nx" style="margin-top:8px"></div></div><div class="board" style="--n:${cfg.cats.length}">${cfg.cats.map(c=>`<div style="--k:${c.k}"><b>${c.n}</b></div>`).join('')}</div>`;
    const sq=B.querySelector('.sq'), ic=B.querySelector('.ic'), cnt=B.querySelector('.cnt'), fb=B.querySelector('.fb'), nx=B.querySelector('.nx'), btns=[...B.querySelectorAll('.cat')], cols=[...B.querySelectorAll('.board>div')];
    function show(){
      if(pos>=order.length){cnt.textContent=''; ic.textContent='🎉'; sq.innerHTML=`${order.length}개 중 <b>${ok}개</b>를 바로 맞혔어요.`; fb.innerHTML=cfg.end||''; btns.forEach(b=>b.style.display='none'); nx.innerHTML='<button class="btn ghost sm">처음부터 다시</button>'; nx.firstChild.onclick=start; return;}
      const it=cfg.items[order[pos]]; cnt.textContent=`${pos+1} / ${order.length}`; ic.textContent=it.ic||''; sq.innerHTML=it.t; fb.textContent=''; nx.innerHTML=''; btns.forEach(b=>{b.disabled=false;b.style.display='';});
    }
    btns.forEach(b=>b.onclick=()=>{
      const it=cfg.items[order[pos]], j=+b.dataset.j, right=j===it.c; if(right) ok++;
      btns.forEach(x=>x.disabled=true);
      fb.innerHTML=(right?'<span class="ok">맞아요!</span> ':`<span class="ng">아쉬워요.</span> 정답은 <b>${cfg.cats[it.c].n}</b>. `)+(it.w||'');
      const s=document.createElement('span'); s.innerHTML=it.short||it.t; if(!right) s.className='x'; cols[it.c].appendChild(s);
      nx.innerHTML='<button class="btn sm">다음 →</button>'; nx.firstChild.onclick=()=>{pos++;show();}; nx.firstChild.focus();
    });
    show();
  }
  start();
}

/* 탭 보기: 버튼을 누르면 내용 바꾸기 */
function tabs(btnBox,viewBox,items,render){
  $(btnBox).innerHTML=items.map((it,i)=>`<button data-i="${i}"><span class="e">${it.ic||''}</span><b>${it.n}</b></button>`).join('');
  const bs=[...$(btnBox).querySelectorAll('button')];
  const pick=i=>{bs.forEach((b,j)=>b.classList.toggle('on',i===j)); $(viewBox).innerHTML=render(items[i],i);};
  bs.forEach(b=>b.onclick=()=>pick(+b.dataset.i)); pick(0);
}

/* 투표: 고르면 결과 보이기 (이 기기에만 저장) */
function vote(box,key,opts,onPick){
  const B=$(box); B.innerHTML=opts.map((o,i)=>`<button data-i="${i}">${o[0]}${o[1]?`<small>${o[1]}</small>`:''}</button>`).join('');
  const bs=[...B.querySelectorAll('button')];
  const pick=(i,save)=>{bs.forEach((b,j)=>b.classList.toggle('on',i===j)); if(save){MEMO[key]=opts[i][0]; store.set(MK,MEMO);} onPick&&onPick(i);};
  bs.forEach(b=>b.onclick=()=>pick(+b.dataset.i,true));
  const prev=opts.findIndex(o=>o[0]===MEMO[key]); if(prev>=0) pick(prev,false);
}
function chips(box,key,opts,multi){
  const B=$(box); B.classList.add('chk'); B.innerHTML=opts.map(o=>`<button>${o}</button>`).join('');
  const bs=[...B.querySelectorAll('button')]; let sel=(MEMO[key]||'').split(' · ').filter(Boolean);
  const draw=()=>bs.forEach(b=>b.classList.toggle('on',sel.includes(b.textContent)));
  bs.forEach(b=>b.onclick=()=>{const t=b.textContent; if(multi) sel=sel.includes(t)?sel.filter(x=>x!==t):[...sel,t]; else sel=sel.includes(t)?[]:[t]; MEMO[key]=sel.join(' · '); store.set(MK,MEMO); draw(); B.dispatchEvent(new Event('memo'));});
  draw();
}
