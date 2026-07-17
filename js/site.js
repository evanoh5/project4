// Live local-time clock in the sidebar (Roshan Sahu "current time" influence).
(function () {
  var el = document.getElementById('clock');
  if (!el) return;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    var now = new Date();
    el.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
  }

  tick();
  setInterval(tick, 1000);
})();

// Prism diamond that trails the cursor. Follows with easing; the three
// colored layers fan apart in proportion to pointer velocity, so fast
// movement splits the diamond into a rainbow, slow movement re-fuses it.
(function () {
  var el = document.querySelector('.cursor-diamond');
  if (!el) return;

  var finePointer = window.matchMedia('(pointer: fine)').matches;
  if (!finePointer) return; // skip touch / coarse pointers

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var layers = el.querySelectorAll('svg');

  var tx = 0, ty = 0;   // target (cursor)
  var cx = 0, cy = 0;   // current (eased)
  var px = 0, py = 0;   // previous, for velocity
  var speed = 0, rot = 0;

  window.addEventListener('mousemove', function (e) {
    tx = e.clientX;
    ty = e.clientY;
    if (!el.classList.contains('is-active')) {
      cx = px = tx;
      cy = py = ty;
      el.classList.add('is-active');
    }
  });

  document.addEventListener('mouseleave', function () {
    el.classList.remove('is-active');
  });

  function frame() {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;

    var vx = cx - px, vy = cy - py;
    px = cx; py = cy;

    var v = Math.min(Math.sqrt(vx * vx + vy * vy), 44);
    speed += (v - speed) * 0.25;

    if (reduce) {
      el.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
    } else {
      rot += 0.5 + speed * 0.14;
      el.style.transform = 'translate(' + cx + 'px,' + cy + 'px) rotate(' + rot + 'deg)';

      var split = speed * 0.55;
      layers[0].style.transform = 'translate(' + (-split) + 'px,' + (split * 0.4) + 'px)';
      layers[2].style.transform = 'translate(' + split + 'px,' + (-split * 0.4) + 'px)';
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();
