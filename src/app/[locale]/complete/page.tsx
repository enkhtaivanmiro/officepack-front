import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-white text-black">
        <div className="bg-gray-100 rounded-xl shadow p-8 w-full max-w-md text-center">
          <div className="flex justify-between text-sm mb-4">
            <div>
              <p className="font-medium">Order number</p>
              <p className="text-gray-500">##########</p>
            </div>
            <div>
              <p className="font-medium">Order Date</p>
              <p className="text-gray-500">****.**.**</p>
            </div>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="flex justify-between text-lg font-medium mb-4">
            <span>Total</span>
            <span>₮600</span>
          </div>

          <div className="flex justify-center mb-4">
            <Image
              src="/icons/qr.png"
              alt="QR Code"
              width={150}
              height={150}
              className="rounded"
            />
          </div>

          <p className="font-semibold mb-4">Thank you for your purchase</p>
          <Link href="/en">
            <button className="px-6 py-2 bg-gray-200 rounded-full shadow-sm hover:bg-gray-300 transition">
              Go Home
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
