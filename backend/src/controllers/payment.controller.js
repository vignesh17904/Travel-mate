import Stripe from "stripe";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = asyncHandler(async (req, res) => {
  const { hotelName, totalPrice, bookingId } = req.body;

  if (!bookingId) throw new ApiError(400, "Booking ID is required");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: { name: hotelName },
          unit_amount: totalPrice * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CORS_ORIGIN}/payment-success?bookingId=${bookingId}`,
    cancel_url: `${process.env.CORS_ORIGIN}/payment-cancel?bookingId=${bookingId}`,
  });

  res.status(200).json(
    new ApiResponse(200, { sessionId: session.id }, "Checkout session created")
  );
});
