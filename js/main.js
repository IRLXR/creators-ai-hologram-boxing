/* Creators AI Hologram Boxing — shared site logic */

const NAV_ITEMS = [
  { page: 'index.html', label: 'Home' },
  { page: 'events.html', label: 'Events' },
  { page: 'fighters.html', label: 'Fighters' },
  { page: 'watch.html', label: 'Watch' },
  { page: 'about.html', label: 'About' },
  { page: 'gallery.html', label: 'Gallery' },
  { page: 'faq.html', label: 'FAQ' },
  { page: 'book.html', label: 'Book Now', cta: true },
];

let SITE = {
  kickHandle: '',
  kickUrl: '',
  twitchHandle: '',
  twitchUrl: '',
  streamsReady: false,
  email: 'ic4d@irlxr.com',
  name: 'Creators AI Hologram Boxing',
  tagline: 'Step in. Gear up. Watch hologram boxing.',
  admissionPrice: 20,
  crypto: {
    name: 'Me vs Me',
    symbol: 'MVM',
    ticketPriceHeadset: 200,
    ticketPriceAttendee: 350,
  },
  influencerCodes: [],
  nextEventName: 'Hologram Boxing 002',
  nextEventDate: '2026-08-15T18:00:00',
  prizePool: 10000,
  fights: [],
  fighters: [],
  goHighLevel: {
    enabled: false,
    useApi: true,
    apiEndpoint: '/api/ghl-submit',
    trackingScriptUrl: 'https://link.msgsndr.com/js/external-tracking.js',
    trackingId: '',
    chatWidgetId: '',
    webhooks: { ticket: '', booking: '', fighter: '' },
  },
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

function applyConfig(config) {
  const kickReady = config.streamsReady === true && config.kickUrl;
  const twitchReady = config.streamsReady === true && config.twitchUrl;
  SITE = {
    kickHandle: config.kickHandle || SITE.kickHandle,
    kickUrl: kickReady ? config.kickUrl : '',
    twitchHandle: config.twitchHandle || SITE.twitchHandle,
    twitchUrl: twitchReady ? config.twitchUrl : '',
    streamsReady: kickReady || twitchReady,
    email: config.email || SITE.email,
    name: config.siteName || SITE.name,
    tagline: config.tagline || SITE.tagline,
    admissionPrice: config.admissionPrice || SITE.admissionPrice,
    crypto: { ...SITE.crypto, ...(config.crypto || {}) },
    influencerCodes: config.influencerCodes || SITE.influencerCodes || [],
    nextEventName: config.nextEventName || SITE.nextEventName,
    nextEventDate: config.nextEventDate || SITE.nextEventDate,
    prizePool: config.prizePool || SITE.prizePool,
    fights: config.fights || SITE.fights || [],
    fighters: config.fighters || SITE.fighters || [],
    goHighLevel: {
      ...SITE.goHighLevel,
      ...(config.goHighLevel || {}),
      webhooks: {
        ...SITE.goHighLevel.webhooks,
        ...(config.goHighLevel?.webhooks || {}),
      },
    },
  };
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

function renderAutoNav() {
  const nav = document.querySelector('[data-auto-nav]');
  if (!nav) return;

  const links = NAV_ITEMS.map((item) => {
    const cls = item.cta ? 'nav-cta' : '';
    return `<a href="${pageUrl(item.page)}" data-page="${item.page}" class="${cls}">${item.label}</a>`;
  }).join('');

  nav.innerHTML = `
    <div class="container nav-inner">
      <a href="${pageUrl('index.html')}" class="nav-logo">
        <img src="${assetBase()}logo.svg" alt="" class="nav-logo-img" data-asset="logo.svg" width="36" height="36">
        <span>Hologram Boxing</span>
      </a>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links">${links}</div>
    </div>
  `;
}

function initNav() {
  renderAutoNav();

  const nav = document.querySelector('.site-nav, [data-auto-nav]');
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
  document.querySelectorAll('[data-asset]').forEach((el) => {
    el.src = assetBase() + el.dataset.asset;
  });

  document.querySelectorAll('[data-kick-handle]').forEach((el) => {
    el.textContent = SITE.kickHandle || 'Coming Soon';
  });

  document.querySelectorAll('[data-twitch-handle]').forEach((el) => {
    el.textContent = SITE.twitchHandle || 'Coming Soon';
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

  document.querySelectorAll('[data-admission]').forEach((el) => {
    el.textContent = `${SITE.crypto.ticketPriceHeadset} ${SITE.crypto.symbol}`;
  });

  document.querySelectorAll('[data-crypto-name]').forEach((el) => {
    el.textContent = SITE.crypto.name;
  });

  document.querySelectorAll('[data-crypto-symbol]').forEach((el) => {
    el.textContent = SITE.crypto.symbol;
  });

  document.querySelectorAll('[data-ticket-price-headset]').forEach((el) => {
    el.textContent = `${SITE.crypto.ticketPriceHeadset} ${SITE.crypto.symbol}`;
  });

  document.querySelectorAll('[data-ticket-price-attendee]').forEach((el) => {
    el.textContent = `${SITE.crypto.ticketPriceAttendee} ${SITE.crypto.symbol}`;
  });

  document.querySelectorAll('[data-prize-pool]').forEach((el) => {
    el.textContent = `$${SITE.prizePool.toLocaleString()}`;
  });

  document.querySelectorAll('[data-fighter-count]').forEach((el) => {
    const count = SITE.fighters?.length || Number(el.textContent) || 0;
    el.textContent = String(count);
  });

  document.querySelectorAll('[data-next-event]').forEach((el) => {
    el.textContent = SITE.nextEventName;
  });
}

function initInternalLinks() {
  document.querySelectorAll('[data-route]').forEach((el) => {
    el.href = pageUrl(el.dataset.route);
  });

  const pages = ['index.html', 'events.html', 'fighters.html', 'watch.html', 'news.html', 'book.html', 'about.html', 'gallery.html', 'faq.html', 'blog/'];
  pages.forEach((prefix) => {
    document.querySelectorAll(`a[href^="${prefix}"]`).forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;
      if (window.location.pathname.includes('/blog/') && !href.startsWith('../') && !href.startsWith('/')) {
        link.setAttribute('href', pageUrl(href));
      }
    });
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
        <a href="${pageUrl('faq.html')}">Learn more</a>
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

function initStreamLink(el, platform) {
  const url = platform === 'kick' ? SITE.kickUrl : SITE.twitchUrl;
  const ready = !!url;
  if (ready) {
    el.href = url;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
    el.classList.remove('stream-pending');
  } else {
    el.href = pageUrl('watch.html');
    el.classList.add('stream-pending');
  }
}

function initSocialLinks() {
  document.querySelectorAll('[data-kick]').forEach((el) => initStreamLink(el, 'kick'));
  document.querySelectorAll('[data-twitch]').forEach((el) => initStreamLink(el, 'twitch'));

  document.querySelectorAll('[data-email]').forEach((el) => {
    el.href = `mailto:${SITE.email}`;
    if (el.tagName === 'A' && (el.classList.contains('btn') || el.hasAttribute('data-email-text'))) {
      el.textContent = SITE.email;
    }
  });

  document.querySelectorAll('[data-stream-section]').forEach((section) => {
    if (!SITE.streamsReady) section.classList.add('streams-coming-soon');
  });
}

function initHeroWatchDropdown() {
  document.querySelectorAll('[data-watch-dropdown]').forEach((dropdown) => {
    const toggle = dropdown.querySelector('.hero-dropdown-toggle');
    const menu = dropdown.querySelector('.hero-dropdown-menu');
    if (!toggle || !menu || dropdown.dataset.dropdownInit) return;
    dropdown.dataset.dropdownInit = '1';

    const positionMenu = () => {
      const rect = toggle.getBoundingClientRect();
      const menuWidth = menu.offsetWidth || 256;
      menu.style.top = `${rect.bottom + 8}px`;
      menu.style.left = `${Math.max(16, Math.min(rect.left, window.innerWidth - menuWidth - 16))}px`;
      menu.style.minWidth = `${Math.max(rect.width, 256)}px`;
    };

    const close = () => {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      dropdown.classList.remove('is-open');
    };

    const open = () => {
      menu.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      dropdown.classList.add('is-open');
      positionMenu();
      requestAnimationFrame(positionMenu);
    };

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      if (menu.hidden) open();
      else close();
    });

    menu.querySelectorAll('a[href]').forEach((link) => {
      if (!link.getAttribute('href')?.startsWith('http') && link.getAttribute('href') !== '#') {
        link.href = pageUrl(link.getAttribute('href'));
      }
      link.addEventListener('click', () => close());
    });

    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target) && !menu.contains(event.target)) close();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });

    window.addEventListener('resize', () => {
      if (!menu.hidden) positionMenu();
    });

    window.addEventListener('scroll', () => {
      if (!menu.hidden) positionMenu();
    }, { passive: true });
  });
}

