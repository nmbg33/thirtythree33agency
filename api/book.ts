export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { firstName, lastName, email, scheduledAt } = req.body || {};
  if (!firstName || !lastName || !email || !scheduledAt) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

  if (!RESEND_API_KEY || !RECIPIENT_EMAIL) {
    res.status(500).json({ error: "Email service not configured" });
    return;
  }

  const html = `
    <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial; color: #111;">
      <h2 style="margin:0 0 8px 0;">New booked call</h2>
      <p style="margin:0 0 16px 0;">A new call was scheduled from the website.</p>
      <ul style="line-height:1.6;">
        <li><strong>Name:</strong> ${firstName} ${lastName}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Scheduled at:</strong> ${new Date(scheduledAt).toLocaleString()}</li>
      </ul>
    </div>
  `;

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Bookings <bookings@resend.dev>",
        to: [RECIPIENT_EMAIL],
        subject: "New booked call",
        html,
      }),
    });
    if (!resp.ok) {
      const err = await resp.text();
      res.status(502).json({ error: "Failed to send email", details: err });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: "Unexpected error", details: e?.message });
  }
}
