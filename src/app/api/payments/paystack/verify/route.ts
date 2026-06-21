import { NextRequest, NextResponse } from "next/server";
import { PaystackPayment } from "@/lib/payments/paystack";

// Lazy initialization
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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { error: "Reference is required" },
        { status: 400 }
      );
    }

    const paystackInstance = getPaystackInstance();

    // Verify the transaction with Paystack
    const response = await paystackInstance.verifyTransaction(reference);

    if (response.status && response.data.status === "success") {
      // Transaction verified successfully
      const transactionData = response.data;
      
      return NextResponse.json({
        success: true,
        data: {
          verified: true,
          reference: transactionData.reference,
          amount: PaystackPayment.koboToNaira(transactionData.amount),
          currency: transactionData.currency,
          status: transactionData.status,
          customer: transactionData.customer,
          paidAt: transactionData.paidAt,
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        data: {
          verified: false,
          status: response.data?.status || "failed",
        },
      });
    }
  } catch (error: any) {
    console.error("Paystack verification error:", error);
    return NextResponse.json(
      { error: error.message || "Verification failed" },
      { status: 500 }
    );
  }
}
