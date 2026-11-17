
/* 진도 보내기 ②: 화면 이동·퀴즈·메모·창 이탈을 선생님 시트로 */
(function(){
  if(WHO.off) return;
  const box=document.createElement('div');
  if(WHO.preview){
    box.className='tr-badge';
    box.innerHTML=WHO.teacher?'교사 모드 · 전송 안 함 <button type="button">끝내기</button>':'미리보기 · 진도 전송 안 함';
    (document.querySelector('.top')||document.body).appendChild(box);
    const b=box.querySelector('button'); if(b) b.onclick=()=>{ try{sessionStorage.removeItem('aiw-who');}catch(e){} location.reload(); };
    return;
  }

  if(WHO.need){
    let last={}; try{last=JSON.parse(localStorage.getItem('aiw-last')||'{}')||{};}catch(e){}
    box.className='tr-gate';
    box.innerHTML=`<form class="tr-card" autocomplete="off">
      <h2>수업 시작 전에</h2>
      <p class="tr-sub">학번과 이름을 써 주세요.</p>
      <label class="tr-f"><span>학번</span><input name="no" inputmode="numeric" maxlength="5" placeholder="예: 20101" value="${esc(last.no||'')}"></label>
      <label class="tr-f"><span>이름</span><input name="name" maxlength="10" placeholder="이름" value="${esc(last.name||'')}"></label>
      <div class="tr-cls" hidden>${__CLASSES__.map(c=>`<label><input type="radio" name="cls" value="${c}"><span>${c}</span></label>`).join('')}</div>
      <div class="tr-err"></div>
      <button class="btn" type="submit">시작하기 →</button>
      <p class="tr-note">어느 화면까지 왔는지, 퀴즈와 메모가 선생님께 전달돼요.<br>다른 친구 이름으로 들어가지 마세요.</p>
    </form>`;
    document.body.appendChild(box);
    const f=box.querySelector('form'), err=box.querySelector('.tr-err'), go2=f.querySelector('button[type=submit]'), clsBox=box.querySelector('.tr-cls');
    f.no.addEventListener('input',()=>{f.no.value=f.no.value.replace(/\D/g,'').slice(0,5);});
    const TEACH=t=>{let h=2166136261;for(const c of t){h^=c.codePointAt(0);h=Math.imul(h,16777619)>>>0;}return h.toString(36);}, TEACH_H='__TEACH_H__';
    const enter=w=>{ try{sessionStorage.setItem('aiw-who',JSON.stringify(w)); if(!w.teacher) localStorage.setItem('aiw-last',JSON.stringify({no:w.no,name:w.name}));}catch(e){} location.reload(); };
    const busy=on=>{ go2.disabled=on; go2.textContent=on?'명단에서 확인하는 중…':'시작하기 →'; };
    f.onsubmit=async e=>{
      e.preventDefault(); err.textContent='';
      const no=f.no.value.trim(), name=f.name.value.replace(/\s+/g,'').trim();
      if(TEACH(no+'|'+name)===TEACH_H) return enter({teacher:true});
      if(!/^\d{5}$/.test(no)){err.textContent='학번 다섯 자리를 숫자로 써 주세요.';f.no.focus();return;}
      if(name.length<2){err.textContent='이름을 써 주세요.';f.name.focus();return;}
      /* 명단에서 확인이 안 될 때만 반을 직접 고른다 */
      if(!clsBox.hidden){
        const cls=(f.querySelector('input[name=cls]:checked')||{}).value;
        if(!cls){err.textContent='반을 골라 주세요.';return;}
        return enter({cls,no,name});
      }
      busy(true);
      try{
        const r=await fetch(PEP,{method:'POST',body:JSON.stringify({op:'who',no,name})});
        const d=await r.json();
        if(d.ok) return enter({cls:d.cls,no,name});
        busy(false);
        if(d.err==='notfound'){ err.textContent='명단에서 찾지 못했어요. 학번과 이름을 다시 확인해 주세요. 계속 안 되면 선생님께 말해 주세요.'; return; }
        throw new Error(d.err);
      }catch(x){
        busy(false);
        if(clsBox.hidden){ clsBox.hidden=false; err.textContent='명단을 확인하지 못했어요. 내 반을 골라 주세요.'; }
      }
    };
    setTimeout(()=>{ (f.no.value?(f.name.value?go2:f.name):f.no).focus(); },50);
    return;
  }

  /* 이름 표시 + 바꾸기 */
  box.className='tr-who';
  box.innerHTML=`<span>${esc(WHO.cls)} ${esc(WHO.no)} <b>${esc(WHO.name)}</b></span><button type="button" title="다른 학생으로 바꾸기">바꾸기</button>`;
  (document.querySelector('.top')||document.body).appendChild(box);
  box.querySelector('button').onclick=()=>{ if(confirm('다른 학생으로 바꿀까요? (지금까지 한 것은 이 학번으로 저장돼 있어요)')){ try{sessionStorage.removeItem('aiw-who');}catch(e){} location.reload(); } };

  const SK=QK+'-seen', AK=QK+'-away';
  const seen=new Set(store.get(SK,[]));
  const A=store.get(AK,{n:0,s:0});
  let awayAt=null, lastAct=Date.now(), sent=0, lastSent=0, tmr=null, dirty=false;

  function snap(){
    let ok=0, done=0;
    for(const k in QUIZ) QUIZ[k].forEach((it,i)=>{const v=QS[k+'-'+i]; if(v!=null){done++; if(v===it.a) ok++;}});
    const ML=(typeof MEMOLIST!=='undefined')?MEMOLIST:[];
    return {op:'put',lesson:LESSON,title:document.title,cls:WHO.cls,no:WHO.no,name:WHO.name,
      scr:cur,names:pages.map((p,i)=>i?p.dataset.name:'시작'),seen:[...seen].sort((a,b)=>a-b),
      qOk:ok,qDone:done,qTot:TOTALQ,
      memo:ML.map(([k,l])=>[l,String(MEMO[k]==null?'':MEMO[k]).slice(0,1500)]),
      away:awayAt?1:0,leaves:A.n,awaySec:Math.round(A.s+(awayAt?(Date.now()-awayAt)/1000:0)),idle:Math.round((Date.now()-lastAct)/1000),n:++sent};
  }
  function flush(){
    if(!dirty) return; dirty=false; lastSent=Date.now();
    const body=JSON.stringify(snap());
    try{ if(navigator.sendBeacon && navigator.sendBeacon(PEP,new Blob([body],{type:'text/plain'}))) return; }catch(e){}
    try{ fetch(PEP,{method:'POST',mode:'no-cors',body,keepalive:true}).catch(()=>{}); }catch(e){}
  }
  /* 너무 자주 보내지 않기: 보통 15초, 창 이탈·복귀는 3초 간격 */
  function send(urgent){
    dirty=true; clearTimeout(tmr);
    const gap=urgent?3000:15000, wait=Math.max(0,gap-(Date.now()-lastSent));
    tmr=setTimeout(flush,wait);
  }

  const _go=go; go=function(i){ _go(i); if(!seen.has(cur)){seen.add(cur); store.set(SK,[...seen]);} send(true); };
  const _upd=updScore; updScore=function(){ _upd(); send(); };
  const _set=store.set; store.set=function(k,v){ _set(k,v); if(k===MK) send(); };

  function leave(){ if(awayAt) return; awayAt=Date.now(); A.n++; _set(AK,A); send(true); }
  function back(){ if(!awayAt) return; A.s+=(Date.now()-awayAt)/1000; awayAt=null; _set(AK,A); send(true); }
  document.addEventListener('visibilitychange',()=>{ document.hidden?leave():(document.hasFocus()&&back()); });
  window.addEventListener('blur',()=>setTimeout(()=>{ if(!document.hasFocus()) leave(); },300));
  window.addEventListener('focus',back);
  window.addEventListener('pagehide',()=>{ dirty=true; flush(); });
  ['pointerdown','keydown','input','wheel','touchstart'].forEach(t=>document.addEventListener(t,()=>{lastAct=Date.now();},{capture:true,passive:true}));
  /* 화면에 머물러 있으면 2분마다 한 번 신호 */
  setInterval(()=>{ if(!document.hidden) send(); },120000);
})();
