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

  async function submitWaitlist(email) {
    if (!ghl.enabled) return { ok: true };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const endpoint = ghlApiEndpoint();
      if (isDevHost()) console.log('[waitlist] POST', endpoint, email);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          formKey: 'waitlist',
          formLabel: 'Founding Fan Waitlist',
          data: { email },
          pageUrl: window.location.href,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.error || 'Could not save your email');
      }
      if (isDevHost()) console.log('[waitlist] saved', body);
      return body;
    } finally {
      clearTimeout(timeout);
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
      successVideo?.play().catch(() => {});
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

  function trackWaitlistConversion(email) {
    const a = analytics();
    if (!a) return;

    const meta = {
      form_key: 'waitlist',
      value: 0,
      content_category: 'waitlist',
      content_id: 'waitlist',
      content_name: 'Founding Fan Waitlist',
    };

    Promise.resolve()
      .then(() => a.trackCompleteRegistration('Founding Fan Waitlist', email, meta))
      .then(() => a.trackLead('Founding Fan Waitlist', email, meta))
      .then(() => {
        a.trackPurchase(0, meta);
      })
      .catch(() => {});
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

      try {
        await submitWaitlist(email);
        showWaitlistSuccess(form, success, successVideo, wrap);
        trackWaitlistConversion(email);
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
    initWaitlistForm();
    initScene2Cta();
    initReveal();
    initParallax();
    initScene2Progress();
    initParticles('lp-particles', 'rgba(0, 174, 239, ALPHA)');
    initParticles('lp-scene2-particles', 'rgba(123, 44, 191, ALPHA)');
  });
})();
