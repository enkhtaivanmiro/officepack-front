"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import { X } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function PaymentPage() {
  const t = useTranslations("PaymentPage");

  const [timeLeft, setTimeLeft] = useState(10 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        cart.forEach(async (item: any) => {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/variant-attribute/${item.variantId}/stock`
            );
            if (!res.ok) throw new Error("Failed to fetch stock");
            const data = await res.json();

            const currentStock = data.stock ?? 0;
            const newStock = currentStock + item.quantity;

            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/variant-attribute/${item.variantId}/stock`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ stock: newStock }),
              }
            );

            console.log(
              `Restored ${item.quantity} to variant ${item.variantId}, new stock = ${newStock}`
            );
          } catch (err) {
            console.error("Error restoring stock:", err);
          }
        });
      } catch (err) {
        console.error("Error reading cart:", err);
      }
    }
  }, [timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />

      <main className="flex flex-col items-center justify-center flex-grow px-4">
        <div className="relative bg-gradient-to-b from-gray-200 to-gray-300 rounded-xl shadow-lg mt-14 mb-14 p-8 w-[459px] flex flex-col items-center text-center">
          <button className="absolute top-3 right-3">
            <X size={20} />
          </button>

          <h2 className="text-lg font-semibold">{t("step")}</h2>
          <h1 className="text-2xl font-bold mb-2">{t("payment")}</h1>
          <p className="text-sm text-gray-600 mb-4">{t("instructions")}</p>

          <div className="bg-white rounded-lg p-2 shadow mb-4">
            <Image
              src="/icons/qr.png"
              alt={t("qrCodeAlt")}
              width={180}
              height={180}
              className="object-contain"
            />
          </div>

          <p className="text-sm text-gray-600 mb-4">
            {t("cancelOrder")} <br />
            <span className="font-medium">
              {minutes} {t("minutes")} {seconds} {t("seconds")}
            </span>
          </p>

          <Link href="/complete">
            <button className="bg-gradient-to-b from-gray-100 to-gray-300 rounded-full px-4 py-2 w-full font-medium shadow hover:from-gray-200 hover:to-gray-400">
              {t("checkTransaction")}
            </button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
