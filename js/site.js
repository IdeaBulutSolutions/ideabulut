// Idea Bulut Solutions — minimal site JS (no framework).
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });
    // Close the menu when a link is tapped (mobile)
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }
    });
  }

  // Contact form: submit via fetch, never reflect submitted values back.
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    var submit = document.getElementById("contact-submit");

    // Messages are static, developer-authored strings (no user input is ever
    // reflected here), so using innerHTML to allow a mailto link is safe.
    var EMAIL = "info@ideabulut.com";
    var emailLink = '<a href="mailto:' + EMAIL + '">' + EMAIL + "</a>";

    var setStatus = function (msg, cls) {
      if (!status) return;
      status.innerHTML = msg;
      status.className = "form__status" + (cls ? " " + cls : "");
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.action || form.action === window.location.href) {
        setStatus("The form isn't set up just yet — please email us directly at " + emailLink + " and we'll get right back to you.", "is-error");
        return;
      }
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      submit.disabled = true;
      setStatus("Sending…", "");

      // mode:"no-cors" is required for Google Apps Script: it redirects to a
      // googleusercontent.com URL that sends no CORS headers, so a normal fetch
      // would reject even when the POST succeeds. The response is opaque, so a
      // resolved request is treated as success (matching the backend's design).
      fetch(form.action, { method: "POST", mode: "no-cors", body: new FormData(form) })
        .then(function () {
          form.reset();
          setStatus("Thanks — your message is on its way. We'll be in touch shortly.", "is-ok");
        })
        .catch(function () {
          setStatus("Sorry — we couldn't send your message just now. Please email us directly at " + emailLink + " and we'll get right back to you.", "is-error");
        })
        .finally(function () {
          submit.disabled = false;
        });
    });
  }

  // Cookie consent + Google Analytics 4 (only when a Measurement ID is configured).
  // GA4 is loaded ONLY after the visitor accepts; the choice is remembered.
  var GA_ID = window.IB_GA4_ID;
  if (GA_ID) {
    var banner = document.getElementById("cookie-banner");
    var KEY = "ib-analytics-consent";
    var loadGA = function () {
      if (window.__ibGaLoaded) return;
      window.__ibGaLoaded = true;
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      gtag("js", new Date());
      gtag("config", GA_ID, { anonymize_ip: true });
    };
    var choice = null;
    try { choice = localStorage.getItem(KEY); } catch (e) {}
    if (choice === "granted") {
      loadGA();
    } else if (choice !== "denied" && banner) {
      banner.hidden = false;
    }
    var setChoice = function (v) {
      try { localStorage.setItem(KEY, v); } catch (e) {}
      if (banner) banner.hidden = true;
    };
    var accept = document.getElementById("cookie-accept");
    var decline = document.getElementById("cookie-decline");
    if (accept) accept.addEventListener("click", function () { setChoice("granted"); loadGA(); });
    if (decline) decline.addEventListener("click", function () { setChoice("denied"); });
  }

  // Shadow on header once the page is scrolled
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
