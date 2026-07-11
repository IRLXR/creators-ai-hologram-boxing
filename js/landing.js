/* Landing page — waitlist, countdown, scene 2 scroll experience */

(function () {
  const config = window.SITE_CONFIG || {};
  const ghl = config.goHighLevel || {};
  const launchDate = config.launchDate || config.nextEventDate || '2026-08-15T18:00:00';
  const eventName = config.nextEventName || 'Hologram Boxing';

  function $(id) {
    return document.getElementById(id);
  }

  function analytics() {
    return window.HBAnalytics;
  }

  function ghlApiEndpoint() {
    // scripts/dev-server.py proxies /api/* to production on localhost.
    return ghl.apiEndpoint || '/api/ghl-submit';
  }

  function isDevHost() {
    const host = window.location.hostname;
    return host === 'localhost' || host === '127.0.0.1';
  }

  async function submitToGhl(formKey, formLabel, data, tracking) {
    if (!ghl.enabled) return { ok: true };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const endpoint = ghlApiEndpoint();
      if (isDevHost()) console.log('[ghl]', formKey, endpoint, data);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          formKey,
          formLabel,
          data,
          pageUrl: window.location.href,
          tracking: tracking || undefined,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.error || 'Could not save your submission');
      }
      if (isDevHost()) console.log('[ghl] saved', body);
      return body;
    } finally {
      clearTimeout(timeout);
    }
  }

  async function submitWaitlist(email, tracking) {
    return submitToGhl('waitlist', 'Founding Fan Waitlist', { email }, tracking);
  }

  function isInfluencerTraffic() {
    const params = new URLSearchParams(window.location.search);
    const campaign = (params.get('utm_campaign') || '').toLowerCase();
    if (campaign.includes('influencer')) return true;
    if (window.location.hash === '#creators' || window.location.hash === '#creator-partner') return true;
    return false;
  }

  const HERO_COPY = {
    creator: {
      kicker: 'OPEN CALL — STREAMERS & CREATORS',
      title: 'WE WANT YOU TO CO-STREAM HOLOGRAM BOXING 002.',
      lead: 'Apply for partner slots — live tent access, interactive FX for your chat, and VIP ringside.',
    },
    fan: {
      kicker: '⚡ A NEW ERA BEGINS',
      title: "THE WORLD'S FIRST LIVE AI HOLOGRAM BOXING EXPERIENCE IS COMING.",
      lead: 'Step Inside. Gear Up. Witness History.',
    },
  };

  function setLandingMode(mode) {
    const isCreator = mode === 'creator';
    document.body.classList.toggle('lp-mode-creator', isCreator);
    document.body.classList.toggle('lp-mode-fan', !isCreator);

    const creatorWrap = $('creator-partner-signup');
    const fanWrap = $('founding-fan-signup');
    const creatorTab = $('lp-path-creator');
    const fanTab = $('lp-path-fan');
    const copy = isCreator ? HERO_COPY.creator : HERO_COPY.fan;

    $('lp-kicker-secondary').textContent = copy.kicker;
    $('lp-hero-title').textContent = copy.title;
    $('lp-hero-lead').textContent = copy.lead;

    if (creatorWrap) {
      creatorWrap.hidden = !isCreator;
      creatorWrap.setAttribute('aria-hidden', isCreator ? 'false' : 'true');
    }
    if (fanWrap) {
      fanWrap.hidden = isCreator;
      fanWrap.setAttribute('aria-hidden', isCreator ? 'true' : 'false');
    }
    if (creatorTab) {
      creatorTab.classList.toggle('is-active', isCreator);
      creatorTab.setAttribute('aria-selected', isCreator ? 'true' : 'false');
    }
    if (fanTab) {
      fanTab.classList.toggle('is-active', !isCreator);
      fanTab.setAttribute('aria-selected', !isCreator ? 'true' : 'false');
    }
  }

  function showFormSuccess(form, success, wrap) {
    const signup = wrap;
    signup?.classList.add('is-complete');
    if (form) {
      form.hidden = true;
      form.setAttribute('aria-hidden', 'true');
    }
    if (success) {
      success.hidden = false;
      success.removeAttribute('hidden');
      success.setAttribute('aria-hidden', 'false');
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function showWaitlistSuccess(form, success, successVideo, wrap) {
    const signup = wrap || document.getElementById('founding-fan-signup');
    signup?.classList.add('is-complete');
    if (form) {
      form.hidden = true;
      form.setAttribute('aria-hidden', 'true');
    }
    if (success) {
      success.hidden = false;
      success.removeAttribute('hidden');
      success.setAttribute('aria-hidden', 'false');
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      if (successVideo) {
        successVideo.muted = true;
        successVideo.play().catch(() => {});
      }
    }
  }

  function resetWaitlistUi(form, success, submitBtn, wrap) {
    const signup = wrap || document.getElementById('founding-fan-signup');
    signup?.classList.remove('is-complete');
    if (form) {
      form.hidden = false;
      form.removeAttribute('hidden');
      form.setAttribute('aria-hidden', 'false');
    }
    if (success) {
      success.hidden = true;
      success.setAttribute('hidden', '');
      success.setAttribute('aria-hidden', 'true');
    }
    resetWaitlistSubmit(submitBtn);
  }

  function resetWaitlistSubmit(submitBtn) {
    if (!submitBtn) return;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Become a Founding Fan';
  }

  function trackWaitlistConversion(email, eventIds) {
    analytics()?.trackWaitlistConversion(email, eventIds).catch(() => {});
  }

  function initCountdown() {
    const el = $('lp-countdown');
    if (!el) return;

    const targetMs = new Date(launchDate).getTime();

    const tick = () => {
      const diff = targetMs - Date.now();
      if (diff <= 0) {
        el.classList.add('is-live');
        el.innerHTML = `<span class="lp-countdown-live">● ${eventName} — We're Live!</span>`;
        return;
      }

      el.classList.remove('is-live');
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      el.innerHTML = `
        <span class="lp-countdown-label">Launch Countdown — ${eventName}</span>
        <div class="lp-countdown-grid">
          <div class="lp-countdown-unit"><strong>${d}</strong><span>Days</span></div>
          <div class="lp-countdown-unit"><strong>${h}</strong><span>Hours</span></div>
          <div class="lp-countdown-unit"><strong>${m}</strong><span>Min</span></div>
          <div class="lp-countdown-unit"><strong>${s}</strong><span>Sec</span></div>
        </div>
      `;
    };

    tick();
    window.setInterval(tick, 1000);
  }

  function initPathToggle() {
    $('lp-path-creator')?.addEventListener('click', () => setLandingMode('creator'));
    $('lp-path-fan')?.addEventListener('click', () => setLandingMode('fan'));
    setLandingMode(isInfluencerTraffic() ? 'creator' : 'fan');
  }

  function initCreatorPartnerForm() {
    const form = $('creator-partner-form');
    const hint = $('creator-partner-form-hint');
    const success = $('creator-partner-success');
    const submitBtn = $('creator-partner-submit');
    const wrap = $('creator-partner-signup');
    let submitting = false;
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (submitting) return;

      const name = $('creator-name')?.value.trim() || '';
      const email = $('creator-email')?.value.trim() || '';
      const channelUrl = $('creator-channel')?.value.trim() || '';
      const platform = $('creator-platform')?.value.trim() || '';

      if (!name) {
        if (hint) hint.textContent = 'Please enter your name.';
        return;
      }
      if (!email || !email.includes('@')) {
        if (hint) hint.textContent = 'Please enter a valid email.';
        return;
      }
      if (!channelUrl) {
        if (hint) hint.textContent = 'Please paste your channel or profile link.';
        return;
      }

      submitting = true;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting…';
      }
      if (hint) hint.textContent = '';

      analytics()?.trackSubmitForm('Creator Partner Application', { form_key: 'creator_partner' });

      const eventIds = analytics()?.makeWaitlistEventIds?.() || {};
      const tracking = analytics()?.getServerTrackingPayload?.(eventIds) || { event_ids: eventIds };

      try {
        await submitToGhl('creator_partner', 'Creator Partner Application', {
          name,
          email,
          channelUrl,
          platform,
        }, tracking);
        showFormSuccess(form, success, wrap);
        analytics()?.trackLead('Creator Partner Application', email, {
          form_key: 'creator_partner',
          event_id: eventIds.Lead,
        }).catch(() => {});
      } catch (err) {
        const message = err.name === 'AbortError'
          ? 'Request timed out. Please try again.'
          : (err.message || 'Something went wrong. Please try again.');
        if (hint) hint.textContent = message;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Apply as Creator Partner';
        }
        wrap?.classList.remove('is-complete');
        form.hidden = false;
        form.removeAttribute('hidden');
      } finally {
        submitting = false;
      }
    });
  }

  function initWaitlistForm() {
    const form = $('prelaunch-form');
    const emailInput = $('prelaunch-email');
    const hint = $('prelaunch-form-hint');
    const success = $('prelaunch-success');
    const successVideo = $('prelaunch-success-video');
    const submitBtn = $('prelaunch-submit');
    const wrap = $('founding-fan-signup');
    let submitting = false;
    if (!form || !emailInput) return;

    emailInput.addEventListener('blur', () => {
      const email = emailInput.value.trim();
      if (email && email.includes('@')) analytics()?.identify(email).catch(() => {});
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (submitting) return;
      const email = emailInput.value.trim();
      if (!email) {
        if (hint) hint.textContent = 'Please enter a valid email address.';
        return;
      }

      submitting = true;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Joining…';
      }
      if (hint) hint.textContent = '';

      analytics()?.trackSubmitForm('Founding Fan Waitlist', { form_key: 'waitlist' });

      const eventIds = analytics()?.makeWaitlistEventIds?.() || {};
      const tracking = analytics()?.getServerTrackingPayload?.(eventIds) || { event_ids: eventIds };

      try {
        await submitWaitlist(email, tracking);
        showWaitlistSuccess(form, success, successVideo, wrap);
        trackWaitlistConversion(email, eventIds);
      } catch (err) {
        const message = err.name === 'AbortError'
          ? 'Request timed out. Please try again.'
          : (err.message || 'Something went wrong. Please try again.');
        if (hint) hint.textContent = message;
        resetWaitlistUi(form, success, submitBtn, wrap);
      } finally {
        submitting = false;
      }
    });
  }

  function initScene2Cta() {
    $('lp-scene2-cta')?.addEventListener('click', () => {
      $('founding-fan-signup')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.setTimeout(() => $('prelaunch-email')?.focus(), 400);
    });
  }

  function initMemoryFilmPlayer() {
    const frame = document.querySelector('.lp-memory-film-frame');
    const video = frame?.querySelector('.lp-memory-film-video');
    const playBtn = frame?.querySelector('.lp-memory-film-play');
    if (!frame || !video || !playBtn) return;

    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    let busy = false;

    const showOverlay = () => frame.classList.remove('is-playing');
    const hideOverlay = () => frame.classList.add('is-playing');

    const startPlayback = async (event) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (busy || !video.paused) return;

      busy = true;
      frame.classList.add('is-loading');

      try {
        if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
          video.load();
        }

        video.muted = false;
        video.volume = 1;

        try {
          await video.play();
        } catch {
          // iOS / TikTok in-app: start muted inside the tap, then restore sound.
          video.muted = true;
          await video.play();
          video.muted = false;
          video.volume = 1;
        }

        hideOverlay();
      } catch (err) {
        showOverlay();
        console.warn('Memory film playback blocked:', err);
      } finally {
        frame.classList.remove('is-loading');
        busy = false;
      }
    };

    playBtn.addEventListener('pointerup', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      startPlayback(event);
    });

    playBtn.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        startPlayback(event);
      }
    });

    video.addEventListener('play', hideOverlay);
    video.addEventListener('pause', () => {
      if (!video.ended) showOverlay();
    });
    video.addEventListener('ended', showOverlay);
  }

  function initReveal() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = document.querySelectorAll('.lp-reveal');
    if (reduced) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    items.forEach((el) => {
      const delay = el.dataset.delay;
      if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.closest('.lp-story-beat')?.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    items.forEach((el) => observer.observe(el));
  }

  function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const imgs = document.querySelectorAll('[data-parallax-img]');
    const bg = document.querySelector('[data-parallax-bg]');
    let ticking = false;

    const update = () => {
      ticking = false;
      const scrollY = window.scrollY;
      if (bg) bg.style.transform = `translate3d(0, ${scrollY * 0.08}px, 0)`;
      imgs.forEach((img) => {
        const rect = img.getBoundingClientRect();
        const offset = (rect.top - window.innerHeight * 0.5) * 0.04;
        img.style.transform = `translate3d(0, ${offset}px, 0) scale(1.02)`;
      });
    };

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  function initScene2Progress() {
    const scene = document.querySelector('.lp-scene2');
    const fill = $('lp-scene2-progress');
    if (!scene || !fill) return;

    const update = () => {
      const rect = scene.getBoundingClientRect();
      const total = scene.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const pct = (scrolled / total) * 100;
      fill.style.width = `${pct}%`;
      scene.classList.toggle('is-active', rect.top < window.innerHeight && rect.bottom > 0);
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  function initParticles(canvasId, color) {
    const canvas = $(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const particles = [];
    const count = 48;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.0004,
        vy: (Math.random() - 0.5) * 0.0004,
        a: Math.random() * 0.5 + 0.2,
      });
    }

    const draw = () => {
      resize();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color.replace('ALPHA', String(p.a));
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initPathToggle();
    initCreatorPartnerForm();
    initWaitlistForm();
    initScene2Cta();
    initMemoryFilmPlayer();
    initReveal();
    initParallax();
    initScene2Progress();
    initParticles('lp-particles', 'rgba(0, 174, 239, ALPHA)');
    initParticles('lp-scene2-particles', 'rgba(123, 44, 191, ALPHA)');
  });
})();
