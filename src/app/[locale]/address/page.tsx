"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaTag } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { addressAtom } from "../../../atoms/addressAtom";
import { orderParamsAtom } from "../../../atoms/orderParamsAtom";
import useOrderParams from "../../../hooks/useOrderParams";

export default function AddressPage() {
  const router = useRouter();

  useOrderParams();

  const [addressData, setAddressData] = useAtom(addressAtom);
  const [formData, setFormData] = useState(addressData);

  const [orderParams] = useAtom(orderParamsAtom);
  const { subtotal, discount, deliveryFee, total } = orderParams;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setAddressData(formData);
    console.log("User info saved to Jotai:", formData);

    router.push(`/checkout`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col md:flex-row gap-8 flex-grow font-satoshi">
        <div className="md:w-2/3 space-y-4">
          <div className="border border-gray-200 rounded-xl bg-white p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Fields */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">Нэр</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
                  placeholder="Таны нэр"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Утасны дугаар
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
                  placeholder="Дугаар"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Имэйл
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Хаяг</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
                  placeholder="Хот, дүүрэг, байр"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Нэмэлт мэдээлэл
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
                  placeholder="Орцны код, нэмэлт тайлбар"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
              >
                Үргэлжлүүлэх
              </button>
            </form>
          </div>
        </div>

        <div className="md:w-1/3 bg-white rounded-2xl shadow border p-6 h-fit border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-black">Order Summary</h2>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal</span>
            <span className="font-bold text-black">₮{subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Discount (-20%)</span>
            <span className="text-red-500 font-bold">-₮{discount}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-4">
            <span>Delivery Fee</span>
            <span className="font-bold text-black">₮{deliveryFee}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-4 mb-6 text-black">
            <span>Total</span>
            <span className="text-black">₮{total}</span>
          </div>

          <div className="flex mb-4">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 flex-grow">
              <FaTag className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Add promo code"
                className="flex-grow bg-transparent focus:outline-none font-extralight text-gray-600"
              />
            </div>
            <button className="bg-black rounded-full px-4 py-2 text-white h-12 text-base ml-3">
              Apply
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
