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
