// SP Seguretat - main.js
(function(){
  // Mobile nav
  const burger=document.querySelector('.burger');
  const menu=document.querySelector('.nav-menu');
  if(burger&&menu){burger.addEventListener('click',()=>menu.classList.toggle('open'))}

  // Scroll reveal
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Counters
  const counters=document.querySelectorAll('[data-count]');
  const co=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      const el=e.target;const target=+el.dataset.count;const suffix=el.dataset.suffix||'';
      let n=0;const step=Math.max(1,Math.round(target/60));
      const t=setInterval(()=>{n+=step;if(n>=target){n=target;clearInterval(t)}el.textContent=n+suffix},24);
      co.unobserve(el);
    });
  },{threshold:.5});
  counters.forEach(c=>co.observe(c));

  // Cookie banner
  const cookie=document.getElementById('cookie');
  if(cookie&&!localStorage.getItem('sp_cookie')){
    setTimeout(()=>cookie.classList.add('show'),1200);
    cookie.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
      localStorage.setItem('sp_cookie',b.dataset.action);cookie.classList.remove('show')
    }));
  }

  // Forms (demo)
  document.querySelectorAll('form[data-demo]').forEach(f=>{
    f.addEventListener('submit',e=>{
      e.preventDefault();
      const btn=f.querySelector('button[type=submit]');
      const orig=btn.textContent;
      btn.textContent='Enviando...';btn.disabled=true;
      setTimeout(()=>{
        btn.textContent='✓ Enviado, te contactaremos';
        f.reset();
        setTimeout(()=>{btn.textContent=orig;btn.disabled=false},3500);
      },800);
    });
  });

  // Year
  const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();
