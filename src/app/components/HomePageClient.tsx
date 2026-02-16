"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Spline from "@splinetool/react-spline";

// Dark-mode skeleton loader
const SkeletonCard = () => (
  <div className="animate-pulse flex flex-col space-y-4 border border-gray-700 bg-gray-800 rounded-lg p-3">
    <div className="bg-gray-700 h-48 w-full rounded-md"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
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

  if (error)
    return <p className="text-center mt-10 text-red-400">{error}</p>;

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

  // Spline Scene URL (your provided scene)
  const SCENE_URL =
    "https://prod.spline.design/63aa1f20-fbd1-4b3d-9a99-6a8a825917ca/scene.splinecode";

  return (
    <div className="min-h-screen flex flex-col bg-black text-gray-200">
      <Header />

      {/* HERO SECTION: Spline 3D office essentials */}
      <div className="w-full h-[60vh] md:h-[70vh] relative rounded-lg overflow-hidden border border-gray-800 shadow-lg max-w-7xl mx-auto my-8">
        <Spline scene={SCENE_URL} className="w-full h-full" />
      </div>

      {/* Optional overlay / description */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-black/60 text-gray-200 rounded-lg px-4 py-4 border border-gray-800 backdrop-blur-sm text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Office Essentials
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Find papers, printer ink, cleaning supplies, toilet papers, and more
            for your office — delivered fast.
          </p>
        </div>
      </div>

      {/* PRODUCTS */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {productDisplay}
      </main>

      <Footer />
    </div>
  );
}
