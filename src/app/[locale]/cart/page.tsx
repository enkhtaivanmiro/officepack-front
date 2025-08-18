"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Trash2 } from "lucide-react";
import { FaTag } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCart } from "../../../hooks/useCart";

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const router = useRouter();
  const [promoCode, setPromoCode] = useState("");

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = subtotal * 0.2;
  const deliveryFee = 15000;
  const total = subtotal - discount + deliveryFee;

  const handleCheckout = () => {
    localStorage.setItem(
      "cartTotals",
      JSON.stringify({ subtotal, discount, deliveryFee, total })
    );
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col md:flex-row gap-8 flex-grow font-satoshi">
        <div className="md:w-2/3 space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div
                key={`${item.id}-${item.color}-${item.size}-${index}`}
                className="flex items-center justify-between bg-white rounded-2xl shadow border border-gray-100 px-4 py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-contain rounded-lg"
                  />
                  <div>
                    <h2 className="font-bold text-black text-xl mt-2">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Size: {item.size}
                    </p>
                    <p className="text-sm text-gray-500">Color: {item.color}</p>
                    <p className="font-bold text-black mt-2 text-2xl">
                      ₮{item.price}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end h-32">
                  <button
                    onClick={() => removeFromCart(item.id, item.variantId)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>

                  <div className="flex items-center">
                    <button
                      onClick={() => decreaseQuantity(item.id, item.variantId)}
                      className="w-10 h-10 rounded-l-full flex justify-center items-center text-2xl bg-gray-200 text-black"
                    >
                      −
                    </button>
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-200">
                      <span className="font-medium text-black">
                        {item.quantity}
                      </span>
                    </div>
                    <button
                      onClick={() => increaseQuantity(item.id, item.variantId)}
                      className="w-10 h-10 rounded-r-full flex justify-center items-center text-2xl bg-gray-200 text-black"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
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
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
              <FaTag className="text-gray-400 mr-2" />
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Add promo code"
                className="flex-grow bg-transparent focus:outline-none font-extralight text-gray-600"
              />
            </div>
            <button className="bg-black rounded-full px-4 py-2 text-white h-12 w-32 text-base ml-3">
              Apply
            </button>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            className="w-full bg-black text-white text-base py-3 rounded-full hover:bg-gray-800 flex items-center justify-center gap-3"
          >
            Go to Checkout →
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
