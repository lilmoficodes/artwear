'use client';
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  callback_url?: string;
  theme: {
    color: string;
  };
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: {
    [key: string]: string;
  };
}
interface RazorpayInstance {
  open(): void;
  on(event: string, handler: (...args: string[]) => void): void;
}
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}


interface RazorPayProps{
  amount : number,
  key : string,
  currency : string,
  receipt : string,
  customer_id? : string,
  order_id: string, 
  callback_url? : string,
  name : string,
  description : string,
  theme : {
    color: string;
  }
}
const handlePayment = async (amount: number) => {
  if (typeof window.Razorpay === 'undefined') {
    alert('Razorpay script not loaded yet!');
    return;
  }

  const res = await fetch("/api/auth/razorpay/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });

  const order : RazorPayProps = await res.json();

  const options : RazorPayProps = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_CLIENT_ID!, // public key
    amount: order.amount,
    order_id : order.order_id,
    currency: order.currency,
    customer_id: order.customer_id,
    callback_url : process.env.NEXT_PUBLIC_RAZORPAY_CALLBACK,
    name: "Artwear",
    description: "Purchase from Artwear",
    theme: { color: "#000" },
    receipt : order.receipt
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

const PaymentButton = ({ amount }: { amount: number }) => (
  <button className="uppercase bg-white text-black rounded-xs cursor-pointer px-5 py-1" onClick={() => handlePayment(amount)}>
    Pay ₹{amount}
  </button>
);

export default PaymentButton;
