"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useCart } from '@/hooks/useCart';

// Lazy load components
const CategoryGrid = dynamic(() => import('@/components/CategoryGrid').then(mod => ({ default: mod.CategoryGrid })), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
});

const PromoBanner = dynamic(() => import('@/components/PromoBanner').then(mod => ({ default: mod.PromoBanner })), {
  loading: () => <div className="h-48 animate-pulse bg-gray-100" />,
});

const BrandCarousel = dynamic(() => import('@/components/BrandCarousel').then(mod => ({ default: mod.BrandCarousel })), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
});

const FeatureSection = dynamic(() => import('@/components/FeatureSection').then(mod => ({ default: mod.FeatureSection })), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
});

const BoxIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-package-open"
  >
    <path d="M7.82 2.76H20.74a1 1 0 0 1 .84 1.54l-11.4 17.5a 1 1 0 0 1-1.68-.01L3.38 4.3a 1 1 0 0 1 .84-1.54Z" />
    <path d="m14.92 10 3-4.8" />
    <path d="M6.17 14 3.73 9.87" />
  </svg>
);

type CardProps = {
  id: string;
  productName: string;
  productPrice: number;
  actualPrice: number;
  productImage: string;
  onAddToCart: () => void;
};

const Card: React.FC<CardProps> = ({ productName, productPrice, actualPrice, productImage, onAddToCart }) => (
  <div className="w-[240px] sm:w-[260px] h-[420px] sm:h-[460px] flex-shrink-0 bg-white rounded-2xl flex flex-col justify-between relative overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
    {/* Discount */}
    <div className="absolute top-3 left-3 bg-[#FF5645] text-white text-xs font-semibold px-3 py-1 rounded-md">-23.3%</div>

    {/* Favorites */}
    <div className="absolute top-3 right-3 flex gap-2">
      <div className="w-7 h-7 border border-[#FF5645]/30 text-[#FF5645] rounded-full flex items-center justify-center text-sm hover:bg-[#FF5645] hover:text-white transition-colors">❤️</div>
      <div className="w-7 h-7 border border-gray-200 rounded-full flex items-center justify-center text-sm hover:border-[#FF5645] transition-colors">🤍</div>
    </div>

    {/* Image */}
    <div className="flex justify-center items-center mt-12">
      <Image
        src={productImage}
        alt={productName}
        width={180}
        height={260}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        className="object-contain w-[150px] sm:w-[180px] h-auto"
      />
    </div>

    {/* Info */}
    <div className="px-3 sm:px-4 text-black">
      <h3 className="text-sm font-semibold mb-2 line-clamp-2">{productName}</h3>

      <span className="inline-block bg-[#FF5645]/10 text-[#FF5645] text-xs px-3 py-1 rounded-full mb-3">Хямдрал дуусахад: 4 өдөр</span>

      <div className="flex items-center gap-2 mt-2">
        <span className="font-bold text-base sm:text-lg text-gray-900">{productPrice.toLocaleString()}₮</span>
        <span className="text-gray-400 line-through text-xs sm:text-sm">{actualPrice.toLocaleString()}₮</span>
      </div>
    </div>

    {/* Button */}
    <button
      onClick={onAddToCart}
      className="border-t border-gray-100 py-3 sm:py-4 flex items-center justify-center gap-2 font-semibold text-sm sm:text-base text-gray-800 hover:text-[#B95CE4] hover:bg-gray-50 transition"
    >
      <BoxIcon className="w-4 h-4" />
      Сагслах
    </button>
  </div>
);

// Mock Data Structure
type Product = {
  id: string;
  title: string;
  category: 'stationery' | 'furniture' | 'electronics' | 'other';
};
type ImageType = {
  product_id: string;
  url: string;
};
type Variant = {
  price: number;
  selling_price?: number;
};

