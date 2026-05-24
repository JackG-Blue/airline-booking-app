import clientPromise from "@/lib/mongodb";

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

function createBookingReference() {
  const timePart = Date.now().toString().slice(-6);
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `BK-${timePart}-${randomPart}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { flightId, firstName, lastName, email, phone } = body;

    if (!flightId || !firstName || !lastName || !email || !phone) {
      return Response.json(
        {
          success: false,
          message: "Missing required booking fields.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("airline_booking");

    const flightsCollection = db.collection<Flight>("flights");
    const bookingsCollection = db.collection<Booking>("bookings");

    const flight = await flightsCollection.findOne({ id: flightId });

    if (!flight) {
      return Response.json(
        {
          success: false,
          message: "Flight not found.",
        },
        { status: 404 }
      );
    }

    const confirmedBookings = await bookingsCollection.countDocuments({
      flightId,
      status: "confirmed",
    });

    if (confirmedBookings >= flight.capacity) {
      return Response.json(
        {
          success: false,
          message: "No seats available for this flight.",
        },
        { status: 400 }
      );
    }

    const booking: Booking = {
      bookingRef: createBookingReference(),
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

    await bookingsCollection.insertOne(booking);

    return Response.json({
      success: true,
      message: "Booking created successfully.",
      booking,
    });
  } catch (error) {
    console.error("Create booking API error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to create booking.",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const email = searchParams.get("email");
    const bookingRef = searchParams.get("bookingRef");

    if (!email && !bookingRef) {
      return Response.json(
        {
          success: false,
          message: "email or bookingRef is required.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("airline_booking");
    const bookingsCollection = db.collection<Booking>("bookings");

    const query = bookingRef
      ? { bookingRef }
      : { "passenger.email": email };

    const bookings = await bookingsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Fetch bookings API error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch bookings.",
      },
      { status: 500 }
    );
  }
}