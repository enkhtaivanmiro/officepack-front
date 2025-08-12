import React from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Page({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const products = [
    {
      id: "tshirt-with-tape-details",
      image: "/icons/tshirt.png",
      name: "T-shirt with Tape Details",
      price: 120,
    },
    {
      id: "skinny-fit-jeans",
      image: "/icons/tshirt.png",
      name: "Skinny Fit Jeans",
      price: 240,
      oldPrice: 260,
      discount: 20,
    },
    {
      id: "checkered-shirt",
      image: "/icons/tshirt.png",
      name: "Checkered Shirt",
      price: 180,
    },
    {
      id: "sleeve-striped-tshirt",
      image: "/icons/tshirt.png",
      name: "Sleeve Striped T-shirt",
      price: 130,
      oldPrice: 160,
      discount: 30,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <h1 className="font-bold text-black text-center">
        CHEER FOR THE HUNS IN OUR OFFICIAL JERSEY
      </h1>
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((p) => (
          <Link href={`/${locale}/${p.id}`} key={p.id} className="block">
            <Card {...p} />
          </Link>
        ))}
      </main>
      <Footer />
    </div>
  );
}
