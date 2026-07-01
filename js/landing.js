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

  if (!canvas || !motionOk) return;

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
})();
