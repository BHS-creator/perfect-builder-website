/* Perfect Building Contractor LTD — single master responsive menu */
(function () {
  'use strict';

  function setMenuState(header, open) {
    var button = header.querySelector('.menu-toggle');
    var navRow = header.querySelector('.nav-row');
    var mainNav = header.querySelector('.main-nav');

    if (!button || !navRow || !mainNav) return;

    header.classList.toggle('menu-open', open);
    navRow.classList.toggle('active', open);
    mainNav.classList.toggle('active', open);

    button.textContent = open ? '✕' : '☰';
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  function initialiseMenus() {
    var headers = document.querySelectorAll('.site-header');

    headers.forEach(function (header) {
      var button = header.querySelector('.menu-toggle');
      var mainNav = header.querySelector('.main-nav');

      if (!button || !mainNav) return;

      setMenuState(header, false);

      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        setMenuState(header, !header.classList.contains('menu-open'));
      });

      mainNav.querySelectorAll('a[href]').forEach(function (link) {
        link.addEventListener('click', function () {
          if (window.matchMedia('(max-width: 768px)').matches) {
            setMenuState(header, false);
          }
        });
      });
    });

    document.addEventListener('click', function (event) {
      if (!window.matchMedia('(max-width: 768px)').matches) return;

      headers.forEach(function (header) {
        if (header.classList.contains('menu-open') && !header.contains(event.target)) {
          setMenuState(header, false);
        }
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        headers.forEach(function (header) { setMenuState(header, false); });
      }
    });

    window.addEventListener('resize', function () {
      if (!window.matchMedia('(max-width: 768px)').matches) {
        headers.forEach(function (header) { setMenuState(header, false); });
      }
    });
  }

  function loadOptionalMaps() {
    document.querySelectorAll('.pb-consent-map[data-src]').forEach(function (frame) {
      if (!frame.getAttribute('src')) frame.setAttribute('src', frame.getAttribute('data-src'));
      frame.classList.add('is-loaded');
      var message = frame.previousElementSibling;
      if (message && message.classList.contains('map-consent-message')) message.hidden = true;
    });
  }

  function showMapMessage() {
    document.querySelectorAll('.map-consent-message').forEach(function (message) {
      message.hidden = false;
    });
  }

  function setConsent(value) {
    try { localStorage.setItem('pb_cookie_preference', value); } catch (error) {}
    if (value === 'accepted') loadOptionalMaps();
    else showMapMessage();
  }

  function initialiseCookieBanner() {
    var preference = null;
    try { preference = localStorage.getItem('pb_cookie_preference'); } catch (error) {}

    if (preference === 'accepted') {
      loadOptionalMaps();
      return;
    }

    if (preference === 'essential') {
      showMapMessage();
      return;
    }

    var banner = document.createElement('div');
    banner.className = 'pb-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Privacy choices');
    banner.innerHTML =
      '<p>We use essential browser storage for basic website functionality. Optional third-party content, such as maps, is loaded only if you allow it. <a href="cookie-policy.html">Cookie Policy</a></p>' +
      '<div class="pb-cookie-actions">' +
      '<button type="button" class="pb-cookie-essential">Use essential only</button>' +
      '<button type="button" class="pb-cookie-accept">Allow third-party content</button>' +
      '</div>';

    document.body.appendChild(banner);

    banner.querySelector('.pb-cookie-essential').addEventListener('click', function () {
      setConsent('essential');
      banner.remove();
    });

    banner.querySelector('.pb-cookie-accept').addEventListener('click', function () {
      setConsent('accepted');
      banner.remove();
    });
  }

  function initialise() {
    initialiseMenus();
    initialiseCookieBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
