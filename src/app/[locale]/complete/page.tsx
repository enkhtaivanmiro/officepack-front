"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { QRCodeCanvas } from "qrcode.react";
import { useSearchParams, useRouter } from "next/navigation";

interface EbarimtResponse {
  qrData: string;
}

export default function OrderConfirmationPage() {
  const t = useTranslations("OrderConfirmation");
  const searchParams = useSearchParams();
  const router = useRouter();
  const invoiceId = searchParams.get("invoiceId");

  const [qrData, setQrData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!invoiceId) {
      router.push("/en");
      return;
    }

    const fetchEbarimt = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payment/ebarimt/${invoiceId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to fetch ebarimt");
        }

        const data: EbarimtResponse = await res.json();
        setQrData(data.qrData);
        console.log("Fetched QR Data:", data.qrData);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEbarimt();
  }, [invoiceId, router]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center bg-white text-black">
        <div className="bg-gray-100 rounded-xl shadow p-8 max-w-md text-center w-[731px]">
          <p className="font-semibold mb-4">{t("thankYou")}</p>
          <p className="mb-4">Ebarimt:</p>
          {loading ? (
            <p className="text-gray-500">Loading QR...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : qrData ? (
            <div className="my-4 flex flex-col items-center justify-center">
              <QRCodeCanvas value={qrData} size={200} />
              <p className="text-sm mt-2 text-center">
                Scan this QR to see your receipt
              </p>
            </div>
          ) : (
            <p className="text-red-500">QR code not available</p>
          )}

          <Link href="/en">
            <button className="px-6 py-2 bg-gray-200 rounded-full shadow-sm hover:bg-gray-300 transition mt-4">
              {t("goHome")}
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
