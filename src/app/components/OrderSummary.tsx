"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { orderParamsAtom } from "../../atoms/orderParamsAtom";
import { useTranslations } from "next-intl";
import { FaTag } from "react-icons/fa";
import { useState, useEffect } from "react";

type Props = {
  onCheckout?: () => void;
  checkoutLabel?: string;
  showCheckout?: boolean;
};

export default function OrderSummary({
  onCheckout,
  checkoutLabel,
  showCheckout = true,
}: Props) {
  const t = useTranslations("Cart");
  const { subtotal, discount, deliveryFee, total } =
    useAtomValue(orderParamsAtom);
  const setPrice = useSetAtom(orderParamsAtom);

  const [promoCode, setPromoCode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("promoCode") || "";
    }
    return "";
  });
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset discount if promo removed
    if (!appliedPromo) {
      setPrice({
        subtotal,
        discount: 0,
        deliveryFee,
        total: subtotal + deliveryFee,
      });
    }
  }, [appliedPromo, subtotal, deliveryFee, setPrice, total]);

  const handleApply = async () => {
    setError(null);
    if (!promoCode) return;

    try {
      const res = await fetch(
        `http://localhost:3000/promos/${promoCode}/validate`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Invalid promo code");
      }
      const promo = await res.json();
      setAppliedPromo(promo);
      localStorage.setItem("promoCode", promoCode);

      // Calculate discount
      let discountAmount = 0;
      if (promo.discount_type === "percentage")
        discountAmount = subtotal * (promo.discount_value / 100);
      else discountAmount = promo.discount_value;

      setPrice({
        subtotal,
        discount: discountAmount,
        deliveryFee,
        total: subtotal - discountAmount + deliveryFee,
      });
    } catch (err: any) {
      setError(err.message);
      setAppliedPromo(null);
      localStorage.removeItem("promoCode");
    }
  };

  const handleRemove = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setError(null);
    localStorage.removeItem("promoCode");
  };

  return (
    <div className="md:w-1/3 bg-white rounded-2xl shadow border p-6 h-fit border-gray-100">
      <h2 className="text-xl font-bold mb-6 text-black">{t("orderSummary")}</h2>

      <div className="flex justify-between text-gray-700 mb-2">
        <span>{t("subtotal")}</span>
        <span className="font-bold text-black">₮{subtotal}</span>
      </div>

      <div className="flex justify-between text-gray-700 mb-2">
        <span>{t("discount")}</span>
        <span className="text-red-500 font-bold">-₮{discount}</span>
      </div>

      <div className="flex justify-between text-gray-700 mb-4">
        <span>{t("deliveryFee")}</span>
        <span className="font-bold text-black">₮{deliveryFee}</span>
      </div>

      <div className="flex justify-between font-bold text-lg border-t pt-4 mb-6 text-black">
        <span>{t("total")}</span>
        <span className="text-black">₮{total}</span>
      </div>

      <div className="flex mb-4">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 flex-grow">
          <FaTag className="text-gray-400 mr-2" />
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder={t("promoPlaceholder")}
            className="flex-grow bg-transparent focus:outline-none font-extralight text-gray-600"
          />
        </div>
        {!appliedPromo ? (
          <button
            type="button"
            onClick={handleApply}
            className="bg-black rounded-full px-4 py-2 text-white h-12 w-32 text-base ml-3"
          >
            {t("apply")}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRemove}
            className="bg-red-500 rounded-full px-4 py-2 text-white h-12 w-32 text-base ml-3"
          >
            {t("remove")}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {showCheckout && (
        <button
          type="button"
          onClick={onCheckout}
          className="w-full bg-black text-white text-base py-3 rounded-full hover:bg-gray-800 flex items-center justify-center gap-3"
        >
          {checkoutLabel || t("checkout")}
        </button>
      )}
    </div>
  );
}