const MOCK_PRODUCTS: Product[] = [
  // Stationery (expanded)
  { id: "s1", title: 'Note Book A5', category: 'stationery' },
  { id: "s2", title: 'Ballpoint Pen Set', category: 'stationery' },
  { id: "s3", title: 'Sticky Notes', category: 'stationery' },
  { id: "s4", title: 'Desk Organizer', category: 'stationery' },
  { id: "s5", title: 'Highlighter Set', category: 'stationery' },
  { id: "s6", title: 'Paper Clips Box', category: 'stationery' },
  { id: "s7", title: 'Stapler Premium', category: 'stationery' },
  { id: "s8", title: 'Notebook Spiral', category: 'stationery' },
  { id: "s9", title: 'Marker Set', category: 'stationery' },
  { id: "s10", title: 'Pencil Case', category: 'stationery' },

  // Furniture (expanded)
  { id: "f1", title: 'Ergonomic Chair', category: 'furniture' },
  { id: "f2", title: 'Standing Desk', category: 'furniture' },
  { id: "f3", title: 'File Cabinet', category: 'furniture' },
  { id: "f4", title: 'Bookshelf Modern', category: 'furniture' },
  { id: "f5", title: 'Office Table', category: 'furniture' },
  { id: "f6", title: 'Storage Cabinet', category: 'furniture' },
  { id: "f7", title: 'Meeting Table', category: 'furniture' },
  { id: "f8", title: 'Desk Lamp', category: 'furniture' },

  // Electronics (expanded)
  { id: "e1", title: 'Gaming Mouse', category: 'electronics' },
  { id: "e2", title: 'Mechanical Keyboard', category: 'electronics' },
  { id: "e3", title: '27" Monitor', category: 'electronics' },
  { id: "e4", title: 'Headset', category: 'electronics' },
  { id: "e5", title: 'Webcam HD', category: 'electronics' },
  { id: "e6", title: 'USB Hub', category: 'electronics' },
  { id: "e7", title: 'Wireless Mouse', category: 'electronics' },
  { id: "e8", title: 'Laptop Stand', category: 'electronics' },
  { id: "e9", title: 'Cable Organizer', category: 'electronics' },
  { id: "e10", title: 'Power Bank', category: 'electronics' },

  // Other/Discounted
  { id: "o1", title: 'Оргилуун 300 ml', category: 'other' },
  { id: "o2", title: 'Coffee Mug', category: 'other' },
  { id: "o3", title: 'Water Bottle', category: 'other' },
  { id: "o4", title: 'Desk Mat', category: 'other' },
  { id: "o5", title: 'Phone Stand', category: 'other' },
  { id: "o6", title: 'Notebook Premium', category: 'other' },
  { id: "o7", title: 'Pen Holder', category: 'other' },
  { id: "o8", title: 'Calendar 2026', category: 'other' },
];

const MOCK_IMAGES: ImageType[] = MOCK_PRODUCTS.map(p => ({
  product_id: p.id,
  url: p.category === 'electronics' ? '/placeholder.png' :
    p.category === 'furniture' ? '/placeholder.png' : '/orgiluun.png'
}));

const MOCK_VARIANTS: Record<string, Variant[]> = {};
MOCK_PRODUCTS.forEach(p => {
  MOCK_VARIANTS[p.id] = [{ price: 150000, selling_price: 120000 }];
});

