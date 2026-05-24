import clientPromise from "@/lib/mongodb";

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

const defaultFlights: Flight[] = [
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

async function ensureFlightsSeeded() {
  const client = await clientPromise;
  const db = client.db("airline_booking");
  const flightsCollection = db.collection<Flight>("flights");

  const count = await flightsCollection.countDocuments();

  if (count === 0) {
    await flightsCollection.insertMany(defaultFlights);
  }

  return flightsCollection;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const date1 = searchParams.get("date1");
    const date2 = searchParams.get("date2");
    const flightId = searchParams.get("flightId");

    const flightsCollection = await ensureFlightsSeeded();

    if (flightId) {
      const flight = await flightsCollection.findOne({ id: flightId });

      if (!flight) {
        return Response.json(
          { success: false, message: "Flight not found." },
          { status: 404 }
        );
      }

      return Response.json({
        success: true,
        flight,
      });
    }

    if (!origin || !destination || !date1 || !date2) {
      return Response.json(
        {
          success: false,
          message: "origin, destination, date1, and date2 are required.",
        },
        { status: 400 }
      );
    }

    const startDate = new Date(`${date1}T00:00:00`);
    const endDate = new Date(`${date2}T23:59:59`);

    const flights = await flightsCollection
      .find({
        origin,
        destination,
        departureTime: {
          $gte: startDate.toISOString().slice(0, 19),
          $lte: endDate.toISOString().slice(0, 19),
        },
      })
      .sort({ departureTime: 1 })
      .toArray();

    return Response.json({
      success: true,
      flights,
    });
  } catch (error) {
    console.error("Flights API error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch flights.",
      },
      { status: 500 }
    );
  }
}