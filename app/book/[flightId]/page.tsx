"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    flightId: string;
  }>;
};

type Flight = {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  aircraft: string;
  capacity: number;
  availableSeats: number;
  price: number;
  departureTime: string;
  arrivalTime: string;
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

export default function BookFlightPage({ params }: PageProps) {
  const { flightId } = use(params);

  const [flight, setFlight] = useState<Flight | null>(null);
  const [pageMessage, setPageMessage] = useState("Loading selected flight...");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [bookingRef, setBookingRef] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    async function fetchFlight() {
      try {
        setLoading(true);

        const response = await fetch(`/api/flights?flightId=${flightId}`);
        const data = await response.json();

        if (data.success) {
          setFlight(data.flight);
          setPageMessage("");
        } else {
          setPageMessage(data.message || "Flight not found.");
        }
      } catch {
        setPageMessage("Failed to load flight from the database.");
      }

      setLoading(false);
    }

    fetchFlight();
  }, [flightId]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!flight) {
      setMessage("Flight not found.");
      return;
    }

    setBookingLoading(true);
    setMessage("");
    setBookingRef("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flightId: flight.id,
          firstName,
          lastName,
          email,
          phone,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const booking = data.booking as Booking;
        setBookingRef(booking.bookingRef);
        setMessage("Booking created successfully.");
      } else {
        setMessage(data.message || "Failed to create booking.");
      }
    } catch {
      setMessage("Failed to connect to the booking database.");
    }

    setBookingLoading(false);
  }

  if (loading || !flight) {
    return (
      <main
        className="min-h-screen bg-[#050816] bg-cover bg-center bg-fixed text-white"
        style={{ backgroundImage: "url('/images/search-bg.jpg')" }}
      >
        <section className="min-h-screen bg-slate-950/80 px-6 py-10 backdrop-blur-[2px]">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/search"
              className="text-sm font-semibold text-sky-300 hover:text-sky-200"
            >
              ← Back to Search
            </Link>

            <div className="mt-10 rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-2xl backdrop-blur">
              <h1 className="text-4xl font-black">
                {loading ? "Loading flight" : pageMessage}
              </h1>

              <p className="mt-4 text-slate-300">
                Please wait while the selected flight is loaded from the
                database.
              </p>

              {!loading && (
                <Link
                  href="/search"
                  className="mt-6 inline-block rounded-2xl bg-sky-400 px-6 py-4 font-black text-slate-950 hover:bg-sky-300"
                >
                  Search Flights
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-[#050816] bg-cover bg-center bg-fixed text-white"
      style={{ backgroundImage: "url('/images/search-bg.jpg')" }}
    >
      <section className="min-h-screen bg-slate-950/80 px-6 py-10 backdrop-blur-[2px]">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/search"
            className="text-sm font-semibold text-sky-300 hover:text-sky-200"
          >
            ← Back to Search
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                Booking details
              </p>

              <h1 className="mt-3 text-5xl font-black tracking-tight">
                Confirm your flight
              </h1>

              <p className="mt-5 leading-8 text-slate-300">
                Review the selected scheduled flight and enter passenger details
                to create a database booking.
              </p>

              <div className="mt-8 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-sky-400 px-3 py-1 text-sm font-black text-slate-950">
                    {flight.flightNumber}
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-slate-300">
                    {flight.aircraft}
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <div>
                    <p className="text-4xl font-black">{flight.origin}</p>
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
                    <p className="text-4xl font-black">{flight.destination}</p>
                    <p className="mt-1 text-sm text-slate-400">Destination</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-[#050816] p-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-sky-300">
                      Departure
                    </p>
                    <p className="mt-1 font-semibold">
                      {formatDateTime(flight.departureTime)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-sky-300">
                      Arrival
                    </p>
                    <p className="mt-1 font-semibold">
                      {formatDateTime(flight.arrivalTime)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Available seats</p>
                    <p className="mt-1 text-2xl font-black">
                      {flight.availableSeats} / {flight.capacity}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-slate-400">Total price</p>
                    <p className="mt-1 text-4xl font-black">${flight.price}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur">
              <h2 className="text-3xl font-black">Passenger information</h2>

              <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-200">
                    First name
                  </label>
                  <input
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-[#050816] px-4 py-4 font-semibold text-white outline-none transition focus:border-sky-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-200">
                    Last name
                  </label>
                  <input
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-[#050816] px-4 py-4 font-semibold text-white outline-none transition focus:border-sky-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-200">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-[#050816] px-4 py-4 font-semibold text-white outline-none transition focus:border-sky-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-200">
                    Phone
                  </label>
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-[#050816] px-4 py-4 font-semibold text-white outline-none transition focus:border-sky-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="rounded-2xl bg-sky-400 px-6 py-4 font-black text-slate-950 shadow-lg shadow-sky-500/20 transition hover:-translate-y-1 hover:bg-sky-300 disabled:opacity-60"
                >
                  {bookingLoading ? "Creating Booking..." : "Confirm Booking"}
                </button>
              </form>

              {message && (
                <div className="mt-6 rounded-3xl border border-white/10 bg-[#050816] p-6">
                  <p className="font-bold text-sky-300">{message}</p>

                  {bookingRef && (
                    <>
                      <p className="mt-4 text-slate-300">
                        Your booking reference is:
                      </p>
                      <p className="mt-2 text-3xl font-black text-white">
                        {bookingRef}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                          href={`/invoice/${bookingRef}`}
                          className="rounded-2xl bg-sky-400 px-5 py-3 font-black text-slate-950 hover:bg-sky-300"
                        >
                          View Invoice
                        </Link>

                        <Link
                          href="/my-bookings"
                          className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 font-black text-white hover:bg-white/20"
                        >
                          View My Bookings
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}