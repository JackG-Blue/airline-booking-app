"use client";

import { use, useState } from "react";
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

const flights: Flight[] = [
  {
    id: "df101-2026-06-05",
    flightNumber: "DF101",
    origin: "NZNE",
    destination: "YSSY",
    aircraft: "SyberJet SJ30i",
    capacity: 6,
    availableSeats: 6,
    price: 950,
    departureTime: "2026-06-05T10:00:00",
    arrivalTime: "2026-06-05T12:30:00",
  },
  {
    id: "df101-2026-06-12",
    flightNumber: "DF101",
    origin: "NZNE",
    destination: "YSSY",
    aircraft: "SyberJet SJ30i",
    capacity: 6,
    availableSeats: 5,
    price: 950,
    departureTime: "2026-06-12T10:00:00",
    arrivalTime: "2026-06-12T12:30:00",
  },
  {
    id: "df101-2026-06-19",
    flightNumber: "DF101",
    origin: "NZNE",
    destination: "YSSY",
    aircraft: "SyberJet SJ30i",
    capacity: 6,
    availableSeats: 4,
    price: 950,
    departureTime: "2026-06-19T10:00:00",
    arrivalTime: "2026-06-19T12:30:00",
  },
  {
    id: "df102-2026-06-07",
    flightNumber: "DF102",
    origin: "YSSY",
    destination: "NZNE",
    aircraft: "SyberJet SJ30i",
    capacity: 6,
    availableSeats: 4,
    price: 950,
    departureTime: "2026-06-07T15:00:00",
    arrivalTime: "2026-06-07T19:50:00",
  },
  {
    id: "df201-2026-06-02",
    flightNumber: "DF201",
    origin: "NZNE",
    destination: "NZRO",
    aircraft: "Cirrus SF50",
    capacity: 4,
    availableSeats: 3,
    price: 220,
    departureTime: "2026-06-02T07:30:00",
    arrivalTime: "2026-06-02T08:25:00",
  },
  {
    id: "df203-2026-06-02",
    flightNumber: "DF203",
    origin: "NZNE",
    destination: "NZRO",
    aircraft: "Cirrus SF50",
    capacity: 4,
    availableSeats: 4,
    price: 220,
    departureTime: "2026-06-02T16:30:00",
    arrivalTime: "2026-06-02T17:25:00",
  },
  {
    id: "df202-2026-06-02",
    flightNumber: "DF202",
    origin: "NZRO",
    destination: "NZNE",
    aircraft: "Cirrus SF50",
    capacity: 4,
    availableSeats: 2,
    price: 220,
    departureTime: "2026-06-02T09:00:00",
    arrivalTime: "2026-06-02T10:00:00",
  },
  {
    id: "df204-2026-06-02",
    flightNumber: "DF204",
    origin: "NZRO",
    destination: "NZNE",
    aircraft: "Cirrus SF50",
    capacity: 4,
    availableSeats: 3,
    price: 220,
    departureTime: "2026-06-02T18:00:00",
    arrivalTime: "2026-06-02T19:00:00",
  },
  {
    id: "df301-2026-06-03",
    flightNumber: "DF301",
    origin: "NZNE",
    destination: "NZGB",
    aircraft: "Cirrus SF50",
    capacity: 4,
    availableSeats: 4,
    price: 180,
    departureTime: "2026-06-03T09:30:00",
    arrivalTime: "2026-06-03T10:10:00",
  },
  {
    id: "df302-2026-06-04",
    flightNumber: "DF302",
    origin: "NZGB",
    destination: "NZNE",
    aircraft: "Cirrus SF50",
    capacity: 4,
    availableSeats: 3,
    price: 180,
    departureTime: "2026-06-04T10:00:00",
    arrivalTime: "2026-06-04T10:45:00",
  },
  {
    id: "df401-2026-06-05",
    flightNumber: "DF401",
    origin: "NZNE",
    destination: "NZCI",
    aircraft: "HondaJet Elite",
    capacity: 5,
    availableSeats: 5,
    price: 680,
    departureTime: "2026-06-05T11:00:00",
    arrivalTime: "2026-06-05T13:30:00",
  },
  {
    id: "df501-2026-06-01",
    flightNumber: "DF501",
    origin: "NZNE",
    destination: "NZTL",
    aircraft: "HondaJet Elite",
    capacity: 5,
    availableSeats: 4,
    price: 520,
    departureTime: "2026-06-01T12:00:00",
    arrivalTime: "2026-06-01T13:35:00",
  },
];

function createBookingReference() {
  const timePart = Date.now().toString().slice(-6);
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `BK-${timePart}-${randomPart}`;
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-NZ", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function BookFlightPage({ params }: PageProps) {
  const { flightId } = use(params);

  const flight = flights.find((item) => item.id === flightId);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!flight) {
      setMessage("Flight not found.");
      return;
    }

    const newBookingRef = createBookingReference();

    const booking: Booking = {
      bookingRef: newBookingRef,
      flightId: flight.id,
      flightNumber: flight.flightNumber,
      origin: flight.origin,
      destination: flight.destination,
      aircraft: flight.aircraft,
      price: flight.price,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      passenger: {
        firstName,
        lastName,
        email,
        phone,
      },
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    const existingBookings = JSON.parse(
      localStorage.getItem("dfa-bookings") || "[]"
    ) as Booking[];

    localStorage.setItem(
      "dfa-bookings",
      JSON.stringify([...existingBookings, booking])
    );

    setBookingRef(newBookingRef);
    setMessage("Booking created successfully.");
  }

  if (!flight) {
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

            <div className="mt-10 rounded-3xl border border-white/10 bg-slate-950/80 p-8">
              <h1 className="text-4xl font-black">Flight not found</h1>
              <p className="mt-4 text-slate-300">
                Please return to the search page and choose another scheduled
                flight.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-[#050816] bg-cover bg-center bg-fixed text-white"
      style={{ backgroundImage: "url('/images/search-bg.png')" }}
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
                to create a booking.
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
                  className="rounded-2xl bg-sky-400 px-6 py-4 font-black text-slate-950 shadow-lg shadow-sky-500/20 transition hover:-translate-y-1 hover:bg-sky-300"
                >
                  Confirm Booking
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