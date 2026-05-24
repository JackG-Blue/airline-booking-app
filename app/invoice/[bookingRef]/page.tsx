"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    bookingRef: string;
  }>;
};

type Booking = {
  bookingRef: string;
  flightId: string;
  flightNumber: string;
  origin: string;
  destination: string;
  aircraft: string;
  price: number;
  departureTime: string;
  arrivalTime: string;
  passenger: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  status: "confirmed" | "cancelled";
  createdAt: string;
};

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-NZ", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function InvoicePage({ params }: PageProps) {
  const { bookingRef } = use(params);

  const [booking, setBooking] = useState<Booking | null>(null);
  const [message, setMessage] = useState("Loading invoice...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const response = await fetch(`/api/bookings?bookingRef=${bookingRef}`);
        const data = await response.json();

        if (data.success && data.bookings.length > 0) {
          setBooking(data.bookings[0]);
          setMessage("");
        } else {
          setMessage(data.message || "Booking not found.");
        }
      } catch {
        setMessage("Failed to load booking from the database.");
      }

      setLoading(false);
    }

    fetchBooking();
  }, [bookingRef]);

  return (
    <main
      className="min-h-screen bg-[#050816] bg-cover bg-center bg-fixed text-white"
      style={{ backgroundImage: "url('/images/search-bg.jpg')" }}
    >
      <section className="min-h-screen bg-slate-950/80 px-6 py-10 backdrop-blur-[2px]">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="text-sm font-semibold text-sky-300 hover:text-sky-200"
          >
            ← Back to Home
          </Link>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
              Booking invoice
            </p>

            <h1 className="mt-3 text-5xl font-black tracking-tight">
              Your flight invoice
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Review your booking reference, passenger details, flight schedule,
              booking status, and total price.
            </p>
          </div>

          {message && (
            <div className="mt-10 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl backdrop-blur">
              <h2 className="text-2xl font-black">
                {loading ? "Loading invoice..." : message}
              </h2>

              {!loading && (
                <>
                  <p className="mt-3 text-slate-300">
                    Please check your booking reference or return to the search
                    page to create a new booking.
                  </p>

                  <Link
                    href="/search"
                    className="mt-6 inline-block rounded-2xl bg-sky-400 px-6 py-4 font-black text-slate-950 hover:bg-sky-300"
                  >
                    Search Flights
                  </Link>
                </>
              )}
            </div>
          )}

          {booking && (
            <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/85 shadow-2xl backdrop-blur">
              <div className="border-b border-white/10 p-8">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                      Booking reference
                    </p>

                    <h2 className="mt-2 text-4xl font-black text-white">
                      {booking.bookingRef}
                    </h2>
                  </div>

                  <div
                    className={
                      booking.status === "confirmed"
                        ? "rounded-full bg-sky-400 px-5 py-3 font-black text-slate-950"
                        : "rounded-full bg-red-400 px-5 py-3 font-black text-slate-950"
                    }
                  >
                    {booking.status.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="grid gap-8 p-8 lg:grid-cols-[1fr_1fr]">
                <div className="rounded-3xl border border-white/10 bg-[#050816] p-6">
                  <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                    Passenger
                  </p>

                  <h3 className="mt-3 text-3xl font-black">
                    {booking.passenger.firstName} {booking.passenger.lastName}
                  </h3>

                  <div className="mt-5 grid gap-3 text-slate-300">
                    <p>Email: {booking.passenger.email}</p>
                    <p>Phone: {booking.passenger.phone}</p>
                    <p>Created: {formatDateTime(booking.createdAt)}</p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#050816] p-6">
                  <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                    Flight
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-sky-400 px-3 py-1 text-sm font-black text-slate-950">
                      {booking.flightNumber}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-slate-300">
                      {booking.aircraft}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <div>
                      <p className="text-4xl font-black">{booking.origin}</p>
                      <p className="mt-1 text-sm text-slate-400">Origin</p>
                    </div>

                    <div className="flex flex-1 items-center gap-3">
                      <div className="h-px flex-1 border-t border-dashed border-sky-300/70" />
                      <div className="rounded-full bg-sky-400 px-3 py-2 text-slate-950">
                        ✈
                      </div>
                      <div className="h-px flex-1 border-t border-dashed border-sky-300/70" />
                    </div>

                    <div className="text-right">
                      <p className="text-4xl font-black">
                        {booking.destination}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Destination
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#050816] p-6">
                  <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                    Departure
                  </p>

                  <p className="mt-3 text-2xl font-black">
                    {formatDateTime(booking.departureTime)}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#050816] p-6">
                  <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                    Arrival
                  </p>

                  <p className="mt-3 text-2xl font-black">
                    {formatDateTime(booking.arrivalTime)}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 p-8">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                  <div>
                    <p className="text-sm text-slate-400">Total price</p>
                    <p className="mt-1 text-5xl font-black">
                      ${booking.price}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/search"
                      className="rounded-2xl bg-sky-400 px-6 py-4 font-black text-slate-950 hover:bg-sky-300"
                    >
                      Search More Flights
                    </Link>

                    <Link
                      href="/my-bookings"
                      className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-black text-white hover:bg-white/20"
                    >
                      View My Bookings
                    </Link>

                    <Link
                      href="/cancel"
                      className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-black text-white hover:bg-white/20"
                    >
                      Cancel Booking
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}