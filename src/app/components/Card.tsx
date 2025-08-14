interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
}

export default function ProductCard({
  image,
  name,
  price,
  oldPrice,
  discount,
}: ProductCardProps) {
  return (
    <div className="space-y-3 text-center">
      <img src={image} alt={name} className="mx-auto w-80" />
      <h3 className="font-bold text-xl text-black">{name}</h3>
      <div className="flex items-center justify-center space-x-2 gap-2.5">
        <span className="font-bold text-black text-2xl">₮{price}</span>
        {oldPrice && (
          <span className="line-through text-2xl text-gray-400 font-bold">
            ₮{oldPrice}
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
