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

  async function submitWaitlist(email) {
    if (!ghl.enabled) return { ok: true };

    const res = await fetch(ghl.apiEndpoint || '/api/ghl-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formKey: 'waitlist',
        formLabel: 'Founding Fan Waitlist',
        data: { email },
        pageUrl: window.location.href,
      }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || 'Could not save your email');
    }
    return res.json();
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
    if (!form || !emailInput) return;

    let checkoutStarted = false;
    emailInput.addEventListener('focus', () => {
      if (checkoutStarted) return;
      checkoutStarted = true;
      analytics()?.trackInitiateCheckout({
        step: 'waitlist_email_focus',
        content_category: 'waitlist',
        content_id: 'waitlist',
        value: 0,
      });
    }, { once: true });

    emailInput.addEventListener('blur', () => {
      const email = emailInput.value.trim();
      if (email && email.includes('@')) analytics()?.identify(email);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email) {
        if (hint) hint.textContent = 'Please enter a valid email address.';
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Joining…';
      }
      if (hint) hint.textContent = '';

      analytics()?.trackSubmitForm('Founding Fan Waitlist', { form_key: 'waitlist' });

      try {
        await submitWaitlist(email);
        await analytics()?.trackCompleteRegistration('Founding Fan Waitlist', email, {
          form_key: 'waitlist',
          value: 0,
        });
        await analytics()?.trackLead('Founding Fan Waitlist', email, {
          form_key: 'waitlist',
          value: 0,
        });

        form.hidden = true;
        if (success) {
          success.hidden = false;
          successVideo?.play().catch(() => {});
        }
      } catch (err) {
        if (hint) hint.textContent = err.message || 'Something went wrong. Please try again.';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Become a Founding Fan';
        }
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