function footerLinks() {
  const kickLink = SITE.kickUrl
    ? `<a href="${SITE.kickUrl}" target="_blank" rel="noopener noreferrer">Kick Live</a>`
    : `<a href="${pageUrl('watch.html')}">Kick Live</a>`;
  const twitchLink = SITE.twitchUrl
    ? `<a href="${SITE.twitchUrl}" target="_blank" rel="noopener noreferrer">Twitch Live</a>`
    : `<a href="${pageUrl('watch.html')}">Twitch Live</a>`;
  const kickIcon = SITE.kickUrl
    ? `<a href="${SITE.kickUrl}" target="_blank" rel="noopener noreferrer" aria-label="Kick">🟢</a>`
    : `<a href="${pageUrl('watch.html')}" aria-label="Kick live streams">🟢</a>`;
  const twitchIcon = SITE.twitchUrl
    ? `<a href="${SITE.twitchUrl}" target="_blank" rel="noopener noreferrer" aria-label="Twitch">🟣</a>`
    : `<a href="${pageUrl('watch.html')}" aria-label="Twitch live streams">🟣</a>`;

  return { kickLink, twitchLink, streamIcons: `${kickIcon}${twitchIcon}` };
}

function upgradeMiniFooter() {
  const footer = document.querySelector('.site-footer--mini');
  if (!footer) return;
  const { kickLink, twitchLink, streamIcons } = footerLinks();

  footer.classList.remove('site-footer--mini');
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="${pageUrl('index.html')}" class="nav-logo">
            <img src="${assetBase()}logo.svg" alt="" class="nav-logo-img" width="36" height="36">
            <span>Hologram Boxing</span>
          </a>
          <p>Experience hologram boxing through AR. Watch hologram fighters, real prize money, unforgettable events.</p>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <a href="${pageUrl('events.html')}">Events</a>
          <a href="${pageUrl('fighters.html')}">Fighters</a>
          <a href="${pageUrl('watch.html')}">Watch</a>
          <a href="${pageUrl('gallery.html')}">Gallery</a>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          ${kickLink}
          ${twitchLink}
          <a href="mailto:${SITE.email}">Email Us</a>
          <a href="${pageUrl('book.html')}">Book an Event</a>
          <a href="${pageUrl('book.html#partner')}">Partnerships</a>
        </div>
        <div class="footer-col">
          <h4>Info</h4>
          <a href="${pageUrl('about.html')}">About</a>
          <a href="${pageUrl('faq.html')}">FAQ</a>
          <a href="${pageUrl('news.html')}">News</a>
          <a href="${pageUrl('book.html#apply')}">Apply as Hologram Fighter</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 ${SITE.name}. All rights reserved.</span>
        <div class="footer-social">${streamIcons}<a href="mailto:${SITE.email}" aria-label="Email">✉️</a></div>
      </div>
    </div>
  `;
}

function upgradeFullFooter() {
  const footer = document.querySelector('.site-footer:not(.site-footer--mini)[data-auto-footer]');
  if (!footer) return;
  const { kickLink, twitchLink, streamIcons } = footerLinks();

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="${pageUrl('index.html')}" class="nav-logo">
            <img src="${assetBase()}logo.svg" alt="" class="nav-logo-img" data-asset="logo.svg" width="36" height="36">
            <span>Hologram Boxing</span>
          </a>
          <p>Experience hologram boxing through AR. Watch hologram fighters, real prize money, unforgettable events.</p>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <a href="${pageUrl('events.html')}">Events</a>
          <a href="${pageUrl('fighters.html')}">Fighters</a>
          <a href="${pageUrl('watch.html')}">Watch</a>
          <a href="${pageUrl('gallery.html')}">Gallery</a>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          ${kickLink}
          ${twitchLink}
          <a href="mailto:${SITE.email}">Email Us</a>
          <a href="${pageUrl('book.html')}">Book an Event</a>
          <a href="${pageUrl('book.html#partner')}">Partnerships</a>
        </div>
        <div class="footer-col">
          <h4>Info</h4>
          <a href="${pageUrl('about.html')}">About</a>
          <a href="${pageUrl('faq.html')}">FAQ</a>
          <a href="${pageUrl('news.html')}">News</a>
          <a href="${pageUrl('book.html#apply')}">Apply as Hologram Fighter</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 ${SITE.name}. All rights reserved.</span>
        <div class="footer-social">${streamIcons}<a href="mailto:${SITE.email}" aria-label="Email">✉️</a></div>
      </div>
    </div>
  `;
}

