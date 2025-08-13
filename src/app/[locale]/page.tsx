"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

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

export default function Page() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] ?? "en";

  const [products, setProducts] = useState<Product[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, imgRes] = await Promise.all([
          fetch("http://localhost:3000/product"),
          fetch("http://localhost:3000/images"),
        ]);

        if (!prodRes.ok) throw new Error("Failed to fetch products");
        if (!imgRes.ok) throw new Error("Failed to fetch images");

        const productsData: Product[] = await prodRes.json();
        const imagesData: Image[] = await imgRes.json();

        setProducts(productsData);
        setImages(imagesData);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div
        className="w-full h-auto bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-16 h-full">
          <div className="text-black font-bold text-4xl md:text-5xl leading-tight mb-8 md:mb-0 p-4 rounded-lg">
            <p>NEW</p>
            <p>MERCH</p>
            <p>OUT NOW!</p>
            <button>CHECK OUT</button>
          </div>
        </div>
      </div>

      <h1 className="font-bold text-black text-center mt-32 text-3xl mb-20">
        CHEER FOR THE HUNS IN OUR OFFICIAL JERSEY
      </h1>
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((p) => {
          const productImage = images.find((img) => img.product_id === p.id);
          const price = p.price ?? 0;
          const sellingPrice = p.selling_price ?? price;
          const discount =
            price && sellingPrice && price > sellingPrice
              ? Math.round(((price - sellingPrice) / price) * 100)
              : undefined;

          return (
            <Link href={`/${locale}/${p.id}`} key={p.id} className="block">
              <Card
                id={p.id}
                name={p.title}
                image={productImage?.url ?? "/icons/tshirt.png"}
                price={sellingPrice}
                oldPrice={discount ? price : undefined}
                discount={discount}
              />
            </Link>
          );
        })}
      </main>
      <Footer />
    </div>
  );
}
