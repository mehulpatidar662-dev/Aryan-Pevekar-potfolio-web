/**
 * Automotive Design Portfolio - Interactive Application
 * -------------------------------------------------------------
 * Powers the interactive multi-angle viewer, sketch-to-render slider,
 * fullscreen lightbox, and telemetry animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Load configuration with local storage override
  initThemeToggle();
  loadConfiguration();
  
  // Initialize interactive components
  initMultiAngleViewers();
  initComparisonSliders();
  initLightbox();
  initScrollSpy();
  initMobileMenu();
  initClipboardActions();
});

/* ==========================================================================
   0. DARK / LIGHT THEME CONTROLLER
   ========================================================================== */
function initThemeToggle() {
  const toggleBtns = [
    document.getElementById('theme-toggle-btn'),
    document.getElementById('mobile-theme-toggle-btn')
  ].filter(Boolean);

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme === 'light' ? 'light' : 'dark';
    localStorage.setItem('portfolio_theme', theme);

    const isLight = theme === 'light';
    toggleBtns.forEach(btn => {
      btn.setAttribute('title', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
      btn.setAttribute('aria-label', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
      const label = btn.querySelector('.theme-toggle-text');
      if (label) label.textContent = isLight ? 'Light' : 'Dark';
    });
  }

  const initialTheme = document.documentElement.getAttribute('data-theme') || 
    localStorage.getItem('portfolio_theme') || 
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  
  applyTheme(initialTheme);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      showToast(`Switched to ${next === 'light' ? 'Light Studio' : 'Obsidian Dark'} Mode`);
    });
  });

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!localStorage.getItem('portfolio_theme')) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }
}

/* ==========================================================================
   1. CONFIGURATION & PROFILE DATA LOADER
   ========================================================================== */
function loadConfiguration() {
  const config = window.PORTFOLIO_CONFIG;
  if (!config || !config.designer) return;

  // Clear legacy mock session overrides if present
  try {
    localStorage.removeItem('auto_portfolio_user_data');
  } catch (e) {}

  // Update DOM with official designer profile
  const d = config.designer;
  document.querySelectorAll('[data-bind="name"]').forEach(el => el.textContent = d.name);
  document.querySelectorAll('[data-bind="tagline"]').forEach(el => el.textContent = d.tagline);
  document.querySelectorAll('[data-bind="monogram"]').forEach(el => el.textContent = d.monogram);
  document.querySelectorAll('[data-bind="status"]').forEach(el => el.textContent = d.status);
  document.querySelectorAll('[data-bind="location"]').forEach(el => el.textContent = d.location);
  document.querySelectorAll('[data-bind="email"]').forEach(el => {
    el.textContent = d.email;
    if (el.tagName === 'A') el.href = `mailto:${d.email}`;
  });
  document.querySelectorAll('[data-bind="phone"]').forEach(el => {
    el.textContent = d.phone;
    if (el.tagName === 'A') el.href = `tel:${d.phoneClean || d.phone}`;
  });
  document.querySelectorAll('[data-bind="whatsapp"]').forEach(el => {
    if (el.tagName === 'A') el.href = `https://wa.me/${(d.whatsapp || '').replace(/[^0-9]/g, '')}`;
  });
  document.querySelectorAll('[data-bind="instagram"]').forEach(el => {
    if (el.tagName === 'A') el.href = d.instagram;
  });
  document.querySelectorAll('[data-bind="behance"]').forEach(el => {
    if (el.tagName === 'A') el.href = d.behance;
  });
  document.querySelectorAll('[data-bind="linkedin"]').forEach(el => {
    if (el.tagName === 'A') el.href = d.linkedin;
  });
  document.querySelectorAll('[data-bind="artstation"]').forEach(el => {
    if (el.tagName === 'A') el.href = d.artstation;
  });
}

/* ==========================================================================
   2. MULTI-ANGLE VEHICLE VIEWERS
   ========================================================================== */
