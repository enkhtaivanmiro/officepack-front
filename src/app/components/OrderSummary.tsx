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
  readonlyPromo?: boolean;
};

export default function OrderSummary({
  onCheckout,
  checkoutLabel,
  showCheckout = true,
  readonlyPromo = false,
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
    if (readonlyPromo) return;
    if (!appliedPromo) {
      const newTotals = {
        subtotal,
        discount: 0,
        deliveryFee,
        total: subtotal + deliveryFee,
      };
      setPrice(newTotals);
      localStorage.setItem("cartTotals", JSON.stringify(newTotals));
    }
  }, [appliedPromo, subtotal, deliveryFee, setPrice, readonlyPromo]);

  const handleApply = async () => {
    if (readonlyPromo) return;
    setError(null);
    if (!promoCode) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/promos/${promoCode}/validate`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        },
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Invalid promo code");
      }

      const promo = await res.json();
      setAppliedPromo(promo);

      localStorage.setItem("promoCode", promoCode);
      localStorage.setItem("promoId", promo.id);

      let discountAmount = 0;
      if (promo.discount_type === "percentage") {
        discountAmount = Math.floor(subtotal * (promo.discount_value / 100));
      } else {
        discountAmount = promo.discount_value;
      }

      const newTotals = {
        subtotal,
        discount: discountAmount,
        deliveryFee,
        total: Math.max(0, subtotal - discountAmount + deliveryFee),
      };

      setPrice(newTotals);
      localStorage.setItem("cartTotals", JSON.stringify(newTotals));
    } catch (err: any) {
      setError(err.message);
      setAppliedPromo(null);
      localStorage.removeItem("promoCode");
      localStorage.removeItem("promoId");
    }
  };

  const handleRemove = () => {
    if (readonlyPromo) return;
    setAppliedPromo(null);
    setPromoCode("");
    setError(null);
    localStorage.removeItem("promoCode");
    localStorage.removeItem("promoId");

    const newTotals = {
      subtotal,
      discount: 0,
      deliveryFee,
      total: subtotal + deliveryFee,
    };
    setPrice(newTotals);
    localStorage.setItem("cartTotals", JSON.stringify(newTotals));
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

      <div className="flex flex-col sm:flex-row mb-4 gap-3 w-full">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 min-w-0">
          <FaTag className="text-gray-400 mr-2 flex-shrink-0" />
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder={t("promoPlaceholder")}
            className="flex-1 bg-transparent focus:outline-none font-extralight text-gray-600 min-w-0"
            readOnly={readonlyPromo}
          />
        </div>

        {!appliedPromo ? (
          <button
            type="button"
            onClick={handleApply}
            className="bg-black rounded-full px-4 py-2 text-white h-12 w-full sm:w-auto text-base"
            disabled={readonlyPromo}
          >
            {t("apply")}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRemove}
            className="bg-red-500 rounded-full px-4 py-2 text-white h-12 w-full sm:w-auto text-base"
            disabled={readonlyPromo}
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
