interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number | { min: number; max: number };
  oldPrice?: number;
  discount?: number;
}

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
    <div
      className="
        group 
        space-y-3 text-center text-white 
        bg-gray-900/40 
        rounded-xl 
        p-4 
        border border-white 
        transition-all duration-300 
        hover:-translate-y-2 
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]
      "
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={image}
          alt={name}
          className="
            mx-auto w-80 rounded-lg border border-gray-800 
            transition-transform duration-300 
            group-hover:scale-105
          "
        />
      </div>

      <h3 className="font-bold text-xl text-white line-clamp-1">{name}</h3>

      <div className="flex items-center justify-center space-x-3">
        {/* Price */}
        <span className="font-bold text-xl text-white">{displayPrice}</span>

        {/* Old price */}
        {oldPrice && (
          <span className="line-through text-gray-500 text-lg font-semibold">
            MNT {formatPrice(oldPrice)}
          </span>
        )}

        {/* Discount */}
        {discount && (
          <span className="
            text-red-400 text-xs font-semibold 
            bg-red-900/40 
            border border-red-700 
            rounded-full 
            w-14 h-7 
            flex items-center justify-center
          ">
            -{discount}%
          </span>
        )}
      </div>
    </div>
  );
}