function initMultiAngleViewers() {
  const viewports = document.querySelectorAll('.multi-angle-viewport');

  viewports.forEach(viewport => {
    const mainImg = viewport.querySelector('.viewport-stage img');
    const stage = viewport.querySelector('.viewport-stage');
    const buttons = viewport.querySelectorAll('.angle-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSrc = btn.getAttribute('data-view-src');
        if (!targetSrc || !mainImg) return;

        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Check if image is a charcoal or sketch that needs light canvas
        const isSketch = btn.getAttribute('data-is-sketch') === 'true' || targetSrc.includes('charcoal') || targetSrc.includes('sketch') || targetSrc.includes('rack-component');

        // Smooth cross-fade transition
        mainImg.style.opacity = '0.2';
        mainImg.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
          mainImg.src = targetSrc;
          mainImg.alt = btn.textContent.trim();
          stage.setAttribute('data-lightbox-src', targetSrc);
          stage.setAttribute('data-lightbox-caption', btn.textContent.trim());

          if (isSketch) {
            stage.style.background = 'radial-gradient(circle at center, #ffffff 0%, #e2e8f0 100%)';
          } else {
            stage.style.background = '';
          }

          mainImg.style.opacity = '1';
          mainImg.style.transform = 'scale(1)';
        }, 150);
      });
    });
  });
}

/* ==========================================================================
   3. SKETCH-TO-RENDER INTERACTIVE COMPARISON SLIDER
   ========================================================================== */
function initComparisonSliders() {
  const sliders = document.querySelectorAll('.comparison-slider-wrap');

  sliders.forEach(slider => {
    const beforeWrap = slider.querySelector('.comparison-before');
    const beforeImg = slider.querySelector('.comparison-img-before');
    const handle = slider.querySelector('.comparison-handle');
    if (!beforeWrap || !handle) return;
    let isDragging = false;

    function syncWidth() {
      if (beforeImg) {
        const sliderWidth = slider.getBoundingClientRect().width;
        if (sliderWidth > 0) {
          beforeImg.style.width = sliderWidth + 'px';
        }
      }
    }

    // Initial sync and resize observer
    syncWidth();
    window.addEventListener('resize', syncWidth);
    window.addEventListener('load', syncWidth);
    setTimeout(syncWidth, 300);
    setTimeout(syncWidth, 1000);

    function updateSlider(xPos) {
      const rect = slider.getBoundingClientRect();
      if (!rect || !rect.width) return;
      let offsetX = xPos - rect.left;
      let percentage = (offsetX / rect.width) * 100;

      // Bound between 3% and 97%
      if (percentage < 3) percentage = 3;
      if (percentage > 97) percentage = 97;

      beforeWrap.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
      syncWidth();
    }

    // Mouse events
    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events for mobile/tablets
    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches.length > 0) {
        updateSlider(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length === 0) return;
      updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  });
}

/* ==========================================================================
   4. FULLSCREEN INTERACTIVE LIGHTBOX
   ========================================================================== */
let lightboxItems = [];
let currentLightboxIndex = 0;

