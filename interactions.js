document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.navlinks');
function closeMenu() { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => { const open = links.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
links.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && links.classList.contains('open')) { closeMenu(); toggle.focus(); } });
if ('IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries => { for (const entry of entries) { if (entry.isIntersecting) { document.querySelectorAll('.navlinks a').forEach(a => { const active = a.hash === '#' + entry.target.id; a.classList.toggle('active', active); if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); }); } } }, {rootMargin: '-15% 0px -60% 0px'});
 document.querySelectorAll('main section[id], #contact').forEach(section => observer.observe(section));
}
