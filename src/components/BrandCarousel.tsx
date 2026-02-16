import * as React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';

const brands = [
    { name: 'Double A', logo: '/doublea.webp' }, // Reusing existing asset
    { name: 'Dell', logo: '/logo.png' }, // Placeholder using logo
    { name: 'HP', logo: '/logo.png' },
    { name: 'Cannon', logo: '/logo.png' },
    { name: 'Epson', logo: '/logo.png' },
    { name: 'Lenovo', logo: '/logo.png' },
];

export function BrandCarousel() {
    const [api, setApi] = React.useState<CarouselApi>();

    React.useEffect(() => {
        if (!api) return;

        // Auto-scroll every 3 seconds
        const interval = setInterval(() => {
            api.scrollNext();
        }, 3000);

        return () => clearInterval(interval);
    }, [api]);

    return (
        <div className="w-full py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Манай Харилцагчид</h2>
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent>
                        {brands.map((brand, index) => (
                            <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/5">
                                <div className="p-1">
                                    <div className="flex aspect-square items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                        {/* Ideally would use specific logos, falling back to text if image fails or is placeholder */}
                                        <div className="text-center">
                                            <span className="text-lg font-semibold text-gray-600 block mt-2">{brand.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
}
