/* KOKO Cafe — 共用的導覽、進場動效與大圖檢視 */
(function () {
  "use strict";

  /* ---------- 手機導覽開合 ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      if (!open) {
        var first = nav.querySelector("a");
        if (first) first.focus();
      }
    });

    nav.addEventListener("click", function (event) {
      var link = event.target.closest("a");
      if (!link) return;
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  }

  /* ---------- 進場動效（reduced-motion 由 CSS 處理） ---------- */
  var revealables = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  if (!("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 大圖檢視（原生 <dialog>） ---------- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = lightbox ? lightbox.querySelector("#lightbox-img") : null;
  var lbTitle = lightbox ? lightbox.querySelector("#lightbox-title") : null;
  var lbNote = lightbox ? lightbox.querySelector("#lightbox-note") : null;
  var lbClose = lightbox ? lightbox.querySelector(".lightbox__close") : null;

  function openPhoto(trigger) {
    if (!lightbox || !lbImg) return;
    var src = trigger.getAttribute("data-full") || trigger.getAttribute("data-src");
    if (!src) return;
    lbImg.setAttribute("src", src);
    lbImg.setAttribute("alt", trigger.getAttribute("data-alt") || "");
    if (lbTitle) lbTitle.textContent = trigger.getAttribute("data-title") || "照片";
    if (lbNote) lbNote.textContent = trigger.getAttribute("data-note") || "";
    if (typeof lightbox.showModal === "function") lightbox.showModal();
    else lightbox.setAttribute("open", "");
  }

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-full]");
    if (trigger) {
      event.preventDefault();
      openPhoto(trigger);
      return;
    }
    if (lbClose && event.target.closest(".lightbox__close")) {
      lightbox.close();
    }
  });

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) lightbox.close();
    });
  }
})();
