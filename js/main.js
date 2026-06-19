/* Creators AI Hologram Boxing — shared site logic */

let SITE = {
  tiktokHandle: 'creatorsai',
  tiktok: 'https://www.tiktok.com/@creatorsai',
  email: 'bookings@creatorsai.com',
  name: 'Creators AI Hologram Boxing',
  tagline: 'Step in. Gear up. Get in the ring.',
};

function assetBase() {
  return window.location.pathname.includes('/blog/') ? '../assets/' : 'assets/';
}

async function loadSiteConfig() {
  try {
    const configPath = window.location.pathname.includes('/blog/')
      ? '../site-config.json'
      : 'site-config.json';
    const response = await fetch(configPath);
    if (!response.ok) return;
    const config = await response.json();
    SITE = {
      tiktokHandle: config.tiktokHandle || SITE.tiktokHandle,
      tiktok: config.tiktokUrl || `https://www.tiktok.com/@${config.tiktokHandle}`,
      email: config.email || SITE.email,
      name: config.siteName || SITE.name,
      tagline: config.tagline || SITE.tagline,
    };
  } catch {
    /* use defaults */
  }
}

function initNav() {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach((link) => {
    const page = link.getAttribute('data-page');
    if (page === current || (current === '' && page === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function initBranding() {
  const base = assetBase();

  document.querySelectorAll('[data-asset]').forEach((el) => {
    el.src = base + el.dataset.asset;
  });

  document.querySelectorAll('[data-tiktok-handle]').forEach((el) => {
    el.textContent = `@${SITE.tiktokHandle}`;
  });

  document.querySelectorAll('[data-site-name]').forEach((el) => {
    el.textContent = SITE.name;
  });

  if (document.title.includes('Creators AI') && !document.title.includes('|')) {
    document.title = `${SITE.name} | Premier Hologram Boxing Events`;
  }
}

function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner || localStorage.getItem('cookiesAccepted')) return;

  banner.classList.add('show');

  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'all');
    banner.classList.remove('show');
  });

  document.getElementById('cookie-essential')?.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'essential');
    banner.classList.remove('show');
  });
}

function initSocialLinks() {
  document.querySelectorAll('[data-tiktok]').forEach((el) => {
    el.href = SITE.tiktok;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });

  document.querySelectorAll('[data-email]').forEach((el) => {
    el.href = `mailto:${SITE.email}`;
    if (el.tagName === 'A' && el.classList.contains('btn')) {
      el.textContent = SITE.email;
    }
  });
}

function initVideoPlayer() {
  const playBtn = document.getElementById('play-btn');
  if (!playBtn) return;

  playBtn.addEventListener('click', () => {
    window.open(SITE.tiktok, '_blank', 'noopener,noreferrer');
  });
}

function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.classList.add('hidden');
    document.getElementById('form-success')?.classList.add('show');
  });
}

function initEpisodeList() {
  document.querySelectorAll('.episode-list .card').forEach((card) => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.episode-list .card').forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
      const title = document.getElementById('now-playing');
      const desc = document.getElementById('now-desc');
      if (title) title.textContent = card.dataset.title;
      if (desc) desc.textContent = card.dataset.desc;
      document.getElementById('player')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  const hash = window.location.hash.slice(1);
  if (hash) document.getElementById(hash)?.click();
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.card, .fighter-card, .social-post, .feature-item').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  if (!document.getElementById('reveal-style')) {
    const style = document.createElement('style');
    style.id = 'reveal-style';
    style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadSiteConfig();
  initBranding();
  initNav();
  initCookieBanner();
  initSocialLinks();
  initVideoPlayer();
  initBookingForm();
  initEpisodeList();
  initReveal();
});

window.CreatorsAI = { getConfig: () => SITE };
