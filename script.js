// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// Burger menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    const pane = document.getElementById(target);
    if (pane) {
      pane.classList.add('active');
      pane.style.animation = 'none';
      pane.offsetHeight;
      pane.style.animation = 'fadeIn 0.4s ease';
    }
  });
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// Form submission via Web3Forms
const form = document.getElementById('bookingForm');
const toast = document.getElementById('toast');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправляем...';

  const formData = new FormData(form);
  formData.append('access_key', '345d8e20-1cfb-4235-8763-3a40223d3523');
  formData.append('subject', 'Новая заявка с сайта Nail Kris');
  formData.append('from_name', 'Сайт nailkris.ru');

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();

    if (data.success) {
      toast.classList.add('show');
      form.reset();
      setTimeout(() => toast.classList.remove('show'), 4000);
    } else {
      alert('Ошибка отправки. Пожалуйста, свяжитесь с нами напрямую.');
    }
  } catch {
    alert('Ошибка соединения. Пожалуйста, свяжитесь с нами напрямую.');
  }

  submitBtn.disabled = false;
  submitBtn.textContent = 'Отправить заявку';
});

// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection observer for reveal animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.branch-card, .service-item, .master-card, .contact-card, .about__card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
