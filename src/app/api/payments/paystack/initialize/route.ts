import { NextRequest, NextResponse } from "next/server";
import { PaystackPayment } from "@/lib/payments/paystack";

// Lazy initialization - only create instance when needed
let paystack: PaystackPayment | null = null;

function getPaystackInstance(): PaystackPayment {
  if (!paystack) {
    paystack = new PaystackPayment({
      secretKey: process.env.PAYSTACK_SECRET_KEY || "",
      publicKey: process.env.PAYSTACK_PUBLIC_KEY || "",
    });
  }
  return paystack;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, amount, courseId, courseName, userId, callbackUrl } = body;

    // Validate required fields
    if (!email || !amount) {
      return NextResponse.json(
        { error: "Email and amount are required" },
        { status: 400 }
      );
    }

    const paystackInstance = getPaystackInstance();

    // Convert Naira to Kobo (Paystack uses kobo as smallest unit)
    const amountInKobo = PaystackPayment.nairaToKobo(amount);

    // Initialize payment
    const response = await paystackInstance.initializePayment({
      email,
      amount: amountInKobo,
      currency: "NGN",
      metadata: {
        userId,
        courseId,
        courseName,
        platform: "InnovaSci Open Academy",
      },
      callbackUrl: callbackUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/courses`,
    });

    if (response.status) {
      return NextResponse.json({
        success: true,
        data: {
          authorizationUrl: response.data.authorization_url,
          reference: response.data.reference,
        },
      });
    } else {
      return NextResponse.json(
        { error: response.message || "Failed to initialize payment" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Paystack initialization error:", error);
    return NextResponse.json(
      { error: error.message || "Payment initialization failed" },
      { status: 500 }
    );
  }
}
