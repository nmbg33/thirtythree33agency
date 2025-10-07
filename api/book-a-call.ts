import { z } from "zod";

// Simple in-memory rate limiting per-IP (5 req/hour). Non-durable across cold starts.
const WINDOW = 60 * 60 * 1000;
const MAX = 5;
// @ts-ignore
const store: { hits?: Map<string, number[]> } = global as any;
if (!store.hits) store.hits = new Map();

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().optional(),
  time: z.string().min(1).optional(),
  scheduledAt: z.string().optional(),
  honeypot: z.string().optional(),
});

function checkEnv() {
  const required = [
    "RESEND_API_KEY",
    "BOOK_A_CALL_FROM",
    "BOOK_A_CALL_TO",
  ] as const;
  const present: Record<string, boolean> = {};
  const missing: string[] = [];
  for (const k of required) {
    const ok = !!process.env[k];
    present[k] = ok;
    if (!ok) missing.push(k);
  }
  return { present, missing };
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method === "GET") {
    const probe = checkEnv();
    return res.status(200).json({ ok: true, route: "book-a-call", env: probe });
  }
  if (req.method !== "POST")
    return res.status(405).json({ ok: false, error: "Method not allowed" });

  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(req.body ?? {});
  } catch (e: any) {
    return res
      .status(400)
      .json({ ok: false, error: e?.message || "Invalid payload" });
  }

  if (body.honeypot) return res.status(200).json({ ok: true });

  const scheduledTime = (body.time ?? body.scheduledAt ?? "").trim();
  if (!scheduledTime) {
    return res.status(400).json({ ok: false, error: "Missing time" });
  }

  const ip =
    (req.headers["x-forwarded-for"]?.split(",")[0] as string | undefined) ||
    req.socket?.remoteAddress ||
    "unknown";
  const now = Date.now();
  const prev = store.hits!.get(ip) || [];
  const recent = prev.filter((t) => now - t < WINDOW);
  if (recent.length >= MAX)
    return res.status(429).json({ ok: false, error: "Too many requests" });
  store.hits!.set(ip, [...recent, now]);

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO = process.env.BOOK_A_CALL_TO;
  const FROM = process.env.BOOK_A_CALL_FROM; // must be verified on Resend
  const envProbe = checkEnv();
  if (envProbe.missing.length) {
    console.error("MISSING_ENV:", envProbe.missing.join(", "));
    return res
      .status(500)
      .json({
        ok: false,
        error: "Email service not configured",
        details: envProbe,
      });
  }

  const subject = `New call booked from ${body.name}`;
  const text = `Name: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message ?? "—"}\nScheduled Time: ${scheduledTime}`;

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject,
        text,
        reply_to: body.email,
      }),
    });
    if (!resp.ok) {
      const err = await resp.text();
      return res
        .status(502)
        .json({ ok: false, error: "Email send failed", providerError: err });
    }
    return res.status(200).json({ ok: true });
  } catch (e: any) {
    return res
      .status(500)
      .json({ ok: false, error: "Server error", details: e?.message });
  }
}
