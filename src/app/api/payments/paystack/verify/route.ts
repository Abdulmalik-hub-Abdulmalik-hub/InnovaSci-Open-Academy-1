import { NextRequest, NextResponse } from "next/server";
import { verifyTransaction, koboToNaira } from "@/lib/payments/paystack";

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

    // Verify the transaction with Paystack
    const response = await verifyTransaction(reference);

    if (response.status && response.data && response.data.status === "success") {
      // Transaction verified successfully
      const transactionData = response.data;
      
      return NextResponse.json({
        success: true,
        data: {
          verified: true,
          reference: transactionData.reference,
          amount: koboToNaira(transactionData.amount),
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
