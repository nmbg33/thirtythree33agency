import { z } from "zod";

// Best-effort in-memory rate limit per IP (5 req/hour) - may reset between cold starts
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

// @ts-ignore - attach to global to persist across invocations in warm instances
const globalStore: { rate?: Map<string, number[]> } = global as any;
if (!globalStore.rate) globalStore.rate = new Map<string, number[]>();

const scheduleSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  scheduledAt: z.string().datetime(),
  honeypot: z.string().optional(),
});

const simpleSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().optional(),
  honeypot: z.string().optional(),
});

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const ip =
    (req.headers["x-forwarded-for"]?.split(",")[0] as string | undefined) ||
    req.socket?.remoteAddress ||
    "unknown";
  const now = Date.now();
  const hits = globalStore.rate!.get(ip) || [];
  const recent = hits.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    res
      .status(429)
      .json({ ok: false, error: "Too many requests. Please try again later." });
    return;
  }

  let parsed:
    | ({ kind: "scheduled" } & z.infer<typeof scheduleSchema>)
    | ({ kind: "simple" } & z.infer<typeof simpleSchema>);

  try {
    const body = req.body ?? {};
    if (
      typeof body.firstName === "string" &&
      typeof body.lastName === "string" &&
      typeof body.scheduledAt === "string"
    ) {
      const v = scheduleSchema.parse(body);
      parsed = { kind: "scheduled", ...v };
    } else {
      const v = simpleSchema.parse(body);
      parsed = { kind: "simple", ...v };
    }
  } catch (err: any) {
    res
      .status(400)
      .json({ ok: false, error: err?.message || "Invalid payload" });
    return;
  }

  if ((parsed as any).honeypot) {
    // silently accept
    res.status(200).json({ ok: true });
    return;
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO = process.env.BOOK_A_CALL_TO || process.env.RECIPIENT_EMAIL;
  const FROM = process.env.BOOK_A_CALL_FROM || "website@notifications.local";

  if (!RESEND_API_KEY || !TO || !FROM) {
    res.status(503).json({
      ok: false,
      error:
        "Email service temporarily unavailable. Please contact us directly at blyze33@gmail.com.",
    });
    return;
  }

  globalStore.rate!.set(ip, [...recent, now]);

  const subject =
    parsed.kind === "scheduled"
      ? `New Booked Call — ${parsed.firstName} ${parsed.lastName}`
      : `New Book a Call — ${parsed.name}`;

  const text =
    parsed.kind === "scheduled"
      ? `Name: ${parsed.firstName} ${parsed.lastName}\nEmail: ${parsed.email}\nScheduled at: ${new Date(parsed.scheduledAt).toLocaleString()}\nIP: ${ip}`
      : `Name: ${parsed.name}\nEmail: ${parsed.email}\nMessage: ${(parsed.message || "").slice(0, 2000)}\nIP: ${ip}`;

  const html =
    parsed.kind === "scheduled"
      ? `<div style="font-family:Inter,system-ui,sans-serif;color:#111"><h2 style="margin:0 0 8px">New booked call</h2><ul style="line-height:1.6"><li><strong>Name:</strong> ${parsed.firstName} ${parsed.lastName}</li><li><strong>Email:</strong> ${parsed.email}</li><li><strong>Scheduled at:</strong> ${new Date(parsed.scheduledAt).toLocaleString()}</li><li><strong>IP:</strong> ${ip}</li></ul></div>`
      : `<div style="font-family:Inter,system-ui,sans-serif;color:#111"><h2 style="margin:0 0 8px">New Book a Call</h2><ul style="line-height:1.6"><li><strong>Name:</strong> ${parsed.name}</li><li><strong>Email:</strong> ${parsed.email}</li></ul><p style="white-space:pre-line">${(parsed.message || "").slice(0, 5000)}</p><p style="color:#666;font-size:12px">IP: ${ip}</p></div>`;

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject,
        text,
        html,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      res.status(502).json({
        ok: false,
        error:
          "Submission didn’t go through. Please try again later or email us directly at blyze33@gmail.com.",
        details: errText,
      });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (e: any) {
    res.status(500).json({
      ok: false,
      error:
        "Submission didn’t go through. Please try again later or email us directly at blyze33@gmail.com.",
      details: e?.message,
    });
  }
}
