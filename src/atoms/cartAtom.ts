import { atom } from "jotai";

export type CartItem = {
  id: string;
  name: string;
  color: string | null;
  size: string | null;
  price: number;
  quantity: number;
  image: string;
};

const getInitialCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

export const cartAtom = atom<CartItem[]>(getInitialCart());

cartAtom.onMount = (setAtom) => {
  const savedAtom = atom(
    (get) => get(cartAtom),
    (get, set, update: CartItem[] | ((prev: CartItem[]) => CartItem[])) => {
      set(cartAtom, typeof update === "function" ? update(get(cartAtom)) : update);

      if (typeof window !== "undefined") {
        const currentCart = typeof update === "function" ? update(get(cartAtom)) : update;
        localStorage.setItem("cart", JSON.stringify(currentCart));
      }
    }
  );

  setAtom(getInitialCart());
};
