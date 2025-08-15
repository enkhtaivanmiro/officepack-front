"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import { useAtomValue, useSetAtom } from "jotai";
import { priceAtom } from "../../../atoms/priceAtom";
import { cartAtom } from "../../../atoms/cartAtom";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const cart = useAtomValue(cartAtom);
  const setCart = useSetAtom(cartAtom);
  const setPrice = useSetAtom(priceAtom);
  const { subtotal, discount, delivery, total } = useAtomValue(priceAtom);

  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (err) {
        console.error("Failed to parse cart from localStorage", err);
      }
    }
  }, [setCart]);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Update pricing whenever cart changes
  useEffect(() => {
    const newSubtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const newDiscount = newSubtotal * 0.2;
    const newDelivery = 15000;
    const newTotal = newSubtotal - newDiscount + newDelivery;

    setPrice({
      subtotal: newSubtotal,
      discount: newDiscount,
      delivery: newDelivery,
      total: newTotal,
    });
  }, [cart, setPrice]);

  // Handle Pay button
  const handlePay = async () => {
    if (!selectedPayment) {
      alert("Please select a payment method!");
      return;
    }

    try {
      const address = localStorage.getItem("address");
      if (!address) {
        alert("Please provide your address before proceeding!");
        return;
      }
      const addressData = JSON.parse(address);

      const items = cart.map((item) => ({
        variant_id: item.variantId,
        quantity: item.quantity,
      }));

      const payload = {
        full_name: addressData.name,
        email: addressData.email,
        phone_number: addressData.phone,
        address: addressData.address,
        status: "pending",
        items: items,
      };

      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const result = await response.json();
      console.log("Order created successfully:", result);

      localStorage.removeItem("cart");
      setCart([]);

      router.push("/payment");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while creating the order.");
    }
  };

  const paymentGroups = [
    {
      title: "Pay by card",
      methods: [{ src: "/icons/creditcard.png", name: "Credit/Debit Card" }],
    },
    {
      title: "Pay by E-Wallet",
      methods: [
        { src: "/icons/qpay.png", name: "qPay Wallet" },
        { src: "/icons/socialpay.png", name: "SocialPay" },
        { src: "/icons/qpos.png", name: "qPOS" },
        { src: "/icons/digipay.png", name: "DiGi Pay" },
      ],
    },
    {
      title: "Pay by credit or in installments",
      methods: [
        { src: "/icons/hipay.png", name: "HiPay Хэтэвч" },
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
                {group.methods.map((method, j) => (
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

        <div className="w-full md:w-[481px] border border-gray-200 rounded-lg bg-white p-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-center gap-3 border-b border-gray-100 py-3 bg-gray-100 rounded-md mb-2 p-2"
                >
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
              ))}

              <div className="mt-4 border-t border-gray-200 pt-4 text-xl font-normal">
                <div className="flex justify-between py-1 text-gray-500 mb-1 mt-6">
                  <span>Subtotal</span>
                  <span className="text-lg">₮{subtotal}</span>
                </div>
                <div className="flex justify-between py-1 text-gray-500 mb-1">
                  <span>Discount</span>
                  <span className="text-red-500 text-lg ">-₮{discount}</span>
                </div>
                <div className="flex justify-between py-1 text-gray-500 mb-1">
                  <span>Delivery</span>
                  <span className="text-lg">₮{delivery}</span>
                </div>
                <div className="flex justify-between py-1 mb-5">
                  <span>Total</span>
                  <span className="text-green-600">₮{total}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  className="flex-1 bg-gray-100 rounded-md py-2 text-sm font-medium"
                  onClick={() => router.back()}
                >
                  Back
                </button>
                <button
                  className="flex-1 bg-gray-300 rounded-md py-2 text-sm font-medium"
                  onClick={handlePay}
                >
                  Pay
                </button>
              </div>

              <ul className="mt-4 text-xs text-gray-500 list-disc list-inside">
                <li>Please note that the item cannot be returned</li>
                <li>
                  You may resell your purchased ticket on the SECONDARY MARKET
                </li>
              </ul>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
