type CardProps = {
  id?: string;
  productName: string;
  productPrice: number;
  actualPrice: number;
  productImage: string;
  discountPercent?: number;
  onAddToCart?: () => void;
};

export default function Card({ productName, productPrice, actualPrice, productImage, discountPercent = 23.3, onAddToCart }: CardProps) {
  return (
    <div className="w-[260px] h-[460px] bg-white rounded-2xl flex flex-col justify-between relative overflow-hidden">
      {/* Discount badge */}
      <div className="absolute top-3 left-3 bg-[#FF5A3C] text-white text-xs font-semibold px-3 py-1 rounded-md">
        -{discountPercent}%
      </div>

      {/* Favorite icons */}
      <div className="absolute top-3 right-3 flex gap-2">
        <div className="w-7 h-7 border border-red-400 rounded-full flex items-center justify-center">❤️</div>
      </div>

      {/* Image */}
      <div className="flex justify-center items-center mt-12">
        <img src={productImage} alt={productName} className="h-[220px] object-contain" />
      </div>

      {/* Content */}
      <div className="px-4">
        <h3 className="text-sm font-semibold text-black mb-2">{productName}</h3>

        <span className="inline-block bg-[#FF5A3C] text-white text-xs px-3 py-1 rounded-full mb-3">Хямдрал дуусахад: 4 өдөр</span>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-black font-bold text-lg">{productPrice.toLocaleString()}₮</span>
          <span className="text-gray-400 line-through text-sm">{actualPrice.toLocaleString()}₮</span>
        </div>
      </div>

      <button
        onClick={onAddToCart}
        className="border-t border-pink-500 py-4 flex items-center justify-center gap-2 font-semibold text-black hover:bg-gray-50 transition"
      >
        🛒 Сагслах
      </button>
    </div>
  );
}
