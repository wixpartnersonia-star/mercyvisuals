/**
 * MERCYVISUALS - Main Interactive Engine
 * Navigation, Video Portfolio Preview, Lightbox Modal, and Form Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation on Scroll
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when clicking any nav link in mobile drawer
    mobileDrawer.querySelectorAll('.nav-link, .btn').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Portfolio Video Hover Preview
  const videoCards = document.querySelectorAll('.portfolio-card');
  videoCards.forEach(card => {
    const video = card.querySelector('video.portfolio-video-preview');
    if (!video) return;

    // Preload metadata
    video.preload = 'metadata';

    card.addEventListener('mouseenter', () => {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented or cancelled, ignore safely
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });

  // 4. Video Lightbox Modal
  const lightbox = document.querySelector('.video-lightbox');
  const lightboxVideo = lightbox ? lightbox.querySelector('video') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  const lightboxTitle = lightbox ? lightbox.querySelector('.lightbox-title') : null;
  const lightboxCat = lightbox ? lightbox.querySelector('.lightbox-cat') : null;

  function openLightbox(videoSrc, title, category) {
    if (!lightbox || !lightboxVideo) return;
    lightboxVideo.src = videoSrc;
    if (lightboxTitle) lightboxTitle.textContent = title || 'Selected Work';
    if (lightboxCat) lightboxCat.textContent = category || 'AI Creative Production';
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lightboxVideo.muted = false;
    lightboxVideo.play().catch(() => {});
  }

  function closeLightbox() {
    if (!lightbox || !lightboxVideo) return;
    lightbox.classList.remove('active');
    lightboxVideo.pause();
    lightboxVideo.currentTime = 0;
    lightboxVideo.src = '';
    document.body.style.overflow = '';
  }

  // Wire up video triggers across the site
  document.querySelectorAll('[data-lightbox-video]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const videoSrc = trigger.getAttribute('data-lightbox-video');
      const title = trigger.getAttribute('data-project-title');
      const category = trigger.getAttribute('data-project-cat');
      openLightbox(videoSrc, title, category);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 5. Interactive Contact Form
  const contactForm = document.getElementById('projectInquiryForm');
  const formSuccessState = document.querySelector('.form-success-state');
  const whatsappForwardBtn = document.getElementById('whatsappDirectAction');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName')?.value || 'Client';
      const email = document.getElementById('email')?.value || '';
      const company = document.getElementById('company')?.value || 'N/A';
      const service = document.getElementById('serviceNeeded')?.value || 'AI Visual Production';
      const budget = document.getElementById('budget')?.value || 'Standard';
      const description = document.getElementById('projectDesc')?.value || '';
      const method = document.querySelector('input[name="contactMethod"]:checked')?.value || 'Email';

      // Submit feedback animation
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Processing Brief...</span>';
      }

      setTimeout(() => {
        contactForm.style.display = 'none';
        if (formSuccessState) {
          formSuccessState.classList.add('active');
          const clientNameSpan = formSuccessState.querySelector('.client-name');
          if (clientNameSpan) {
            clientNameSpan.textContent = fullName;
          }
        }

        // WhatsApp direct integration link
        if (whatsappForwardBtn) {
          const waMessage = encodeURIComponent(
            `Hello Esther, I submitted an inquiry on MercyVisuals:\n` +
            `• Name: ${fullName}\n` +
            `• Brand/Company: ${company}\n` +
            `• Service: ${service}\n` +
            `• Budget: ${budget}\n` +
            `• Preferred Contact: ${method}\n` +
            `• Brief: ${description}`
          );
          whatsappForwardBtn.href = `https://wa.me/2349073732756?text=${waMessage}`;
        }
      }, 700);
    });
  }

  // 6. Intersection Observer for Scroll Animations
  const revealElements = document.querySelectorAll('.portfolio-card, .service-card, .pillar-card, .process-step, .positioning-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  }
});
