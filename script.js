// Custom cursor
const cursor = document.getElementById('custom-cursor');
const cursorDot = document.getElementById('custom-cursor-dot');

if (cursor && cursorDot) {
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
  let cursorActive = false;

  function enableCursor() {
    if (cursorActive) return;
    cursorActive = true;
    document.documentElement.style.cursor = '';
    cursor.style.display = '';
    cursorDot.style.display = '';
  }

  function disableCursor() {
    cursorActive = false;
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
    document.documentElement.style.cursor = 'auto';
  }

  // Show custom cursor on mouse movement (works even on touch+mouse Windows devices)
  document.addEventListener('mousemove', (e) => {
    enableCursor();
    targetX = e.clientX;
    targetY = e.clientY;
    cursorDot.style.left = targetX + 'px';
    cursorDot.style.top = targetY + 'px';
    cursor.style.opacity = '0.85';
    cursorDot.style.opacity = '1';
  });

  // Hide custom cursor when touch is used
  document.addEventListener('touchstart', () => {
    disableCursor();
  }, { passive: true });

  // Smooth trailing animation for main cursor
  function animateCursor() {
    currentX += (targetX - currentX) * 0.35;
    currentY += (targetY - currentY) * 0.35;
    cursor.style.left = currentX + 'px';
    cursor.style.top = currentY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  document.querySelectorAll('a, button, [role="button"], input, select, textarea').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });

  // Hide cursor when mouse leaves the window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (cursorActive) {
      cursor.style.opacity = '0.85';
      cursorDot.style.opacity = '1';
    }
  });
}

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileNav = document.querySelector('.mobile-nav');

mobileToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
  mobileToggle.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    mobileToggle.classList.remove('active');
  });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
    mobileNav.classList.remove('active');
    mobileToggle.classList.remove('active');
  }
});

// Header shadow on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// Contact form handling
const form = document.getElementById('contact-form');
const formContent = document.getElementById('form-content');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formContent.style.display = 'none';
        formSuccess.style.display = 'block';
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      alert('Something went wrong. Please try again or email us directly at contact@TheERFG.com');
    }
  });
}
