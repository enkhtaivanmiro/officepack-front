"use client";

import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OrderSummary from "../../components/OrderSummary";
import { useCart } from "../../../hooks/useCart";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";
import { useSetAtom } from "jotai";
import { orderParamsAtom } from "../../../atoms/orderParamsAtom";

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const router = useRouter();
  const t = useTranslations("Cart");
  const setOrderParams = useSetAtom(orderParamsAtom);

  useEffect(() => {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const deliveryFee = 15000;

    const promoData = localStorage.getItem("promoCodeData");
    let discount = 0;

    if (promoData) {
      try {
        const promo = JSON.parse(promoData);

        if (promo?.discount_type === "percentage") {
          discount = Math.floor(subtotal * (promo.discount_value / 100));
        } else if (promo?.discount_type === "fixed") {
          discount = promo.discount_value;
        }
      } catch (err) {
        console.error("Invalid promo data", err);
        discount = 0;
      }
    }

    const total = Math.max(0, subtotal - discount + deliveryFee);

    setOrderParams({ subtotal, discount, deliveryFee, total });

    localStorage.setItem(
      "cartTotals",
      JSON.stringify({ subtotal, discount, deliveryFee, total })
    );
  }, [cart, setOrderParams]);

  const handleCheckout = () => {
    router.push("/address");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col md:flex-row gap-8 flex-grow font-satoshi">
        <div className="md:w-2/3 space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-lg">{t("empty")}</p>
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

        <OrderSummary onCheckout={handleCheckout} />
      </main>

      <Footer />
    </div>
  );
}
