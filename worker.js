// Backend: article API + server-rendered article pages. Storage: Cloudflare KV (binding KV_BINDING).
// Secret: ADMIN_TOKEN (set in the Cloudflare dashboard, never in GitHub).
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const J=(d,s=200)=>new Response(JSON.stringify(d),{status:s,headers:{'content-type':'application/json','cache-control':'no-store'}});
const clean=(v,n)=>String(v??'').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,'').trim().slice(0,n);
const slugify=t=>t.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,60).replace(/-+$/,'');
const same=(a,b)=>{if(a.length!==b.length)return false;let r=0;for(let i=0;i<a.length;i++)r|=a.charCodeAt(i)^b.charCodeAt(i);return r===0};
const authed=(req,env)=>{const t=(req.headers.get('authorization')||'').replace(/^Bearer /,'');return !!env.ADMIN_TOKEN&&same(t,env.ADMIN_TOKEN)};

const page=a=>`<!doctype html><html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>${esc(a.title)} | Abraham Nkeki Thlama</title><meta name="description" content="${esc(a.excerpt)}"><meta property="og:type" content="article"><meta property="og:title" content="${esc(a.title)}"><meta property="og:description" content="${esc(a.excerpt)}"><meta name="twitter:card" content="summary"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap"><link rel="stylesheet" href="/style.css"><script>try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}</script></head><body><main class="wrap post"><a class="btn" href="/#writing">← All writing</a><span class="cat">${esc(a.category)}${a.date?' · '+esc(a.date):''}</span><h1>${esc(a.title)}</h1>${a.content.map(p=>`<p>${esc(p)}</p>`).join('')}</main></body></html>`;

export default{async fetch(req,env){
  const p=new URL(req.url).pathname,m=req.method;
  const w=p.match(/^\/writing\/([a-z0-9-]{1,60})\/?$/);
  if(w&&m==='GET'){
    const a=await env.KV_BINDING.get('a:'+w[1],'json');
    return a?new Response(page(a),{headers:{'content-type':'text/html;charset=utf-8','cache-control':'public, max-age=60'}}):new Response('Article not found',{status:404});
  }
  if(p==='/api/articles'&&m==='GET')return J((await env.KV_BINDING.get('index','json'))||[]);
  if(p==='/api/articles'&&m==='POST'){
    if(!authed(req,env))return J({error:'Not authorized. Check your token.'},401);
    let b;try{b=await req.json()}catch{return J({error:'Invalid request.'},400)}
    const title=clean(b.title,120),excerpt=clean(b.excerpt,300),category=clean(b.category,40)||'Writing',date=clean(b.date,40);
    const content=(Array.isArray(b.content)?b.content:[]).slice(0,200).map(x=>clean(x,5000)).filter(Boolean);
    const slug=slugify(title);
    if(title.length<3||excerpt.length<10||!content.length||!slug)return J({error:'Add a title, a short summary, and the article text.'},400);
    const idx=(await env.KV_BINDING.get('index','json'))||[];
    await env.KV_BINDING.put('a:'+slug,JSON.stringify({slug,title,excerpt,category,date,content}));
    await env.KV_BINDING.put('index',JSON.stringify([{slug,title,excerpt,category,date},...idx.filter(x=>x.slug!==slug)].slice(0,200)));
    return J({ok:true,slug},201);
  }
  const d=p.match(/^\/api\/articles\/([a-z0-9-]{1,60})$/);
  if(d&&m==='DELETE'){
    if(!authed(req,env))return J({error:'Not authorized. Check your token.'},401);
    const idx=(await env.KV_BINDING.get('index','json'))||[];
    await env.KV_BINDING.delete('a:'+d[1]);
    await env.KV_BINDING.put('index',JSON.stringify(idx.filter(x=>x.slug!==d[1])));
    return J({ok:true});
  }
  if(p.startsWith('/api/'))return J({error:'Not found.'},404);
  return env.ASSETS.fetch(req);
}};
