"use client";

import React, { useEffect, useState, useMemo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CartItem } from "../../../atoms/cartAtom";
import { useCart } from "../../../hooks/useCart";
import { useTranslations } from "next-intl";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [isProcessing, setIsProcessing] = useState(false);

  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const priorityOrder = ["color", "size"];

  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string | null>
  >({});

  const [customName, setCustomName] = useState<string>("");

  const { addToCart } = useCart();

  const formatPrice = (amount: number) => {
    return amount.toLocaleString("en-US", { useGrouping: true });
  };

  useEffect(() => {
    const restoreExpiredOrders = async () => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/restore-expired`,
          {
            method: "POST",
          }
        );
      } catch (err) {
        console.error("Failed to restore expired orders:", err);
      }
    };
    restoreExpiredOrders();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, attrResRaw, valResRaw, varResRaw] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`).then(
            (r) => r.json()
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/attribute`).then((r) =>
            r.json()
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/attribute_value`).then(
            (r) => r.json()
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}/variants`
          ).then((r) => r.json()),
        ]);

        const imgRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/images/product/${productId}`
        ).then((r) => r.json());

        setProduct(prodRes);
        setImages(Array.isArray(imgRes) ? imgRes : []);
        setAttributes(Array.isArray(attrResRaw) ? attrResRaw : []);
        setAttributeValues(Array.isArray(valResRaw) ? valResRaw : []);
        setVariants(Array.isArray(varResRaw) ? varResRaw : []);
      } catch (e) {
        console.error(e);
        setError(t("failedLoad"));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productId, t]);

  const relevantAttributes = useMemo(() => {
    if (attributes.length === 0 || variants.length === 0) return [];

    const allAttrValuesInVariants = new Set<string>();
    variants.forEach((v) =>
      v.attribute_value_ids.forEach((id) => allAttrValuesInVariants.add(id))
    );

    return attributes
      .map((attr) => {
        const relevantValues = attributeValues.filter(
          (av) =>
            av.attribute_id === attr.id && allAttrValuesInVariants.has(av.id)
        );

        return {
          ...attr,
          values: relevantValues,
          key: attr.name.toLowerCase(),
        };
      })
      .filter((attr) => attr.values.length > 0)
      .filter((attr) => attr.key !== "name");
  }, [attributes, attributeValues, variants]);

  useEffect(() => {
    if (relevantAttributes.length === 0) return;

    const masterVariant = variants.find((v) => v.is_master);
    const initialSelections: Record<string, string | null> = {};

    relevantAttributes.forEach((attr) => {
      let initialValue: string | null = null;

      if (masterVariant) {
        const masterVal = attr.values.find((av) =>
          masterVariant.attribute_value_ids.includes(av.id)
        );
        initialValue = masterVal?.presentation ?? null;
      }

      if (!initialValue && attr.values.length > 0) {
        initialValue = attr.values[0].presentation;
      }

      initialSelections[attr.key] = initialValue;
    });

    setSelectedAttributes((prev) => ({ ...prev, ...initialSelections }));
  }, [variants, relevantAttributes]);

  useEffect(() => {
    if (relevantAttributes.length === 0) {
      setCurrentVariant(null);
      return;
    }

    const selectedIds: string[] = [];
    let isFullySelected = true;

    relevantAttributes.forEach((attr) => {
      const selectedPresentation = selectedAttributes[attr.key];

      if (!selectedPresentation) {
        isFullySelected = false;
        return;
      }

      const val = attributeValues.find(
        (av) =>
          av.presentation === selectedPresentation &&
          av.attribute_id === attr.id
      );

      if (val) {
        selectedIds.push(val.id);
      } else {
        isFullySelected = false;
      }
    });

    if (!isFullySelected || selectedIds.length === 0) {
      setCurrentVariant(null);
      return;
    }

    const matchingVariant = variants.find((v) =>
      selectedIds.every((id) => v.attribute_value_ids.includes(id))
    );

    setCurrentVariant(matchingVariant || null);
  }, [selectedAttributes, variants, relevantAttributes, attributeValues]);

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
    if (isProcessing) return;

    if (!currentVariant) {
      toast.error(t("selectVariantAlert"));
      return;
    }

    if (currentVariant.stock <= 0) {
      toast.error(t("outOfStock"));
      return;
    }

    if (currentVariant.stock < quantity) {
      const availableStock = currentVariant.stock;
      toast.warn(t("notEnoughStock", { stock: availableStock }));
      return;
    }

    setIsProcessing(true);

    try {
      const selectedAttributesForCart: Record<string, string> = {};
      relevantAttributes.forEach((attr) => {
        const value = selectedAttributes[attr.key];
        if (value) {
          selectedAttributesForCart[attr.key] = value;
        }
      });

      const item: CartItem = {
        id: product!.id,
        name: product!.name,
        quantity,
        price,
        image: images[mainImageIndex]?.url ?? "",
        variantId: currentVariant.id,
        customName,
        ...selectedAttributesForCart,
      };

      addToCart(item, currentVariant.stock);
      toast.success(t("addedToCart"));
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart.");
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
      }, 200);
    }
  };

  const isBaseDisabled =
    !currentVariant ||
    currentVariant.stock <= 0 ||
    currentVariant.stock < quantity;

  const isAddToCartDisabled = isBaseDisabled || isProcessing;

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
          <div className="flex flex-row md:flex-col gap-2 md:gap-4 w-full md:w-auto overflow-x-auto order-2 md:order-1">
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

          <div className="flex-1 p-6 rounded-lg flex items-start md:items-start justify-center order-1 md:order-2">
            {images.length > 0 ? (
              <img
                src={images[mainImageIndex].url}
                alt={product.name}
                className="w-full h-auto object-contain rounded"
              />
            ) : (
              <div className="w-full h-96 flex items-start justify-center text-gray-600">
                {t("noImages")}
              </div>
            )}
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-bold mb-2 text-black">{product.name}</h1>

          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-3xl font-semibold text-black">
              MNT {formatPrice(price)}
            </span>
            {discountPercent > 0 && (
              <>
                <span className="text-gray-400 line-through text-3xl">
                  MNT {formatPrice(originalPrice)}
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

          {currentVariant && (
            <p
              className={`mb-3 text-sm font-medium ${currentVariant.stock > 10 ? "text-green-600" : currentVariant.stock > 0 ? "text-orange-500" : "text-red-500"}`}
            >
              {currentVariant.stock > 0
                ? t("inStock", { count: currentVariant.stock })
                : t("outOfStock")}
            </p>
          )}

          {relevantAttributes
            .sort((a, b) => {
              const aKey = a.key;
              const bKey = b.key;

              const aIndex = priorityOrder.indexOf(aKey);
              const bIndex = priorityOrder.indexOf(bKey);

              if (aIndex !== -1 && bIndex !== -1) {
                return aIndex - bIndex;
              }

              if (aIndex !== -1) {
                return -1;
              }

              if (bIndex !== -1) {
                return 1;
              }

              return aKey.localeCompare(bKey);
            })
            .map((attr) => {
              const selectedPresentation = selectedAttributes[attr.key];

              return (
                <div key={attr.id} className="mb-6">
                  <p className="font-extralight mb-4 text-gray-600">
                    {t(`select${attr.name}`, {
                      defaultValue: t("selectAttribute", {
                        attribute: attr.name,
                      }),
                    })}
                  </p>

                  <div className="flex gap-4 flex-wrap">
                    {attr.values.map((val) => {
                      const isSelected =
                        selectedPresentation === val.presentation;

                      const handleSelection = () => {
                        setSelectedAttributes((prev) => ({
                          ...prev,
                          [attr.key]: val.presentation,
                        }));
                      };

                      if (attr.key === "color") {
                        return (
                          <button
                            key={val.id}
                            onClick={handleSelection}
                            style={{ backgroundColor: val.name }}
                            className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-150 ${
                              isSelected
                                ? "border-black shadow-md scale-110"
                                : "border-gray-300 hover:scale-105"
                            }`}
                          >
                            {isSelected && (
                              <span className="text-white text-sm font-bold shadow-black/80 shadow-md">
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      }

                      return (
                        <button
                          key={val.id}
                          onClick={handleSelection}
                          className={`px-6 py-3 rounded-full transition-colors duration-150 ${
                            isSelected
                              ? "bg-black text-white"
                              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          }`}
                        >
                          {val.presentation}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          {/* {productId === "01071048-fe3a-49c2-9857-d79f0d7b7920" && (
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
          )} */}

          <div className="flex flex-row items-center mb-10 mt-6 gap-4">
            <div className="flex flex-nowrap">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-12 h-12 rounded-l-full flex justify-center items-center text-2xl bg-gray-200 text-black disabled:opacity-50"
              >
                −
              </button>
              <div className="w-12 h-12 flex items-center justify-center bg-gray-200">
                <span className="text-xl text-black">{quantity}</span>
              </div>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                disabled={
                  !!(currentVariant && quantity >= currentVariant.stock)
                }
                className="w-12 h-12 rounded-r-full flex justify-center items-center text-2xl bg-gray-200 text-black disabled:opacity-50"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={Boolean(isAddToCartDisabled)}
              className="ml-auto sm:ml-0 bg-black text-white px-6 py-3 rounded-full md:w-[400px] sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing
                ? t("processing") || "Processing..."
                : isBaseDisabled && currentVariant?.stock === 0
                  ? t("outOfStock")
                  : t("addToCart")}
            </button>
          </div>
        </div>
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        transition={Zoom}
        style={{ bottom: "20px" }}
      />
      <Footer />
    </div>
  );
}
