// ============================================================
//  لودر هدر و فوتر - همه صفحات
// ============================================================

(function() {
  'use strict';

  // ===== تشخیص زبان فعلی =====
  function getCurrentLanguage() {
    const html = document.documentElement;
    const lang = html.getAttribute('lang') || 'fa';
    return lang;
  }

  // ===== لینک‌های منو بر اساس زبان =====
  function getNavLinks(lang) {
    const isEn = lang === 'en';
    const suffix = isEn ? '-en' : '';
    const homeText = isEn ? 'Home' : 'خانه';
    const aboutText = isEn ? 'About' : 'درباره ما';
    const projectsText = isEn ? 'Projects' : 'پروژه‌ها';
    const blogText = isEn ? 'News' : 'اخبار';
    const musicText = isEn ? 'Official Song' : 'آهنگ رسمی';
    const contactText = isEn ? 'Contact' : 'تماس';
    const adminText = isEn ? 'Admin' : 'مدیریت';

    // دریافت صفحه فعلی برای تنظیم کلاس active
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isIndex = currentPage === 'index' + suffix + '.html' || currentPage === 'index.html' || currentPage === '';
    const isAbout = currentPage === 'about' + suffix + '.html';
    const isProjects = currentPage === 'projects' + suffix + '.html';
    const isBlog = currentPage === 'blog' + suffix + '.html';
    const isMusic = currentPage === 'music' + suffix + '.html';
    const isContact = currentPage === 'contact' + suffix + '.html';
    const isAdmin = currentPage === 'admin' + suffix + '.html';

    return [
      { href: 'index' + suffix + '.html', text: homeText, active: isIndex },
      { href: 'about' + suffix + '.html', text: aboutText, active: isAbout },
      { href: 'projects' + suffix + '.html', text: projectsText, active: isProjects },
      { href: 'blog' + suffix + '.html', text: blogText, active: isBlog },
      { href: 'music' + suffix + '.html', text: musicText, active: isMusic },
      { href: 'contact' + suffix + '.html', text: contactText, active: isContact },
      { href: 'admin' + suffix + '.html', text: adminText, active: isAdmin, style: 'border:1px solid var(--gold);' }
    ];
  }

  // ===== بارگذاری هدر =====
  function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    const lang = getCurrentLanguage();
    const links = getNavLinks(lang);

    fetch('components/header.html')
      .then(response => response.text())
      .then(html => {
        // جایگزینی placeholder با هدر
        headerPlaceholder.outerHTML = html;

        // پر کردن لینک‌های منو
        const navLinks = document.getElementById('navLinks');
        if (navLinks) {
          navLinks.innerHTML = links.map(link => `
            <a href="${link.href}" class="${link.active ? 'active' : ''}" ${link.style ? `style="${link.style}"` : ''}>
              ${link.text}
            </a>
          `).join('');
        }
      })
      .catch(error => {
        console.error('خطا در بارگذاری هدر:', error);
        headerPlaceholder.outerHTML = '<div style="color:#ff6b6b; padding:20px; text-align:center;">خطا در بارگذاری هدر</div>';
      });
  }

  // ===== بارگذاری فوتر =====
  function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    fetch('components/footer.html')
      .then(response => response.text())
      .then(html => {
        footerPlaceholder.outerHTML = html;
      })
      .catch(error => {
        console.error('خطا در بارگذاری فوتر:', error);
        footerPlaceholder.outerHTML = '<div style="color:#ff6b6b; padding:20px; text-align:center;">خطا در بارگذاری فوتر</div>';
      });
  }

  // ===== اجرا =====
  document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
  });

})();
