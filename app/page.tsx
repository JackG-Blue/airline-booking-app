import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#1d4ed8_0,transparent_35%),radial-gradient(circle_at_bottom_right,#f97316_0,transparent_28%)] opacity-30" />

        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-200">
              <span>✈</span>
              <span>Dairy Flat Airways</span>
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Regional flight booking made{" "}
              <span className="text-sky-300">simple</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Search scheduled flights from Dairy Flat Airport, book a seat,
              receive a unique booking reference, view your invoice, and cancel
              your booking online.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/search"
                className="rounded-2xl bg-sky-400 px-7 py-4 font-bold text-slate-950 shadow-lg shadow-sky-500/25 transition hover:-translate-y-1 hover:bg-sky-300"
              >
                Search Flights
              </Link>

              <Link
                href="/my-bookings"
                className="rounded-2xl border border-white/20 bg-white/10 px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-white/20"
              >
                View My Bookings
              </Link>

              <Link
                href="/cancel"
                className="rounded-2xl border border-white/20 bg-white/10 px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-white/20"
              >
                Cancel Booking
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-black text-sky-300">6</p>
                <p className="mt-1 text-sm text-slate-300">Airports</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-black text-sky-300">272</p>
                <p className="mt-1 text-sm text-slate-300">Scheduled flights</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-black text-sky-300">5</p>
                <p className="mt-1 text-sm text-slate-300">Aircraft</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-2xl shadow-sky-950">
              <img
                src="/images/hero-plane.jpg"
                alt="Aircraft taking off at sunset"
                className="h-[500px] w-full rounded-[1.5rem] object-cover"
              />
            </div>

            <div className="absolute left-6 top-6 rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-4 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                Online Booking System
              </p>
              <p className="mt-1 text-xl font-black">Dairy Flat Airways</p>
            </div>

            <div className="absolute bottom-6 right-6 rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-4 backdrop-blur">
              <p className="text-sm text-slate-300">Powered by</p>
              <p className="mt-1 font-bold text-white">
                Next.js · MongoDB Atlas · Vercel
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
            Booking features
          </p>
          <h2 className="mt-2 text-3xl font-black">
            Everything needed for an online airline booking system
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-7 shadow-lg transition hover:-translate-y-1 hover:bg-slate-800">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400 text-2xl">
              🔎
            </div>
            <h2 className="text-2xl font-bold">Search scheduled flights</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Users can search by origin, destination, and real calendar date
              range to find available flights.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-7 shadow-lg transition hover:-translate-y-1 hover:bg-slate-800">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400 text-2xl">
              🧾
            </div>
            <h2 className="text-2xl font-bold">Booking invoice</h2>
            <p className="mt-3 leading-7 text-slate-300">
              After booking, passengers receive a unique reference and can view
              a full invoice with flight details.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-7 shadow-lg transition hover:-translate-y-1 hover:bg-slate-800">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400 text-2xl">
              ✅
            </div>
            <h2 className="text-2xl font-bold">Manage bookings</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Passengers can search their bookings by email and cancel a booking
              using their booking reference.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900 p-7 shadow-lg">
          <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                Route coverage
              </p>
              <h2 className="mt-2 text-3xl font-black">
                Dairy Flat Airport as the central hub
              </h2>
              <p className="mt-4 leading-7 text-slate-300">
                The system supports scheduled services from Dairy Flat to
                Sydney, Rotorua, Great Barrier Island, Chatham Islands, and Lake
                Tekapo, with return services where required.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl bg-white/5 px-4 py-4">
                <p className="font-bold text-white">Sydney</p>
                <p className="mt-1 text-sm text-slate-400">YSSY</p>
              </div>

              <div className="rounded-2xl bg-white/5 px-4 py-4">
                <p className="font-bold text-white">Rotorua</p>
                <p className="mt-1 text-sm text-slate-400">NZRO</p>
              </div>

              <div className="rounded-2xl bg-white/5 px-4 py-4">
                <p className="font-bold text-white">Great Barrier Island</p>
                <p className="mt-1 text-sm text-slate-400">NZGB</p>
              </div>

              <div className="rounded-2xl bg-white/5 px-4 py-4">
                <p className="font-bold text-white">Chatham Islands</p>
                <p className="mt-1 text-sm text-slate-400">NZCI</p>
              </div>

              <div className="rounded-2xl bg-white/5 px-4 py-4">
                <p className="font-bold text-white">Lake Tekapo</p>
                <p className="mt-1 text-sm text-slate-400">NZTL</p>
              </div>

              <div className="rounded-2xl bg-sky-400 px-4 py-4 text-slate-950">
                <p className="font-black">Hub</p>
                <p className="mt-1 text-sm font-semibold">NZNE Dairy Flat</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}