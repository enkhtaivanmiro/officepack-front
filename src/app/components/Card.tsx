interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number | { min: number; max: number };
  oldPrice?: number;
  discount?: number;
}

// Helper function to format numbers like 150'000
const formatPrice = (amount: number) => {
  return amount.toLocaleString("en-US").replace(/,/g, "'");
};

export default function ProductCard({
  image,
  name,
  price,
  oldPrice,
  discount,
}: ProductCardProps) {
  const displayPrice =
    typeof price === "number"
      ? `MNT ${formatPrice(price)}`
      : price.min === price.max
        ? `MNT ${formatPrice(price.min)}`
        : `MNT ${formatPrice(price.min)} - MNT ${formatPrice(price.max)}`;

  return (
    <div className="space-y-3 text-center">
      <img src={image} alt={name} className="mx-auto w-80 rounded-lg" />
      <h3 className="font-bold text-xl text-black">{name}</h3>
      <div className="flex items-center justify-center space-x-2 gap-2.5">
        <span className="font-bold text-black text-xl">{displayPrice}</span>
        {oldPrice && (
          <span className="line-through text-2xl text-gray-400 font-bold">
            MNT {formatPrice(oldPrice)}
          </span>
        )}
        {discount && (
          <span className="text-red-500 text-xs font-semibold bg-red-100 rounded-full w-14 h-7 flex items-center justify-center">
            -{discount}%
          </span>
        )}
      </div>
    </div>
  );
}
