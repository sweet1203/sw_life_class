
/* 진도 보내기 ①: 누가 쓰는지 확인 (반·학번마다 퀴즈·메모를 따로 저장) */
const WHO=(function(){
  if(!PEP) return {off:true,sfx:''};
  if(/[?&]preview(=|&|$)/.test(location.search)) return {preview:true,sfx:'@preview'};
  let w=null; try{w=JSON.parse(sessionStorage.getItem('aiw-who')||'null');}catch(e){}
  if(w&&w.teacher) return {preview:true,teacher:true,sfx:'@preview'};
  if(!w||!/^\d{5}$/.test(w.no||'')) return {need:true,sfx:'@none'};
  return {cls:w.cls,no:w.no,name:w.name,sfx:'@'+w.no};
})();
