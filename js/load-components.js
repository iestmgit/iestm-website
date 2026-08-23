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
        
        // بروزرسانی برچسب دکمه زبان
        updateLangLabel();
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

  // ===== تابع تغییر زبان =====
  window.switchLanguage = function() {
    const html = document.documentElement;
    const currentLang = html.getAttribute('lang') || 'fa';
    const newLang = currentLang === 'fa' ? 'en' : 'fa';
    
    // ذخیره در localStorage
    localStorage.setItem('preferred_lang', newLang);
    
    // تغییر مسیر به نسخه مناسب
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    
    let targetPage;
    if (newLang === 'en') {
      // تبدیل به انگلیسی
      if (currentPage === 'index.html' || currentPage === '') {
        targetPage = 'index-en.html';
      } else if (currentPage.includes('-en.')) {
        targetPage = currentPage; // قبلاً انگلیسی هست
      } else {
        const base = currentPage.replace('.html', '');
        targetPage = base + '-en.html';
      }
    } else {
      // تبدیل به فارسی
      if (currentPage === 'index-en.html') {
        targetPage = 'index.html';
      } else if (currentPage.includes('-en.')) {
        targetPage = currentPage.replace('-en.html', '.html');
      } else {
        targetPage = currentPage;
      }
    }
    
    if (targetPage !== currentPage && targetPage !== '') {
      window.location.href = targetPage;
    } else {
      location.reload();
    }
  };

  // ===== بروزرسانی برچسب دکمه زبان =====
  function updateLangLabel() {
    const langLabel = document.getElementById('langLabel');
    if (!langLabel) return;
    const lang = document.documentElement.getAttribute('lang') || 'fa';
    langLabel.textContent = lang === 'fa' ? '🇮🇷 فارسی' : '🇬🇧 English';
  }

  // ===== بررسی زبان ذخیره‌شده در اولین بار =====
  function checkSavedLanguage() {
    const savedLang = localStorage.getItem('preferred_lang');
    if (savedLang) {
      const currentLang = document.documentElement.getAttribute('lang') || 'fa';
      if (savedLang !== currentLang) {
        // اگر زبان ذخیره‌شده با زبان فعلی فرق داشت، هدایت کن
        const currentPath = window.location.pathname;
        const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
        let targetPage;
        if (savedLang === 'en') {
          if (currentPage === 'index.html' || currentPage === '') targetPage = 'index-en.html';
          else if (!currentPage.includes('-en.')) {
            const base = currentPage.replace('.html', '');
            targetPage = base + '-en.html';
          }
        } else {
          if (currentPage === 'index-en.html') targetPage = 'index.html';
          else if (currentPage.includes('-en.')) {
            targetPage = currentPage.replace('-en.html', '.html');
          }
        }
        if (targetPage && targetPage !== currentPage) {
          window.location.href = targetPage;
          return;
        }
      }
    }
  }

  // ===== اجرا =====
  document.addEventListener('DOMContentLoaded', function() {
    checkSavedLanguage();
    loadHeader();
    loadFooter();
    updateLangLabel();
  });

})();
