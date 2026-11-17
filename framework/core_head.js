const NS='http://www.w3.org/2000/svg';
const $=id=>document.getElementById(id);
function el(tag,attrs,parent,text){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(text!=null)e.textContent=text;if(parent)parent.appendChild(e);return e;}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const fmt=n=>n.toLocaleString('ko-KR');



