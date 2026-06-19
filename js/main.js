/* Creators AI Hologram Boxing — shared site logic */

let SITE = {
  tiktokHandle: 'creatorsai',
  tiktok: 'https://www.tiktok.com/@creatorsai',
  email: 'bookings@creatorsai.com',
  name: 'Creators AI Hologram Boxing',
  tagline: 'Step in. Gear up. Get in the ring.',
};

function pageRoot() {
  return window.location.pathname.includes('/blog/') ? '../' : '';
}

function pageUrl(path) {
  return `${pageRoot()}${path}`;
}

function assetBase() {
  return `${pageRoot()}assets/`;
}

async function loadSiteConfig() {
  if (window.SITE_CONFIG) {
    applyConfig(window.SITE_CONFIG);
    return;
  }

  try {
    const response = await fetch(pageUrl('site-config.json'));
    if (response.ok) applyConfig(await response.json());
  } catch {
    /* use defaults */
  }
}

function applyConfig(config) {
  SITE = {
    tiktokHandle: config.tiktokHandle || SITE.tiktokHandle,
    tiktok: config.tiktokUrl || `https://www.tiktok.com/@${config.tiktokHandle || SITE.tiktokHandle}`,
    email: config.email || SITE.email,
    name: config.siteName || SITE.name,
    tagline: config.tagline || SITE.tagline,
  };
}

function initNav() {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  document.querySelectorAll('.nav-links a[data-page]').forEach((link) => {
    if (!link.getAttribute('href')?.startsWith('http')) {
      link.href = pageUrl(link.getAttribute('data-page'));
    }
  });

  const logo = document.querySelector('.nav-logo');
  if (logo && !logo.getAttribute('href')?.startsWith('http')) {
    logo.href = pageUrl('index.html');
  }

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
  const onBlog = window.location.pathname.includes('/blog/');

  document.querySelectorAll('.nav-links a[data-page]').forEach((link) => {
    link.classList.remove('active');
    const page = link.getAttribute('data-page');
    if (page === current || (current === '' && page === 'index.html')) {
      link.classList.add('active');
    }
    if (onBlog && page === 'news.html') {
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

  document.querySelectorAll('[data-tagline]').forEach((el) => {
    el.textContent = SITE.tagline;
  });

  document.querySelectorAll('[data-email-text]').forEach((el) => {
    el.textContent = SITE.email;
  });
}

function initInternalLinks() {
  document.querySelectorAll('[data-route]').forEach((el) => {
    el.href = pageUrl(el.dataset.route);
  });

  document.querySelectorAll('a[href^="index.html"], a[href^="events.html"], a[href^="fighters.html"], a[href^="watch.html"], a[href^="news.html"], a[href^="book.html"], a[href^="blog/"]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;
    if (window.location.pathname.includes('/blog/') && !href.startsWith('../') && !href.startsWith('/')) {
      link.setAttribute('href', pageUrl(href));
    }
  });
}

function injectCookieBanner() {
  if (document.getElementById('cookie-banner')) return;

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.id = 'cookie-banner';
  banner.innerHTML = `
    <div class="container cookie-inner">
      <p>We use cookies. Essential cookies for functionality, optional analytics to improve our site.
        <a href="${pageUrl('news.html')}">Learn more</a>
      </p>
      <div class="cookie-actions">
        <button class="cookie-essential" id="cookie-essential" type="button">Essential Only</button>
        <button class="cookie-accept" id="cookie-accept" type="button">Accept All</button>
      </div>
    </div>
  `;
  document.body.appendChild(banner);
}

function initCookieBanner() {
  injectCookieBanner();
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
    if (el.tagName === 'A' && (el.classList.contains('btn') || el.hasAttribute('data-email-text'))) {
      el.textContent = SITE.email;
    }
  });
}