function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  const imgEl = modal.querySelector('.lightbox-image');
  const captionEl = modal.querySelector('.lightbox-caption');
  const counterEl = modal.querySelector('.lightbox-counter');
  const closeBtn = modal.querySelector('.lightbox-close-btn');
  const prevBtn = modal.querySelector('.lightbox-prev');
  const nextBtn = modal.querySelector('.lightbox-next');
  const bodyEl = modal.querySelector('.lightbox-body');
  const canvasToggleBtn = document.getElementById('lightbox-canvas-toggle');

  // Collect all zoomable image elements
  const zoomTriggers = document.querySelectorAll('[data-lightbox-src], .gallery-card, .stage-image-wrap, .viewport-stage');
  
  // Build indexed collection
  lightboxItems = [];
  zoomTriggers.forEach((trigger) => {
    let src = trigger.getAttribute('data-lightbox-src');
    let caption = trigger.getAttribute('data-lightbox-caption');
    const isSketch = trigger.querySelector('.sketch-canvas') !== null || (src && (src.includes('ideation') || src.includes('sketch') || src.includes('charcoal') || src.includes('struts') || src.includes('component') || src.includes('dual-material')));

    if (!src) {
      const innerImg = trigger.querySelector('img');
      if (innerImg) {
        src = innerImg.getAttribute('src');
        caption = trigger.querySelector('.gallery-card-title')?.textContent || innerImg.getAttribute('alt') || 'Automotive Design Presentation';
      }
    }

    if (src) {
      trigger.setAttribute('data-lightbox-index', lightboxItems.length);
      lightboxItems.push({ 
        src, 
        caption: caption || 'Automotive Design Visual',
        isSketch: !!isSketch
      });

      trigger.addEventListener('click', (e) => {
        // Prevent trigger if clicking on angle switcher buttons
        if (e.target.closest('.viewport-controls-bar')) return;
        e.preventDefault();
        
        // Dynamically resolve target src in case stage image was switched by multi-angle controls
        let activeSrc = trigger.getAttribute('data-lightbox-src');
        const img = trigger.querySelector('img');
        if (img && img.getAttribute('src')) {
          activeSrc = img.getAttribute('src');
        }

        let targetIndex = lightboxItems.findIndex(item => item.src === activeSrc);
        if (targetIndex === -1) {
          targetIndex = parseInt(trigger.getAttribute('data-lightbox-index'), 10);
        }
        if (isNaN(targetIndex) || targetIndex < 0) targetIndex = 0;
        openLightbox(targetIndex);
      });
    }
  });

  function openLightbox(index) {
    if (index < 0 || index >= lightboxItems.length) return;
    currentLightboxIndex = index;
    updateLightboxContent();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = lightboxItems[currentLightboxIndex];
    if (!item) return;

    imgEl.style.opacity = '0';
    setTimeout(() => {
      imgEl.src = item.src;
      imgEl.alt = item.caption;
      captionEl.textContent = item.caption;
      counterEl.textContent = `${currentLightboxIndex + 1} / ${lightboxItems.length}`;

      // Automatically apply light canvas if transparent sketch or charcoal study
      const isSketch = item.isSketch || item.src.includes('ideation') || item.src.includes('sketch') || item.src.includes('charcoal') || item.src.includes('struts');
      if (isSketch) {
        bodyEl.classList.add('light-canvas');
        if (canvasToggleBtn) canvasToggleBtn.textContent = 'Canvas: Light';
      } else {
        bodyEl.classList.remove('light-canvas');
        if (canvasToggleBtn) canvasToggleBtn.textContent = 'Canvas: Dark';
      }

      imgEl.style.opacity = '1';
    }, 150);
  }

  function showNext() {
    currentLightboxIndex = (currentLightboxIndex + 1) % lightboxItems.length;
    updateLightboxContent();
  }

  function showPrev() {
    currentLightboxIndex = (currentLightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
    updateLightboxContent();
  }

  // Toggle canvas background manually
  if (canvasToggleBtn) {
    canvasToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      bodyEl.classList.toggle('light-canvas');
      const isLight = bodyEl.classList.contains('light-canvas');
      canvasToggleBtn.textContent = isLight ? 'Canvas: Light' : 'Canvas: Dark';
    });
  }

  // Event Listeners
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-body') || e.target.classList.contains('lightbox-container')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ==========================================================================
   5. NAVIGATION SCROLL SPY & MOBILE MENU
   ========================================================================== */
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  const sections = document.querySelectorAll('section[id]');
  const projectsLink = document.querySelector('.nav-menu a[href="#bespoke-case"]');
  const processLink = document.querySelector('.nav-menu a[href="#methodology"]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => link.classList.remove('active'));

    if (!currentId) return;

    if (['bespoke-case', 'aprilia-case', 'bobber-case'].includes(currentId)) {
      if (projectsLink) projectsLink.classList.add('active');
    } else if (['methodology', 'toolkit', 'experience'].includes(currentId)) {
      if (processLink) processLink.classList.add('active');
    } else {
      const activeLink = document.querySelector(`.nav-menu a[href="#${currentId}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('open');
    }
  });
}

/* ==========================================================================
   6. CLIPBOARD ACTIONS & TOAST NOTIFICATIONS
   ========================================================================== */
function initClipboardActions() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(() => {
        showToast(`Text: ${textToCopy}`);
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
