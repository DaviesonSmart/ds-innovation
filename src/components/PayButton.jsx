// src/components/PayButton.jsx
import React from "react";
import { usePaystackPayment } from "react-paystack";

export default function PayButton({ email, amount, onSuccessCallback }) {
  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: amount * 100, // Paystack uses Kobo
    publicKey: "pk_test_b8a9325c39746dc553bdabcdcef82973d11f1430", // REPLACE with your Paystack public key
  };

  const onSuccess = (reference) => {
    console.log("✅ Payment Success:", reference);
    alert("Payment successful! 🎉");
    if (onSuccessCallback) onSuccessCallback(reference);
  };

  const onClose = () => {
    console.log("❌ Payment window closed");
    alert("Payment window closed.");
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <button
      className="btn btn-success"
      onClick={() => initializePayment(onSuccess, onClose)}
    >
      Pay Now
    </button>
  );
}
