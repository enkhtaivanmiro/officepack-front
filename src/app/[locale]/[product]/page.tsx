"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Card from "../../components/Card";

const allProducts = [
  {
    id: "tshirt-with-tape-details",
    name: "T-shirt with Tape Details",
    originalPrice: 300,
    discountPrice: 260,
    discountPercent: 40,
    description:
      "This graphic t-shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    colors: ["#696042", "#2F4F4F", "#2C2F4F"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    images: ["/icons/tshirt.png", "/icons/tshirt.png", "/icons/tshirt.png"],
  },
];

export default function Page({
  params,
}: {
  params: { locale: string; product: string };
}) {
  const { product } = params;

  const productData = allProducts.find((p) => p.id === product);

  if (!productData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="max-w-7xl mx-auto p-6">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const relatedProducts = [
    {
      image: "/icons/tshirt.png",
      name: "Polo with Contrast Trims",
      price: 120,
    },
    {
      image: "/icons/tshirt.png",
      name: "Gradient Graphic T-shirt",
      price: 120,
    },
    {
      image: "/icons/tshirt.png",
      name: "Polo with Tipping Details",
      price: 120,
    },
    { image: "/icons/tshirt.png", name: "Black Striped T-shirt", price: 120 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-10">
        <div className="flex flex-col md:w-1/2">
          <div className="p-6 bg-gray-100 rounded-lg mb-6">
            <img
              src={productData.images[mainImageIndex]}
              alt="Product"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="flex gap-4">
            {productData.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImageIndex(idx)}
                className={`border rounded p-2 ${
                  idx === mainImageIndex ? "border-black" : "border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-20 h-20 object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-bold mb-2 text-black">
            {productData.name}
          </h1>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl font-semibold text-black">
              ${productData.discountPrice}
            </span>
            <span className="text-gray-400 line-through">
              ${productData.originalPrice}
            </span>
            <span className="bg-red-100 text-red-500 px-2 rounded-full text-sm font-medium">
              -{productData.discountPercent}%
            </span>
          </div>
          <p className="text-gray-600 mb-6 font-extralight">
            {productData.description}
          </p>

          <div className="mb-6">
            <p className="font-extralight mb-2 text-gray-600">Select Colors</p>
            <div className="flex gap-4">
              {productData.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    selectedColor === color ? "" : "border-transparent"
                  }`}
                  aria-label={`Select color ${color}`}
                >
                  {selectedColor === color && (
                    <span className="text-white text-sm font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="font-extralight mb-2 text-gray-600">Choose Size</p>
            <div className="flex gap-4">
              {productData.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-10">
            <button
              onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
              className="w-10 h-10 rounded-full flex justify-center items-center text-2xl bg-gray-200 text-black"
            >
              −
            </button>
            <span className="text-xl text-black">{quantity}</span>
            <button
              onClick={() => setQuantity((qty) => qty + 1)}
              className="w-10 h-10 rounded-full flex justify-center items-center text-2xl bg-gray-200 text-black"
            >
              +
            </button>
            <button className="ml-auto bg-black text-white px-6 py-3 rounded-full">
              Add to Cart
            </button>
          </div>
        </div>
      </main>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-xl font-bold mb-8 text-center text-black">
          YOU MIGHT ALSO LIKE
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {relatedProducts.map((p, i) => (
            <Card key={i} {...p} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
