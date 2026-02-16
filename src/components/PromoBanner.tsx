import React from 'react';
import { Button } from '@/components/ui/button';

export function PromoBanner() {
    return (
        <div className="w-full bg-linear-to-r from-[#FF5645] to-[#B95CE4] py-16 px-4 my-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/hero.png')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
            <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-white max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Байгууллагын хэрэгцээг нэг дороос</h2>
                    <p className="text-white/90 text-lg mb-6">
                        Оффисын тавилга, бичиг хэрэг, цахилгаан барааг хамгийн хямд үнээр, түргэн шуурхай хүргэлттэйгээр аваарай.
                    </p>
                    <div className="flex gap-4">
                        <Button size="48" className="bg-white text-[#FF5645] hover:bg-gray-50 font-semibold px-8">
                            Дэлгүүр хэсэх
                        </Button>
                        <Button variant="border" size="48" className="text-white border-white hover:bg-white/10">
                            Бидэнтэй холбогдох
                        </Button>
                    </div>
                </div>
                <div className="hidden md:block">
                    {/* Decorative element or image if available */}
                    <div className="w-64 h-64 bg-white/10 rounded-full blur-3xl absolute -right-12 -top-12"></div>
                </div>
            </div>
        </div>
    );
}
