(function () {
  'use strict';

  const path = window.location.pathname.split('/').pop() || 'index-fa.html';
  const isEn = path.endsWith('-en.html');
  const lang = isEn ? 'en' : 'fa';
  const other = isEn ? 'fa' : 'en';
  const suffix = '-' + lang;

  let base = path.replace(/-en\.html$/, '').replace(/-fa\.html$/, '').replace(/\.html$/, '') || 'index';

  const T = {
    fa: {
      home: 'خانه', about: 'درباره ما', projects: 'پروژه‌ها',
      blog: 'اخبار', music: 'آهنگ رسمی', contact: 'تماس',
      brand: 'کمپانی ایستم', tag: 'IESTM Company',
      langBtn: '🇬🇧 English',
      f1: 'کمپانی ایستم', f1t: 'توسعه نرم‌افزار، بازی و اپلیکیشن دسکتاپ',
      f2: 'دسترسی سریع', f3: 'ارتباط',
      copy: '© ۲۰۲۶ کمپانی ایستم — تمامی حقوق محفوظ است'
    },
    en: {
      home: 'Home', about: 'About', projects: 'Projects',
      blog: 'News', music: 'Anthem', contact: 'Contact',
      brand: 'IESTM Company', tag: 'Software Studio',
      langBtn: '🇮🇷 فارسی',
      f1: 'IESTM Company', f1t: 'Software, game & desktop app development',
      f2: 'Quick Links', f3: 'Contact',
      copy: '© 2026 IESTM Company — All rights reserved'
    }
  };
  const t = T[lang];

  const headerHTML =
    '<nav><div class="nav-inner">' +
      '<a href="index' + suffix + '.html" class="brand">' +
        '<div class="logo"><img src="logo.jpg" alt="IESTM" onerror="this.parentElement.style.display=\'none\'"></div>' +
        '<div class="brand-text">' + t.brand + '<br><span>' + t.tag + '</span></div>' +
      '</a>' +
      '<div class="nav-links">' +
        '<a href="index' + suffix + '.html" data-page="index">' + t.home + '</a>' +
        '<a href="about' + suffix + '.html" data-page="about">' + t.about + '</a>' +
        '<a href="projects' + suffix + '.html" data-page="projects">' + t.projects + '</a>' +
        '<a href="blog' + suffix + '.html" data-page="blog">' + t.blog + '</a>' +
        '<a href="music' + suffix + '.html" data-page="music">' + t.music + '</a>' +
        '<a href="contact' + suffix + '.html" data-page="contact">' + t.contact + '</a>' +
      '</div>' +
      '<div class="lang-switch-header">' +
        '<button class="lang-switch-btn" onclick="IESTM_switchLanguage()">' + t.langBtn + '</button>' +
      '</div>' +
    '</div></nav>';

  const footerHTML =
    '<footer><div class="container">' +
      '<div class="footer-box">' +
        '<div><h3>' + t.f1 + '</h3><p>' + t.f1t + '</p></div>' +
        '<div><h3>' + t.f2 + '</h3>' +
          '<p><a href="projects' + suffix + '.html">' + t.projects + '</a></p>' +
          '<p><a href="about' + suffix + '.html">' + t.about + '</a></p>' +
        '</div>' +
        '<div><h3>' + t.f3 + '</h3><p>📧 asly3325@gmail.com</p><p>🐦 @iestmcompany</p></div>' +
      '</div>' +
      '<div class="copyright">' + t.copy + '</div>' +
    '</div></footer>';

  const hp = document.getElementById('header-placeholder');
  const fp = document.getElementById('footer-placeholder');
  if (hp) hp.innerHTML = headerHTML;
  if (fp) fp.innerHTML = footerHTML;

  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.dataset.page === base) a.classList.add('active');
  });

  window.IESTM_switchLanguage = function () {
    localStorage.setItem('preferred_lang', other);
    window.location.href = base + '-' + other + '.html';
  };
})();
