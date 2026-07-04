/**
 * Hologram Boxing — advanced TikTok + Meta analytics
 * Loads pixels, captures UTMs, queues events, tracks conversions site-wide.
 */
(function (global) {
  const STORAGE_KEY = 'hb_attribution';
  const QUEUE_KEY = 'hb_analytics_queue';
  const CHECKOUT_KEY = 'hb_checkout_started';

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

  function queueEvent(platform, method, args) {
    const q = JSON.parse(sessionStorage.getItem(QUEUE_KEY) || '[]');
    q.push({ platform, method, args, ts: Date.now() });
    sessionStorage.setItem(QUEUE_KEY, JSON.stringify(q.slice(-50)));
  }

  function flushQueue() {
    const q = JSON.parse(sessionStorage.getItem(QUEUE_KEY) || '[]');
    q.forEach((item) => {
      if (item.platform === 'tiktok' && global.ttq) global.ttq.track(...item.args);
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

  function trackTikTok(eventName, payload) {
    const data = enrichPayload(payload);
    if (global.ttq) {
      global.ttq.track(eventName, data);
      log('TikTok', eventName, data);
    } else {
      queueEvent('tiktok', 'track', [eventName, data]);
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

  function identify(email, phone) {
    if (!email && !phone) return;
    const payload = {};
    if (email) payload.email = String(email).trim().toLowerCase();
    if (phone) payload.phone_number = String(phone).trim();
    if (global.ttq?.identify) {
      global.ttq.identify(payload);
      log('TikTok identify', payload.email ? '(email set)' : '');
    }
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
    if (sessionStorage.getItem(CHECKOUT_KEY)) return;
    sessionStorage.setItem(CHECKOUT_KEY, '1');
    track('InitiateCheckout', {
      event_source: 'ticket_form',
      currency: getSite().crypto?.symbol || 'MVM',
      ...extra,
    });
  }

  function trackAddToCart(value, extra) {
    track('AddToCart', {
      event_source: 'ticket_form',
      currency: getSite().crypto?.symbol || 'MVM',
      value,
      ...extra,
    });
  }

  function trackAddPaymentInfo(extra) {
    track('AddPaymentInfo', {
      event_source: 'ticket_form',
      currency: getSite().crypto?.symbol || 'MVM',
      ...extra,
    });
  }

  function trackSubmitForm(formName, extra) {
    track('SubmitForm', {
      event_source: 'form',
      form_name: formName,
      ...extra,
    });
  }

  function trackCompleteRegistration(formName, email, extra) {
    identify(email);
    track('CompleteRegistration', {
      event_source: 'form',
      form_name: formName,
      ...extra,
    }, 'CompleteRegistration');
  }

  function trackLead(formName, email, extra) {
    identify(email);
    track('Lead', {
      event_source: 'form',
      form_name: formName,
      ...extra,
    }, 'Lead');
  }

  function trackPurchase(value, extra) {
    track('Purchase', {
      event_source: 'ticket_form',
      currency: getSite().crypto?.symbol || 'MVM',
      value,
      ...extra,
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
        if (email && email.includes('@')) identify(email);
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
    bindTicketFormTracking();
    bindGenericFormTracking('booking-form', 'Booking Request');
    bindGenericFormTracking('fighter-form', 'Fighter Application');
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
  };

  onDomReady(() => {
    const isLanding = global.location.pathname.includes('landing');
    initPixels({ skipCookieCheck: isLanding });
    initAdvancedBindings();
  });
})(window);
