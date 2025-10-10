"use client";

import React, { Suspense } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useTranslations } from "next-intl";

function OrderConfirmationContent() {
  const t = useTranslations("OrderConfirmation");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center bg-white text-black">
        <div className="bg-gray-100 rounded-xl shadow p-8 max-w-md text-center w-[731px]">
          <p className="font-semibold mb-4">{t("thankYou")}</p>
          <p className="mb-4">Order is complete!</p>

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

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
