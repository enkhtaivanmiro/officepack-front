"use client";

import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";

interface PaymentResult {
  invoiceId: string;
  qr_text: string;
}

interface PaymentData {
  _id: string;
  paymentResult?: PaymentResult | null;
  status: string;
}

export default function PaymentPage({
  params,
}: {
  params: { orderId: string };
}) {
  const t = useTranslations("PaymentPage");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);

  const orderId = params.orderId;
  const [paymentId, setPaymentId] = useState<string | null>(null);

  // Get paymentId from query
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) setPaymentId(id);
    else console.error("Payment ID missing from URL");
  }, [searchParams]);

  // Poll payment status every 5 seconds
  useEffect(() => {
    if (!paymentId) return;

    let interval: NodeJS.Timeout;

    const fetchPaymentStatus = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/payment/check/${orderId}/${paymentId}`
        );
        if (!res.ok) throw new Error("Failed to fetch payment status");

        const data: PaymentData = await res.json();
        setPaymentData(data);

        if (data.status === "success") {
          clearInterval(interval);
          router.push("/complete");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
    interval = setInterval(fetchPaymentStatus, 5000);

    return () => clearInterval(interval);
  }, [paymentId, orderId, router]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      fetch("http://localhost:3000/orders/restore-expired", { method: "POST" })
        .then(() => console.log("Expired order restored"))
        .catch(console.error);
    }
  }, [timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  // Function to manually check payment status
  const checkPaymentManually = async () => {
    if (!paymentId) return alert("Missing payment ID");

    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/payment/check/${orderId}/${paymentId}`
      );
      if (!res.ok) throw new Error("Failed to check payment status");

      const data: PaymentData = await res.json();
      setPaymentData(data);

      if (data.status === "success") {
        router.push("/complete");
      } else {
        alert("Payment is not done yet.");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow px-4">
        <div className="relative bg-gradient-to-b from-gray-200 to-gray-300 rounded-xl shadow-lg mt-14 mb-14 p-8 w-[459px] flex flex-col items-center text-center">
          <button
            className="absolute top-3 right-3"
            onClick={() => router.back()}
          >
            <X size={20} />
          </button>

          <h2 className="text-lg font-semibold">{t("step")}</h2>
          <h1 className="text-2xl font-bold mb-2">{t("payment")}</h1>
          <p className="text-sm text-gray-600 mb-4">{t("instructions")}</p>

          <div className="bg-white rounded-lg p-2 shadow mb-4">
            {loading ? (
              <p>Loading QR...</p>
            ) : paymentData ? (
              <QRCodeCanvas
                value={paymentData?.paymentResult?.qr_text || ""}
                size={180}
                level="H"
                includeMargin
              />
            ) : (
              <p>QR not available</p>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-4">
            {t("cancelOrder")} <br />
            <span className="font-medium">
              {minutes} {t("minutes")} {seconds} {t("seconds")}
            </span>
          </p>

          <button
            className="bg-gradient-to-b from-gray-100 to-gray-300 rounded-full px-4 py-2 w-full font-medium shadow hover:from-gray-200 hover:to-gray-400"
            onClick={checkPaymentManually}
          >
            {t("checkTransaction")}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