function upgradeMiniFooter() {
  const footer = document.querySelector('.site-footer--mini');
  if (!footer) return;

  footer.classList.remove('site-footer--mini');
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="${pageUrl('index.html')}" class="nav-logo">
            <img src="${assetBase()}logo.svg" alt="" class="nav-logo-img" width="36" height="36">
            <span>Creators AI</span>
          </a>
          <p>Experience the future of boxing with hologram technology. Real fights, real prize money, unforgettable events.</p>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <a href="${pageUrl('events.html')}">Events</a>
          <a href="${pageUrl('fighters.html')}">Fighters</a>
          <a href="${pageUrl('watch.html')}">Watch</a>
          <a href="${pageUrl('news.html')}">News</a>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <a href="${SITE.tiktok}" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="mailto:${SITE.email}">Email Us</a>
          <a href="${pageUrl('book.html')}">Book an Event</a>
          <a href="${pageUrl('book.html#partner')}">Partnerships</a>
        </div>
        <div class="footer-col">
          <h4>Info</h4>
          <a href="${pageUrl('book.html')}">$20 Admission</a>
          <a href="${pageUrl('book.html')}">All Ages Welcome</a>
          <a href="${pageUrl('book.html')}">Food &amp; Drinks</a>
          <a href="${pageUrl('blog/introducing-website.html')}">About Us</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 ${SITE.name}. All rights reserved.</span>
        <div class="footer-social">
          <a href="${SITE.tiktok}" target="_blank" rel="noopener noreferrer" aria-label="TikTok">📱</a>
          <a href="mailto:${SITE.email}" aria-label="Email">✉️</a>
        </div>
      </div>
    </div>
  `;
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
    const data = Object.fromEntries(new FormData(form));
    const payload = { ...data, submittedAt: new Date().toISOString() };

    localStorage.setItem('creatorsai_booking', JSON.stringify(payload));

    const subject = encodeURIComponent(`${SITE.name} — Booking Request`);
    const body = encodeURIComponent(
      `Booking Request\n\nName: ${data.name}\nEmail: ${data.email}\nType: ${data.type}\nDate: ${data.date || 'Flexible'}\nGuests: ${data.guests || '1'}\n\nDetails:\n${data.message || 'None'}`
    );

    form.classList.add('hidden');
    const success = document.getElementById('form-success');
    success?.classList.add('show');

    const mailtoBtn = document.getElementById('booking-mailto');
    if (mailtoBtn) {
      mailtoBtn.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    }
  });
}

function initEpisodeList() {
  const cards = document.querySelectorAll('.episode-list .card');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    const activate = () => {
      cards.forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
      const title = document.getElementById('now-playing');
      const desc = document.getElementById('now-desc');
      if (title) title.textContent = card.dataset.title || '';
      if (desc) desc.textContent = card.dataset.desc || '';
      document.getElementById('player')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    card.addEventListener('click', activate);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    });
  });

  const hash = window.location.hash.slice(1);
  if (hash) document.getElementById(hash)?.click();
}

function initLinkedCards() {
  document.querySelectorAll('[data-link]').forEach((card) => {
    const url = pageUrl(card.dataset.link);
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      window.location.href = url;
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') window.location.href = url;
    });
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'link');
  });
}

function initHashNavigation() {
  const hash = window.location.hash.slice(1);
  if (!hash) return;

  const el = document.getElementById(hash);
  if (!el || el.closest('.episode-list')) return;

  window.setTimeout(() => {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 150);
}

function initFeatureLinks() {
  document.querySelectorAll('[data-feature-link]').forEach((item) => {
    item.addEventListener('click', () => {
      window.location.href = pageUrl(item.dataset.featureLink || 'book.html');
    });
    item.style.cursor = 'pointer';
  });
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
  initInternalLinks();
  initNav();
  upgradeMiniFooter();
  initCookieBanner();
  initSocialLinks();
  initVideoPlayer();
  initBookingForm();
  initEpisodeList();
  initLinkedCards();
  initFeatureLinks();
  initHashNavigation();
  initReveal();
});

window.CreatorsAI = { getConfig: () => SITE, pageUrl };
