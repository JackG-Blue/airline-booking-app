"use client";

import { useState } from "react";
import Link from "next/link";

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

export default function MyBookingsPage() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();

    const savedBookings = JSON.parse(
      localStorage.getItem("dfa-bookings") || "[]"
    ) as Booking[];

    const matchedBookings = savedBookings.filter(
      (booking) =>
        booking.passenger.email.toLowerCase() === email.toLowerCase()
    );

    setBookings(matchedBookings);
    setHasSearched(true);

    if (matchedBookings.length === 0) {
      setMessage("No bookings found for this email address.");
    } else {
      setMessage("");
    }
  }

  return (
    <main
      className="min-h-screen bg-[#050816] bg-cover bg-center bg-fixed text-white"
      style={{ backgroundImage: "url('/images/search-bg.jpg')" }}
    >
      <section className="min-h-screen bg-slate-950/80 px-6 py-10 backdrop-blur-[2px]">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="text-sm font-semibold text-sky-300 hover:text-sky-200"
          >
            ← Back to Home
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                Passenger bookings
              </p>

              <h1 className="mt-3 text-5xl font-black tracking-tight">
                View your booked flights
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Enter the passenger email address used when making a booking.
                The system will display all matching scheduled flights.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                Reminder
              </p>
              <p className="mt-3 leading-7 text-slate-300">
                Use the same email address that was entered on the booking form.
                You can then view the invoice for each booking.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSearch}
            className="mt-10 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur"
          >
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-200">
                  Passenger email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Example: passenger@example.com"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[#050816] px-4 py-4 font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300"
                />
              </div>

              <button
                type="submit"
                className="rounded-2xl bg-sky-400 px-8 py-4 font-black text-slate-950 shadow-lg shadow-sky-500/25 transition hover:-translate-y-1 hover:bg-sky-300"
              >
                Find Bookings
              </button>
            </div>
          </form>

          <div className="mt-10">
            {!hasSearched && (
              <div className="rounded-3xl border border-white/10 bg-slate-950/75 p-8 shadow-xl backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                  Start searching
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Enter a passenger email address.
                </h2>

                <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                  After searching, all bookings linked to that email address
                  will appear here.
                </p>
              </div>
            )}

            {hasSearched && message && (
              <div className="rounded-3xl border border-white/10 bg-slate-950/75 p-8 shadow-xl backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                  No results
                </p>

                <h2 className="mt-2 text-2xl font-black">{message}</h2>

                <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                  Check the spelling of the email address or create a new
                  booking from the flight search page.
                </p>

                <Link
                  href="/search"
                  className="mt-6 inline-block rounded-2xl bg-sky-400 px-6 py-4 font-black text-slate-950 hover:bg-sky-300"
                >
                  Search Flights
                </Link>
              </div>
            )}

            {bookings.length > 0 && (
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                    Booking results
                  </p>

                  <h2 className="mt-1 text-3xl font-black">
                    {bookings.length} booking
                    {bookings.length > 1 ? "s" : ""} found
                  </h2>
                </div>

                <p className="rounded-full border border-white/10 bg-slate-950/75 px-4 py-2 text-sm text-slate-300 backdrop-blur">
                  {email}
                </p>
              </div>
            )}

            <div className="grid gap-5">
              {bookings.map((booking) => (
                <div
                  key={booking.bookingRef}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-slate-900"
                >
                  <div className="grid gap-6 p-6 lg:grid-cols-[1.5fr_1fr_auto] lg:items-center">
                    <div>
                      <div className="mb-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-sky-400 px-3 py-1 text-sm font-black text-slate-950">
                          {booking.bookingRef}
                        </span>

                        <span
                          className={
                            booking.status === "confirmed"
                              ? "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-sky-300"
                              : "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-red-300"
                          }
                        >
                          {booking.status.toUpperCase()}
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-slate-300">
                          {booking.aircraft}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <div>
                          <p className="text-4xl font-black">
                            {booking.origin}
                          </p>
                          <p className="mt-1 text-sm text-slate-400">
                            Origin
                          </p>
                        </div>

                        <div className="flex min-w-28 flex-1 items-center gap-3">
                          <div className="h-px flex-1 border-t border-dashed border-sky-300/70" />
                          <div className="rounded-full bg-sky-400 px-3 py-2 text-slate-950">
                            ✈
                          </div>
                          <div className="h-px flex-1 border-t border-dashed border-sky-300/70" />
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-4xl font-black">
                            {booking.destination}
                          </p>
                          <p className="mt-1 text-sm text-slate-400">
                            Destination
                          </p>
                        </div>
                      </div>

                      <p className="mt-4 text-slate-300">
                        Passenger:{" "}
                        <span className="font-semibold text-white">
                          {booking.passenger.firstName}{" "}
                          {booking.passenger.lastName}
                        </span>
                      </p>
                    </div>

                    <div className="grid gap-3 rounded-2xl border border-white/10 bg-[#050816] p-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-sky-300">
                          Departure
                        </p>
                        <p className="mt-1 font-semibold">
                          {formatDateTime(booking.departureTime)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-sky-300">
                          Arrival
                        </p>
                        <p className="mt-1 font-semibold">
                          {formatDateTime(booking.arrivalTime)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 lg:items-end">
                      <div className="text-left lg:text-right">
                        <p className="text-sm text-slate-400">Price</p>
                        <p className="text-4xl font-black text-white">
                          ${booking.price}
                        </p>
                      </div>

                      <Link
                        href={`/invoice/${booking.bookingRef}`}
                        className="rounded-2xl bg-sky-400 px-6 py-4 text-center font-black text-slate-950 shadow-lg shadow-sky-500/20 transition hover:-translate-y-1 hover:bg-sky-300"
                      >
                        View Invoice
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}