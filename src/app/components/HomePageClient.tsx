"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

const SkeletonCard = () => (
  <div className="animate-pulse flex flex-col space-y-4 border border-gray-100 rounded-lg p-3">
    <div className="bg-gray-200 h-48 w-full rounded-md"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

type Product = {
  id: string;
  title: string;
  slug: string;
  price?: number | null;
  selling_price?: number | null;
};

type Image = {
  id: string;
  url: string;
  product_id: string;
};

type Variant = {
  id: string;
  product_id: string;
  price: number;
  selling_price: number | null;
};

export default function HomePageClient() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] ?? "en";

  const t = useTranslations("Index");

  const [isClient, setIsClient] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [variants, setVariants] = useState<Record<string, Variant[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);

    async function fetchData() {
      try {
        const [prodRes, imgRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`),
        ]);

        if (!prodRes.ok) throw new Error("Failed to fetch products");
        if (!imgRes.ok) throw new Error("Failed to fetch images");

        const productsData: Product[] = await prodRes.json();
        const imagesData: Image[] = await imgRes.json();

        setProducts(productsData);
        setImages(imagesData);

        const variantsMap: Record<string, Variant[]> = {};
        await Promise.all(
          productsData.map(async (p) => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/product/${p.id}/variants`
            );
            const data: Variant[] = await res.json();
            variantsMap[p.id] = data;
          })
        );
        setVariants(variantsMap);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  const skeletonCount = 8;

  let productDisplay;

  if (loading) {
    productDisplay = isClient
      ? Array(skeletonCount)
          .fill(0)
          .map((_, i) => <SkeletonCard key={i} />)
      : null;
  } else {
    productDisplay = products.map((p) => {
      const productImage = images.find((img) => img.product_id === p.id);
      const productVariants = Array.isArray(variants[p.id])
        ? variants[p.id]
        : [];
      const prices = productVariants.map((v) => v.selling_price ?? v.price);
      const minPrice = prices.length ? Math.min(...prices) : 0;
      const maxPrice = prices.length ? Math.max(...prices) : 0;

      return (
        <Link href={`/${locale}/${p.id}`} key={p.id} className="block">
          <Card
            id={p.id}
            name={p.title}
            image={productImage?.url ?? "/icons/tshirt.png"}
            price={
              minPrice === maxPrice
                ? minPrice
                : { min: minPrice, max: maxPrice }
            }
          />
        </Link>
      );
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div
        className="w-full h-20vh bg-cover bg-center aspect-[3/1]"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4 md:py-16 h-full">
          <div className="text-white font-bold text-lg sm:text-2xl md:text-5xl leading-tight p-0 sm:p-4 mb-0 rounded-lg flex flex-col justify-end h-full">
            <div className="flex flex-row flex-wrap gap-2 md:gap-4 justify-center md:flex-col sm:justify-end">
              <p>{t("hero_new")}</p>
              <p>{t("hero_merch")}</p>
              <p>{t("hero_out_now")}</p>
              <p>{t("hero_cta")}</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="font-bold text-black text-center mt-25 text-3xl mb-25">
        {t("official_jersey")}
      </h1>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {productDisplay}
      </main>

      <Footer />
    </div>
  );
}
