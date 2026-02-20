'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronDown, SlidersHorizontal, Check } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// --- Shared Types & Mock Data (Copied from landing page for consistency) ---
type Product = {
    id: string;
    title: string;
    category: 'stationery' | 'furniture' | 'electronics' | 'other';
};
type ImageType = {
    product_id: string;
    url: string;
};

const MOCK_PRODUCTS: Product[] = [
    // Stationery
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

    // Furniture
    { id: "f1", title: 'Ergonomic Chair', category: 'furniture' },
    { id: "f2", title: 'Standing Desk', category: 'furniture' },
    { id: "f3", title: 'File Cabinet', category: 'furniture' },
    { id: "f4", title: 'Bookshelf Modern', category: 'furniture' },
    { id: "f5", title: 'Office Table', category: 'furniture' },
    { id: "f6", title: 'Storage Cabinet', category: 'furniture' },
    { id: "f7", title: 'Meeting Table', category: 'furniture' },
    { id: "f8", title: 'Desk Lamp', category: 'furniture' },

    // Electronics
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

    // Other
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

// --- Components ---

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
    <div className="w-full h-[420px] sm:h-[460px] bg-white rounded-2xl flex flex-col justify-between relative overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
        {/* Discount */}
        <div className="absolute top-3 left-3 bg-[#FF5645] text-white text-xs font-semibold px-3 py-1 rounded-md">-23.3%</div>

        {/* Favorites */}
        <div className="absolute top-3 right-3 flex gap-2">
            <div className="w-7 h-7 border border-[#FF5645]/30 text-[#FF5645] rounded-full flex items-center justify-center text-sm hover:bg-[#FF5645] hover:text-white transition-colors">❤️</div>
            <div className="w-7 h-7 border border-gray-200 rounded-full flex items-center justify-center text-sm hover:border-[#FF5645] transition-colors">🤍</div>
        </div>

        {/* Image */}
        <div className="flex justify-center items-center mt-12 flex-grow">
            <Image
                src={productImage}
                alt={productName}
                width={180}
                height={260}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                className="object-contain w-[150px] sm:w-[180px] h-auto max-h-[220px]"
            />
        </div>

        {/* Info */}
        <div className="px-3 sm:px-4 text-black mt-4">
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
            className="border-t border-gray-100 py-3 sm:py-4 flex items-center justify-center gap-2 font-semibold text-sm sm:text-base text-gray-800 hover:text-[#B95CE4] hover:bg-gray-50 transition mt-2"
        >
            <BoxIcon className="w-4 h-4" />
            Сагслах
        </button>
    </div>
);

// --- Main Page Component ---

export default function ProductsPage() {
    const { addToCart } = useCart();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<string>('default');

    // Sync category from URL
    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            setActiveCategory(category);
        } else {
            setActiveCategory('all');
        }
    }, [searchParams]);

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        if (category === 'all') {
            router.push('/products');
        } else {
            router.push(`/products?category=${category}`);
        }
    };

    const handleAddToCart = (product: Product, price: number, image: string) => {
        addToCart({
            id: product.id,
            name: product.title,
            price: price,
            quantity: 1,
            image: image
        }, 10);
    };

    // Filter & Sort Logic
    const filteredProducts = MOCK_PRODUCTS.filter(p =>
        activeCategory === 'all' || p.category === activeCategory
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        // Mock price logic (same as landing page)
        const priceA = 120000;
        const priceB = 120000;

        if (sortOrder === 'price-asc') return priceA - priceB;
        if (sortOrder === 'price-desc') return priceB - priceA;
        return 0;
    });

    const categories = [
        { id: 'all', label: 'Бүгд' },
        { id: 'stationery', label: 'Бичиг хэрэг' },
        { id: 'furniture', label: 'Оффис тавилга' },
        { id: 'electronics', label: 'Цахилгаан бараа' },
        { id: 'other', label: 'Бусад' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header / Title */}
            <div className="bg-white border-b border-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Бүх бүтээгдэхүүн</h1>
                    <p className="text-gray-500">Бичиг хэрэг, оффис тавилга, цахилгаан бараа болон бусад</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
                        {/* Category Filter */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <SlidersHorizontal size={18} />
                                Ангилал
                            </h3>
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategoryChange(cat.id)}
                                        className={`
                                    w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex justify-between items-center group
                                    ${activeCategory === cat.id
                                                ? 'bg-black text-white'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-black'}
                                `}
                                    >
                                        <span>{cat.label}</span>
                                        {activeCategory === cat.id && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Example Additional Filter (Mock) */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4">Үнэ</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="p1" className="rounded border-gray-300 text-black focus:ring-black" />
                                    <label htmlFor="p1" className="text-sm text-gray-600">0₮ - 50,000₮</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="p2" className="rounded border-gray-300 text-black focus:ring-black" />
                                    <label htmlFor="p2" className="text-sm text-gray-600">50,000₮ - 100,000₮</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="p3" className="rounded border-gray-300 text-black focus:ring-black" />
                                    <label htmlFor="p3" className="text-sm text-gray-600">100,000₮ +</label>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Sorting Toolbar */}
                        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Нийт <span className="font-bold text-gray-900">{filteredProducts.length}</span> бүтээгдэхүүн
                            </p>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="border" className="gap-2 min-w-[160px] justify-between h-10">
                                        <span className="text-gray-600 text-sm">Эрэмбэлэх:</span>
                                        <span className="font-semibold text-sm">
                                            {sortOrder === 'default' && 'Шинээс нь'}
                                            {sortOrder === 'price-asc' && 'Үнэ өсөхөөр'}
                                            {sortOrder === 'price-desc' && 'Үнэ буурахаар'}
                                        </span>
                                        <ChevronDown size={14} className="text-gray-400" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[160px]">
                                    <DropdownMenuItem onClick={() => setSortOrder('default')}>
                                        Шинээс нь
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOrder('price-asc')}>
                                        Үнэ өсөхөөр
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOrder('price-desc')}>
                                        Үнэ буурахаар
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {sortedProducts.map((p) => {
                                const productImage = MOCK_IMAGES.find((img) => img.product_id === p.id);
                                const imageUrl = productImage?.url ?? "/orgiluun.png";
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
                            })}
                        </div>

                        {sortedProducts.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                                <p className="text-gray-500">Бүтээгдэхүүн олдсонгүй.</p>
                                <Button
                                    variant="link"
                                    className="mt-2 text-black underline"
                                    onClick={() => handleCategoryChange('all')}
                                >
                                    Бүх категорийг харах
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
