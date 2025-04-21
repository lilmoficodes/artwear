import { NextRequest, NextResponse } from "next/server";
import { prismaClientFrontend } from "@/app/lib/prismaClientWrapper";
import Razorpay from "razorpay";

export const runtime = "nodejs";

interface RazorPayProps {
  amount: number;
  currency: string;
  receipt: string;
  id?: string;
  notes?: string;
  offer_id?: number;
  status?: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount }: RazorPayProps = body;

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_CLIENT_ID as string,
    key_secret: process.env.RAZORPAY_CLIENT_SECRET as string,
  });

  try {
    // 1. Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "Payment done by razorpay",
    });

    // 2. Check if order already exists in DB
    const existingPayment = await prismaClientFrontend.payment.findUnique({
      where: {
        order_id: order.id,
      },
    });

    // 3. If not, insert into DB
    if (!existingPayment) {
      await prismaClientFrontend.payment.create({
        data: {
          order_id: order.id,
          amount: Number(order.amount),
          currency: order.currency,
          status: order.status,
          reciept : String(order.receipt)
        },
      });
      console.log("🆕 Order inserted into DB");
    } else {
      console.log("ℹ️ Order already exists in DB");
    }

    // 4. Return Razorpay order
    return NextResponse.json(order);
  } catch (err) {
    console.error("❌ Order creation failed:", err);
    return NextResponse.json(
      { error: "Order creating failed" },
      { status: 500 }
    );
  }
}
