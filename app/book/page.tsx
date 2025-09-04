"use client";

import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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

export default function BookPage() {
  const [firstName, setFirstName] = useState("");
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
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            thirtythree
          </Link>
          <Link href="/book">
            <Button variant="outline">Book a Call</Button>
          </Link>
        </div>
      </nav>

      <section className="pt-20 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Book a call</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Reserve a time for an intro call. Pick a day and time — you will
              receive a confirmation via email.
            </p>
          </motion.div>

          {!submitted ? (
            <div className="grid lg:grid-cols-2 gap-10 place-items-center">
              <Card className="w-full">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          First name
                        </label>
                        <Input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          type="text"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Last name
                        </label>
                        <Input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                      />
                    </div>

                    {error && (
                      <div className="text-sm text-red-600">{error}</div>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={
                        loading ||
                        !firstName ||
                        !lastName ||
                        !email ||
                        !selectedDay ||
                        !selectedTime
                      }
                    >
                      {loading ? "Booking…" : "Confirm booking"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Pick a day</h3>
                  <DayPicker
                    mode="single"
                    selected={selectedDay}
                    onSelect={setSelectedDay}
                    weekStartsOn={1}
                    className="mb-6"
                  />

                  <h3 className="text-xl font-semibold mb-3">Pick a time</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
                    {timeSlots.length === 0 && (
                      <div className="col-span-full text-muted-foreground">
                        Pick a day
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
                              ? "bg-foreground text-background border-foreground"
                              : "bg-muted hover:bg-muted/80 border-border"
                          }`}
                        >
                          {formatTime(t)}
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center p-10 border rounded-2xl"
            >
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-semibold mb-3">
                Your call is booked
              </h3>
              <p className="text-muted-foreground mb-6">
                Thank you {firstName}! We sent a confirmation to {email}. Please
                check your inbox (and spam folder).
              </p>
              <div className="text-sm text-muted-foreground">
                {selectedDay?.toLocaleDateString()} •{" "}
                {selectedTime ? formatTime(selectedTime) : ""}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <footer className="py-16 border-t border-border bg-background">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          © {new Date().getFullYear()} thirtythree
        </div>
      </footer>
    </div>
  );
}
