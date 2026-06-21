import { NextRequest, NextResponse } from "next/server";
import { koboToNaira } from "@/lib/payments/paystack";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    // Verify webhook signature
    if (process.env.PAYSTACK_WEBHOOK_SECRET && signature) {
      // In production, verify the signature using the webhook secret
      // const crypto = require('crypto');
      // const hash = crypto.createHmac('sha512', process.env.PAYSTACK_WEBHOOK_SECRET)
      //   .update(rawBody)
      //   .digest('hex');
      // if (hash !== signature) {
      //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      // }
    }

    const event = JSON.parse(rawBody);
    const { event: eventType, data } = event;

    // Handle different webhook events
    switch (eventType) {
      case "charge.success":
        await handleSuccessfulPayment(data);
        break;

      case "charge.failed":
        await handleFailedPayment(data);
        break;

      case "transfer.success":
        await handleSuccessfulTransfer(data);
        break;

      case "refund.created":
        await handleRefund(data);
        break;

      default:
        console.log(`Unhandled Paystack event: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Paystack webhook error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handleSuccessfulPayment(data: any) {
  const supabase = await createServerSupabaseClient();

  // Extract metadata
  const { userId, courseId } = data.metadata || {};

  if (userId && courseId) {
    // Record the payment in the database
    const { error: paymentError } = await supabase.from("payments").insert({
      user_id: userId,
      course_id: courseId,
      amount: koboToNaira(data.amount),
      currency: data.currency || "NGN",
      status: "COMPLETED",
      provider: "PAYSTACK",
      reference: data.reference,
      provider_ref: data.id.toString(),
      description: `Payment for course enrollment`,
    });

    if (paymentError) {
      console.error("Error recording payment:", paymentError);
    }

    // Create enrollment
    const { error: enrollmentError } = await supabase.from("enrollments").upsert(
      {
        user_id: userId,
        course_id: courseId,
        progress_percent: 0,
        completed: false,
      },
      {
        onConflict: "user_id,course_id",
      }
    );

    if (enrollmentError) {
      console.error("Error creating enrollment:", enrollmentError);
    }

    // Create notification
    await supabase.from("notifications").insert({
      user_id: userId,
      title: "Payment Successful",
      message: "Your payment has been processed successfully. You now have access to the course.",
      type: "PAYMENT",
      link: `/dashboard/courses/${courseId}`,
    });
  }
}

async function handleFailedPayment(data: any) {
  const supabase = await createServerSupabaseClient();
  const { userId, courseId } = data.metadata || {};

  if (userId && courseId) {
    // Record the failed payment
    await supabase.from("payments").insert({
      user_id: userId,
      course_id: courseId,
      amount: koboToNaira(data.amount),
      currency: data.currency || "NGN",
      status: "FAILED",
      provider: "PAYSTACK",
      reference: data.reference,
      description: "Payment failed",
    });

    // Notify user
    await supabase.from("notifications").insert({
      user_id: userId,
      title: "Payment Failed",
      message: "Your payment could not be processed. Please try again or contact support.",
      type: "PAYMENT",
    });
  }
}

async function handleSuccessfulTransfer(data: any) {
  console.log("Transfer successful:", data);
  // Handle payout to instructors if needed
}

async function handleRefund(data: any) {
  const supabase = await createServerSupabaseClient();
  
  // Record the refund
  await supabase.from("payments").update({
    status: "REFUNDED",
  }).eq("reference", data.reference);
}
