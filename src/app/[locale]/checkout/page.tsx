"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

type CartItem = {
  id: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
};

export default function Checkout() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const searchParams = useSearchParams();

  // Get totals from CartPage query params
  const subtotal = Number(searchParams.get("subtotal")) || 0;
  const discount = Number(searchParams.get("discount")) || 0;
  const delivery = Number(searchParams.get("delivery")) || 0;
  const total = Number(searchParams.get("total")) || 0;

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-black">
      <Header />

      <main className="flex-1 flex flex-col md:flex-row gap-8 max-w-6xl w-full mx-auto px-4 py-8 font-satoshi">
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex-1 flex flex-col gap-8">
            {" "}
            <div>
              {" "}
              <h3 className="text-base font-semibold mb-3">Pay by card</h3>{" "}
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-gray-50 px-4 py-3">
                {" "}
                <Image
                  src="/icons/creditcard.png"
                  alt="Credit/Debit Card"
                  width={24}
                  height={24}
                  className="object-contain"
                />{" "}
                <span>Credit/Debit Card</span>{" "}
              </div>{" "}
            </div>{" "}
            <div>
              {" "}
              <h3 className="text-base font-semibold mb-3">
                Pay by E-Wallet
              </h3>{" "}
              <div className="grid grid-cols-2 gap-3">
                {" "}
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-white px-4 py-3">
                  {" "}
                  <Image
                    src="/icons/qpay.png"
                    alt="qPay Wallet"
                    width={24}
                    height={24}
                    className="object-contain"
                  />{" "}
                  <span>qPay Wallet</span>{" "}
                </div>{" "}
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-white px-4 py-3">
                  {" "}
                  <Image
                    src="/icons/socialpay.png"
                    alt="Голомт SocialPay"
                    width={24}
                    height={24}
                    className="object-contain"
                  />{" "}
                  <span>SocialPay</span>{" "}
                </div>{" "}
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-white px-4 py-3">
                  {" "}
                  <Image
                    src="/icons/qpos.png"
                    alt="qPOS"
                    width={24}
                    height={24}
                    className="object-contain"
                  />{" "}
                  <span>qPOS</span>{" "}
                </div>{" "}
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-white px-4 py-3">
                  {" "}
                  <Image
                    src="/icons/digipay.png"
                    alt="DiGi Pay"
                    width={24}
                    height={24}
                    className="object-contain"
                  />{" "}
                  <span>DiGi Pay</span>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div>
              {" "}
              <h3 className="text-base font-semibold mb-3">
                {" "}
                Pay by credit or in installments{" "}
              </h3>{" "}
              <div className="grid grid-cols-2 gap-3">
                {" "}
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-white px-4 py-3">
                  {" "}
                  <Image
                    src="/icons/hipay.png"
                    alt="HiPay Хэтэвч"
                    width={24}
                    height={24}
                    className="object-contain"
                  />{" "}
                  <span>HiPay Хэтэвч</span>{" "}
                </div>{" "}
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-white px-4 py-3">
                  {" "}
                  <Image
                    src="/icons/monpay.png"
                    alt="Monpay"
                    width={24}
                    height={24}
                    className="object-contain"
                  />{" "}
                  <span>Monpay</span>{" "}
                </div>{" "}
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-white px-4 py-3">
                  {" "}
                  <Image
                    src="/icons/mcredit.png"
                    alt="M Credit"
                    width={24}
                    height={24}
                    className="object-contain"
                  />{" "}
                  <span>M Credit</span>{" "}
                </div>{" "}
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-white px-4 py-3">
                  {" "}
                  <Image
                    src="/icons/pocket.png"
                    alt="Pocket"
                    width={24}
                    height={24}
                    className="object-contain"
                  />{" "}
                  <span>Pocket</span>{" "}
                </div>{" "}
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-white px-4 py-3">
                  {" "}
                  <Image
                    src="/icons/storepay.png"
                    alt="Storepay"
                    width={24}
                    height={24}
                    className="object-contain"
                  />{" "}
                  <span>Storepay</span>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
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
                  <span className="text-lg ">₮{subtotal}</span>
                </div>
                <div className="flex justify-between py-1 text-gray-500 mb-1">
                  <span>Discount</span>
                  <span className="text-red-500">-₮{discount}</span>
                </div>
                <div className="flex justify-between py-1 text-gray-500 mb-1">
                  <span>Delivery</span>
                  <span>₮{delivery}</span>
                </div>
                <div className="flex justify-between py-1 mb-5">
                  <span>Total</span>
                  <span className="text-green-600">₮{total}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-gray-100 rounded-md py-2 text-sm font-medium">
                  Back
                </button>
                <button className="flex-1 bg-gray-300 rounded-md py-2 text-sm font-medium">
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