function initCountdown() {
  document.querySelectorAll('[data-countdown]').forEach((el) => {
    const target = new Date(SITE.nextEventDate).getTime();
    tickCountdown(el, target, SITE.nextEventName);
  });
}

function tickCountdown(el, targetMs, label, onLive) {
  const tick = () => {
    const diff = targetMs - Date.now();
    if (diff <= 0) {
      el.classList.add('is-live');
      if (onLive) onLive(el);
      else el.innerHTML = `<span class="countdown-live">● ${label} — Tickets On Sale!</span>`;
      return;
    }
    el.classList.remove('is-live');
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.innerHTML = `
      <span class="countdown-label">${label}</span>
      <span class="countdown-timer">
        <span><strong>${d}</strong> Days</span>
        <span><strong>${h}</strong> Hrs</span>
        <span><strong>${m}</strong> Min</span>
        <span><strong>${s}</strong> Sec</span>
      </span>
    `;
  };

  tick();
  window.setInterval(tick, 1000);
}

function renderFightCards() {
  document.querySelectorAll('[data-fights-grid]').forEach((container) => {
    if (!SITE.fights.length) return;

    container.innerHTML = SITE.fights.map((fight) => `
      <article class="fight-card" id="${fight.id}" data-fight-date="${fight.fightDate}">
        <div class="fight-card-poster">
          <img src="${pageUrl(fight.poster)}" alt="${fight.fighter1} vs ${fight.fighter2}" loading="lazy">
        </div>
        <div class="fight-card-footer">
          <span class="fight-venue">${fight.venue}</span>
          <span class="fight-matchup">${fight.fighter1} <span>VS</span> ${fight.fighter2}</span>
          <div class="fight-countdown" data-fight-countdown data-fight-date="${fight.fightDate}" data-fight-label="${fight.code}"></div>
          <a href="${pageUrl('book.html')}?fight=${fight.id}" class="fight-ticket-btn btn btn-gold" data-fight-ticket>Buy Ticket — ${SITE.crypto.ticketPriceHeadset} ${SITE.crypto.symbol}</a>
          <a href="${pageUrl(fight.detailsUrl || 'events.html')}" class="fight-cta">View Details</a>
        </div>
      </article>
    `).join('');
  });

  initFightCountdowns();
}

