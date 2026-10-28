/* Editorial interactions. No dependencies; usable without JavaScript. */
(() => {
 'use strict';
 const root = document.documentElement;
 root.classList.add('js');
 const query = matchMedia('(prefers-reduced-motion: reduce)');
 const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
 const motionButton = document.querySelector('.motion-control');
 let manualPause = false;
 try { manualPause = sessionStorage.getItem('motion-paused') === 'true'; } catch (_) {}
 const isPaused = () => manualPause || query.matches;
 const stage = document.querySelector('.portrait-stage');
 const syncMotion = () => {
  root.dataset.motion = isPaused() ? 'paused' : 'playing';
  if (motionButton) {
   motionButton.hidden = false;
   motionButton.disabled = query.matches;
   motionButton.setAttribute('aria-pressed', String(isPaused()));
   motionButton.querySelector('.motion-label').textContent = query.matches ? 'Reduced motion' : manualPause ? 'Resume motion' : 'Pause motion';
   motionButton.querySelector('.motion-symbol').textContent = isPaused() ? '▷' : 'Ⅱ';
  }
  if (stage && isPaused()) { stage.style.removeProperty('--tilt-x'); stage.style.removeProperty('--tilt-y'); }
 };
 syncMotion();
 motionButton?.addEventListener('click', () => {
  manualPause = !manualPause;
  try { sessionStorage.setItem('motion-paused', String(manualPause)); } catch (_) {}
  syncMotion();
 });
 query.addEventListener('change', syncMotion);
 const menu = document.querySelector('.menu-toggle');
 const nav = document.querySelector('.navlinks');
 const closeMenu = () => { nav?.classList.remove('open'); menu?.setAttribute('aria-expanded','false'); };
 menu?.addEventListener('click', () => { menu.setAttribute('aria-expanded',String(nav.classList.toggle('open'))); });
 nav?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
 document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav?.classList.contains('open')) { closeMenu();menu.focus(); } });
 document.querySelectorAll('section[data-section]').forEach(section => {
  section.querySelector('.eyebrow')?.setAttribute('data-number',section.dataset.section);
 });
 // Initialize observer before enabling hidden starting states.
 if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
   if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
  }), { threshold: .08, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.section-head,.methods-heading,.topic,.paper,.software article,.method-collection,.cv-item,.research-note,.teaching > div,.contact > *').forEach((el,i) => {
   el.setAttribute('data-reveal','');
   el.style.setProperty('--delay', (el.matches('.topic,.software article,.method-collection') ? i%3 * .12 : 0) + 's');
   observer.observe(el);
  });
  root.classList.add('motion-ready');
 }
 // Keyboard focus must never land on visually hidden content.
 document.addEventListener('focusin',e => e.target.closest('[data-reveal]')?.classList.add('in'));
 // Small portrait response on mouse devices; no movement forced on touch screens.
 if (stage) {
  stage.addEventListener('pointermove', e => {
   if (isPaused() || !finePointer.matches) return;
   const box = stage.getBoundingClientRect();
   stage.style.setProperty('--tilt-x', ((e.clientX-box.left)/box.width-.5)*7+'deg');
   stage.style.setProperty('--tilt-y', -((e.clientY-box.top)/box.height-.5)*5+'deg');
  },{passive:true});
  stage.addEventListener('pointerleave',()=>{stage.style.setProperty('--tilt-x','0deg');stage.style.setProperty('--tilt-y','0deg');});
 }
 const header = document.querySelector('header');
 const progress = document.createElement('span');
 progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');header?.append(progress);
 const entries = [...document.querySelectorAll('.navlinks a[href^="#"]')].map(link => ({link,section:document.querySelector(link.getAttribute('href'))})).filter(x=>x.section);
 let scheduled=false;
 function update(){
  scheduled=false;
  const ratio=Math.max(0,Math.min(1,scrollY/Math.max(1,root.scrollHeight-innerHeight)));
  progress.style.setProperty('--read',ratio);
  header?.classList.toggle('scrolled',scrollY>40);
  let current=null;
  entries.forEach(e=>{if(e.section.getBoundingClientRect().top<innerHeight*.35)current=e;});
  entries.forEach(e=>{e.link.classList.toggle('active',e===current);if(e===current)e.link.setAttribute('aria-current','location');else e.link.removeAttribute('aria-current');});
 }
 const queue=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}};
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);addEventListener('load',queue);document.addEventListener('toggle',queue,true);update();
})();

// A simple, keyboard-accessible lens on the illustrative living system.
(() => {
 const system = document.querySelector('.living-system');
 if (!system) return;
 const captions = { all: 'A living rhizosphere · conceptual illustration.', roots: 'Roots release carbon and take up water and nutrients from soil.', microbes: 'Bacteria and fungi transform organic matter and cycle nutrients near roots.', soil: 'Soil provides habitat, water and nutrients; roots and microbes take up nutrients, while microbial turnover and mineralization release them.' };
 system.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  system.dataset.layer = button.dataset.view;
  system.querySelectorAll('[data-view]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
  system.querySelector('.system-caption').textContent = captions[button.dataset.view];
 }));
})();
