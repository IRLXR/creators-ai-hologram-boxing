const SITE_NAME = process.env.GHL_EMAIL_FROM_NAME || 'Creators AI Hologram Boxing';
const FROM_EMAIL = process.env.GHL_EMAIL_FROM || 'ic4d@irlxr.com';
const TEAM_ALERT_EMAIL = process.env.GHL_TEAM_ALERT_EMAIL || FROM_EMAIL;
const CRYPTO_NAME = process.env.GHL_CRYPTO_NAME || 'Me vs Me';
const CRYPTO_SYMBOL = process.env.GHL_CRYPTO_SYMBOL || 'MVM';
const NEXT_EVENT = process.env.GHL_NEXT_EVENT || 'Hologram Boxing 002';

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function greeting(firstName) {
  return firstName ? `Hi ${escapeHtml(firstName)},` : 'Hi there,';
}

function emailShell({ title, bodyHtml, footerHtml }) {
  const footer = footerHtml || `Questions? Reply to this email or contact us at <a href="mailto:${escapeHtml(FROM_EMAIL)}" style="color:#d4af37;">${escapeHtml(FROM_EMAIL)}</a>.`;
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#0a0a0f;font-family:Arial,sans-serif;color:#e5e7eb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#111827;border:1px solid #1f2937;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:28px 32px;background:linear-gradient(135deg,#111827,#1e1b4b);border-bottom:2px solid #d4af37;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#22d3ee;">${escapeHtml(SITE_NAME)}</p>
              <h1 style="margin:0;font-size:24px;line-height:1.3;color:#ffffff;">${title}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;font-size:16px;line-height:1.6;color:#d1d5db;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid #1f2937;font-size:13px;line-height:1.5;color:#9ca3af;">
              ${footer}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailRow(label, value) {
  if (!value) return '';
  return `<tr>
    <td style="padding:8px 0;color:#9ca3af;width:140px;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;color:#f3f4f6;">${escapeHtml(value)}</td>
  </tr>`;
}

function detailsTable(rows) {
  const content = rows.filter(Boolean).join('');
  if (!content) return '';
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;background:#0f172a;border:1px solid #1f2937;border-radius:8px;padding:8px 16px;">
    ${content}
  </table>`;
}

function viewModeLabel(viewMode, data = {}) {
  if (data.viewCreator) return `Creator POV — ${data.viewCreator} (${CRYPTO_SYMBOL} crypto ticket)`;
  if (viewMode === 'headset') return `Headset POV (${CRYPTO_SYMBOL} crypto ticket)`;
  if (viewMode === 'attendee') return `Attendee POV (${CRYPTO_SYMBOL} crypto ticket)`;
  return viewMode || '';
}

function bookingTypeLabel(type) {
  const map = {
    private: 'Private Event / Party',
    corporate: 'Corporate Event',
    festival: 'Festival / Pop-Up',
  };
  return map[type] || type || '';
}

function formFieldRows(data, formKey) {
  const rows = [detailRow('Name', data.name), detailRow('Email', data.email)];

  if (formKey === 'ticket') {
    rows.push(
      detailRow('Viewing experience', viewModeLabel(data.viewMode, data)),
      detailRow('Creator', data.viewCreator),
      detailRow('Fight', data.fight),
      detailRow('Fighter pick', data.fighterPick),
      detailRow('Influencer code', data.influencerCode),
      detailRow('Wallet', data.wallet),
      detailRow('Balance confirmed', data.balanceConfirm ? 'Yes' : ''),
    );
  } else if (formKey === 'booking') {
    rows.push(
      detailRow('Booking type', bookingTypeLabel(data.type)),
      detailRow('Preferred date', data.date),
      detailRow('Guests', data.guests),
      detailRow('Details', data.message),
    );
  } else if (formKey === 'fighter') {
    rows.push(
      detailRow('Weight class', data.weightClass),
      detailRow('Record / experience', data.record),
      detailRow('Kick / Twitch', data.social),
      detailRow('Application message', data.message),
    );
  } else if (formKey === 'creator_partner') {
    rows.push(
      detailRow('Channel / profile', data.channelUrl),
      detailRow('Platform', data.platform),
    );
  } else {
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'name' || key === 'email') return;
      rows.push(detailRow(key, value));
    });
  }

  return rows;
}

function buildTeamAlert(formKey, formLabel, data, submitterContactId, pageUrl, locationId) {
  const alertTitles = {
    ticket: 'New Ticket Request',
    booking: 'New Booking Request',
    fighter: 'New Fighter Application',
    waitlist: 'New Pre-Launch Signup',
    creator_partner: 'New Creator Partner Application',
  };
  const title = alertTitles[formKey] || 'New Website Submission';
  const contactName = data.name || data.email || 'Unknown lead';
  const ghlContactUrl = submitterContactId && locationId
    ? `https://app.gohighlevel.com/v2/location/${locationId}/contacts/detail/${submitterContactId}`
    : '';

  const bodyHtml = `
    <p style="margin:0 0 16px;">A new <strong>${escapeHtml(formLabel || title)}</strong> just came in on the website.</p>
    ${detailsTable(formFieldRows(data, formKey))}
    ${pageUrl ? `<p style="margin:0 0 12px;"><strong>Page:</strong> <a href="${escapeHtml(pageUrl)}" style="color:#22d3ee;">${escapeHtml(pageUrl)}</a></p>` : ''}
    ${ghlContactUrl ? `<p style="margin:0;"><a href="${escapeHtml(ghlContactUrl)}" style="display:inline-block;padding:12px 18px;background:#d4af37;color:#111827;text-decoration:none;border-radius:6px;font-weight:bold;">Open contact in Go High Level</a></p>` : ''}
  `;

  return {
    subject: `[${SITE_NAME}] ${title} — ${contactName}`,
    html: emailShell({
      title,
      bodyHtml,
      footerHtml: `Internal team alert sent to ${escapeHtml(TEAM_ALERT_EMAIL)}.`,
    }),
  };
}

async function upsertTeamContact({ pit, locationId }) {
  const response = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${pit}`,
      'Content-Type': 'application/json',
      Version: '2021-07-28',
    },
    body: JSON.stringify({
      locationId,
      email: TEAM_ALERT_EMAIL,
      firstName: 'Team',
      lastName: 'Inbox',
      tags: ['internal-team-inbox'],
      source: `${SITE_NAME} Internal Alerts`,
    }),
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) return null;
  return body.contact?.id || body.id || null;
}

async function sendEmail({ pit, contactId, subject, html }) {
  const response = await fetch('https://services.leadconnectorhq.com/conversations/messages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${pit}`,
      'Content-Type': 'application/json',
      Version: '2021-04-15',
    },
    body: JSON.stringify({
      type: 'Email',
      contactId,
      emailFrom: FROM_EMAIL,
      subject,
      html,
    }),
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    return { ok: false, detail: body };
  }

  return { ok: true, messageId: body.messageId || null };
}

