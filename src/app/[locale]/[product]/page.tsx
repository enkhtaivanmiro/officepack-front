"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Card from "../../components/Card";

type Product = {
  id: string;
  name: string;
  description: string;
  price?: number | null;
  selling_price?: number | null;
};

type Image = {
  id: string;
  url: string;
  product_id: string;
};

type Attribute = {
  id: string;
  name: string;
};

type AttributeValue = {
  id: string;
  attribute_id: string;
  name: string;
  presentation: string;
};

export default function Page({
  params,
}: {
  params: { locale: string; product: string };
}) {
  const productId = params.product;

  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [attributeValues, setAttributeValues] = useState<AttributeValue[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const resProducts = await fetch("http://localhost:3000/product");
        if (!resProducts.ok) throw new Error("Failed to fetch products");
        const products: Product[] = await resProducts.json();

        const foundProduct = products.find((p) => p.id === productId);
        if (!foundProduct) {
          setError("Product not found");
          setLoading(false);
          return;
        }
        setProduct(foundProduct);

        const resImages = await fetch("http://localhost:3000/images");
        if (!resImages.ok) throw new Error("Failed to fetch images");
        const allImages: Image[] = await resImages.json();
        setImages(allImages.filter((img) => img.product_id === productId));

        const resAttributes = await fetch("http://localhost:3000/attribute");
        if (!resAttributes.ok) throw new Error("Failed to fetch attributes");
        const attrs: Attribute[] = await resAttributes.json();
        setAttributes(attrs);

        const resAttrValues = await fetch(
          "http://localhost:3000/attribute_value"
        );
        if (!resAttrValues.ok)
          throw new Error("Failed to fetch attribute values");
        const attrVals: AttributeValue[] = await resAttrValues.json();
        setAttributeValues(attrVals);

        const colorAttr = attrs.find((a) => a.name.toLowerCase() === "color");
        const sizeAttr = attrs.find((a) => a.name.toLowerCase() === "size");

        if (colorAttr) {
          const colorValues = attrVals.filter(
            (v) => v.attribute_id === colorAttr.id
          );
          if (colorValues.length > 0)
            setSelectedColor(colorValues[0].presentation);
        }

        if (sizeAttr) {
          const sizeValues = attrVals.filter(
            (v) => v.attribute_id === sizeAttr.id
          );
          if (sizeValues.length > 0)
            setSelectedSize(sizeValues[0].presentation);
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [productId]);

  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!product) return null;

  const price = product.selling_price ?? product.price ?? 0;
  const originalPrice = product.price ?? price;
  const discountPercent =
    product.price && product.selling_price
      ? Math.round(
          ((product.price - product.selling_price) / product.price) * 100
        )
      : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-10">
        <div className="flex md:flex-row gap-4 md:gap-6">
          <div className="flex flex-row md:flex-col gap-2 md:gap-4">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setMainImageIndex(idx)}
                className={`border rounded w-48 h-48 md:w-20 md:h-20 overflow-hidden ${
                  idx === mainImageIndex ? "border-black" : "border-gray-300"
                }`}
              >
                <img
                  src={img.url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="flex-1 p-6 rounded-lg flex items-center justify-center">
            {images.length > 0 ? (
              <img
                src={images[mainImageIndex].url}
                alt={product.name}
                className="w-128 h-full object-cover"
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center text-gray-600">
                No images available
              </div>
            )}
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-bold mb-2 text-black">{product.name}</h1>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl font-semibold text-black">₮{price}</span>
            {discountPercent > 0 && (
              <>
                <span className="text-gray-400 line-through">
                  ₮{originalPrice}
                </span>
                <span className="bg-red-100 text-red-500 px-2 rounded-full text-sm font-medium">
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>
          <p className="text-gray-600 mb-6 font-extralight">
            {product.description}
          </p>

          {attributes.find((a) => a.name.toLowerCase() === "color") && (
            <div className="mb-6">
              <p className="font-extralight mb-2 text-gray-600">Select Color</p>
              <div className="flex gap-4">
                {attributeValues
                  .filter(
                    (v) =>
                      v.attribute_id ===
                      attributes.find((a) => a.name.toLowerCase() === "color")
                        ?.id
                  )
                  .map((val) => (
                    <button
                      key={val.id}
                      onClick={() => setSelectedColor(val.presentation)}
                      style={{ backgroundColor: val.name }}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                        selectedColor === val.presentation
                          ? "border-black"
                          : "border-transparent"
                      }`}
                      aria-label={`Select color ${val.presentation}`}
                    >
                      {selectedColor === val.presentation && (
                        <span className="text-white text-sm font-bold">✓</span>
                      )}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {attributes.find((a) => a.name.toLowerCase() === "size") && (
            <div className="mb-6">
              <p className="font-extralight mb-2 text-gray-600">Choose Size</p>
              <div className="flex gap-4">
                {attributeValues
                  .filter(
                    (v) =>
                      v.attribute_id ===
                      attributes.find((a) => a.name.toLowerCase() === "size")
                        ?.id
                  )
                  .map((val) => (
                    <button
                      key={val.id}
                      onClick={() => setSelectedSize(val.presentation)}
                      className={`px-4 py-2 rounded-full ${
                        selectedSize === val.presentation
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {val.presentation}
                    </button>
                  ))}
              </div>
            </div>
          )}

          <div className="flex items-center mb-10">
            <button
              onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
              className="w-10 h-10 rounded-l-full flex justify-center items-center text-2xl bg-gray-200 text-black"
            >
              −
            </button>
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200">
              <span className="text-xl text-black">{quantity}</span>
            </div>
            <button
              onClick={() => setQuantity((qty) => qty + 1)}
              className="w-10 h-10 rounded-r-full flex justify-center items-center text-2xl bg-gray-200 text-black"
            >
              +
            </button>
            <button
              className="ml-auto bg-black text-white px-6 py-3 rounded-full"
              onClick={() => {
                const existingCart = JSON.parse(
                  localStorage.getItem("cart") || "[]"
                );

                const newItem = {
                  id: product.id,
                  name: product.name,
                  color: selectedColor,
                  size: selectedSize,
                  price,
                  quantity,
                  image: images[mainImageIndex]?.url || "",
                };

                const existingIndex = existingCart.findIndex(
                  (item: any) =>
                    item.id === newItem.id &&
                    item.color === newItem.color &&
                    item.size === newItem.size
                );

                if (existingIndex > -1) {
                  existingCart[existingIndex].quantity += quantity;
                } else {
                  existingCart.push(newItem);
                }

                localStorage.setItem("cart", JSON.stringify(existingCart));
                alert("Item added to cart!");
              }}
            >
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
          {images.length > 0 ? (
            images.map((img) => (
              <Card
                key={img.id}
                id={product.id}
                name={product.name}
                image={img.url}
                price={product.selling_price ?? product.price ?? 0}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No related products available
            </p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
