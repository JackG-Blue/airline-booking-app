"use client";

import { useState } from "react";
import Link from "next/link";

export default function CancelBookingPage() {
  const [bookingRef, setBookingRef] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [cancelledRef, setCancelledRef] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCancel(event: React.FormEvent) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(false);
    setCancelledRef("");

    try {
      const response = await fetch("/api/bookings/cancel", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingRef,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setCancelledRef(data.booking.bookingRef);
        setMessage("Booking cancelled successfully.");
      } else {
        setSuccess(false);
        setCancelledRef(data.booking?.bookingRef || "");
        setMessage(data.message || "Failed to cancel booking.");
      }
    } catch {
      setSuccess(false);
      setCancelledRef("");
      setMessage("Failed to connect to the booking database.");
    }

    setLoading(false);
  }

  return (
    <main
      className="min-h-screen bg-[#050816] bg-cover bg-center bg-fixed text-white"
      style={{ backgroundImage: "url('/images/search-bg.jpg')" }}
    >
      <section className="min-h-screen bg-slate-950/80 px-6 py-10 backdrop-blur-[2px]">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="text-sm font-semibold text-sky-300 hover:text-sky-200"
          >
            ← Back to Home
          </Link>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
              Manage booking
            </p>

            <h1 className="mt-3 text-5xl font-black tracking-tight">
              Cancel a booking
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Enter your booking reference to cancel a confirmed booking. The
              updated status will be saved in MongoDB and shown on the invoice.
            </p>
          </div>

          <form
            onSubmit={handleCancel}
            className="mt-10 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur"
          >
            <label className="mb-2 block text-sm font-bold text-slate-200">
              Booking reference
            </label>

            <input
              value={bookingRef}
              onChange={(event) => setBookingRef(event.target.value)}
              placeholder="Example: BK-123456-ABCDEF"
              required
              className="w-full rounded-2xl border border-white/10 bg-[#050816] px-4 py-4 font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-5 w-full rounded-2xl bg-sky-400 px-6 py-4 font-black text-slate-950 shadow-lg shadow-sky-500/20 transition hover:-translate-y-1 hover:bg-sky-300 disabled:opacity-60"
            >
              {loading ? "Cancelling..." : "Cancel Booking"}
            </button>
          </form>

          {message && (
            <div className="mt-8 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur">
              <p
                className={
                  success
                    ? "text-xl font-black text-sky-300"
                    : "text-xl font-black text-red-300"
                }
              >
                {message}
              </p>

              {cancelledRef && (
                <p className="mt-3 text-slate-300">
                  Booking reference:{" "}
                  <span className="font-bold text-white">{cancelledRef}</span>
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                {cancelledRef && (
                  <Link
                    href={`/invoice/${cancelledRef}`}
                    className="rounded-2xl bg-sky-400 px-6 py-4 font-black text-slate-950 hover:bg-sky-300"
                  >
                    View Updated Invoice
                  </Link>
                )}

                <Link
                  href="/my-bookings"
                  className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-black text-white hover:bg-white/20"
                >
                  View My Bookings
                </Link>

                <Link
                  href="/search"
                  className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-black text-white hover:bg-white/20"
                >
                  Search Flights
                </Link>
              </div>
            </div>
          )}

          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
              Database note
            </p>

            <p className="mt-3 leading-7 text-slate-300">
              This page updates the booking status in MongoDB Atlas. After
              cancellation, the invoice and my bookings pages will show the
              updated status.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}