function buildAutoReply(formKey, data, firstName) {
  const name = greeting(firstName);

  if (formKey === 'ticket') {
    const view = viewModeLabel(data.viewMode, data);
    const bodyHtml = `
      <p style="margin:0 0 16px;">${name}</p>
      <p style="margin:0 0 16px;">We received your ticket request for <strong>${escapeHtml(NEXT_EVENT)}</strong>. You're one step closer to ringside.</p>
      <p style="margin:0 0 16px;">Our team will verify your <strong>${escapeHtml(CRYPTO_NAME)}</strong> wallet and email you once your ticket, creator POV, and fighter pick are confirmed.</p>
      ${detailsTable([
        detailRow('Viewing experience', view),
        detailRow('Creator', data.viewCreator),
        detailRow('Fight', data.fight),
        detailRow('Fighter pick', data.fighterPick),
        detailRow('Influencer code', data.influencerCode),
        detailRow('Wallet', data.wallet),
      ])}
      <p style="margin:0;">If anything looks wrong, reply to this email and we'll fix it before confirmation goes out.</p>
    `;

    return {
      subject: `Ticket request received — ${NEXT_EVENT}`,
      html: emailShell({ title: 'Ticket Request Received', bodyHtml }),
    };
  }

  if (formKey === 'booking') {
    const bodyHtml = `
      <p style="margin:0 0 16px;">${name}</p>
      <p style="margin:0 0 16px;">Thanks for your private event inquiry — we've received everything and a team member is reviewing it now.</p>
      <p style="margin:0 0 16px;">Expect a personal follow-up within <strong>1–2 business days</strong> with availability, pricing, and next steps.</p>
      ${detailsTable([
        detailRow('Booking type', bookingTypeLabel(data.type)),
        detailRow('Preferred date', data.date),
        detailRow('Guests', data.guests),
        detailRow('Details', data.message),
      ])}
      <p style="margin:0;">Want to add anything else? Just reply to this email.</p>
    `;

    return {
      subject: 'We received your booking request',
      html: emailShell({ title: 'Booking Request Received', bodyHtml }),
    };
  }

  if (formKey === 'waitlist') {
    const bodyHtml = `
      <p style="margin:0 0 16px;">${name}</p>
      <p style="margin:0 0 16px;">Welcome to the future. You're officially on the list for <strong>${escapeHtml(SITE_NAME)}</strong>.</p>
      <p style="margin:0 0 16px;">We'll send exclusive launch announcements, event invitations, and behind-the-scenes updates before anyone else.</p>
      <p style="margin:0;">The future of live entertainment is arriving — and you're in.</p>
    `;

    return {
      subject: `You're on the list — ${SITE_NAME}`,
      html: emailShell({ title: 'Welcome to the Future', bodyHtml }),
    };
  }

  if (formKey === 'fighter') {
    const bodyHtml = `
      <p style="margin:0 0 16px;">${name}</p>
      <p style="margin:0 0 16px;">Your hologram fighter application for <strong>${escapeHtml(NEXT_EVENT)}</strong> is in our review queue.</p>
      <p style="margin:0 0 16px;">If you're selected, we'll reach out about scanning, match placement, and fight-night logistics.</p>
      ${detailsTable([
        detailRow('Weight class', data.weightClass),
        detailRow('Record / experience', data.record),
        detailRow('Kick / Twitch', data.social),
      ])}
      <p style="margin:0;">Thanks for throwing your hat in the ring — we'll be in touch.</p>
    `;

    return {
      subject: `Fighter application received — ${NEXT_EVENT}`,
      html: emailShell({ title: 'Fighter Application Received', bodyHtml }),
    };
  }

  if (formKey === 'creator_partner') {
    const bodyHtml = `
      <p style="margin:0 0 16px;">${name}</p>
      <p style="margin:0 0 16px;">Your <strong>creator partner application</strong> for <strong>${escapeHtml(NEXT_EVENT)}</strong> is in.</p>
      <p style="margin:0 0 16px;">We're reviewing streamers and content creators for co-stream slots, VIP tent access, and brand ambassador roles.</p>
      ${detailsTable([
        detailRow('Channel / profile', data.channelUrl),
        detailRow('Platform', data.platform),
      ])}
      <p style="margin:0;">If you're a fit, we'll reach out about co-streaming hologram boxing live to your audience. Watch your inbox.</p>
    `;

    return {
      subject: `Creator partner application received — ${NEXT_EVENT}`,
      html: emailShell({ title: 'Creator Partner Application Received', bodyHtml }),
    };
  }

  const bodyHtml = `
    <p style="margin:0 0 16px;">${name}</p>
    <p style="margin:0;">Thanks for reaching out to ${escapeHtml(SITE_NAME)}. We received your submission and will follow up soon.</p>
  `;

  return {
    subject: `We received your message — ${SITE_NAME}`,
    html: emailShell({ title: 'Thanks for reaching out', bodyHtml }),
  };
}

async function sendAutoReply({ pit, contactId, formKey, data, firstName }) {
  if (process.env.GHL_AUTO_REPLY === 'false') return null;

  const { subject, html } = buildAutoReply(formKey, data, firstName);
  if (!contactId || !subject || !html) return null;

  return sendEmail({ pit, contactId, subject, html });
}

async function sendTeamAlert({
  pit,
  locationId,
  formKey,
  formLabel,
  data,
  submitterContactId,
  pageUrl,
}) {
  if (process.env.GHL_INTERNAL_ALERT === 'false') return null;

  const teamContactId = await upsertTeamContact({ pit, locationId });
  if (!teamContactId) return { ok: false, detail: 'Team inbox contact not found' };

  const { subject, html } = buildTeamAlert(
    formKey,
    formLabel,
    data,
    submitterContactId,
    pageUrl,
    locationId,
  );

  return sendEmail({ pit, contactId: teamContactId, subject, html });
}

module.exports = {
  buildAutoReply,
  buildTeamAlert,
  sendAutoReply,
  sendTeamAlert,
};
