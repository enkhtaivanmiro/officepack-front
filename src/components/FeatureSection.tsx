import React from 'react';
import { Truck, ShieldCheck, Headphones, CreditCard } from 'lucide-react';

const features = [
    {
        icon: Truck,
        title: 'Үнэгүй Хүргэлт',
        description: '100,000₮-с дээш худалдан авалтанд хот дотор үнэгүй хүргэнэ.',
    },
    {
        icon: ShieldCheck,
        title: 'Баталгаат Чанар',
        description: 'Зөвхөн албан ёсны эрхтэй, чанартай бараа бүтээгдэхүүн.',
    },
    {
        icon: Headphones,
        title: '24/7 Тусламж',
        description: 'Хэзээ ч холбогдсон бид танд туслахад бэлэн.',
    },
    {
        icon: CreditCard,
        title: 'Уян Хатан Төлбөр',
        description: 'Dans, QPay, SocialPay болон бусад төлбөрийн нөхцөлүүд.',
    },
];

export function FeatureSection() {
    return (
        <div className="py-16 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-[#FF5645]/5 transition-colors duration-300 group">
                            <div className="w-16 h-16 bg-[#FF5645]/10 text-[#FF5645] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FF5645] group-hover:text-white transition-colors duration-300">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
