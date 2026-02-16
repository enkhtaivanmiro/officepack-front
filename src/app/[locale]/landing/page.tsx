import React from 'react';
import Image from 'next/image';

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
    <path d="M7.82 2.76H20.74a1 1 0 0 1 .84 1.54l-11.4 17.5a1 1 0 0 1-1.68-.01L3.38 4.3a1 1 0 0 1 .84-1.54Z" />
    <path d="m14.92 10 3-4.8" />
    <path d="M6.17 14 3.73 9.87" />
  </svg>
);

type CardProps = {
  productName: string;
  productPrice: number;
  actualPrice: number;
  productImage: string;
};

const Card: React.FC<CardProps> = ({ productName, productPrice, actualPrice, productImage }) => (
  <div className="w-[260px] h-[460px] bg-white rounded-2xl flex flex-col justify-between relative overflow-hidden">
    {/* Discount */}
    <div className="absolute top-3 left-3 bg-[#FF5A3C] text-white text-xs font-semibold px-3 py-1 rounded-md">-23.3%</div>

    {/* Favorites */}
    <div className="absolute top-3 right-3 flex gap-2">
      <div className="w-7 h-7 border border-red-400 rounded-full flex items-center justify-center text-sm">❤️</div>
      <div className="w-7 h-7 border border-red-400 rounded-full flex items-center justify-center text-sm">🤍</div>
    </div>

    {/* Image */}
    <div className="flex justify-center items-center mt-12">
      <Image src={productImage} alt={productName} width={180} height={260} className="object-contain" />
    </div>

    {/* Info */}
    <div className="px-4 text-black">
      <h3 className="text-sm font-semibold mb-2">{productName}</h3>

      <span className="inline-block bg-[#FF5A3C] text-white text-xs px-3 py-1 rounded-full mb-3">Хямдрал дуусахад: 4 өдөр</span>

      <div className="flex items-center gap-2 mt-2">
        <span className="font-bold text-lg">{productPrice.toLocaleString()}₮</span>
        <span className="text-gray-400 line-through text-sm">{actualPrice.toLocaleString()}₮</span>
      </div>
    </div>

    {/* Button */}
    <button className="border-t border-pink-500 py-4 flex items-center justify-center gap-2 font-semibold text-black hover:bg-gray-50 transition">
      <BoxIcon className="w-4 h-4" />
      Сагслах
    </button>
  </div>
);
const dummyProducts = [
  {
    id: 1,
    productName: 'Оргилуун 300 ml',
    productPrice: 1500,
    actualPrice: 1900,
    productImage: '/orgiluun.png',
  },
  {
    id: 2,
    productName: 'Оргилуун 300 ml',
    productPrice: 1500,
    actualPrice: 1900,
    productImage: '/orgiluun.png',
  },
  {
    id: 3,
    productName: 'Оргилуун 300 ml',
    productPrice: 1500,
    actualPrice: 1900,
    productImage: '/orgiluun.png',
  },
  {
    id: 4,
    productName: 'Оргилуун 300 ml',
    productPrice: 1500,
    actualPrice: 1900,
    productImage: '/orgiluun.png',
  },
  {
    id: 5,
    productName: 'Оргилуун 300 ml',
    productPrice: 1500,
    actualPrice: 1900,
    productImage: '/orgiluun.png',
  },
  {
    id: 6,
    productName: 'Оргилуун 300 ml',
    productPrice: 1500,
    actualPrice: 1900,
    productImage: '/orgiluun.png',
  },
];

const App = () => (
  <div className="min-h-screen bg-white font-inter antialiased">
    <Image src="/hero.png" alt="Officepack" width={1440} height={43} className="w-full h-auto" priority />

    <div className="bg-black h-156 px-6 py-8">
      <h2 className="text-white text-xl font-semibold mb-6">Хямдарсан бараанууд</h2>

      <div className="flex gap-12">
        {dummyProducts.map((product) => (
          <Card
            key={product.id}
            productName={product.productName}
            productPrice={product.productPrice}
            actualPrice={product.actualPrice}
            productImage={product.productImage}
          />
        ))}
      </div>
    </div>
    <div className="px-6 py-8">
      <h2 className="text-black text-xl font-semibold mb-6">Бүх бараанууд</h2>

      <div className="flex gap-12">
        {dummyProducts.map((product) => (
          <Card
            key={product.id}
            productName={product.productName}
            productPrice={product.productPrice}
            actualPrice={product.actualPrice}
            productImage={product.productImage}
          />
        ))}
      </div>
    </div>
  </div>
);

export default App;