const App = () => {
  const { addToCart } = useCart();

  // Refs for auto-scrolling
  const discountedRef = React.useRef<HTMLDivElement>(null);
  const stationeryRef = React.useRef<HTMLDivElement>(null);
  const furnitureRef = React.useRef<HTMLDivElement>(null);
  const electronicsRef = React.useRef<HTMLDivElement>(null);

  // ... state ...
  const [data, setData] = useState<{
    products: Product[];
    images: ImageType[];
    variants: Record<string, Variant[]>;
  }>({ products: [], images: [], variants: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData({
        products: MOCK_PRODUCTS,
        images: MOCK_IMAGES,
        variants: MOCK_VARIANTS,
      });
      setLoading(false);
    }, 500);
  }, []);

  // Custom smooth scroll function with easing
  const smoothScrollTo = (element: HTMLDivElement, target: number, duration: number = 800) => {
    const start = element.scrollLeft;
    const change = target - start;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeInOutCubic for smooth animation
      const easeProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      element.scrollLeft = start + change * easeProgress;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  // Auto-scroll effect with custom smooth animation
  useEffect(() => {
    if (loading) return;

    const scrollContainers = [
      discountedRef.current,
      stationeryRef.current,
      furnitureRef.current,
      electronicsRef.current,
    ];

    const intervals = scrollContainers.map((container) => {
      if (!container) return null;

      return setInterval(() => {
        const cardWidth = 240 + 16; // card width + gap (sm breakpoint)
        const maxScroll = container.scrollWidth - container.clientWidth;
        const currentScroll = container.scrollLeft;

        if (currentScroll >= maxScroll - 10) {
          // Reset to beginning with smooth animation
          smoothScrollTo(container, 0);
        } else {
          // Scroll one card with smooth animation
          const targetScroll = Math.min(currentScroll + cardWidth, maxScroll);
          smoothScrollTo(container, targetScroll);
        }
      }, 3000);
    });

    return () => {
      intervals.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, [loading]);

  const handleAddToCart = (product: Product, price: number, image: string) => {
    addToCart({
      id: product.id,
      name: product.title,
      price: price, // simplified logic
      quantity: 1,
      image: image
    }, 10);
  };

  const renderProductList = (products: Product[]) => {
    if (loading) return <div>Loading...</div>;
    return products.map((p) => {
      const productImage = data.images.find((img) => img.product_id === p.id);
      const imageUrl = productImage?.url ?? "/orgiluun.png";
      // Simplified price logic for brevity in this replace
      const price = 120000;
      const actualPrice = 150000;

      return (
        <Card
          key={p.id}
          id={p.id}
          productName={p.title}
          productPrice={price}
          actualPrice={actualPrice}
          productImage={imageUrl}
          onAddToCart={() => handleAddToCart(p, price, imageUrl)}
        />
      );
    });
  }

  const stationeryProducts = data.products.filter(p => p.category === 'stationery');
  const furnitureProducts = data.products.filter(p => p.category === 'furniture');
  const electronicsProducts = data.products.filter(p => p.category === 'electronics');

  return (
    <div className="min-h-screen bg-white font-inter antialiased">
      <Image
        src="/hero.png"
        alt="Officepack"
        width={1440}
        height={43}
        className="w-full h-auto object-cover"
        priority
      />

      <CategoryGrid />

      {/* Discounted / Highlights */}
      <div id="discounted-products" className="bg-black min-h-[400px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h2 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Хямдарсан бараанууд</h2>
        <div ref={discountedRef} className="flex gap-4 sm:gap-8 lg:gap-12 overflow-x-auto pb-4 scrollbar-hide">
          {renderProductList(data.products.slice(0, 10))}
        </div>
      </div>

      <PromoBanner />

      {/* Stationery Section */}
      <div id="stationery-section" className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-gray-50">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-black text-lg sm:text-xl font-bold">Бичиг хэрэг</h2>
          <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-black whitespace-nowrap">Бүгдийг үзэх &rarr;</a>
        </div>
        <div ref={stationeryRef} className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-4 scrollbar-hide">
          {renderProductList(stationeryProducts)}
        </div>
      </div>

      {/* Furniture Section */}
      <div id="furniture-section" className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-black text-lg sm:text-xl font-bold">Оффис тавилга</h2>
          <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-black whitespace-nowrap">Бүгдийг үзэх &rarr;</a>
        </div>
        <div ref={furnitureRef} className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-4 scrollbar-hide">
          {renderProductList(furnitureProducts)}
        </div>
      </div>

      {/* Electronics Section */}
      <div id="electronics-section" className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-gray-50">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-black text-lg sm:text-xl font-bold">Цахилгаан бараа</h2>
          <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-black whitespace-nowrap">Бүгдийг үзэх &rarr;</a>
        </div>
        <div ref={electronicsRef} className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-4 scrollbar-hide">
          {renderProductList(electronicsProducts)}
        </div>
      </div>

      <BrandCarousel />

      <FeatureSection />

    </div>
  );
};

export default App;
