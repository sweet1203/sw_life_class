let QS={}; try{QS=JSON.parse(localStorage.getItem(QK)||'{}')||{};}catch(e){QS={};}
function saveQ(){try{localStorage.setItem(QK,JSON.stringify(QS));}catch(e){}}
const TOTALQ=Object.values(QUIZ).reduce((a,b)=>a+b.length,0);
function qperm(n,key){ let h=2166136261; for(const c of key){h^=c.charCodeAt(0);h=Math.imul(h,16777619)>>>0;}
  const p=[...Array(n).keys()]; for(let i=n-1;i>0;i--){h=Math.imul(h^(h>>>15),2246822507)>>>0; h=(h+0x6D2B79F5)>>>0; const j=h%(i+1); [p[i],p[j]]=[p[j],p[i]];} return p; }
function renderQuiz(box){
  const k=box.dataset.quiz; box.innerHTML=`<div class="qh"><b>개념 퀴즈</b><span>${QUIZ[k].length}문제 · 고르면 바로 채점</span></div>`;
  QUIZ[k].forEach((it,i)=>{
    const id=k+'-'+i, d=document.createElement('div'); d.className='qi';
    /* 보기 순서는 학생마다 섞되(새로 고쳐도 같은 순서), 저장·채점은 원래 번호로 */
    const perm=qperm(it.o.length, QK+'|'+id);
    d.innerHTML=`<div class="qq">${i+1}. ${it.q}</div><div class="opts">${perm.map(j=>`<button data-j="${j}">${it.o[j]}</button>`).join('')}</div><div class="why"></div>`;
    const btn=j=>d.querySelector(`button[data-j="${j}"]`);
    const mark=(j,anim)=>{
      const bs=d.querySelectorAll('button'); bs.forEach(b=>b.disabled=true);
      btn(it.a).classList.add('right'); if(j!==it.a){btn(j).classList.add('wrong'); if(anim) d.classList.add('shake');}
      d.classList.add('answered', j===it.a?'correct':'incorrect');
      d.querySelector('.why').textContent=(j===it.a?'정답. ':'정답은 「'+it.o[it.a]+'」. ')+it.w;
    };
    d.querySelectorAll('button').forEach(b=>b.onclick=()=>{const j=+b.dataset.j;QS[id]=j;saveQ();mark(j,true);updScore();});
    if(QS[id]!=null && QS[id]<it.o.length) mark(QS[id],false);
    box.appendChild(d);
  });
}

/* 페이지 이동 */
const pages=[...document.querySelectorAll('.page')];
const stepBtns=pages.map((p,i)=>{const b=document.createElement('button');b.textContent=i?`${i}. ${p.dataset.name}`:'시작';b.onclick=()=>go(i);$('steps').appendChild(b);return b;});
function updScore(){
  let ok=0; for(const k in QUIZ) QUIZ[k].forEach((it,i)=>{if(QS[k+'-'+i]===it.a) ok++;});
  $('score').textContent=`퀴즈 ${ok} / ${TOTALQ}`;
  pages.forEach((p,i)=>{const q=p.querySelector('[data-quiz]'); if(!q) return; const k=q.dataset.quiz; stepBtns[i].classList.toggle('done',QUIZ[k].every((_,j)=>QS[k+'-'+j]!=null));});
  let h='<tr><th class="l">개념</th><th>맞힌 문제</th></tr>';
  for(const k in QUIZ){const n=QUIZ[k].length, c=QUIZ[k].filter((it,i)=>QS[k+'-'+i]===it.a).length, a=QUIZ[k].filter((_,i)=>QS[k+'-'+i]!=null).length;
    h+=`<tr><td class="l">${k}. ${pages[k].dataset.name}</td><td>${a?`<b class="${c===n?'ok':''}">${c} / ${n}</b>`:'<span class="muted">아직 안 풂</span>'}</td></tr>`;}
  h+=`<tr><td class="l"><b>합계</b></td><td><b>${ok} / ${TOTALQ}</b></td></tr>`;
  $('result').innerHTML=h;
}
let cur=-1;
const onShow={};
function go(i){
  i=Math.max(0,Math.min(pages.length-1,i)); if(i===cur) return;
  const back=i<cur; if(cur>=0) pages[cur].classList.remove('on','back');
  pages[i].classList.add('on'); pages[i].classList.toggle('back',back);
  document.documentElement.style.setProperty('--acc',pages[i].dataset.acc);
  document.documentElement.style.setProperty('--acc-soft',pages[i].dataset.acc+'1a');
  stepBtns.forEach((b,j)=>b.classList.toggle('on',j===i));
  const sb=$('steps'), btn=stepBtns[i]; sb.scrollLeft=btn.offsetLeft-sb.clientWidth/2+btn.clientWidth/2;
  $('prog').style.width=(i/(pages.length-1)*100)+'%';
  $('pg').textContent=`${i} / ${pages.length-1}`;
  $('prev').style.visibility=i?'visible':'hidden'; $('next').style.visibility=i<pages.length-1?'visible':'hidden';
  cur=i; try{history.replaceState(null,'','#p'+i);}catch(e){} window.scrollTo(0,0);
  if(onShow[i]) onShow[i]();
}
$('prev').onclick=()=>go(cur-1); $('next').onclick=()=>go(cur+1);
document.addEventListener('keydown',e=>{if(e.defaultPrevented)return; if(e.target.matches&&e.target.matches('input,select,textarea'))return; if(e.key==='ArrowRight')go(cur+1); if(e.key==='ArrowLeft')go(cur-1);});
document.querySelectorAll('.gcard').forEach(g=>g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();g.click();}}));
document.querySelectorAll('[data-quiz]').forEach(renderQuiz);
$('quizReset').onclick=()=>{QS={};saveQ();document.querySelectorAll('[data-quiz]').forEach(renderQuiz);updScore();};

