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
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          scheduledAt: scheduled.toISOString(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `Failed with status ${res.status}`);
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

          {!submitted ? (
            <div className="grid lg:grid-cols-2 gap-10 place-items-center">
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="w-full max-w-[360px] sm:max-w-md md:max-w-lg lg:max-w-none mx-auto lg:mx-0 p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center sm:text-left"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("book.firstName")}
                    </label>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("book.lastName")}
                    </label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">
                    {t("book.email")}
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    required
                  />
                </div>

                {error && (
                  <div className="mt-4 text-sm text-red-600">{error}</div>
                )}
                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full text-lg py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={
                      loading ||
                      !firstName ||
                      !lastName ||
                      !email ||
                      !selectedDay ||
                      !selectedTime
                    }
                  >
                    {loading ? "Booking…" : t("book.confirm")}
                  </button>
                </div>
              </motion.form>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full max-w-[360px] sm:max-w-md md:max-w-lg lg:max-w-none mx-auto lg:mx-0 p-8 bg-white rounded-2xl border border-gray-200 text-center sm:text-left"
              >
                <h3 className="text-xl font-semibold mb-4 text-center sm:text-left">
                  {t("book.pickDay")}
                </h3>
                <DayPicker
                  mode="single"
                  selected={selectedDay}
                  onSelect={setSelectedDay}
                  weekStartsOn={1}
                  modifiersClassNames={{
                    selected: "bg-yellow-400 text-black",
                  }}
                  className="mb-6 mx-auto md:mx-0 max-w-[300px] md:max-w-none"
                />

                <h3 className="text-xl font-semibold mb-3 text-center sm:text-left">
                  {t("book.pickTime")}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-64 overflow-y-auto px-0 justify-items-center mx-auto md:mx-0 w-full max-w-[300px] md:max-w-none">
                  {timeSlots.length === 0 && (
                    <div className="col-span-full text-gray-500">
                      {t("book.pickDay")}
                    </div>
                  )}
                  {timeSlots.map((t) => {
                    const isSelected =
                      selectedTime &&
                      t.getHours() === selectedTime.getHours() &&
                      t.getMinutes() === selectedTime.getMinutes();
                    return (
                      <button
                        key={t.toISOString()}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                          isSelected
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                        }`}
                      >
                        {formatTime(t)}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center p-10 bg-gray-50 rounded-2xl border border-gray-200"
            >
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-semibold mb-3">
                {t("book.success.title")}
              </h3>
              <p className="text-gray-700 mb-6">
                {t("book.success.body", { firstName, email })}
              </p>
              <div className="text-sm text-gray-600">
                {selectedDay?.toLocaleDateString()} •{" "}
                {selectedTime ? formatTime(selectedTime) : ""}
              </div>
            </motion.div>
          )}
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
