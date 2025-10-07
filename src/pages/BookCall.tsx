import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../daypicker.css";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function generateTimeSlots(date: Date | undefined) {
  if (!date) return [] as Date[];
  const slots: Date[] = [];
  const start = new Date(date);
  start.setHours(9, 0, 0, 0);
  const end = new Date(date);
  end.setHours(18, 0, 0, 0);
  const stepMinutes = 30;
  for (
    let t = new Date(start);
    t <= end;
    t = new Date(t.getTime() + stepMinutes * 60000)
  ) {
    slots.push(new Date(t));
  }
  return slots;
}

export default function BookCall() {
  const [firstName, setFirstName] = useState("");
  const { t } = useI18n();
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [message, setMessage] = useState("");

  const timeSlots = useMemo(
    () => generateTimeSlots(selectedDay),
    [selectedDay],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!firstName || !lastName || !email || !selectedDay || !selectedTime)
      return;
    try {
      setLoading(true);
      const scheduled = new Date(selectedDay);
      scheduled.setHours(
        selectedTime.getHours(),
        selectedTime.getMinutes(),
        0,
        0,
      );
      const res = await fetch("/api/book-a-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          message,
          scheduledAt: scheduled.toISOString(),
          honeypot,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}) as any);
        throw new Error(data?.error || `Request failed (${res.status})`);
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <section className="pt-40 pb-24">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t("book.title")}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("book.lead")}
            </p>
          </motion.div>

          <div className="booking-wrapper min-h-[700px]">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/nemanja3975439/30min?hide_event_type_details=1&hide_gdpr_banner=1"
              style={{ minWidth: 320, height: 700 }}
            />
            <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
          </div>
        </div>
      </section>

      <footer className="py-16 border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-6 text-center text-gray-600">
          © {new Date().getFullYear()} thirtythree
        </div>
      </footer>
    </div>
  );
}
