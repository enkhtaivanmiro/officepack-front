"use client";

import { useEffect, useState, Suspense } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import { useCart } from "../../../hooks/useCart";
import { useSetAtom, useAtomValue } from "jotai";
import { orderParamsAtom } from "../../../atoms/orderParamsAtom";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CheckoutContent() {
  const t = useTranslations("Checkout");
  const { cart, clearCart } = useCart();
  const setPrice = useSetAtom(orderParamsAtom);
  const price = useAtomValue(orderParamsAtom);
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [customNames, setCustomNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const initialNames: { [key: string]: string } = {};
    cart.forEach((item) => {
      initialNames[item.id] = item.customName || "";
    });
    setCustomNames(initialNames);
  }, [cart]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/restore-expired`, {
      method: "POST",
    }).then((res) =>
      res.ok ? res.json() : console.error("Failed to restore expired orders")
    );
  }, []);

  useEffect(() => {
    if (cart.length === 0) return;

    const items = cart.map((item) => ({
      variant_id: item.variantId,
      quantity: item.quantity,
      customName: customNames[item.id] || "",
    }));

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/preview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        promo_id: localStorage.getItem("promoId") || null,
      }),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          if (data.statusCode === 400) {
            toast.error("Not enough stock");
          }
          return;
        }
        return data;
      })
      .then((data) => {
        if (!data) return;
        setPrice({
          subtotal: data.subtotal,
          discount: data.discount,
          deliveryFee: data.delivery_fee,
          total: data.total,
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message || "An unexpected error occurred.");
      })
      .finally(() => setLoading(false));
  }, [cart, setPrice, router]);

  const handlePay = async () => {
    if (!selectedPayment) return toast.info(t("selectPaymentAlert"));

    const addressData = localStorage.getItem("address");
    if (!addressData) return toast.info(t("provideAddressAlert"));

    const parsedAddress = JSON.parse(addressData);
    const items = cart.map((item) => ({
      variant_id: item.variantId,
      quantity: item.quantity,
      customName: customNames[item.id] || "",
    }));
    const promoId = localStorage.getItem("promoId");

    try {
      setLoading(true);

      const orderResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: parsedAddress.name,
            email: parsedAddress.email,
            phone_number: parsedAddress.phone,
            address: parsedAddress.address,
            status: "pending",
            items,
            promo_id: promoId || null,
            payment_method: selectedPayment,
          }),
        }
      );

      const orderResult = await orderResponse.json();
      if (!orderResponse.ok) {
        if (orderResult.message?.includes("Not enough stock")) {
          toast.info(orderResult.message);
          router.push("/cart");
          return;
        }
        throw new Error(orderResult.message || "Order creation failed");
      }

      const orderId = orderResult.id;
      if (!orderId) throw new Error("Order ID missing");

      const paymentResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: orderId,
            amount: price.total,
            method: selectedPayment.toLowerCase(),
          }),
        }
      );

      const paymentResult = await paymentResponse.json();
      if (!paymentResponse.ok)
        throw new Error(paymentResult.message || "Failed to create payment");

      const paymentId = paymentResult._id;
      if (!paymentId) throw new Error("Payment ID missing");

      router.push(`/payment/${orderId}?id=${paymentId}`);

      clearCart();
      localStorage.removeItem("cart");
      localStorage.removeItem("promoCode");
      localStorage.removeItem("promoId");
    } catch (err: any) {
      console.error(err);
      toast.info(err.message || t("orderCreationError"));
    } finally {
      setLoading(false);
    }
  };

  const paymentGroups = [
    {
      title: t("payByCard"),
      methods: [{ src: "/icons/creditcard.png", name: t("creditDebitCard") }],
    },
    {
      title: t("payByEWallet"),
      methods: [
        { src: "/icons/qpay.png", name: "qPay" },
        { src: "/icons/socialpay.png", name: "SocialPay" },
        { src: "/icons/qpos.png", name: "qPOS" },
        { src: "/icons/digipay.png", name: "DiGi Pay" },
      ],
    },
    {
      title: t("payByInstallments"),
      methods: [
        { src: "/icons/hipay.png", name: "HiPay" },
        { src: "/icons/monpay.png", name: "Monpay" },
        { src: "/icons/mcredit.png", name: "M Credit" },
        { src: "/icons/pocket.png", name: "Pocket" },
        { src: "/icons/storepay.png", name: "Storepay" },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col text-black">
      <Header />
      <main className="flex-1 flex flex-col md:flex-row gap-8 max-w-6xl w-full mx-auto px-4 py-8 font-satoshi">
        <div className="flex-1 flex flex-col gap-8">
          {paymentGroups.map((group, i) => (
            <div key={i}>
              <h3 className="text-base font-semibold mb-3">{group.title}</h3>
              <div className="grid grid-cols-2 gap-3">
                {group.methods
                  .filter((method) => method.name === "qPay")
                  .map((method, j) => (
                    <div
                      key={j}
                      onClick={() => setSelectedPayment(method.name)}
                      className={`flex items-center gap-2 border rounded-lg px-4 py-3 cursor-pointer ${
                        selectedPayment === method.name
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <Image
                        src={method.src}
                        alt={method.name}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                      <span>{method.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full md:w-[480px] border border-gray-200 rounded-lg bg-white p-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">{t("cartEmpty")}</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex flex-col gap-2 border-b border-gray-100 py-3 bg-gray-100 rounded-md mb-2 p-2"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="object-contain rounded"
                    />
                    <div className="flex-1 text-regular">
                      <p>{item.name}</p>
                      <p className="text-gray-500">
                        {item.quantity} × ₮{item.price}
                      </p>
                    </div>
                    <p className="font-medium">₮{item.price * item.quantity}</p>
                  </div>

                  {/* <input
                    type="text"
                    placeholder="Custom Name (optional)"
                    value={customNames[item.id] || ""}
                    onChange={(e) =>
                      setCustomNames((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
                  /> */}
                </div>
              ))}

              {loading ? (
                <p className="text-center text-gray-500 my-6">
                  {t("loadingTotals")}
                </p>
              ) : (
                <div className="mt-4 border-t border-gray-200 pt-4 text-xl font-normal">
                  <div className="flex justify-between py-1 text-gray-500 mb-1 mt-6">
                    <span>{t("subtotal")}</span>
                    <span className="text-lg">₮{price.subtotal}</span>
                  </div>
                  <div className="flex justify-between py-1 text-gray-500 mb-1">
                    <span>{t("discount")}</span>
                    <span className="text-red-500 text-lg">
                      -₮{price.discount}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 text-gray-500 mb-1">
                    <span>{t("delivery")}</span>
                    <span className="text-lg">₮{price.deliveryFee}</span>
                  </div>
                  <div className="flex justify-between py-1 mb-5 font-semibold text-black">
                    <span>{t("total")}</span>
                    <span className="text-green-600">₮{price.total}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-4">
                <button
                  className="flex-1 bg-gray-100 rounded-md py-2 text-sm font-medium"
                  onClick={() => router.back()}
                >
                  {t("back")}
                </button>
                <button
                  className="flex-1 bg-black text-white rounded-md py-2 text-sm font-medium"
                  onClick={handlePay}
                  disabled={loading}
                >
                  {loading ? t("processing") : t("pay")}
                </button>
              </div>

              <ul className="mt-4 text-xs text-gray-500 list-disc list-inside">
                <li>{t("itemCannotBeReturned")}</li>
                <li>{t("secondaryMarket")}</li>
              </ul>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutContent />
      <ToastContainer />
    </Suspense>
  );
}
