(function () {
  'use strict';

  const config = window.SITE_CONFIG || {};
  const GHL = config.goHighLevel || {};
  const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const form = document.getElementById('prelaunch-form');
  const emailInput = document.getElementById('prelaunch-email');
  const submitBtn = document.getElementById('prelaunch-submit');
  const formHint = document.getElementById('prelaunch-form-hint');
  const successEl = document.getElementById('prelaunch-success');
  const successVideo = document.getElementById('prelaunch-success-video');
  const video = document.querySelector('.lp-hero-video');
  const canvas = document.getElementById('lp-particles');
  const parallaxBg = document.querySelector('[data-parallax-bg]');
  const countdownEl = document.getElementById('lp-countdown');

  function initLandingCountdown() {
    if (!countdownEl) return;

    const label = 'Next Event';
    const targetMs = new Date(config.nextEventDate || config.launchDate).getTime();
    if (!targetMs || Number.isNaN(targetMs)) return;

    const pad = (n) => String(n);

    const tick = () => {
      const diff = targetMs - Date.now();
      if (diff <= 0) {
        countdownEl.classList.add('is-live');
        countdownEl.innerHTML = `<span class="lp-countdown-live">● ${label} — Tickets On Sale!</span>`;
        return;
      }

      countdownEl.classList.remove('is-live');
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      countdownEl.innerHTML = `
        <span class="lp-countdown-label">${label}</span>
        <div class="lp-countdown-grid">
          <div class="lp-countdown-unit"><strong>${pad(d)}</strong><span>Days</span></div>
          <div class="lp-countdown-unit"><strong>${pad(h)}</strong><span>Hrs</span></div>
          <div class="lp-countdown-unit"><strong>${pad(m)}</strong><span>Min</span></div>
          <div class="lp-countdown-unit"><strong>${pad(s)}</strong><span>Sec</span></div>
        </div>
      `;
    };

    tick();
    window.setInterval(tick, 1000);
  }

  initLandingCountdown();

  if (video) {
    video.muted = true;
    video.play().catch(() => {
      document.addEventListener('click', () => video.play(), { once: true });
    });
  }

  function delay(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function showSuccess() {
    form.hidden = true;
    successEl.hidden = false;
    if (!successVideo) return;
    successVideo.loop = true;
    successVideo.currentTime = 0;
    successVideo.muted = false;
    successVideo.play().catch(() => {
      successVideo.muted = true;
      successVideo.play().catch(() => {});
    });
  }

  async function submitWaitlist(email, signal) {
    if (GHL.enabled === false) return { ok: true };

    const res = await fetch(GHL.apiEndpoint || '/api/ghl-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal,
      body: JSON.stringify({
        formKey: 'waitlist',
        formLabel: 'Pre-Launch Waitlist',
        data: { email, source: 'prelaunch-landing' },
        pageUrl: window.location.href,
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || 'Submission failed');
    }

    return res.json();
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    formHint.textContent = '';

    const email = emailInput.value.trim();
    if (!email || !emailInput.checkValidity()) {
      formHint.textContent = 'Please enter a valid email address.';
      emailInput.focus();
      return;
    }

    emailInput.disabled = true;
    submitBtn.disabled = true;
    submitBtn.classList.remove('is-submitted');
    submitBtn.textContent = 'Submitting…';

    const controller = new AbortController();
    const apiTimeout = window.setTimeout(() => controller.abort(), 10000);
    const apiCall = submitWaitlist(email, controller.signal).catch(() => null);

    await Promise.all([apiCall, delay(800)]);
    window.clearTimeout(apiTimeout);

    submitBtn.textContent = 'Submitted';
    submitBtn.classList.add('is-submitted');
    localStorage.setItem('creatorsai_prelaunch', JSON.stringify({ email, at: new Date().toISOString() }));

    await delay(700);
    showSuccess();
  });

  if (localStorage.getItem('creatorsai_prelaunch') && form && successEl) {
    showSuccess();
  }

  if (motionOk && parallaxBg && window.innerWidth > 960) {
    let px = 0, py = 0, tx = 0, ty = 0;

    document.addEventListener('mousemove', (e) => {
      px = (e.clientX / window.innerWidth - 0.5) * 2;
      py = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    (function loop() {
      tx += (px - tx) * 0.04;
      ty += (py - ty) * 0.04;
      parallaxBg.style.transform = `translate(${tx * 4}px, ${ty * 2}px)`;
      requestAnimationFrame(loop);
    })();
  }

  /* Hero particles */
  if (canvas && motionOk) {
    const ctx = canvas.getContext('2d');
    let parts = [];
    let w = 0, h = 0, raf = 0;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const n = Math.min(45, Math.floor(w * h / 20000));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -Math.random() * 0.08 - 0.02,
        a: Math.random() * 0.3 + 0.08,
        hue: Math.random() > 0.5 ? 195 : 275,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      parts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) { p.y = h; p.x = Math.random() * w; }
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},85%,65%,${p.a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else draw();
    });
  }

  /* Scene 2 — scroll reveals, progress, parallax, particles, CTA */
  const scene2Section = document.querySelector('.lp-scene2');
  const revealEls = document.querySelectorAll('.lp-reveal');
  const storyBeats = document.querySelectorAll('.lp-story-beat');
  const scene2Cta = document.getElementById('lp-scene2-cta');
  const signupAnchor = document.getElementById('founding-fan-signup');
  const scene2Canvas = document.getElementById('lp-scene2-particles');
  const scene2Progress = document.getElementById('lp-scene2-progress');
  const parallaxImgs = document.querySelectorAll('[data-parallax-img]');

  revealEls.forEach((el) => {
    const delay = el.getAttribute('data-delay');
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
  });

  function markBeatVisible(beat) {
    if (!beat || beat.classList.contains('is-visible')) return;
    beat.classList.add('is-visible');
    beat.querySelectorAll('.lp-reveal').forEach((el) => el.classList.add('is-visible'));
  }

  if (revealEls.length && motionOk && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          const beat = entry.target.closest('.lp-story-beat');
          if (beat) markBeatVisible(beat);
          revealObserver.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    if (storyBeats.length) {
      const beatObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) markBeatVisible(entry.target);
          });
        },
        { root: null, rootMargin: '0px 0px -15% 0px', threshold: 0.2 }
      );
      storyBeats.forEach((beat) => beatObserver.observe(beat));
    }
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    storyBeats.forEach((beat) => beat.classList.add('is-visible'));
  }

  scene2Cta?.addEventListener('click', () => {
    const target = signupAnchor || emailInput;
    target?.scrollIntoView({ behavior: motionOk ? 'smooth' : 'auto', block: 'center' });
    if (emailInput && !emailInput.disabled) {
      window.setTimeout(() => emailInput.focus(), motionOk ? 600 : 0);
    }
  });

  if (scene2Section && scene2Progress && motionOk) {
    const updateScene2Progress = () => {
      const rect = scene2Section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = scene2Section.offsetHeight - vh * 0.25;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      scene2Progress.style.width = `${pct}%`;
      scene2Section.classList.toggle('is-active', rect.top < vh * 0.15 && rect.bottom > 0);
    };

    window.addEventListener('scroll', updateScene2Progress, { passive: true });
    window.addEventListener('resize', updateScene2Progress);
    updateScene2Progress();
  }

  if (parallaxImgs.length && motionOk && window.innerWidth >= 768) {
    const updateParallax = () => {
      parallaxImgs.forEach((img) => {
        const frame = img.closest('.lp-story-visual-frame');
        if (!frame) return;
        const rect = frame.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.bottom < 0 || rect.top > vh) return;
        const center = rect.top + rect.height * 0.5;
        const offset = (center - vh * 0.5) / vh;
        const y = Math.max(-12, Math.min(12, offset * -18));
        img.style.transform = `scale(1.06) translate3d(0, ${y}px, 0)`;
      });
    };

    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', updateParallax);
    updateParallax();
  }

  if (scene2Canvas && motionOk) {
    const s2ctx = scene2Canvas.getContext('2d');
    let s2parts = [];
    let s2w = 0;
    let s2h = 0;
    let s2raf = 0;

    function s2resize() {
      const section = scene2Canvas.closest('.lp-scene2');
      if (!section) return;
      s2w = scene2Canvas.width = section.offsetWidth;
      s2h = scene2Canvas.height = section.offsetHeight;
      const n = Math.min(28, Math.floor(s2w * s2h / 28000));
      s2parts = Array.from({ length: n }, () => ({
        x: Math.random() * s2w,
        y: Math.random() * s2h,
        r: Math.random() * 1.4 + 0.25,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -Math.random() * 0.06 - 0.015,
        a: Math.random() * 0.25 + 0.06,
        hue: Math.random() > 0.5 ? 195 : 275,
      }));
    }

    function s2draw() {
      if (!s2ctx) return;
      s2ctx.clearRect(0, 0, s2w, s2h);
      s2parts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) { p.y = s2h; p.x = Math.random() * s2w; }
        if (p.x < 0) p.x = s2w;
        if (p.x > s2w) p.x = 0;
        s2ctx.beginPath();
        s2ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        s2ctx.fillStyle = `hsla(${p.hue},85%,65%,${p.a})`;
        s2ctx.fill();
      });
      s2raf = requestAnimationFrame(s2draw);
    }

    s2resize();
    s2draw();
    window.addEventListener('resize', s2resize);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(s2raf);
      else s2draw();
    });
  }
})();
