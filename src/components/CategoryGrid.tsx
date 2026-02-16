import React from 'react';
import Link from 'next/link';

const categories = [
    { name: 'Бичиг хэрэг', image: '/doublea.webp', count: '120+ Бүтээгдэхүүн', color: 'bg-[#FF5645]/10' },
    { name: 'Оффис тавилга', image: '/doublea.webp', count: '45+ Бүтээгдэхүүн', color: 'bg-[#B95CE4]/10' },
    { name: 'Цахилгаан бараа', image: '/doublea.webp', count: '80+ Бүтээгдэхүүн', color: 'bg-gray-100' },
];

export function CategoryGrid() {
    // Custom smooth scroll function with easing
    const smoothScrollToElement = (element: HTMLElement, duration: number = 1000) => {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();

        const animateScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function: easeInOutCubic for smooth animation
            const easeProgress = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, startPosition + distance * easeProgress);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };

    const handleScroll = (e: React.MouseEvent, categoryName: string) => {
        e.preventDefault();
        let targetId = 'discounted-products'; // Default or a general section

        switch (categoryName) {
            case 'Бичиг хэрэг':
                targetId = 'stationery-section';
                break;
            case 'Оффис тавилга':
                targetId = 'furniture-section';
                break;
            case 'Цахилгаан бараа':
                targetId = 'electronics-section';
                break;
            default:
                targetId = 'discounted-products';
        }

        const element = document.getElementById(targetId);
        if (element) {
            smoothScrollToElement(element, 1000);
        }
    };

    return (
        <div className="container mx-auto px-4 my-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Категориор хайх</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        onClick={(e) => handleScroll(e, category.name)}
                        className="group relative overflow-hidden rounded-2xl h-64 transition-transform hover:-translate-y-1 cursor-pointer"
                    >
                        <div className={`absolute inset-0 ${category.color} opacity-80 transition-opacity group-hover:opacity-90`}></div>
                        {/* Background Image Layer */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
                            style={{ backgroundImage: `url(${category.image})` }}
                        ></div>

                        <div className="relative h-full flex flex-col justify-center items-center p-6 text-center z-10">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-black transition-colors">{category.name}</h3>
                            <span className="text-sm font-medium text-gray-600 bg-white/60 px-3 py-1 rounded-full backdrop-blur-sm group-hover:bg-white/80 transition-colors">
                                {category.count}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
