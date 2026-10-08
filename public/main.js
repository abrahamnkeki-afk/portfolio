/* ===== SITE LOGIC ===== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],R=document.documentElement;
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
R.classList.add('js');
let C='#f5a524';const col=()=>{C=getComputedStyle(R).getPropertyValue('--ac').trim()||C};
try{const t=localStorage.getItem('theme');if(t)R.dataset.theme=t}catch(e){}col();
$('#th').onclick=()=>{const n=R.dataset.theme==='light'?'dark':'light';R.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}col()};
const ph=$('#photo');ph.onerror=()=>ph.remove();ph.src=D.photo;
$('#h1').innerHTML=$('#h1').textContent.trim().split(' ').map((w,i)=>`<span class="w"><span style="--i:${i}">${w}</span></span> `).join('');
$('#cards').innerHTML=D.cards.map(([t,d,i])=>`<article class="card rv"><svg viewBox="0 0 24 24" aria-hidden="true">${i}</svg><h3>${t}</h3><p>${d}</p></article>`).join('');
$('#stack').innerHTML=D.stack.map(([g,a])=>`<div class="rv"><h3>${g}</h3><div class="bds">${a.map(b=>`<span class="bd">${b}</span>`).join('')}</div></div>`).join('')+'<p class="note rv">Only tools I have actually used are listed. The list grows as I do.</p>';
$('#tl').innerHTML=D.tl.map(([y,t,d,g])=>`<div class="ti rv"><div class="y">${y}<span class="tag">${g==='Now'?'In progress':'Goal'}</span></div><h3>${t}</h3><p>${d}</p></div>`).join('');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const draw=L=>{const A=L.length?L:[{title:"Your first article goes here",excerpt:"Articles you publish from the admin page appear here.",category:"Placeholder",ph:1}];
$('#arts').innerHTML=A.map(a=>`<article class="card art rv in${a.ph?'':' live'}"><span class="cat">${esc(a.category)}${a.date?' · '+esc(a.date):''}</span><h3>${esc(a.title)}</h3><p>${esc(a.excerpt)}</p>${a.ph?'<span class="btn" aria-disabled="true">Read article →</span>':`<a class="btn" href="/writing/${encodeURIComponent(a.slug)}">Read article →</a>`}</article>`).join('')};
draw([]);fetch('/api/articles').then(r=>r.ok?r.json():[]).then(draw).catch(()=>{});
const I={x:'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',li:'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z',gh:'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .321.216.694.825.576C20.565 21.796 24 17.3 24 12.297c0-6.627-5.373-12-12-12',em:'M2 5h20v14H2zM2 6l10 7 10-7',wa:'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.2 14.8l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 0 1 12 4zm-3 3.5c-.3 0-.7.2-1 .7-.5.9-.1 2.2 1 3.7 1.3 1.8 3 3 4.600 3.300.8.100 1.600-.4 1.900-1.100l.1-.5-1.800-.9-.7.800c-1.200-.4-2.300-1.500-2.800-2.700l.7-.7-.8-1.800z'};
const S=[['X / Twitter','@nkekithlama',D.links.x,'x'],['LinkedIn','Abraham Nkeki Thlama',D.links.li,'li'],['GitHub','abrahamnkeki-afk',D.links.gh,'gh'],['Email',D.email,'mailto:'+D.email,'em'],['WhatsApp','Message me',`https://wa.me/${D.wa}?text=${encodeURIComponent("Hi Abraham, I found your website.")}`,'wa']];
const ext=u=>u.startsWith('mailto')?'':' target="_blank" rel="noopener noreferrer"';
$('#soc').innerHTML=S.map(([n,s,u,k])=>`<a href="${u}"${ext(u)}><svg viewBox="0 0 24 24" aria-hidden="true"${k==='em'?' style="fill:none;stroke:currentColor;stroke-width:1.8"':''}><path d="${I[k]}"/></svg><span>${n}<small>${s}</small></span></a>`).join('');
$('#fsoc').innerHTML=S.map(([n,s,u])=>`<li><a href="${u}"${ext(u)}>${n}</a></li>`).join('');
$('#hs').innerHTML=['li','gh','x'].map(k=>S.find(s=>s[3]===k)).map(([n,,u,k])=>`<a href="${u}"${ext(u)} aria-label="${n}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${I[k]}"/></svg></a>`).join('');
/* nav, menu, scroll */
const nav=$('#nav'),pb=$('#pb');
const tgl=o=>{nav.classList.toggle('open',o);document.body.classList.toggle('open',o);$('#bg').setAttribute('aria-expanded',o);$('#bg').setAttribute('aria-label',o?'Close menu':'Open menu');document.body.style.overflow=o?'hidden':''};
nav.classList.toggle('open',false);$('#bg').onclick=()=>tgl(!nav.classList.contains('open'));
$$('#menu a').forEach(a=>a.onclick=()=>tgl(false));addEventListener('keydown',e=>{if(e.key==='Escape')tgl(false)});
const sc=()=>{const y=scrollY,h=R.scrollHeight-innerHeight;nav.classList.toggle('s',y>20);pb.style.transform=`scaleX(${h>0?y/h:0})`;R.style.setProperty('--sp',(h>0?y/h*100:0)+'%')};
addEventListener('scroll',sc,{passive:true});sc();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.rv').forEach((e,i)=>io.observe(e));
const sio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('.links a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
$$('main section[id]').forEach(s=>sio.observe(s));
/* dynamic: cursor glow, magnetic buttons, Nigeria clock */
if(fine){addEventListener('pointermove',e=>{R.style.setProperty('--mx',e.clientX+'px');R.style.setProperty('--my',e.clientY+'px')},{passive:true});
if(!rm)$$('[data-mag]').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')})}
const tf=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Lagos',hour:'2-digit',minute:'2-digit'});
const clk=()=>$('#clock').textContent=tf.format(new Date())+' WAT';clk();setInterval(clk,20000);
/* hero network: reacts to the pointer */
(()=>{const c=$('#net'),x=c.getContext('2d'),hero=$('#home');let W,H,P=[],m={x:-999,y:-999},run=true,raf;
const mk=()=>{const r=c.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;c.width=W*d;c.height=H*d;x.setTransform(d,0,0,d,0,0);P=Array.from({length:Math.min(75,W*H/14000|0)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35}))};
const draw=()=>{x.clearRect(0,0,W,H);x.fillStyle=x.strokeStyle=C;for(let i=0;i<P.length;i++){const p=P[i];if(!rm){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy);if(d<130){p.x+=dx/d*1.6;p.y+=dy/d*1.6}}
x.globalAlpha=.7;x.beginPath();x.arc(p.x,p.y,1.8,0,6.3);x.fill();
for(let j=i+1;j<P.length;j++){const q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<120){x.globalAlpha=(1-d/120)*.3;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke()}}}
if(!rm&&run)raf=requestAnimationFrame(draw)};
mk();draw();let t;addEventListener('resize',()=>{clearTimeout(t);t=setTimeout(()=>{mk();if(rm)draw()},150)});
hero.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();m.x=e.clientX-r.left;m.y=e.clientY-r.top});hero.addEventListener('pointerleave',()=>{m.x=m.y=-999});
new IntersectionObserver(([e])=>{const was=run;run=e.isIntersecting;if(run&&!was&&!rm)draw()}).observe(hero)})();
/* contact form */
const f=$('#f'),st=$('#st'),sb=$('#sb');
const rules={name:v=>v.length>=2||'Enter your name.',email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)||'Enter a valid email address.',subject:v=>v.length>=3||'Add a short subject.',message:v=>v.length>=10||'Write at least 10 characters.'};
const chk=(k,v)=>{const r=rules[k](v),el=f.elements[k];$('#e-'+k).textContent=r===true?'':r;el.setAttribute('aria-invalid',r!==true);return r===true};
['name','email','subject','message'].forEach(k=>f.elements[k].addEventListener('blur',e=>chk(k,e.target.value.trim())));
f.addEventListener('submit',async e=>{e.preventDefault();st.className='';st.textContent='';
const v=Object.fromEntries(new FormData(f));if(v.website)return;
['name','email','subject','message'].forEach(k=>v[k]=(v[k]||'').trim());
const ok=['name','email','subject','message'].map(k=>chk(k,v[k])).every(Boolean);
if(!ok){const bad=f.querySelector('[aria-invalid=true]');bad&&bad.focus();return}
sb.disabled=true;sb.textContent='Sending…';
try{
if(D.formEndpoint){const r=await fetch(D.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({name:v.name,email:v.email,subject:v.subject,message:v.message})});if(!r.ok)throw new Error('bad');st.className='ok';st.textContent='Message sent. Thank you, I will reply by email.';f.reset()}
else{await new Promise(r=>setTimeout(r,500));location.href=`mailto:${D.email}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(v.message+'\n\n'+v.name+' ('+v.email+')')}`;st.className='ok';st.textContent='Your email app should open with this message ready. Nothing is sent until you press send there.'}
}catch(err){st.className='bad';st.textContent=`Could not send. Email me directly at ${D.email} or use WhatsApp.`}
sb.disabled=false;sb.textContent='Send Message →'});
