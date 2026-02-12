// Shared functionality across all pages
document.addEventListener('DOMContentLoaded', () => {
  // Get common elements
  const darkModeToggle = document.getElementById('darkModeToggle');
  const themeIcon = darkModeToggle?.querySelector('.theme-icon');
  const hamburger = document.getElementById('hamburger');
  const navigation = document.getElementById('navigation');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const gradientCircle = document.querySelector('.gradient-circle');
  const gradientCircleLeft = document.querySelector('.gradient-circle-left');

  // Initialize dark mode from localStorage
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    if (themeIcon) themeIcon.textContent = '☀️';
  }

  // Dark mode toggle
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark);
      if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
    });
  }

  // Mobile menu functions
  function toggleMenu() {
    if (hamburger && navigation && mobileMenuOverlay) {
      hamburger.classList.toggle('active');
      navigation.classList.toggle('active');
      mobileMenuOverlay.classList.toggle('active');
      document.body.style.overflow = navigation.classList.contains('active') ? 'hidden' : '';
    }
  }

  function closeMenu() {
    if (hamburger && navigation && mobileMenuOverlay) {
      hamburger.classList.remove('active');
      navigation.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Hamburger menu event listeners
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMenu);
  }

  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navigation?.classList.contains('active')) {
      closeMenu();
    }
  });

  // Close mobile menu when nav link is clicked
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Parallax scroll animation for gradient circles (desktop only)
  let ticking = false;

  function isMobile() {
    return window.innerWidth < 768;
  }

  function updateCirclePositions(scrollY) {
    if (isMobile()) return;

    // Home/About page gradient circle - parallax and 3D rotation
    if (gradientCircle) {
      const parallaxY = scrollY * 0.3;
      const rotateY = (scrollY * 0.5) % 360;
      const rotateX = (scrollY * 0.2) % 360;

      gradientCircle.style.transform = `translate(-50%, calc(-50% + ${parallaxY}px)) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    }

    // Case studies page gradient circle - parallax and 3D rotation
    if (gradientCircleLeft) {
      const parallaxY = scrollY * 0.2;
      const rotateY = (scrollY * 0.4) % 360;
      const rotateX = (scrollY * 0.15) % 360;

      gradientCircleLeft.style.transform = `translate(0, ${parallaxY}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    }
  }

  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateCirclePositions(scrollY);
        ticking = false;
      });

      ticking = true;
    }
  }

  // Reset circle transforms when resizing to mobile
  function resetCirclesOnMobile() {
    if (isMobile()) {
      if (gradientCircle) {
        gradientCircle.style.transform = 'translate(-50%, -50%)';
      }
      if (gradientCircleLeft) {
        gradientCircleLeft.style.transform = '';
      }
    }
  }

  window.addEventListener('resize', resetCirclesOnMobile, { passive: true });

  // Add scroll event listener
  window.addEventListener('scroll', onScroll, { passive: true });

  // Writing page sidebar active state (only runs if sidebar exists)
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  if (sidebarLinks.length > 0) {
    const articles = document.querySelectorAll('.article-card[id]');

    function updateActiveLink() {
      let currentArticle = '';

      articles.forEach(article => {
        const rect = article.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentArticle = article.getAttribute('id');
        }
      });

      sidebarLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentArticle}`) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink(); // Set initial state
  }

  // Case study filters (only runs if filter buttons exist)
  const filterButtons = document.querySelectorAll('.filter-btn, .folder-tab');
  const caseStudyDropdown = document.getElementById('caseStudyDropdown');
  const caseStudies = document.querySelectorAll('.case-study, .case-study-card');

  // Function to filter case studies - show ONLY matching studies
  function filterCaseStudies(filter) {
    caseStudies.forEach(study => {
      const tags = study.getAttribute('data-tags');
      if (tags && tags.includes(filter)) {
        study.classList.remove('hidden');
      } else {
        study.classList.add('hidden');
      }
    });
  }

  // Initialize with first filter on page load
  if (caseStudies.length > 0) {
    const initialFilter = 'design-system';
    filterCaseStudies(initialFilter);
    if (caseStudyDropdown) {
      caseStudyDropdown.value = initialFilter;
    }
  }

  // Desktop tab filtering
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter case studies
        filterCaseStudies(filter);

        // Sync dropdown if it exists
        if (caseStudyDropdown) {
          caseStudyDropdown.value = filter;
        }
      });
    });
  }

  // Mobile dropdown filtering
  if (caseStudyDropdown) {
    caseStudyDropdown.addEventListener('change', (e) => {
      const filter = e.target.value;

      // Filter case studies
      filterCaseStudies(filter);

      // Sync desktop tabs if they exist
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
          btn.classList.add('active');
        }
      });
    });
  }

  // Fade-in animation on scroll for about section
  const fadeInSections = document.querySelectorAll('.fade-in-section, .about-divider');
  if (fadeInSections.length > 0) {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    fadeInSections.forEach(section => {
      fadeInObserver.observe(section);
    });
  }
});
