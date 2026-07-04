const GHL_API = 'https://services.leadconnectorhq.com';
const { sendAutoReply, sendTeamAlert } = require('./ghl-auto-reply');
const { trackFormConversion } = require('./tiktok-events');

function splitName(fullName) {
  const parts = String(fullName || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return { firstName: '', lastName: '' };
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

function formSummary(data) {
  return Object.entries(data)
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '')
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
}

function tagSlug(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}

async function withTimeout(promise, ms) {
  let timer;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error('timeout')), ms);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const pit = process.env.GHL_PIT_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!pit || !locationId) {
    return res.status(503).json({
      error: 'Go High Level is not configured on the server yet.',
      missing: [
        !pit ? 'GHL_PIT_TOKEN' : null,
        !locationId ? 'GHL_LOCATION_ID' : null,
      ].filter(Boolean),
    });
  }

  const { formKey, formLabel, data = {}, pageUrl, tracking = {} } = req.body || {};
  const email = String(data.email || '').trim();

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const { firstName, lastName } = splitName(data.name);
  const tags = [
    'website-lead',
    formKey ? `form-${formKey}` : null,
    formLabel ? tagSlug(formLabel) : null,
  ].filter(Boolean);

  const contactPayload = {
    locationId,
    firstName,
    lastName,
    name: data.name || [firstName, lastName].filter(Boolean).join(' '),
    email,
    source: 'Creators AI Hologram Boxing Website',
    tags,
  };

  const headers = {
    Authorization: `Bearer ${pit}`,
    'Content-Type': 'application/json',
    Version: '2021-07-28',
  };

  try {
    const upsertRes = await fetch(`${GHL_API}/contacts/upsert`, {
      method: 'POST',
      headers,
      body: JSON.stringify(contactPayload),
    });

    const upsertBody = await upsertRes.json().catch(() => ({}));

    if (!upsertRes.ok) {
      return res.status(502).json({
        error: 'Go High Level rejected the contact',
        detail: upsertBody,
      });
    }

    const contactId = upsertBody.contact?.id || upsertBody.id;
    const noteText = [
      formLabel || 'Website form submission',
      '',
      formSummary(data),
      '',
      pageUrl ? `Page: ${pageUrl}` : '',
      `Submitted: ${new Date().toISOString()}`,
    ].filter(Boolean).join('\n');

    if (contactId && noteText) {
      await fetch(`${GHL_API}/contacts/${contactId}/notes`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ body: noteText }),
      }).catch(() => {});
    }

    const autoReply = await withTimeout(
      sendAutoReply({ pit, contactId, formKey, data, firstName }),
      8000,
    ).catch(() => ({ ok: false }));

    const teamAlert = await withTimeout(
      sendTeamAlert({
        pit,
        locationId,
        formKey,
        formLabel,
        data,
        submitterContactId: contactId,
        pageUrl,
      }),
      8000,
    ).catch(() => ({ ok: false }));

    const tiktokEvents = await withTimeout(
      trackFormConversion({
        req,
        formKey,
        formLabel,
        email,
        phone: data.phone,
        pageUrl,
        tracking,
      }),
      5000,
    ).catch((err) => ({ ok: false, error: err.message || 'tiktok_failed' }));

    return res.status(200).json({
      ok: true,
      contactId: contactId || null,
      autoReply: autoReply?.ok === true,
      teamAlert: teamAlert?.ok === true,
      tiktokEvents: tiktokEvents?.ok === true,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to reach Go High Level' });
  }
};
