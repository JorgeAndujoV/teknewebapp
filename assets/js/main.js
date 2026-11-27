// Tekne · interacciones del sitio (menú móvil, encabezado, animaciones al hacer scroll)
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Menú móvil
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu');
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.sr-only').textContent = open ? 'Cerrar menú' : 'Abrir menú';
      nav.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Línea bajo el encabezado al hacer scroll
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Año en el pie de página
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Banda en movimiento: repite la secuencia hasta cubrir la pantalla y la duplica
  // para que el ciclo no tenga cortes. Si el usuario pidió menos animación, queda fija.
  var marquee = document.querySelector('.marquee');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (marquee && !reduceMotion) {
    var startMarquee = function () {
      var track = marquee.querySelector('.marquee-track');
      var group = track.querySelector('.marquee-group');
      var original = Array.prototype.slice.call(group.children);
      marquee.classList.add('is-animated');
      var target = Math.max(window.innerWidth, screen.width || 0, screen.height || 0);
      for (var i = 0; i < 20 && group.getBoundingClientRect().width < target; i++) {
        original.forEach(function (node) {
          var copy = node.cloneNode(true);
          copy.setAttribute('aria-hidden', 'true');
          group.appendChild(copy);
        });
      }
      var twin = group.cloneNode(true);
      twin.setAttribute('aria-hidden', 'true');
      track.appendChild(twin);
      // Velocidad constante (unos 70 px por segundo), sin importar el largo del texto
      marquee.style.setProperty('--marquee-duration', (group.getBoundingClientRect().width / 70) + 's');
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(startMarquee);
    else startMarquee();
  }

  // Aparición suave de bloques
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach(function (el) { observer.observe(el); });
})();
