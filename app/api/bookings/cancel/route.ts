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

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { bookingRef } = body;

    if (!bookingRef) {
      return Response.json(
        {
          success: false,
          message: "bookingRef is required.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("airline_booking");
    const bookingsCollection = db.collection<Booking>("bookings");

    const booking = await bookingsCollection.findOne({ bookingRef });

    if (!booking) {
      return Response.json(
        {
          success: false,
          message: "Booking reference not found.",
        },
        { status: 404 }
      );
    }

    if (booking.status === "cancelled") {
      return Response.json(
        {
          success: false,
          message: "This booking has already been cancelled.",
          booking,
        },
        { status: 400 }
      );
    }

    await bookingsCollection.updateOne(
      { bookingRef },
      {
        $set: {
          status: "cancelled",
        },
      }
    );

    const updatedBooking = await bookingsCollection.findOne({ bookingRef });

    return Response.json({
      success: true,
      message: "Booking cancelled successfully.",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Cancel booking API error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to cancel booking.",
      },
      { status: 500 }
    );
  }
}