function renderFighterRoster() {
  document.querySelectorAll('[data-fighters-roster]').forEach((container) => {
    if (!SITE.fighters.length) return;

    container.innerHTML = SITE.fighters.map((fighter) => `
      <div class="fighter-card">
        <a href="${pageUrl(`fighters.html#${fighter.id}`)}" class="fighter-card-profile">
          <div class="fighter-avatar"><img src="${pageUrl(fighter.image)}" alt="${fighter.name}" loading="lazy"></div>
          <div class="fighter-name">${fighter.name}</div>
          <div class="fighter-role">${fighter.role}</div>
        </a>
        <div class="fighter-countdown" data-fight-countdown data-fight-date="${fighter.nextFightDate}" data-fight-label="Next Fight"></div>
        <a href="${pageUrl('book.html')}?fighter=${fighter.id}" class="fighter-ticket-btn btn btn-gold" data-fight-ticket hidden>Buy Ticket — ${SITE.crypto.ticketPriceHeadset} ${SITE.crypto.symbol}</a>
      </div>
    `).join('');
  });

  initFightCountdowns();
}

function initFightCountdowns() {
  document.querySelectorAll('[data-fight-countdown]').forEach((el) => {
    if (el.dataset.countdownInit) return;
    el.dataset.countdownInit = '1';

    const targetMs = new Date(el.dataset.fightDate).getTime();
    const label = el.dataset.fightLabel || 'Next Fight';
    const card = el.closest('.fight-card, .fighter-card, .fighter-detail-card');
    const ticketBtn = card?.querySelector('[data-fight-ticket]');

    const onLive = () => {
      el.innerHTML = `<span class="countdown-live">● Tickets On Sale</span>`;
      card?.classList.add('is-live');
      if (ticketBtn) ticketBtn.hidden = false;
    };

    const tick = () => {
      const diff = targetMs - Date.now();
      if (diff <= 0) {
        onLive();
        return;
      }
      card?.classList.remove('is-live');
      if (ticketBtn) ticketBtn.hidden = true;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      el.innerHTML = `
        <span class="countdown-label">${label}</span>
        <span class="countdown-timer fight-countdown-timer">
          <span><strong>${d}</strong>d</span>
          <span><strong>${h}</strong>h</span>
          <span><strong>${m}</strong>m</span>
          <span><strong>${s}</strong>s</span>
        </span>
      `;
    };

    tick();
    window.setInterval(tick, 1000);
  });
}

function initAutoplayVideos() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const videos = document.querySelectorAll('[data-autoplay-video], .hero-video');
  if (!videos.length) return;

  const play = (video) => {
    if (prefersReduced) return;
    video.muted = true;
    video.play().catch(() => {});
  };

  document.querySelector('.hero-video')?.addEventListener('canplay', (e) => play(e.target));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) play(video);
      else video.pause();
    });
  }, { threshold: 0.25 });

  videos.forEach((video) => {
    if (!video.classList.contains('hero-video')) observer.observe(video);
    else play(video);
  });
}

function initVideoPlayer() {
  const playBtn = document.getElementById('play-btn');
  const player = document.getElementById('player');
  const mainVideo = document.getElementById('main-video');
  if (!playBtn || !mainVideo) return;

  const startPlayback = () => {
    player?.classList.add('playing');
    mainVideo.play().catch(() => {});
  };

  playBtn.addEventListener('click', startPlayback);
  mainVideo.addEventListener('play', () => player?.classList.add('playing'));
  mainVideo.addEventListener('pause', () => {
    if (mainVideo.currentTime > 0 && !mainVideo.ended) return;
    player?.classList.remove('playing');
  });
}

function loadEpisodeVideo(src) {
  const mainVideo = document.getElementById('main-video');
  const player = document.getElementById('player');
  if (!mainVideo || !src) return;

  const wasPlaying = !mainVideo.paused;
  mainVideo.pause();
  const type = src.endsWith('.mov') ? 'video/quicktime' : 'video/mp4';
  let source = mainVideo.querySelector('source');
  if (!source) {
    source = document.createElement('source');
    mainVideo.appendChild(source);
  }
  source.src = src;
  source.type = type;
  mainVideo.load();
  player?.classList.remove('playing');
  if (wasPlaying) mainVideo.play().then(() => player?.classList.add('playing')).catch(() => {});
}

function initTicketForm() {
  const form = document.getElementById('ticket-form');
  if (!form) return;

  const fightSelect = form.querySelector('#ticket-fight');
  const fighterSelect = form.querySelector('#ticket-fighter');
  const viewSelect = form.querySelector('#ticket-view');
  const priceEl = form.querySelector('[data-ticket-total]');
  const viewNote = form.querySelector('[data-view-note]');
  const influencerPanel = form.querySelector('[data-influencer-panel]');
  const influencerEnter = form.querySelector('[data-influencer-enter]');
  const attendeeCodePanel = form.querySelector('[data-attendee-code]');
  const influencerInput = form.querySelector('#ticket-influencer-code');
  const influencerApply = form.querySelector('[data-influencer-apply]');
  const influencerStatus = form.querySelector('[data-influencer-status]');
  const attendeeCodeValue = form.querySelector('[data-attendee-code-value]');
  const attendeeCodeInput = form.querySelector('#ticket-attendee-code');
  const attendeeCopyBtn = form.querySelector('[data-attendee-copy]');
  const attendeeCodeStatus = form.querySelector('[data-attendee-code-status]');
  const fightGroup = form.querySelector('[data-fight-group]');
  const fighterGroup = form.querySelector('[data-fighter-group]');
  if (!fightSelect || !fighterSelect || !viewSelect) return;

  const params = new URLSearchParams(window.location.search);
  const preFight = params.get('fight');
  const preFighter = params.get('fighter');
  const preCode = params.get('code');

  let influencerLocked = false;
  let attendeeCode = '';

  const generateAttendeeCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let suffix = '';
    for (let i = 0; i < 6; i += 1) {
      suffix += chars[Math.floor(Math.random() * chars.length)];
    }
    return `ATT-${suffix}`;
  };

  const showAttendeeCodeStatus = (message) => {
    if (!attendeeCodeStatus) return;
    attendeeCodeStatus.hidden = !message;
    attendeeCodeStatus.textContent = message;
  };

  const assignAttendeeCode = () => {
    attendeeCode = generateAttendeeCode();
    if (attendeeCodeValue) attendeeCodeValue.textContent = attendeeCode;
    if (attendeeCodeInput) attendeeCodeInput.value = attendeeCode;
    if (influencerInput) influencerInput.value = '';
    setInfluencerLocked(false);
    showInfluencerStatus('');
    showAttendeeCodeStatus('Your ringside pass is ready. Pick your fight & fighter below, then purchase.');
  };

  const showInfluencerStatus = (message, isError = false) => {
    if (!influencerStatus) return;
    influencerStatus.hidden = !message;
    influencerStatus.textContent = message;
    influencerStatus.className = `influencer-status ${isError ? 'influencer-status--error' : 'influencer-status--success'}`;
  };

  const setInfluencerLocked = (locked) => {
    influencerLocked = locked;
    fightGroup?.classList.toggle('is-influencer-locked', locked);
    fighterGroup?.classList.toggle('is-influencer-locked', locked);
    fightSelect.disabled = locked;
    fighterSelect.disabled = locked;
  };

  const populateFighters = (fightId, fighterName) => {
    const fight = SITE.fights.find((f) => f.id === fightId);
    fighterSelect.innerHTML = '<option value="">Pick your fighter…</option>';
    if (!fight) return;
    [fight.fighter1, fight.fighter2].forEach((name) => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      fighterSelect.appendChild(opt);
    });
    if (fighterName && [fight.fighter1, fight.fighter2].includes(fighterName)) {
      fighterSelect.value = fighterName;
      return;
    }
    if (preFighter && !influencerLocked) {
      const fighter = SITE.fighters.find((f) => f.id === preFighter);
      if (fighter && [fight.fighter1, fight.fighter2].includes(fighter.name)) {
        fighterSelect.value = fighter.name;
      }
    }
  };

  fightSelect.innerHTML = '<option value="">Select fight…</option>';
  SITE.fights.forEach((fight) => {
    const opt = document.createElement('option');
    opt.value = fight.id;
    opt.textContent = `${fight.fighter1} vs ${fight.fighter2}`;
    fightSelect.appendChild(opt);
  });

  const applyInfluencerCode = (rawCode) => {
    const code = String(rawCode || '').trim().toUpperCase();
    if (!code) {
      showInfluencerStatus('Enter a code from your creator or partner.', true);
      return false;
    }

    const match = SITE.influencerCodes.find((entry) => entry.code.toUpperCase() === code);
    if (!match) {
      setInfluencerLocked(false);
      showInfluencerStatus('Code not recognized. Double-check with your influencer and try again.', true);
      return false;
    }

    fightSelect.value = match.fightId;
    populateFighters(match.fightId, match.fighter);
    fighterSelect.value = match.fighter;
    if (influencerInput) influencerInput.value = match.code;
    setInfluencerLocked(true);
    showInfluencerStatus(
      `Locked in with ${match.influencer}! Fight and fighter set to ${match.fighter}. Confirm your wallet and hit purchase.`
    );
    return true;
  };

  if (preFight && SITE.fights.some((f) => f.id === preFight)) {
    fightSelect.value = preFight;
    populateFighters(preFight);
  } else if (preFighter) {
    const fighter = SITE.fighters.find((f) => f.id === preFighter);
    const fight = SITE.fights.find((f) => f.fighter1 === fighter?.name || f.fighter2 === fighter?.name);
    if (fight) {
      fightSelect.value = fight.id;
      populateFighters(fight.id, fighter?.name);
    }
  }

  const toggleInfluencerPanel = () => {
    const view = viewSelect.value;
    const hasView = Boolean(view);
    const isHeadset = view === 'headset';
    const isAttendee = view === 'attendee';

    if (influencerPanel) influencerPanel.hidden = !hasView;
    if (influencerEnter) influencerEnter.hidden = !isHeadset;
    if (attendeeCodePanel) attendeeCodePanel.hidden = !isAttendee;

    if (!hasView) {
      setInfluencerLocked(false);
      showInfluencerStatus('');
      showAttendeeCodeStatus('');
      if (attendeeCodeInput) attendeeCodeInput.value = '';
      if (attendeeCodeValue) attendeeCodeValue.textContent = '—';
      attendeeCode = '';
      return;
    }

    if (isHeadset) {
      if (attendeeCodeInput) attendeeCodeInput.value = '';
      showAttendeeCodeStatus('');
    }

    if (isAttendee) {
      if (influencerInput) influencerInput.value = '';
      showInfluencerStatus('');
      setInfluencerLocked(false);
      if (!attendeeCode) assignAttendeeCode();
    }
  };

  const updatePrice = () => {
    const isAttendee = viewSelect.value === 'attendee';
    const hasView = Boolean(viewSelect.value);
    const price = isAttendee ? SITE.crypto.ticketPriceAttendee : SITE.crypto.ticketPriceHeadset;
    if (priceEl) priceEl.textContent = hasView ? `${price} ${SITE.crypto.symbol}` : '—';
    if (viewNote) viewNote.hidden = !isAttendee;
  };

  fightSelect.addEventListener('change', () => {
    if (influencerLocked) return;
    populateFighters(fightSelect.value);
  });

  viewSelect.addEventListener('change', () => {
    if (viewSelect.value !== 'attendee') attendeeCode = '';
    toggleInfluencerPanel();
    updatePrice();
    if (!viewSelect.value) setInfluencerLocked(false);
  });

  attendeeCopyBtn?.addEventListener('click', async () => {
    if (!attendeeCode) return;
    try {
      await navigator.clipboard.writeText(attendeeCode);
      showAttendeeCodeStatus('Code copied! Save it before you purchase.');
    } catch {
      showAttendeeCodeStatus(`Your code: ${attendeeCode}`);
    }
  });

  influencerApply?.addEventListener('click', () => applyInfluencerCode(influencerInput?.value));

  influencerInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyInfluencerCode(influencerInput.value);
    }
  });

  influencerInput?.addEventListener('input', () => {
    if (influencerLocked) setInfluencerLocked(false);
    showInfluencerStatus('');
  });

  form.addEventListener('submit', () => {
    fightSelect.disabled = false;
    fighterSelect.disabled = false;
  }, { capture: true });

  toggleInfluencerPanel();
  updatePrice();

  if (preCode) {
    if (!viewSelect.value) viewSelect.value = 'headset';
    toggleInfluencerPanel();
    updatePrice();
    if (influencerInput) influencerInput.value = preCode;
    applyInfluencerCode(preCode);
  }
}

function splitFullName(fullName) {
  const parts = String(fullName || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return { firstName: '', lastName: '' };
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

function buildGoHighLevelPayload(formKey, data, formLabel) {
  const { firstName, lastName } = splitFullName(data.name);
  const payload = {
    first_name: firstName,
    last_name: lastName,
    name: data.name || '',
    email: data.email || '',
    source: SITE.name,
    form_name: formLabel,
    form_type: formKey,
    page_url: window.location.href,
    submitted_at: new Date().toISOString(),
    tags: [`website-${formKey}`],
  };

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'name' || key === 'email') return;
    payload[key] = value || '';
  });

  return payload;
}

async function submitToGoHighLevel(formKey, data, formLabel) {
  const ghl = SITE.goHighLevel;
  if (!ghl?.enabled) return;

  const webhookUrl = ghl.webhooks?.[formKey];
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildGoHighLevelPayload(formKey, data, formLabel)),
        keepalive: true,
      });
    } catch {
      /* webhook is best-effort */
    }
  }

  if (ghl.useApi === false) return;

  try {
    await fetch(ghl.apiEndpoint || '/api/ghl-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formKey,
        formLabel,
        data,
        pageUrl: window.location.href,
      }),
      keepalive: true,
    });
  } catch {
    /* API route is best-effort; mailto fallback remains available */
  }
}

function initGoHighLevel() {
  const ghl = SITE.goHighLevel;
  if (!ghl?.enabled) return;

  if (ghl.trackingId && ghl.trackingScriptUrl && !document.querySelector('[data-ghl-tracking]')) {
    const tracking = document.createElement('script');
    tracking.src = ghl.trackingScriptUrl;
    tracking.dataset.trackingId = ghl.trackingId;
    tracking.dataset.ghlTracking = '1';
    document.body.appendChild(tracking);
  }

  if (ghl.chatWidgetId && !document.querySelector('[data-ghl-chat]')) {
    const chat = document.createElement('script');
    chat.src = 'https://widgets.leadconnectorhq.com/loader.js';
    chat.dataset.resourcesUrl = 'https://widgets.leadconnectorhq.com';
    chat.dataset.widgetId = ghl.chatWidgetId;
    chat.dataset.ghlChat = '1';
    document.body.appendChild(chat);
  }
}

function initFormSubmit(formId, storageKey, successId, mailtoPrefix, ghlFormKey) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    localStorage.setItem(storageKey, JSON.stringify({ ...data, submittedAt: new Date().toISOString() }));

    if (ghlFormKey) {
      await submitToGoHighLevel(ghlFormKey, data, mailtoPrefix);
    }

    const lines = Object.entries(data).map(([k, v]) => `${k}: ${v || 'N/A'}`).join('\n');
    const subject = encodeURIComponent(`${SITE.name} — ${mailtoPrefix}`);
    const body = encodeURIComponent(`${mailtoPrefix}\n\n${lines}`);

    form.classList.add('hidden');
    document.getElementById(successId)?.classList.add('show');

    const mailtoBtn = document.getElementById(successId)?.querySelector('[data-form-mailto]');
    if (mailtoBtn) {
      mailtoBtn.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    }
  });
}

function initFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('.faq-question');
    btn?.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((i) => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
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
      document.getElementById('now-playing').textContent = card.dataset.title || '';
      document.getElementById('now-desc').textContent = card.dataset.desc || '';
      loadEpisodeVideo(card.dataset.video);
      document.getElementById('player')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    card.addEventListener('click', activate);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
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
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'link');
  });
}

function initHashNavigation() {
  const hash = window.location.hash.slice(1);
  if (!hash) return;
  const el = document.getElementById(hash);
  if (!el || el.closest('.episode-list')) return;
  window.setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
}

function initFeatureLinks() {
  document.querySelectorAll('[data-feature-link]').forEach((item) => {
    item.addEventListener('click', () => {
      window.location.href = pageUrl(item.dataset.featureLink || 'book.html');
    });
    item.style.cursor = 'pointer';
  });
}

function initSocialMarquee() {
  const track = document.querySelector('[data-social-marquee]');
  if (!track || track.dataset.marqueeReady) return;
  track.dataset.marqueeReady = 'true';
  track.innerHTML += track.innerHTML;
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.card, .fighter-card, .fight-card, .social-post:not(.social-marquee-post), .feature-item, .step-card, .gallery-item, .faq-item').forEach((el) => {
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
  initNav();
  initBranding();
  initInternalLinks();
  upgradeMiniFooter();
  upgradeFullFooter();
  initCookieBanner();
  initGoHighLevel();
  initSocialMarquee();
  initSocialLinks();
  initHeroWatchDropdown();
  initCountdown();
  renderFightCards();
  renderFighterRoster();
  initFightCountdowns();
  initAutoplayVideos();
  initVideoPlayer();
  initTicketForm();
  initFormSubmit('ticket-form', 'creatorsai_ticket', 'ticket-success', 'Ticket Purchase', 'ticket');
  initFormSubmit('booking-form', 'creatorsai_booking', 'form-success', 'Booking Request', 'booking');
  initFormSubmit('fighter-form', 'creatorsai_fighter_apply', 'fighter-success', 'Fighter Application', 'fighter');
  initFaqAccordion();
  initEpisodeList();
  initLinkedCards();
  initFeatureLinks();
  initHashNavigation();
  initReveal();
});

window.CreatorsAI = { getConfig: () => SITE, pageUrl };
