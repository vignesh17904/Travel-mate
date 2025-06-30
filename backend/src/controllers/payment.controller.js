import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createcheckoutSession = asyncHandler(async (req, res) => {
  const { hotelName, totalPrice } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: hotelName,
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CORS_ORIGIN}/payment-success`,
      cancel_url: `${process.env.CORS_ORIGIN}/payment-cancel`,
    });

    res.status(200).json(
      new ApiResponse(200, { sessionId: session.id  }, "Checkout session created successfully")
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new ApiError(500, "Internal Server Error");
  }
});
