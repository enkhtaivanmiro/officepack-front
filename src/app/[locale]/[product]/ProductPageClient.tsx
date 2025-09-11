"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CartItem } from "../../../atoms/cartAtom";
import { useCart } from "../../../hooks/useCart";
import { useTranslations } from "next-intl";

type Product = {
  id: string;
  name: string;
  description: string;
  price?: number;
  selling_price?: number;
};
type Image = { id: string; url: string; product_id: string };
type Attribute = { id: string; name: string };
type AttributeValue = {
  id: string;
  attribute_id: string;
  name: string;
  presentation: string;
};
type Variant = {
  id: string;
  product_id: string;
  price: number;
  selling_price: number | null;
  stock: number;
  is_drop: boolean;
  is_master: boolean;
  attribute_value_ids: string[];
};

interface ProductPageClientProps {
  locale: string;
  productId: string;
}

export default function ProductPageClient({
  locale,
  productId,
}: ProductPageClientProps) {
  const t = useTranslations("ProductPage");

  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [attributeValues, setAttributeValues] = useState<AttributeValue[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [currentVariant, setCurrentVariant] = useState<Variant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { addToCart } = useCart();

  const colorAttr = attributes.find((a) => a.name.toLowerCase() === "color");
  const sizeAttr = attributes.find((a) => a.name.toLowerCase() === "size");
  const [customName, setCustomName] = useState<string>("");
  const nameAttr = attributes.find((a) => a.name.toLowerCase() === "name");

  useEffect(() => {
    const restoreExpiredOrders = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/orders/restore-expired",
          {
            method: "POST",
          }
        );
        const data = await res.json();
      } catch (err) {
        console.error("Failed to restore expired orders:", err);
      }
    };

    restoreExpiredOrders();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, attrRes, valRes, varRes] = await Promise.all([
          fetch(`http://localhost:3000/product/${productId}`).then((r) =>
            r.json()
          ),
          fetch(`http://localhost:3000/attribute`).then((r) => r.json()),
          fetch(`http://localhost:3000/attribute_value`).then((r) => r.json()),
          fetch(`http://localhost:3000/product/${productId}/variants`).then(
            (r) => r.json()
          ),
        ]);

        setProduct(prodRes);
        const imgRes = await fetch(
          `http://localhost:3000/images/product/${productId}`
        ).then((r) => r.json());
        setImages(imgRes);
        setAttributes(attrRes);
        setAttributeValues(valRes);
        setVariants(varRes);
      } catch (e) {
        console.error(e);
        setError(t("failedLoad"));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productId, t]);

  const availableColors = attributeValues
    .filter((av) => colorAttr && av.attribute_id === colorAttr.id)
    .filter((av) =>
      variants.some((v) => v.attribute_value_ids.includes(av.id))
    );

  const availableSizes = attributeValues
    .filter((av) => sizeAttr && av.attribute_id === sizeAttr.id)
    .filter((av) =>
      variants.some((v) => v.attribute_value_ids.includes(av.id))
    );

  useEffect(() => {
    const masterVariant = variants.find((v) => v.is_master);

    if (masterVariant) {
      const colorVal = attributeValues.find(
        (av) =>
          colorAttr &&
          av.attribute_id === colorAttr.id &&
          masterVariant.attribute_value_ids.includes(av.id)
      );
      if (colorVal) setSelectedColor(colorVal.presentation);

      const sizeVal = attributeValues.find(
        (av) =>
          sizeAttr &&
          av.attribute_id === sizeAttr.id &&
          masterVariant.attribute_value_ids.includes(av.id)
      );
      if (sizeVal) setSelectedSize(sizeVal.presentation);
    } else {
      if (availableColors.length > 0 && !selectedColor) {
        setSelectedColor(availableColors[0].presentation);
      }
      if (availableSizes.length > 0 && !selectedSize) {
        setSelectedSize(availableSizes[0].presentation);
      }
    }
  }, [
    variants,
    attributeValues,
    colorAttr,
    sizeAttr,
    availableColors,
    availableSizes,
    selectedColor,
    selectedSize,
  ]);

  useEffect(() => {
    const selectedIds: string[] = [];

    if (selectedColor && colorAttr) {
      const val = attributeValues.find(
        (av) =>
          av.presentation === selectedColor && av.attribute_id === colorAttr.id
      );
      if (val) selectedIds.push(val.id);
    }

    if (selectedSize && sizeAttr) {
      const val = attributeValues.find(
        (av) =>
          av.presentation === selectedSize && av.attribute_id === sizeAttr.id
      );
      if (val) selectedIds.push(val.id);
    }

    if (selectedIds.length === 0) {
      setCurrentVariant(null);
      return;
    }

    const matchingVariant = variants.find((v) =>
      selectedIds.every((id) => v.attribute_value_ids.includes(id))
    );

    setCurrentVariant(matchingVariant || null);
  }, [
    selectedColor,
    selectedSize,
    variants,
    attributeValues,
    colorAttr,
    sizeAttr,
  ]);

  const price =
    currentVariant?.selling_price ??
    currentVariant?.price ??
    product?.price ??
    0;
  const originalPrice = currentVariant?.price ?? product?.price ?? 0;
  const discountPercent =
    originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const handleAddToCart = () => {
    if (!currentVariant) {
      alert(t("selectVariantAlert"));
      return;
    }

    const item: CartItem = {
      id: product!.id,
      name: product!.name,
      color: selectedColor,
      size: selectedSize,
      quantity,
      price,
      image: images[mainImageIndex]?.url ?? "",
      variantId: currentVariant.id,
      customName,
    };

    addToCart(item);
    alert(t("addToCart"));
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        {t("loading")}
      </div>
    );

  if (error || !product)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mt-8 max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-10 font-satoshi">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
          <div className="flex flex-row md:flex-col gap-2 md:gap-4 w-full md:w-auto overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setMainImageIndex(idx)}
                className={`border rounded w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden ${
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
                className="w-full max-w-full h-auto object-cover rounded"
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center text-gray-600">
                {t("noImages")}
              </div>
            )}
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-bold mb-2 text-black">{product.name}</h1>
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-3xl font-semibold text-black">₮{price}</span>
            {discountPercent > 0 && (
              <>
                <span className="text-gray-400 line-through text-3xl">
                  ₮{originalPrice}
                </span>
                <span className="bg-red-100 text-red-500 px-2 rounded-full text-base font-medium w-18 h-8 flex items-center justify-center">
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>
          <p className="text-gray-600 mb-6 font-extralight">
            {product.description}
          </p>

          {colorAttr && (
            <div className="mb-6">
              <p className="font-extralight mb-4 text-gray-600">
                {t("selectColor")}
              </p>
              <div className="flex gap-4 flex-wrap">
                {availableColors.map((val) => (
                  <button
                    key={val.id}
                    onClick={() => setSelectedColor(val.presentation)}
                    style={{ backgroundColor: val.name }}
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                  >
                    {selectedColor === val.presentation && (
                      <span className="text-white text-sm font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {sizeAttr && (
            <div className="mb-6">
              <p className="font-extralight mb-4 text-gray-600">
                {t("chooseSize")}
              </p>
              <div className="flex gap-4 flex-wrap">
                {availableSizes.map((val) => (
                  <button
                    key={val.id}
                    onClick={() => setSelectedSize(val.presentation)}
                    className={`px-6 py-3 rounded-full ${
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

          {nameAttr && productId === "01071048-fe3a-49c2-9857-d79f0d7b7920" && (
            <div className="mb-6">
              <p className="font-extralight mb-4 text-gray-600">
                {t("enterName")}
              </p>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder={t("namePlaceholder")}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-black"
              />
            </div>
          )}

          <div className="flex flex-row items-center mb-10 mt-6 gap-4">
            <div className="flex flex-nowrap">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-12 h-12 rounded-l-full flex justify-center items-center text-2xl bg-gray-200 text-black"
              >
                −
              </button>
              <div className="w-12 h-12 flex items-center justify-center bg-gray-200">
                <span className="text-xl text-black">{quantity}</span>
              </div>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-12 h-12 rounded-r-full flex justify-center items-center text-2xl bg-gray-200 text-black"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="ml-auto sm:ml-0 bg-black text-white px-6 py-3 rounded-full md:w-[400px] sm:w-auto"
            >
              {t("addToCart")}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
