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
