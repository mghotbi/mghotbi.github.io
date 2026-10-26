/* ==========================================================================
   Mitra Ghotbi — mghotbi.github.io
   Navigation, depth rail, reading progress and scroll motion.
   No dependencies. Everything degrades to a readable static page without
   JavaScript, and all motion is switched off under prefers-reduced-motion.
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reduced = motionQuery.matches;

  /* --- Mobile menu ------------------------------------------------------- */

  var toggle = document.querySelector(".menu-toggle");
  var links = document.querySelector(".navlinks");

  if (toggle && links) {
    var closeMenu = function () {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && links.classList.contains("open")) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* --- Reading progress along the header edge ----------------------------- */

  var header = document.querySelector("header");
  var progress = null;

  if (header) {
    progress = document.createElement("span");
    progress.className = "scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    header.appendChild(progress);
  }

  /* --- Publication rows are clickable across their whole width ----------- */

  /* The row inverts on hover, which promises it is one target. The title
     link stays the real link, so keyboard and right-click are unchanged. */

  var papers = document.querySelector("#publications");

  if (papers) {
    papers.addEventListener("click", function (event) {
      var row = event.target.closest(".paper");
      if (!row || event.target.closest("a")) return;

      /* Don't hijack a click that was the end of selecting text. */
      var selection = window.getSelection();
      if (selection && selection.toString().length) return;

      var link = row.querySelector("h3 a[href]");
      if (!link) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey) {
        window.open(link.href, "_blank", "noopener");
      } else {
        link.click();
      }
    });
  }

  /* --- Scroll motion ------------------------------------------------------ */

  /* Elements are marked here rather than in the markup, so index.html stays
     content only and nothing is hidden if this script fails to load. */

  var revealGroups = [
    { selector: ".section-head, .methods-heading", stagger: 0 },
    { selector: ".topics .topic", stagger: 0.09 },
    { selector: ".research-note", stagger: 0 },
    { selector: "#publications .paper", stagger: 0.05 },
    { selector: ".software article", stagger: 0.1 },
    { selector: ".software-directory", stagger: 0 },
    { selector: ".method-collection", stagger: 0.12 },
    { selector: "#cv .cv-grid > div", stagger: 0.1 },
    { selector: "#cv .details", stagger: 0.06 },
    { selector: ".teaching > div", stagger: 0.1 },
    { selector: ".values-art img", stagger: 0 },
    { selector: ".contact > *", stagger: 0.08 }
  ];

  if (!reduced && "IntersectionObserver" in window) {
    revealGroups.forEach(function (group) {
      document.querySelectorAll(group.selector).forEach(function (node, index) {
        node.setAttribute("data-reveal", "");
        if (group.stagger) {
          node.style.setProperty("--delay", (index * group.stagger).toFixed(3) + "s");
        }
      });
    });

    /* Section headings are wiped in from the left rather than faded.
       A clipped element reports no intersection area of its own, so the
       heading's container is what gets watched. */
    document.querySelectorAll("main h2").forEach(function (h2) {
      h2.setAttribute("data-wipe", "");
      var host = h2.parentElement;
      if (host) host.setAttribute("data-wipe-host", "");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          if (el.hasAttribute("data-reveal")) el.classList.add("in");
          if (el.hasAttribute("data-wipe-host")) {
            el.querySelectorAll("[data-wipe]").forEach(function (h2) {
              h2.classList.add("wiped");
            });
          }
          if (el.matches(".section-head, .methods-heading")) el.classList.add("drawn");
          observer.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    document.querySelectorAll("[data-reveal], [data-wipe-host]").forEach(function (node) {
      observer.observe(node);
    });
  }

  /* --- Depth rail and active section ------------------------------------- */

  /* The rail is a reading-position log down the left edge: the filled part
     tracks how far through the page you are, the ticks mark each section. */

  var rail = document.querySelector(".depth-rail");
  var fill = rail ? rail.querySelector(".rail-fill") : null;
  var portrait = document.querySelector(".portrait");

  var sections = Array.prototype.slice
    .call(document.querySelectorAll(".navlinks a[href^='#']"))
    .map(function (link) {
      var id = link.getAttribute("href").slice(1);
      var el = id ? document.getElementById(id) : null;
      return el ? { id: id, el: el, link: link, label: link.textContent.trim(), tick: null } : null;
    })
    .filter(Boolean);

  if (rail && sections.length) {
    sections.forEach(function (entry) {
      var tick = document.createElement("span");
      tick.className = "rail-tick";
      tick.textContent = entry.label;
      rail.appendChild(tick);
      entry.tick = tick;
    });
  }

  /* The pale bands, so a rail tick crossing one can switch to dark ink. */
  var lightBands = Array.prototype.slice.call(
    document.querySelectorAll("#publications, #resources, #cv")
  );

  var scrollRange = 1;
  var heroHeight = 1;

  function measure() {
    scrollRange = Math.max(1, root.scrollHeight - window.innerHeight);
    var hero = document.querySelector(".hero");
    heroHeight = hero ? Math.max(1, hero.offsetHeight) : 1;

    if (!rail) return;
    var docHeight = Math.max(1, root.scrollHeight);
    sections.forEach(function (entry) {
      if (!entry.tick) return;
      var top = entry.el.getBoundingClientRect().top + window.scrollY;
      entry.tick.style.top =
        "calc(120px + (100vh - 216px) * " + (top / docHeight).toFixed(4) + ")";
    });
  }

  function setActive(id) {
    sections.forEach(function (entry) {
      var active = entry.id === id;
      entry.link.classList.toggle("active", active);
      if (active) entry.link.setAttribute("aria-current", "location");
      else entry.link.removeAttribute("aria-current");
      if (entry.tick) entry.tick.classList.toggle("active", active);
    });
  }

  var frame = null;

  function update() {
    frame = null;
    var y = window.scrollY;
    var read = Math.min(1, Math.max(0, y / scrollRange)).toFixed(4);

    if (fill) fill.style.setProperty("--read", read);
    if (progress) progress.style.setProperty("--read", read);
    if (header) header.classList.toggle("scrolled", y > 40);

    /* The portrait drifts a little slower than the page while the hero is
       still on screen. */
    if (portrait && !reduced && window.innerWidth > 760) {
      var within = Math.min(1, Math.max(0, y / heroHeight));
      portrait.style.setProperty("--shift", (within * 46).toFixed(2) + "px");
    }

    /* Each rail tick takes the ink of whichever band is behind it. */
    if (rail && lightBands.length) {
      sections.forEach(function (entry) {
        if (!entry.tick) return;
        var tickY = entry.tick.getBoundingClientRect().top;
        var onLight = lightBands.some(function (band) {
          var box = band.getBoundingClientRect();
          return tickY >= box.top && tickY <= box.bottom;
        });
        entry.tick.classList.toggle("on-light", onLight);
      });
    }

    /* Active section: the last one whose top has passed the reading line. */
    var line = window.innerHeight * 0.3;
    var current = sections.length ? sections[0].id : null;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].el.getBoundingClientRect().top <= line) current = sections[i].id;
    }
    if (current) setActive(current);
  }

  function onScroll() {
    if (frame === null) frame = window.requestAnimationFrame(update);
  }

  measure();
  update();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () { measure(); onScroll(); });
  window.addEventListener("load", function () { measure(); onScroll(); });

  /* Section heights change when a details block opens. */
  document.addEventListener("toggle", function (event) {
    if (event.target.tagName === "DETAILS") { measure(); onScroll(); }
  }, true);

  /* Respect a preference changed mid-visit. */
  if (motionQuery.addEventListener) {
    motionQuery.addEventListener("change", function (event) {
      reduced = event.matches;
      if (reduced && portrait) portrait.style.removeProperty("--shift");
    });
  }
})();
