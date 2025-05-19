document.addEventListener('DOMContentLoaded', function() {
  // Dropdown for nav menu
  document.querySelectorAll('.dropdown > a').forEach(function(drop) {
    drop.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = drop.parentElement;
      parent.classList.toggle('open');
      // Close others
      document.querySelectorAll('.dropdown').forEach(function(item) {
        if (item !== parent) item.classList.remove('open');
      });
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    document.querySelectorAll('.dropdown').forEach(function(item) {
      if (!item.contains(e.target)) item.classList.remove('open');
    });

    // Language menu close on outside click
    const langSwitcher = document.querySelector('.language-switcher');
    if (langSwitcher && !langSwitcher.contains(e.target)) {
      langSwitcher.classList.remove('open');
    }
  });

  // Language menu toggle button
  const langBtn = document.querySelector('.language-btn');
  if (langBtn) {
    langBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = langBtn.closest('.language-switcher');
      parent.classList.toggle('open');
    });
  }

  // Mobile menu toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // FAQ accordion toggler
  document.querySelectorAll('.faq-item').forEach(function(item) {
    item.addEventListener('click', function() {
      // Toggle this FAQ item
      const isOpen = item.classList.contains('open');
      // Close all others
      document.querySelectorAll('.faq-item').forEach(function(i) {
        i.classList.remove('open');
      });
      // Toggle current if previously closed
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
});
