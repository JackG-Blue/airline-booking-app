"use client";

import { useState } from "react";
import Link from "next/link";

type Airport = {
  code: string;
  name: string;
  city: string;
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

const airports: Airport[] = [
  {
    code: "NZNE",
    name: "Dairy Flat Airport",
    city: "Dairy Flat",
  },
  {
    code: "YSSY",
    name: "Sydney Airport",
    city: "Sydney",
  },
  {
    code: "NZRO",
    name: "Rotorua Airport",
    city: "Rotorua",
  },
  {
    code: "NZGB",
    name: "Claris Airport",
    city: "Great Barrier Island",
  },
  {
    code: "NZCI",
    name: "Tuuta Airport",
    city: "Chatham Islands",
  },
  {
    code: "NZTL",
    name: "Lake Tekapo Airport",
    city: "Lake Tekapo",
  },
];

export default function SearchPage() {
  const [origin, setOrigin] = useState("NZNE");
  const [destination, setDestination] = useState("YSSY");
  const [date1, setDate1] = useState("2026-06-01");
  const [date2, setDate2] = useState("2026-06-30");
  const [hasSearched, setHasSearched] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();

    if (origin === destination) {
      setHasSearched(true);
      setFlights([]);
      setMessage("Origin and destination cannot be the same.");
      return;
    }

    setHasSearched(true);
    setLoading(true);
    setFlights([]);
    setMessage("Searching available flights...");

    try {
      const response = await fetch(
        `/api/flights?origin=${origin}&destination=${destination}&date1=${date1}&date2=${date2}`
      );

      const data = await response.json();

      if (data.success) {
        setFlights(data.flights);

        if (data.flights.length === 0) {
          setMessage(
            "No flights found. Try a wider date range or choose another destination."
          );
        } else {
          setMessage("");
        }
      } else {
        setMessage(data.message || "Failed to search flights.");
      }
    } catch {
      setMessage("Failed to connect to the flight database.");
    }

    setLoading(false);
  }

  function getAirport(code: string) {
    return airports.find((airport) => airport.code === code);
  }

  function formatDateTime(value: string) {
    return new Date(value).toLocaleString("en-NZ", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <main
      className="min-h-screen bg-[#050816] bg-cover bg-center bg-fixed text-white"
      style={{ backgroundImage: "url('/images/search-bg.jpg')" }}
    >
      <section className="relative min-h-screen overflow-hidden bg-slate-950/80 px-6 py-10 backdrop-blur-[2px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#1d4ed8_0,transparent_35%),radial-gradient(circle_at_bottom_right,#0ea5e9_0,transparent_30%)] opacity-25" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/"
            className="text-sm font-semibold text-sky-300 hover:text-sky-200"
          >
            ← Back to Home
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                Flight search
              </p>

              <h1 className="mt-3 text-5xl font-black tracking-tight md:text-6xl">
                Find your next scheduled flight
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Select an origin, destination, and date range to view available
                Dairy Flat Airways flights from the database.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                Database mode
              </p>
              <p className="mt-3 leading-7 text-slate-300">
                Flight data is now loaded through the API and stored in MongoDB
                Atlas.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSearch}
            className="mt-10 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur"
          >
            <div className="grid gap-5 lg:grid-cols-[1fr_1fr_0.85fr_0.85fr_auto] lg:items-end">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-200">
                  From
                </label>
                <select
                  value={origin}
                  onChange={(event) => setOrigin(event.target.value)}
                  className="w-full cursor-pointer rounded-2xl border border-white/10 bg-[#050816] px-4 py-4 font-semibold text-white outline-none transition focus:border-sky-300"
                >
                  {airports.map((airport) => (
                    <option
                      key={airport.code}
                      value={airport.code}
                      className="bg-slate-950 text-white"
                    >
                      {airport.name} ({airport.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-200">
                  To
                </label>
                <select
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  className="w-full cursor-pointer rounded-2xl border border-white/10 bg-[#050816] px-4 py-4 font-semibold text-white outline-none transition focus:border-sky-300"
                >
                  {airports.map((airport) => (
                    <option
                      key={airport.code}
                      value={airport.code}
                      className="bg-slate-950 text-white"
                    >
                      {airport.name} ({airport.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-200">
                  Date from
                </label>
                <input
                  type="date"
                  value={date1}
                  onChange={(event) => setDate1(event.target.value)}
                  style={{ colorScheme: "dark" }}
                  className="w-full cursor-pointer rounded-2xl border border-white/10 bg-[#050816] px-4 py-4 font-semibold text-white outline-none transition focus:border-sky-300"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-200">
                  Date to
                </label>
                <input
                  type="date"
                  value={date2}
                  onChange={(event) => setDate2(event.target.value)}
                  style={{ colorScheme: "dark" }}
                  className="w-full cursor-pointer rounded-2xl border border-white/10 bg-[#050816] px-4 py-4 font-semibold text-white outline-none transition focus:border-sky-300"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-sky-400 px-8 py-4 font-black text-slate-950 shadow-lg shadow-sky-500/25 transition hover:-translate-y-1 hover:bg-sky-300 disabled:opacity-60"
              >
                {loading ? "Searching..." : "Search"}
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
                  Choose your route and date range above.
                </h2>
                <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                  The system will display scheduled flights, available seats,
                  aircraft, departure time, arrival time, and price.
                </p>
              </div>
            )}

            {hasSearched && message && flights.length === 0 && (
              <div className="rounded-3xl border border-white/10 bg-slate-950/75 p-8 shadow-xl backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                  Search message
                </p>
                <h2 className="mt-2 text-2xl font-black">{message}</h2>
              </div>
            )}

            {flights.length > 0 && (
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                    Search results
                  </p>
                  <h2 className="mt-1 text-3xl font-black">
                    {flights.length} flight
                    {flights.length > 1 ? "s" : ""} found
                  </h2>
                </div>

                <p className="rounded-full border border-white/10 bg-slate-950/75 px-4 py-2 text-sm text-slate-300 backdrop-blur">
                  {getAirport(origin)?.city} ({origin}) →{" "}
                  {getAirport(destination)?.city} ({destination})
                </p>
              </div>
            )}

            <div className="grid gap-5">
              {flights.map((flight) => (
                <div
                  key={flight.id}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-slate-900"
                >
                  <div className="grid gap-6 p-6 lg:grid-cols-[1.5fr_1fr_auto] lg:items-center">
                    <div>
                      <div className="mb-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-sky-400 px-3 py-1 text-sm font-black text-slate-950">
                          {flight.flightNumber}
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-slate-300">
                          {flight.aircraft}
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-slate-300">
                          {flight.availableSeats} seats left
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <div>
                          <p className="text-4xl font-black">{flight.origin}</p>
                          <p className="mt-1 text-sm text-slate-400">
                            {getAirport(flight.origin)?.city}
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
                            {flight.destination}
                          </p>
                          <p className="mt-1 text-sm text-slate-400">
                            {getAirport(flight.destination)?.city}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 rounded-2xl border border-white/10 bg-[#050816] p-4">
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

                    <div className="flex flex-col gap-4 lg:items-end">
                      <div className="text-left lg:text-right">
                        <p className="text-sm text-slate-400">Price</p>
                        <p className="text-4xl font-black text-white">
                          ${flight.price}
                        </p>
                      </div>

                      <Link
                        href={`/book/${flight.id}`}
                        className="rounded-2xl bg-sky-400 px-6 py-4 text-center font-black text-slate-950 shadow-lg shadow-sky-500/20 transition hover:-translate-y-1 hover:bg-sky-300"
                      >
                        Book Flight
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