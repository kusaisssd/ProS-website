/* Pro S; — shared scripts: layout injection (header/footer) + behaviors */
(function(){
  'use strict';

  // ===== Google Analytics (gtag) =====
  // Loaded on every page. Respects Do-Not-Track.
  (function loadAnalytics(){
    var GA_ID = 'G-YFTLY878H5';
    var dnt = navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.msDoNotTrack === '1';
    if(dnt) return;

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  })();

  // ===== Layout: unified header & footer =====
  var html = document.documentElement;
  var body = document.body;
  var lang = (html.getAttribute('lang') || 'en').toLowerCase();
  var isAr = lang.indexOf('ar') === 0;
  var layout = body.getAttribute('data-layout') || 'sub'; // 'home' | 'sub'
  var isHome = layout === 'home';
  var pageKey = body.getAttribute('data-page') || ''; // for active-link highlighting
  var hash = isHome ? '#' : 'index.html#';

  var i18n = isAr ? {
    services:'الخدمات', ai:'حلول AI', products:'المنتجات', team:'الفريق', about:'عن الشركة',
    partners:'الشركاء', contact:'اتصل بنا',
    cta:'تواصل معنا', back:'→ العودة للرئيسية', menu:'القائمة',
    company:'الشركة', solutionsHeading:'الحلول', contactHeading:'تواصل',
    address:'دمشق، سوريا', tagline:'As Smart As Simple',
    brandDesc:'شركة تقنية مقرها دمشق تقدم برامج المؤسسات وحلول الذكاء الاصطناعي والبنية التحتية وتحليل البيانات.',
    rights:'جميع الحقوق محفوظة.',
    founderLink:'المؤسس ↗',
    skip:'تجاوز إلى المحتوى'
  } : {
    services:'Services', ai:'AI', products:'Products', team:'Team', about:'About',
    partners:'Partners', contact:'Contact',
    cta:'Get in Touch', back:'← Back to Home', menu:'Menu',
    company:'Company', solutionsHeading:'Solutions', contactHeading:'Contact',
    address:'Damascus, Syria', tagline:'As Smart As Simple',
    brandDesc:'A Damascus-based technology company building enterprise software, custom AI systems, IT infrastructure, and data analytics solutions.',
    rights:'All Rights Reserved.',
    founderLink:'Founder ↗',
    skip:'Skip to content'
  };

  var solutionsList = isAr ? [
    {href:'ai-solutions-ar.html',                      label:'حلول AI', key:'ai', highlight:true},
    {href:'smart-archiving-system-Tech_Details.html', label:'نظام الأرشفة الذكية', key:'archiving'},
    {href:'ProS_HR_Technical_Proposal.html',          label:'نظام الموارد البشرية', key:'hr'},
    {href:'camera-planner.html',                       label:'Camera Planner', key:'camera'},
    {href:'tower-landing-en.html',                     label:'Tower of Knowledge', key:'tower'}
  ] : [
    {href:'ai-solutions.html',                         label:'AI Solutions', key:'ai', highlight:true},
    {href:'smart-archiving-system-Tech_Details.html', label:'Smart Archiving', key:'archiving'},
    {href:'ProS_HR_Technical_Proposal.html',          label:'Simple HR System', key:'hr'},
    {href:'camera-planner.html',                       label:'Camera Planner', key:'camera'},
    {href:'tower-landing-en.html',                     label:'Tower of Knowledge', key:'tower'}
  ];

  // Language-aware AI page link — Arabic users land on the Arabic version
  var aiHref = isAr ? 'ai-solutions-ar.html' : 'ai-solutions.html';

  // Header nav items: each has explicit href so AI can point to dedicated page
  var navItems = isHome ? [
    {key:'services', href:'#services'},
    {key:'ai',       href:aiHref},
    {key:'products', href:'#products'},
    {key:'team',     href:'#team'},
    {key:'about',    href:'#about'},
    {key:'partners', href:'#partners'}
  ] : [
    {key:'services', href:'index.html#services'},
    {key:'ai',       href:aiHref},
    {key:'products', href:'index.html#products'},
    {key:'about',    href:'index.html#about'},
    {key:'contact',  href:'index.html#contact'}
  ];

  function escAttr(s){ return String(s).replace(/"/g,'&quot;'); }

  function renderHeader(){
    var navHost = document.getElementById('nav');
    if(!navHost) return;
    navHost.classList.add('nav');

    var links = navItems.map(function(it){
      var aiClass = it.key === 'ai' ? ' class="nav-ai"' : '';
      return '<li><a href="'+ it.href +'"'+ aiClass +'>'+ i18n[it.key] +'</a></li>';
    }).join('');

    // Optional language toggle: only when this page has an alternate-language version
    var altHref = body.getAttribute('data-alt-lang-href');
    var langBtn = altHref
      ? '<a href="'+ altHref +'" class="lang-btn" title="Switch language" aria-label="Switch language">'+ (isAr ? 'EN' : 'عربي') +'</a>'
      : '';

    var themeBtn = '<button class="t-btn" id="tB" title="Toggle dark mode" aria-label="Toggle dark mode">🌙</button>';

    var rightSide = isHome
      ? langBtn + themeBtn + '<a href="#contact" class="n-cta">'+ i18n.cta +'</a>'
      : '<a href="index.html" class="back-btn">'+ i18n.back +'</a>' + langBtn + themeBtn;

    navHost.innerHTML =
      '<a href="#main" class="skip-link">'+ i18n.skip +'</a>' +
      '<div class="nav-in">' +
        '<a href="' + (isHome ? '#home' : 'index.html') + '" class="n-logo">Pro S<b>;</b>' +
          (isHome ? '<span class="n-tag">As Smart As Simple</span>' : '') +
        '</a>' +
        '<ul class="n-links" id="nL">' + links + '</ul>' +
        '<div class="nav-r">' + rightSide + '</div>' +
        '<button class="mob-t" aria-label="'+ escAttr(i18n.menu) +'">☰</button>' +
      '</div>';
  }

  function renderFooter(){
    var ftHost = document.getElementById('ft');
    if(!ftHost) return;
    ftHost.classList.add('ft');

    var companyLinks = [
      {key:'services'}, {key:'about'}, {key:'team'}, {key:'partners'}
    ].map(function(it){
      return '<li><a href="'+ hash + it.key +'">'+ i18n[it.key] +'</a></li>';
    }).join('');

    var solutionLinks = solutionsList.map(function(p){
      var hl = p.highlight ? ' style="color:var(--ac);font-weight:700"' : '';
      return '<li><a href="'+ p.href +'"'+ hl +'>'+ p.label +'</a></li>';
    }).join('');

    ftHost.innerHTML =
      '<div class="ctn">' +
        '<div class="ft-grid">' +
          '<div class="ft-brand">' +
            '<a href="'+ (isHome ? '#home' : 'index.html') +'" class="ft-logo">Pro S<b>;</b></a>' +
            '<p>'+ i18n.brandDesc +'</p>' +
          '</div>' +
          '<div class="ft-col">' +
            '<h5>'+ i18n.company +'</h5>' +
            '<ul>'+ companyLinks +'</ul>' +
          '</div>' +
          '<div class="ft-col">' +
            '<h5>'+ i18n.solutionsHeading +'</h5>' +
            '<ul>'+ solutionLinks +'</ul>' +
          '</div>' +
          '<div class="ft-col">' +
            '<h5>'+ i18n.contactHeading +'</h5>' +
            '<ul>' +
              '<li><a href="mailto:info@pro-sss.com">info@pro-sss.com</a></li>' +
              '<li><a href="tel:+963966654441">+963 966 654 441</a></li>' +
              '<li>'+ i18n.address +'</li>' +
              '<li><a href="https://kosayalassaf.github.io/" target="_blank" rel="noopener">'+ i18n.founderLink +'</a></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="ft-bottom">' +
          '<span>&copy; <span id="ft-year">2026</span> Pro S<b>;</b> &mdash; '+ i18n.rights +'</span>' +
          '<span class="ft-tag">'+ i18n.tagline +'</span>' +
        '</div>' +
      '</div>';
  }

  // ===== Floating WhatsApp button (every page) =====
  function renderWhatsApp(){
    var phone = '963966654441'; // +963 966 654 441
    var msgs = isAr ? {
      home:      'السلام عليكم Pro S; 👋\nأنا مهتم بالتعرف أكثر على خدماتكم. هل يمكننا التواصل لمناقشة احتياجات مؤسستي؟',
      ai:        'السلام عليكم Pro S; 👋\nأنا مهتم بحلول الذكاء الاصطناعي. أود مناقشة كيف يمكن لـ AI مخصص أن يساعد في تطوير عمليات مؤسستي.',
      archiving: 'السلام عليكم Pro S; 👋\nأنا مهتم بنظام الأرشفة الذكية. أرجو التواصل معي لمعرفة المزيد عن إمكانياته وأسعاره.',
      hr:        'السلام عليكم Pro S; 👋\nأنا مهتم بنظام Simple HR لإدارة الموارد البشرية. أرجو التواصل معي لتقديم عرض مناسب.',
      camera:    'السلام عليكم Pro S; 👋\nأنا مهتم بأداة Camera Planner لتخطيط أنظمة المراقبة. أود معرفة المزيد.',
      tower:     'السلام عليكم Pro S; 👋\nأنا مهتم بمشروع Tower of Knowledge وأود التواصل معكم.'
    } : {
      home:      'Hi Pro S; 👋\nI\'m interested in learning more about your services and how you can help my organization.',
      ai:        'Hi Pro S; 👋\nI\'m interested in your AI Solutions. I\'d like to discuss how custom AI could help develop my organization\'s operations.',
      archiving: 'Hi Pro S; 👋\nI\'m interested in your Smart Archiving System. Could we connect to discuss capabilities and pricing?',
      hr:        'Hi Pro S; 👋\nI\'m interested in your Simple HR System. Could we connect to discuss a tailored proposal?',
      camera:    'Hi Pro S; 👋\nI\'m interested in your Camera Planner platform. I\'d like to know more.',
      tower:     'Hi Pro S; 👋\nI\'m interested in Tower of Knowledge and would like to connect.'
    };

    // Allow per-page override via <body data-wa-msg="...">
    var customMsg = body.getAttribute('data-wa-msg');
    var msg = customMsg || msgs[pageKey] || msgs.home;
    var url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
    var tipText = isAr ? 'تواصل معنا عبر واتساب' : 'Chat with us on WhatsApp';
    var aria = isAr ? 'تواصل عبر واتساب' : 'Chat on WhatsApp';

    var a = document.createElement('a');
    a.className = 'wa-btn';
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', aria);
    a.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488"/>' +
      '</svg>' +
      '<span class="wa-tip">'+ tipText +'</span>';
    document.body.appendChild(a);
  }

  renderHeader();
  renderFooter();
  renderWhatsApp();

  // ===== Conversion tracking (GA events for high-value actions) =====
  document.addEventListener('click', function(e){
    if(typeof window.gtag !== 'function') return;
    var a = e.target.closest && e.target.closest('a[href]');
    if(!a) return;
    var href = a.getAttribute('href') || '';
    if(href.indexOf('wa.me/') !== -1 || a.classList.contains('wa-btn')){
      window.gtag('event', 'whatsapp_click', {page: pageKey || 'home', lang: isAr ? 'ar' : 'en'});
    } else if(href.indexOf('mailto:') === 0){
      window.gtag('event', 'email_click', {page: pageKey || 'home'});
    } else if(href.indexOf('tel:') === 0){
      window.gtag('event', 'phone_click', {page: pageKey || 'home'});
    }
  });

  // Highlight current product/service in footer (subpage)
  if(pageKey){
    document.querySelectorAll('#ft .ft-col a[href]').forEach(function(a){
      solutionsList.forEach(function(p){
        if(p.key === pageKey && a.getAttribute('href') === p.href){
          a.style.color = 'var(--ac)';
          a.style.fontWeight = '700';
          a.style.textDecoration = 'underline';
        }
      });
    });
  }

  // ===== Theme toggle (persisted) =====
  var tB = document.getElementById('tB');
  function setTheme(dark){
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
    if(tB) tB.textContent = dark ? '☀️' : '🌙';
    try{ localStorage.setItem('pros-t', dark ? 'd' : 'l'); }catch(e){}
  }
  if(tB){
    tB.addEventListener('click', function(){
      setTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
    });
  }
  try{ if(localStorage.getItem('pros-t') === 'd') setTheme(true); }catch(e){}

  // ===== Nav scroll background =====
  var nav = document.getElementById('nav');
  if(nav){
    var onScroll = function(){ nav.classList.toggle('sc', window.scrollY > 30); };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  // ===== Reveal-on-scroll =====
  var rO = null;
  if('IntersectionObserver' in window){
    rO = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('vis'); rO.unobserve(e.target); }
      });
    }, {threshold:.08});
    document.querySelectorAll('.rv').forEach(function(el){ rO.observe(el); });
  }else{
    document.querySelectorAll('.rv').forEach(function(el){ el.classList.add('vis'); });
  }
  window.proSObserve = function(scope){
    if(!rO) return;
    (scope || document).querySelectorAll('.rv:not(.vis)').forEach(function(el){ rO.observe(el); });
  };

  // ===== Smooth-scroll for in-page anchors =====
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if(!a) return;
    var href = a.getAttribute('href');
    if(!href || href.length < 2) return;
    var t = document.querySelector(href);
    if(t){
      e.preventDefault();
      t.scrollIntoView({behavior:'smooth'});
      var nL = document.getElementById('nL');
      if(nL) nL.classList.remove('op');
    }
  });

  // ===== Mobile menu toggle =====
  document.addEventListener('click', function(e){
    var btn = e.target.closest && e.target.closest('.mob-t');
    if(!btn) return;
    var nL = document.getElementById('nL');
    if(nL) nL.classList.toggle('op');
  });

  // ===== Footer year =====
  var y = document.getElementById('ft-year');
  if(y) y.textContent = new Date().getFullYear();
})();
