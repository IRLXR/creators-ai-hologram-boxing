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
  const video = document.querySelector('.lp-hero-video');
  const canvas = document.getElementById('lp-particles');
  const parallaxBg = document.querySelector('[data-parallax-bg]');

  if (video) {
    video.muted = true;
    video.play().catch(() => {
      document.addEventListener('click', () => video.play(), { once: true });
    });
  }

  async function submitWaitlist(email) {
    if (GHL.enabled === false) return { ok: true };

    const res = await fetch(GHL.apiEndpoint || '/api/ghl-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';

    try {
      await submitWaitlist(email);
      form.hidden = true;
      successEl.hidden = false;
      localStorage.setItem('creatorsai_prelaunch', JSON.stringify({ email, at: new Date().toISOString() }));
    } catch {
      formHint.textContent = 'Something went wrong. Please try again.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Notify Me';
    }
  });

  if (localStorage.getItem('creatorsai_prelaunch') && form && successEl) {
    form.hidden = true;
    successEl.hidden = false;
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
