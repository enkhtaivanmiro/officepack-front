"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import { X } from "lucide-react";

export default function PaymentPage() {
  const [timeLeft, setTimeLeft] = useState(7 * 60 + 30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />

      <main className="flex flex-col items-center justify-center flex-grow px-4">
        <div className="relative bg-gradient-to-b from-gray-200 to-gray-300 rounded-xl shadow-lg p-8 w-[320px] flex flex-col items-center text-center">
          {/* Close button */}
          <button className="absolute top-3 right-3">
            <X size={20} />
          </button>

          <h2 className="text-lg font-semibold">Step 2</h2>
          <h1 className="text-2xl font-bold mb-2">Payment</h1>
          <p className="text-sm text-gray-600 mb-4">
            Scan the QR code using any of your banking app to make a payment
          </p>

          <div className="bg-white rounded-lg p-2 shadow mb-4">
            <Image
              src="/icons/qr.png"
              alt="QR Code"
              width={180}
              height={180}
              className="object-contain"
            />
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Cancel order <br />
            <span className="font-medium">
              {minutes} min {seconds} sec
            </span>
          </p>

          <button className="bg-gradient-to-b from-gray-100 to-gray-300 rounded-full px-4 py-2 w-full font-medium shadow hover:from-gray-200 hover:to-gray-400">
            Check the transaction
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
