/**
 * MERCYVISUALS - Cinematic Hero Slider Engine
 * High-performance, Slider Revolution-style multi-slide controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const sliderSection = document.querySelector('.hero-slider-section');
  if (!sliderSection) return;

  const slides = Array.from(sliderSection.querySelectorAll('.hero-slide'));
  const dots = Array.from(sliderSection.querySelectorAll('.slider-dot'));
  const prevBtn = sliderSection.querySelector('.slider-arrow-prev');
  const nextBtn = sliderSection.querySelector('.slider-arrow-next');
  const progressBar = sliderSection.querySelector('.slider-progress-bar');
  const currentCounter = sliderSection.querySelector('.slider-counter-current');
  const totalCounter = sliderSection.querySelector('.slider-counter-total');

  if (slides.length === 0) return;

  let currentIndex = 0;
  const slideDuration = 7000; // 7 seconds per slide
  let slideStartTime = Date.now();
  let animationFrameId = null;
  let isPaused = false;
  let isTransitioning = false;

  if (totalCounter) {
    totalCounter.textContent = String(slides.length).padStart(2, '0');
  }

  function updateSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    // Remove active class from old slide and dot
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });

    if (currentCounter) {
      currentCounter.textContent = String(index + 1).padStart(2, '0');
    }

    currentIndex = index;
    slideStartTime = Date.now();
    if (progressBar) {
      progressBar.style.width = '0%';
    }

    setTimeout(() => {
      isTransitioning = false;
    }, 600);
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    updateSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide(prevIndex);
  }

  // Progress Bar & Autoplay Loop
  function tick() {
    if (!isPaused && progressBar) {
      const elapsed = Date.now() - slideStartTime;
      const progress = Math.min(100, (elapsed / slideDuration) * 100);
      progressBar.style.width = `${progress}%`;

      if (elapsed >= slideDuration) {
        nextSlide();
      }
    }
    animationFrameId = requestAnimationFrame(tick);
  }

  // Event Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (currentIndex !== i) {
        updateSlide(i);
      }
    });
  });

  // Pause on hover
  sliderSection.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  sliderSection.addEventListener('mouseleave', () => {
    isPaused = false;
    slideStartTime = Date.now() - ((parseFloat(progressBar ? progressBar.style.width : 0) / 100) * slideDuration);
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });

  // Touch Swipe for mobile devices
  let touchStartX = 0;
  let touchEndX = 0;

  sliderSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
    }
  }

  // Desktop Mouse Parallax for layered background
  sliderSection.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = (clientX - centerX) / centerX;
    const deltaY = (clientY - centerY) / centerY;

    const activeSlide = slides[currentIndex];
    if (activeSlide) {
      const bgLayer = activeSlide.querySelector('.slide-bg-layer');
      if (bgLayer) {
        bgLayer.style.transform = `scale(1.04) translate3d(${deltaX * -15}px, ${deltaY * -15}px, 0)`;
      }
    }
  });

  // Initialize
  updateSlide(0);
  animationFrameId = requestAnimationFrame(tick);
});
