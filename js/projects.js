/* Projects section — subtle pointer-tilt enhancement (progressive, optional) */

(function () {
  "use strict";

  if (typeof window === "undefined" || typeof document === "undefined") return;

  var prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var isTouchDevice =
    "ontouchstart" in window ||
    (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);

  if (prefersReducedMotion || isTouchDevice) return;

  var MAX_TILT_DEG = 4;

  function init() {
    var cards = document.querySelectorAll(".project-card");
    if (!cards || !cards.length) return;

    cards.forEach(function (card) {
      var face = card.querySelector(".card-face");
      if (!face) return;

      card.addEventListener("mousemove", function (event) {
        var rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        var offsetX = (event.clientX - rect.left) / rect.width - 0.5;
        var offsetY = (event.clientY - rect.top) / rect.height - 0.5;

        var rotateY = offsetX * (MAX_TILT_DEG * 2);
        var rotateX = offsetY * -(MAX_TILT_DEG * 2);

        face.style.transform =
          "rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg)";
      });

      card.addEventListener("mouseleave", function () {
        face.style.transform = "";
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
