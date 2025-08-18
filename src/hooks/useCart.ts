import { useAtom } from "jotai";
import { cartAtom, CartItem } from "../atoms/cartAtom";

export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);

  const addToCart = (item: CartItem) => {
    setCart({ type: "add", item });
  };

  const removeFromCart = (id: string, variantId?: string) => {
    setCart({ type: "remove", id, variantId });
  };

  const increaseQuantity = (id: string, variantId?: string) => {
    setCart({ type: "increment", id, variantId });
  };

  const decreaseQuantity = (id: string, variantId?: string) => {
    setCart({ type: "decrement", id, variantId });
  };

  const clearCart = () => {
    setCart({ type: "clear" });
  };

  const getTotalItems = () => cart.reduce((sum, i) => sum + i.quantity, 0);

  const getTotalPrice = () =>
    cart.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };
};
