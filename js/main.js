document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', function () {
  var t = document.querySelector('.nav-toggle'), n = document.getElementById('nav');
  if (t && n) t.addEventListener('click', function () { n.classList.toggle('open'); });
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function count(el) {
    var m = el.textContent.trim().match(/^(\D*)(\d+)(\D*)$/); if (!m || reduce) return;
    var to = +m[2], t0 = null; el.textContent = m[1] + '0' + m[3];
    function step(ts) { if (!t0) t0 = ts; var p = Math.min(1, (ts - t0) / 1400), e = 1 - Math.pow(1 - p, 3); el.textContent = m[1] + Math.round(to * e) + m[3]; if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  var targets = document.querySelectorAll('.pillars .p, .track .cols > div, .stat, .city .top, .city .gif, .sec .grid5 > *, .sec h2, .cta h2, .case-body .col > *, .about-body .row');
  targets.forEach(function (el, i) { el.classList.add('rv'); el.style.transitionDelay = ((i % 5) * 70) + 'ms'; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { io.observe(el); });
    var cio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { count(e.target); cio.unobserve(e.target); } }); }, { threshold: 0.6 });
    document.querySelectorAll('.stat b, .bigcard b').forEach(function (el) { cio.observe(el); });
  } else { targets.forEach(function (el) { el.classList.add('in'); }); }
  document.querySelectorAll('.ba-slider').forEach(function (slider) {
    var wrap = slider.querySelector('.ba-before-wrap'), handle = slider.querySelector('.ba-handle'), img = wrap.querySelector('img'), drag = false;
    function set(p) { p = Math.max(0, Math.min(100, p)); wrap.style.width = p + '%'; handle.style.left = p + '%'; img.style.width = slider.offsetWidth + 'px'; }
    function move(e) { var r = slider.getBoundingClientRect(), x = e.touches ? e.touches[0].clientX : e.clientX; set((x - r.left) / r.width * 100); }
    slider.addEventListener('mousedown', function (e) { drag = true; move(e); });
    window.addEventListener('mousemove', function (e) { if (drag) move(e); });
    window.addEventListener('mouseup', function () { drag = false; });
    slider.addEventListener('touchstart', function (e) { drag = true; move(e); }, { passive: true });
    window.addEventListener('touchmove', function (e) { if (drag) move(e); }, { passive: true });
    window.addEventListener('touchend', function () { drag = false; });
    window.addEventListener('resize', function () { set(50); });
    img.addEventListener('load', function () { set(50); }); set(50);
  });
});
