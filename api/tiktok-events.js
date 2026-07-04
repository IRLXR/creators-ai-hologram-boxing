const crypto = require('crypto');

const TIKTOK_TRACK_URL = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

function sha256(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex');
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return String(forwarded).split(',')[0].trim();
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || '';
}

function isConfigured() {
  return Boolean(process.env.TIKTOK_ACCESS_TOKEN && process.env.TIKTOK_PIXEL_ID);
}

function buildUserObject({ email, phone, externalId, ttclid, ttp, userAgent, ip }) {
  const user = {};

  const normalizedEmail = normalizeEmail(email);
  if (normalizedEmail.includes('@')) user.email = sha256(normalizedEmail);

  if (phone) {
    const digits = String(phone).replace(/\D/g, '');
    if (digits) user.phone = sha256(digits);
  }

  if (externalId) user.external_id = sha256(String(externalId));
  if (ttclid) user.ttclid = String(ttclid);
  if (ttp) user.ttp = String(ttp);
  if (userAgent) user.user_agent = String(userAgent);
  if (ip) user.ip = String(ip);

  return user;
}

function buildProperties(extra = {}) {
  const value = extra.value != null ? Number(extra.value) : 0;
  const contentId = extra.content_id || extra.form_key || 'website';
  const contentName = extra.content_name || extra.form_label || 'Website Form';

  return {
    value: Number.isFinite(value) ? value : 0,
    currency: extra.currency || 'USD',
    content_type: extra.content_type || 'product',
    content_id: contentId,
    content_name: contentName,
    content_category: extra.content_category || extra.form_key || 'lead',
    status: extra.status || 'submitted',
    contents: extra.contents || [{
      content_id: contentId,
      content_type: 'product',
      content_name: contentName,
      quantity: 1,
      price: Number.isFinite(value) ? value : 0,
    }],
  };
}

async function sendTikTokEvents(events) {
  const token = process.env.TIKTOK_ACCESS_TOKEN;
  const pixelId = process.env.TIKTOK_PIXEL_ID;

  if (!token || !pixelId || !events?.length) {
    return { ok: false, skipped: true, reason: 'not_configured_or_empty' };
  }

  const payload = {
    event_source: 'web',
    event_source_id: pixelId,
    data: events,
  };

  const res = await fetch(TIKTOK_TRACK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Token': token,
    },
    body: JSON.stringify(payload),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.code !== 0) {
    return {
      ok: false,
      status: res.status,
      code: body.code,
      message: body.message || 'TikTok Events API error',
    };
  }

  return { ok: true, request_id: body.request_id || null };
}

function buildEvent({
  event,
  eventId,
  email,
  phone,
  externalId,
  pageUrl,
  referrer,
  ttclid,
  ttp,
  userAgent,
  ip,
  properties,
}) {
  return {
    event,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId || `${Date.now()}_${event}_${Math.random().toString(36).slice(2, 10)}`,
    user: buildUserObject({
      email,
      phone,
      externalId,
      ttclid,
      ttp,
      userAgent,
      ip,
    }),
    page: {
      url: pageUrl || undefined,
      referrer: referrer || undefined,
    },
    properties: buildProperties(properties),
  };
}

async function trackFormConversion({
  req,
  formKey,
  formLabel,
  email,
  phone,
  pageUrl,
  tracking = {},
}) {
  if (!isConfigured()) return { ok: false, skipped: true, reason: 'not_configured' };

  const ip = clientIp(req);
  const userAgent = tracking.user_agent || req.headers['user-agent'] || '';
  const eventIds = tracking.event_ids || {};
  const baseProps = {
    form_key: formKey,
    form_label: formLabel,
    content_category: formKey === 'waitlist' ? 'waitlist' : (formKey || 'lead'),
    content_id: formKey === 'waitlist' ? 'waitlist' : (formKey || 'website'),
    content_name: formLabel || 'Website Form',
    content_type: 'product',
    value: formKey === 'waitlist' ? 0 : undefined,
    currency: 'USD',
  };

  const common = {
    email,
    phone,
    externalId: tracking.external_id,
    pageUrl,
    referrer: tracking.referrer,
    ttclid: tracking.ttclid,
    ttp: tracking.ttp,
    userAgent,
    ip,
  };

  const waitlistFunnel = formKey === 'waitlist'
    ? ['AddToCart', 'InitiateCheckout', 'AddPaymentInfo']
    : [];

  const conversionEvents = formKey === 'waitlist'
    ? ['CompleteRegistration', 'Lead', 'Purchase']
    : ['CompleteRegistration', 'Lead'];

  const events = [
    ...waitlistFunnel.map((event) => buildEvent({
      event,
      eventId: eventIds[event],
      ...common,
      properties: { ...baseProps, status: event === 'Purchase' ? 'completed' : 'submitted' },
    })),
    ...conversionEvents.map((event) => buildEvent({
      event,
      eventId: eventIds[event],
      ...common,
      properties: {
        ...baseProps,
        value: event === 'Purchase' ? 0 : baseProps.value,
        status: event === 'Purchase' ? 'completed' : 'submitted',
      },
    })),
  ];

  return sendTikTokEvents(events);
}

module.exports = {
  isConfigured,
  sendTikTokEvents,
  trackFormConversion,
  buildEvent,
};
