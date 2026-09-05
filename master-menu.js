/* Perfect Building Contractor LTD — master responsive menu and privacy controls */
(function(){
  function closeMenu(header){
    var button=header.querySelector('.menu-toggle'); var nav=header.querySelector('.nav-row');
    if(!button||!nav)return; nav.classList.remove('active'); button.textContent='☰'; button.setAttribute('aria-expanded','false'); button.setAttribute('aria-label','Open menu');
  }
  function openMenu(header){
    var button=header.querySelector('.menu-toggle'); var nav=header.querySelector('.nav-row');
    if(!button||!nav)return; nav.classList.add('active'); button.textContent='×'; button.setAttribute('aria-expanded','true'); button.setAttribute('aria-label','Close menu');
  }
  function initMenu(){
    document.querySelectorAll('.site-header').forEach(function(header){
      var button=header.querySelector('.menu-toggle'); var nav=header.querySelector('.nav-row'); if(!button||!nav)return;
      button.textContent='☰'; button.addEventListener('click',function(e){e.preventDefault(); e.stopPropagation(); nav.classList.contains('active')?closeMenu(header):openMenu(header);});
      nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',function(){if(window.innerWidth<=768)closeMenu(header);});});
      document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu(header);});
      document.addEventListener('click',function(e){if(window.innerWidth<=768&&!header.contains(e.target))closeMenu(header);});
      window.addEventListener('resize',function(){if(window.innerWidth>768)closeMenu(header);});
    });
  }
  function loadOptionalMaps(){document.querySelectorAll('.pb-consent-map[data-src]').forEach(function(frame){if(!frame.getAttribute('src'))frame.setAttribute('src',frame.getAttribute('data-src'));frame.classList.add('is-loaded');var msg=frame.previousElementSibling;if(msg&&msg.classList.contains('map-consent-message'))msg.hidden=true;});}
  function showMapMessage(){document.querySelectorAll('.map-consent-message').forEach(function(msg){msg.hidden=false;});}
  function setConsent(value){try{localStorage.setItem('pb_cookie_preference',value);}catch(e){} if(value==='accepted')loadOptionalMaps(); else showMapMessage();}
  function initCookieBanner(){
    var pref=null;try{pref=localStorage.getItem('pb_cookie_preference');}catch(e){}
    if(pref==='accepted'){loadOptionalMaps();return;} if(pref==='essential'){showMapMessage();return;}
    var banner=document.createElement('div'); banner.className='pb-cookie-banner'; banner.setAttribute('role','dialog'); banner.setAttribute('aria-label','Privacy choices');
    banner.innerHTML='<p>We use essential browser storage for basic website functionality. Optional third-party content, such as maps, is loaded only if you allow it. <a href="cookie-policy.html">Cookie Policy</a></p><div class="pb-cookie-actions"><button type="button" class="pb-cookie-essential">Use essential only</button><button type="button" class="pb-cookie-accept">Allow third-party content</button></div>';
    document.body.appendChild(banner);
    banner.querySelector('.pb-cookie-essential').addEventListener('click',function(){setConsent('essential');banner.remove();});
    banner.querySelector('.pb-cookie-accept').addEventListener('click',function(){setConsent('accepted');banner.remove();});
  }
  function init(){initMenu();initCookieBanner();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();