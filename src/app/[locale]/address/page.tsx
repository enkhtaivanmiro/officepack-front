"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OrderSummary from "../../components/OrderSummary";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSetAtom } from "jotai";
import { orderParamsAtom } from "../../../atoms/orderParamsAtom";

export default function AddressPage() {
  const t = useTranslations("AddressPage");
  const router = useRouter();
  const setOrderParams = useSetAtom(orderParamsAtom);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    const savedAddress = localStorage.getItem("address");
    if (savedAddress) {
      try {
        setFormData(JSON.parse(savedAddress));
      } catch (err) {
        console.error("Failed to parse address from localStorage", err);
      }
    }

    const savedTotals = localStorage.getItem("cartTotals");
    if (savedTotals) {
      try {
        const totals = JSON.parse(savedTotals);
        setOrderParams(totals);
      } catch (err) {
        console.error("Failed to parse cartTotals from localStorage", err);
      }
    }
  }, [setOrderParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("address", JSON.stringify(formData));
    router.push(`/checkout`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col md:flex-row gap-8 flex-grow font-satoshi">
        <div className="md:w-2/3 space-y-4">
          <div className="border border-gray-200 rounded-xl bg-white p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  {t("fullName")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
                  placeholder={t("fullNamePlaceholder")}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  {t("phoneNumber")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
                  placeholder={t("phoneNumberPlaceholder")}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  {t("email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
                  placeholder={t("emailPlaceholder")}
                  required
                />
              </div>

              {/* <div>
                <label className="block text-sm text-gray-700 mb-1">
                  {t("address")}
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
                  placeholder={t("addressPlaceholder")}
                  required
                />
              </div> */}

              {/* <div>
                <label className="block text-sm text-gray-700 mb-1">
                  {t("additionalInfo")}
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
                  placeholder={t("additionalInfoPlaceholder")}
                  rows={3}
                />
              </div> */}

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
              >
                {t("continue")}
              </button>
            </form>
          </div>
        </div>

        <OrderSummary showCheckout={false} readonlyPromo={true} />
      </main>
      <Footer />
    </div>
  );
}
