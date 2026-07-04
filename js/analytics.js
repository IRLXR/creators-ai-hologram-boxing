/**
 * Hologram Boxing — advanced TikTok + Meta analytics
 * Loads pixels, captures UTMs, queues events, tracks conversions site-wide.
 */
(function (global) {
  const STORAGE_KEY = 'hb_attribution';
  const QUEUE_KEY = 'hb_analytics_queue';
  const CHECKOUT_KEY = 'hb_checkout_started';
  const VISITOR_ID_KEY = 'hb_visitor_id';

  function getConfig() {
    return global.SITE_CONFIG?.socialAds || {};
  }

  function getSite() {
    return global.SITE_CONFIG || {};
  }

  function isDebug() {
    return new URLSearchParams(global.location.search).has('analytics_debug');
  }

  function log(...args) {
    if (isDebug()) console.log('[HBAnalytics]', ...args);
  }

  function cookiesAllowed() {
    const v = localStorage.getItem('cookiesAccepted');
    return v !== 'essential';
  }

  function pageMeta() {
    const path = global.location.pathname.replace(/^\//, '') || 'index.html';
    const name = path.split('/').pop().replace('.html', '') || 'home';
    return {
      page_path: global.location.pathname,
      page_url: global.location.href,
      page_title: document.title,
      content_id: name,
      content_type: 'product',
      content_name: getSite().siteName || 'Creators AI Hologram Boxing',
    };
  }

  function captureAttribution() {
    const params = new URLSearchParams(global.location.search);
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'ttclid', 'fbclid'];
    const incoming = {};
    keys.forEach((k) => {
      if (params.get(k)) incoming[k] = params.get(k);
    });
    if (!Object.keys(incoming).length) return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
    const merged = { ...JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}'), ...incoming, captured_at: Date.now() };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  }

  function getAttribution() {
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  }

  function enrichPayload(payload) {
    return {
      ...pageMeta(),
      ...getAttribution(),
      ...(payload || {}),
    };
  }

  function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
  }

  function normalizePhone(phone) {
    const digits = String(phone || '').replace(/\D/g, '');
    if (!digits) return '';
    if (digits.length === 10) return `+1${digits}`;
    if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
    return `+${digits}`;
  }

  async function sha256(value) {
    if (!value) return '';
    if (!global.crypto?.subtle) return value;
    const encoded = new TextEncoder().encode(value);
    const digest = await global.crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  function eventId(eventName) {
    return `${Date.now()}_${eventName}_${Math.random().toString(36).slice(2, 10)}`;
  }

  function siteBrand() {
    return getSite().siteName || 'Creators AI Hologram Boxing';
  }

  /** TikTok requires ISO 4217 currency codes (USD), not crypto symbols (MVM). */
  function tiktokCurrency() {
    return getConfig().tiktokCurrency || 'USD';
  }

  function ticketUsdValue(kind) {
    const site = getSite();
    const base = Number(site.admissionPrice) || 20;
    if (kind === 'attendee') {
      return Number(getConfig().tiktokAttendeeUsd) || Math.round(base * 1.75);
    }
    return Number(getConfig().tiktokTicketUsd) || base;
  }

  function resolveTikTokValue(opts, item) {
    if (opts.value != null && opts.value !== '') return Number(opts.value);
    if (item?.price != null) return Number(item.price);
    if (opts.content_category === 'waitlist' || opts.form_key === 'waitlist') return 0;
    if (opts.event_source === 'page_view' || opts.event_source === 'click' || opts.event_source === 'video') return 0;
    if (opts.content_id === 'attendee' || opts.content_id === 'headset') return ticketUsdValue(opts.content_id);
    return 0;
  }

  function buildContentItem(extra) {
    const meta = pageMeta();
    const opts = extra || {};
    const price = typeof opts.price === 'number'
      ? opts.price
      : (typeof opts.value === 'number' ? opts.value : undefined);
    return {
      content_id: opts.content_id || meta.content_id,
      content_type: opts.content_type || 'product',
      content_name: opts.content_name || opts.form_name || opts.button_text || meta.content_name,
      content_category: opts.content_category || opts.content_id || meta.content_id,
      ...(price !== undefined ? { price } : {}),
      num_items: opts.num_items || 1,
      brand: opts.brand || siteBrand(),
    };
  }

  function getVisitorId() {
    let id = sessionStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = `hb_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
      sessionStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  }

  function buildTikTokPayload(extra) {
    const opts = extra || {};
    const item = buildContentItem(opts);
    const attr = getAttribution();
    const payload = {
      contents: [item],
      currency: opts.currency || tiktokCurrency(),
      value: resolveTikTokValue(opts, item),
      description: opts.description || opts.button_text || opts.form_name || opts.event_source || item.content_name,
      status: opts.status || (opts.event_source === 'page_view' ? 'viewed' : 'submitted'),
      page_path: pageMeta().page_path,
      page_url: pageMeta().page_url,
      utm_source: attr.utm_source,
      utm_medium: attr.utm_medium,
      utm_campaign: attr.utm_campaign,
      utm_content: attr.utm_content,
      ttclid: attr.ttclid,
    };
    if (opts.search_string || attr.utm_term) payload.search_string = opts.search_string || attr.utm_term;
    return payload;
  }

  function queueTikTokCall(method, args) {
    const q = JSON.parse(sessionStorage.getItem(QUEUE_KEY) || '[]');
    q.push({ platform: 'tiktok', method, args, ts: Date.now() });
    sessionStorage.setItem(QUEUE_KEY, JSON.stringify(q.slice(-50)));
  }

  function queueEvent(platform, method, args) {
    if (platform === 'tiktok') {
      queueTikTokCall(method, args);
      return;
    }
    const q = JSON.parse(sessionStorage.getItem(QUEUE_KEY) || '[]');
    q.push({ platform, method, args, ts: Date.now() });
    sessionStorage.setItem(QUEUE_KEY, JSON.stringify(q.slice(-50)));
  }

  function flushQueue() {
    const q = JSON.parse(sessionStorage.getItem(QUEUE_KEY) || '[]');
    q.forEach((item) => {
      if (item.platform === 'tiktok' && global.ttq) {
        if (item.method === 'identify') global.ttq.identify(item.args[0]);
        else global.ttq.track(...item.args);
      }
      if (item.platform === 'meta' && global.fbq) global.fbq('track', ...item.args);
    });
    sessionStorage.removeItem(QUEUE_KEY);
  }

  function loadMetaPixel(pixelId) {
    if (!pixelId || document.querySelector('[data-meta-pixel]')) return;
    const script = document.createElement('script');
    script.dataset.metaPixel = '1';
    script.textContent = `
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
    log('Meta pixel loaded', pixelId);
  }

  function loadTikTokPixel(pixelId) {
    if (!pixelId || document.querySelector('[data-tiktok-pixel]')) return;
    const script = document.createElement('script');
    script.dataset.tiktokPixel = '1';
    script.textContent = `
      !function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
        var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
        ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
        ttq.load('${pixelId}');
        ttq.grantConsent();
        ttq.page();
      }(window, document, 'ttq');
    `;
    document.head.appendChild(script);
    log('TikTok pixel loaded', pixelId);
  }

  function initPixels(options) {
    const { skipCookieCheck = false } = options || {};
    if (!skipCookieCheck && !cookiesAllowed()) return;

    const { metaPixelId, tiktokPixelId } = getConfig();
    if (metaPixelId) loadMetaPixel(metaPixelId);
    if (tiktokPixelId) loadTikTokPixel(tiktokPixelId);

    global.setTimeout(flushQueue, 1500);
  }

  function trackTikTok(eventName, payload, options) {
    const data = buildTikTokPayload(payload);
    const tiktokOptions = { event_id: options?.event_id || eventId(eventName) };
    if (global.ttq) {
      global.ttq.track(eventName, data, tiktokOptions);
      log('TikTok', eventName, data, tiktokOptions);
    } else {
      queueTikTokCall('track', [eventName, data, tiktokOptions]);
    }
  }

  function trackMeta(eventName, payload) {
    const data = enrichPayload(payload);
    if (global.fbq) {
      global.fbq('track', eventName, data);
      log('Meta', eventName, data);
    } else if (eventName !== 'PageView') {
      queueEvent('meta', 'track', [eventName, data]);
    }
  }

  function track(eventName, payload, metaEventName) {
    trackTikTok(eventName, payload);
    trackMeta(metaEventName || eventName, payload);
  }

  async function identify(email, phone, externalId) {
    const payload = {};

    if (email) {
      const normalized = normalizeEmail(email);
      if (normalized.includes('@')) payload.email = await sha256(normalized);
    }
    if (phone) {
      const normalized = normalizePhone(phone).replace(/^\+/, '');
      if (normalized) payload.phone_number = await sha256(normalized);
    }

    payload.external_id = await sha256(String(externalId || getVisitorId()));

    if (global.ttq?.identify) {
      global.ttq.identify(payload);
      log('TikTok identify', payload.email ? '(hashed email)' : '(hashed external_id)');
    } else {
      queueTikTokCall('identify', [payload]);
    }

    return payload;
  }

  function trackPageView() {
    track('PageView', { event_source: 'page_load' });
  }

  function trackViewContent(extra) {
    track('ViewContent', {
      event_source: 'page_view',
      ...extra,
    });
  }

  function trackClickButton(label, extra) {
    track('ClickButton', {
      event_source: 'click',
      description: label,
      button_text: label,
      ...extra,
    });
  }

  function trackInitiateCheckout(extra) {
    const opts = extra || {};
    const sessionKey = opts.content_category === 'waitlist' ? 'hb_waitlist_checkout' : CHECKOUT_KEY;
    if (sessionStorage.getItem(sessionKey)) return;
    sessionStorage.setItem(sessionKey, '1');
    track('InitiateCheckout', {
      ...opts,
      event_source: opts.content_category === 'waitlist' ? 'waitlist' : 'ticket_form',
      currency: tiktokCurrency(),
      value: opts.value ?? (opts.content_category === 'waitlist' ? 0 : ticketUsdValue(opts.content_id || 'headset')),
    });
  }

  function trackAddToCart(value, extra) {
    const opts = extra || {};
    const usdValue = typeof value === 'number' && value > 50 ? ticketUsdValue(opts.content_id || 'headset') : Number(value);
    track('AddToCart', {
      ...opts,
      event_source: 'ticket_form',
      currency: tiktokCurrency(),
      value: usdValue,
      price: usdValue,
    });
  }

  function trackAddPaymentInfo(extra) {
    const opts = extra || {};
    track('AddPaymentInfo', {
      ...opts,
      event_source: 'ticket_form',
      currency: tiktokCurrency(),
      value: ticketUsdValue(opts.content_id || 'headset'),
    });
  }

  function trackSubmitForm(formName, extra) {
    track('SubmitForm', {
      event_source: 'form',
      form_name: formName,
      ...extra,
    });
  }

  async function trackCompleteRegistration(formName, email, extra) {
    await identify(email);
    track('CompleteRegistration', {
      event_source: 'form',
      form_name: formName,
      content_name: formName,
      content_category: extra?.form_key || 'registration',
      value: extra?.value ?? 0,
      status: 'submitted',
      ...extra,
    }, 'CompleteRegistration');
  }

  async function trackLead(formName, email, extra) {
    await identify(email);
    track('Lead', {
      event_source: 'form',
      form_name: formName,
      content_name: formName,
      content_category: extra?.form_key || 'lead',
      value: extra?.value ?? 0,
      status: 'submitted',
      ...extra,
    }, 'Lead');
  }

  function trackPurchase(value, extra) {
    const opts = extra || {};
    const usdValue = typeof value === 'number' && value > 50
      ? ticketUsdValue(opts.content_id || (opts.content_name?.includes('Attendee') ? 'attendee' : 'headset'))
      : Number(value) || ticketUsdValue('headset');
    track('Purchase', {
      ...opts,
      event_source: 'ticket_form',
      currency: tiktokCurrency(),
      value: usdValue,
      price: usdValue,
    }, 'Purchase');
  }

  function trackContact(method) {
    track('Contact', {
      event_source: 'click',
      contact_method: method,
    }, 'Contact');
  }

  function trackWatchVideo(title, milestone) {
    track('WatchVideo', {
      event_source: 'video',
      content_name: title || 'hero_video',
      description: milestone,
    });
  }

  function pageViewContentMap() {
    const path = global.location.pathname;
    if (path.includes('landing')) {
      trackViewContent({ content_category: 'waitlist', content_id: 'landing' });
    } else if (path.includes('book')) {
      trackViewContent({ content_category: 'tickets', content_id: 'book' });
    } else if (path.includes('watch')) {
      trackViewContent({ content_category: 'vod', content_id: 'watch' });
    } else if (path.includes('fighters')) {
      trackViewContent({ content_category: 'roster', content_id: 'fighters' });
    } else if (path.includes('events')) {
      trackViewContent({ content_category: 'events', content_id: 'events' });
    } else if (path.includes('gallery')) {
      trackViewContent({ content_category: 'gallery', content_id: 'gallery' });
    } else if (path.includes('about')) {
      trackViewContent({ content_category: 'about', content_id: 'about' });
    } else if (path.includes('faq')) {
      trackViewContent({ content_category: 'faq', content_id: 'faq' });
    } else if (path.includes('news') || path.includes('blog')) {
      trackViewContent({ content_category: 'news', content_id: 'news' });
    } else if (path.endsWith('/') || path.includes('index')) {
      trackViewContent({ content_category: 'home', content_id: 'home' });
    }
  }

  function bindClickTracking() {
    const selectors = [
      '.nav-cta',
      '.btn-gold',
      '.btn-primary',
      '.lp-email-btn',
      '.lp-scene2-cta',
      '[data-fight-ticket]',
      '[data-analytics-click]',
    ].join(',');

    document.addEventListener('click', (e) => {
      const el = e.target.closest(selectors);
      if (!el || el.tagName === 'INPUT') return;
      const label = el.dataset.analyticsLabel || el.textContent?.trim().slice(0, 80) || el.getAttribute('aria-label') || 'button';
      trackClickButton(label, {
        content_category: el.dataset.analyticsCategory || 'cta',
        link_url: el.href || undefined,
      });
    }, true);

    document.addEventListener('click', (e) => {
      const el = e.target.closest('[data-email], a[href^="mailto:"]');
      if (!el) return;
      trackContact('email');
    }, true);
  }

  function bindVideoTracking() {
    const tracked = new WeakSet();
    document.querySelectorAll('video').forEach((video) => {
      if (tracked.has(video)) return;
      tracked.add(video);
      const title = video.getAttribute('aria-label') || video.closest('section')?.getAttribute('aria-label') || 'site_video';
      const milestones = new Set();
      video.addEventListener('play', () => {
        if (!milestones.has('start')) {
          milestones.add('start');
          trackWatchVideo(title, 'start');
        }
      });
      video.addEventListener('timeupdate', () => {
        if (!video.duration) return;
        const pct = video.currentTime / video.duration;
        ['25', '50', '75'].forEach((m) => {
          const threshold = Number(m) / 100;
          if (pct >= threshold && !milestones.has(m)) {
            milestones.add(m);
            trackWatchVideo(title, `${m}_percent`);
          }
        });
      });
    });
  }

  function bindEmailIdentify() {
    document.querySelectorAll('input[type="email"][name="email"], #prelaunch-email, #ticket-email, #fighter-email').forEach((input) => {
      input.addEventListener('blur', () => {
        const email = input.value.trim();
        if (email && email.includes('@')) identify(email).catch(() => {});
      });
    });
  }

  function bindGenericFormTracking(formId, formName) {
    const form = document.getElementById(formId);
    if (!form || form.dataset.analyticsBound) return;
    form.dataset.analyticsBound = '1';

    form.addEventListener('focusin', () => {
      trackViewContent({ event_source: 'form_focus', form_name: formName, content_category: 'form' });
    }, { once: true });
  }

  function bindWaitlistFormTracking() {
    const form = document.getElementById('prelaunch-form');
    const emailInput = document.getElementById('prelaunch-email');
    if (!form || form.dataset.analyticsBound) return;
    form.dataset.analyticsBound = '1';

    emailInput?.addEventListener('focus', () => {
      trackInitiateCheckout({
        step: 'waitlist_email_focus',
        content_category: 'waitlist',
        content_id: 'waitlist',
        value: 0,
      });
    }, { once: true });
  }

  function bindTicketFormTracking() {
    const form = document.getElementById('ticket-form');
    if (!form) return;

    const viewSelect = form.querySelector('#ticket-view');
    const wallet = form.querySelector('#ticket-wallet');
    let checkoutStarted = false;

    const startCheckout = (extra) => {
      if (checkoutStarted) return;
      checkoutStarted = true;
      trackInitiateCheckout(extra);
    };

    form.addEventListener('focusin', () => startCheckout({ step: 'form_focus' }), { once: true });
    viewSelect?.addEventListener('change', () => {
      startCheckout({ step: 'view_selected' });
      const isAttendee = viewSelect.value === 'attendee';
      const site = getSite();
      const value = isAttendee ? site.crypto?.ticketPriceAttendee : site.crypto?.ticketPriceHeadset;
      trackAddToCart(value, {
        content_name: isAttendee ? 'Attendee POV Ticket' : 'Headset POV Ticket',
        content_id: viewSelect.value,
        value: isAttendee ? ticketUsdValue('attendee') : ticketUsdValue('headset'),
        price: isAttendee ? ticketUsdValue('attendee') : ticketUsdValue('headset'),
      });
    });
    wallet?.addEventListener('blur', () => {
      if (wallet.value.trim().length > 8) {
        trackAddPaymentInfo({ step: 'wallet_entered' });
      }
    });
  }

  function initAdvancedBindings() {
    pageViewContentMap();
    bindClickTracking();
    bindVideoTracking();
    bindEmailIdentify();
    bindWaitlistFormTracking();
    bindTicketFormTracking();
    bindGenericFormTracking('booking-form', 'Booking Request');
    bindGenericFormTracking('fighter-form', 'Fighter Application');
  }

  function isLandingPage() {
    return /landing/i.test(global.location.pathname);
  }

  function onDomReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  captureAttribution();

  global.HBAnalytics = {
    initPixels,
    enableAnalytics: () => initPixels(),
    track,
    trackTikTok,
    trackMeta,
    identify,
    trackPageView,
    trackViewContent,
    trackClickButton,
    trackInitiateCheckout,
    trackAddToCart,
    trackAddPaymentInfo,
    trackSubmitForm,
    trackCompleteRegistration,
    trackLead,
    trackPurchase,
    trackContact,
    trackWatchVideo,
    getAttribution,
    isDebug,
    ticketUsdValue,
    tiktokCurrency,
  };

  // Ad landing pages: load TikTok pixel immediately (no cookie banner delay)
  if (isLandingPage()) {
    initPixels({ skipCookieCheck: true });
  }

  onDomReady(() => {
    if (!isLandingPage()) {
      initPixels({ skipCookieCheck: false });
    }
    initAdvancedBindings();
  });
})(window);
