"use client";
import { atom } from "jotai";

export type CartItem = {
  id: string;
  name: string;
  color?: string | null;
  size?: string | null;
  price: number;
  quantity: number;
  image: string;
  variantId?: string;
};

const getInitialCart = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        return JSON.parse(saved) as CartItem[];
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }
  return [];
};

const baseCartAtom = atom<CartItem[]>(getInitialCart());

export type CartAction =
  | { type: "add"; item: CartItem }
  | { type: "remove"; id: string; variantId?: string }
  | { type: "increment"; id: string; variantId?: string }
  | { type: "decrement"; id: string; variantId?: string }
  | { type: "clear" };

export const cartAtom = atom(
  (get) => get(baseCartAtom),
  (get, set, action: CartAction) => {
    const prev = get(baseCartAtom);
    let updated: CartItem[] = [];

    switch (action.type) {
      case "add": {
        const newItem = action.item;
        const idx = prev.findIndex(
          (i) => i.id === newItem.id && i.variantId === newItem.variantId
        );
        updated =
          idx > -1
            ? prev.map((i, iidx) =>
                iidx === idx ? { ...i, quantity: i.quantity + newItem.quantity } : i
              )
            : [...prev, newItem];
        break;
      }
      case "remove":
        updated = prev.filter(
          (i) => !(i.id === action.id && i.variantId === action.variantId)
        );
        break;
      case "increment":
        updated = prev.map((i) =>
          i.id === action.id && i.variantId === action.variantId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
        break;
      case "decrement":
        updated = prev
          .map((i) =>
            i.id === action.id && i.variantId === action.variantId
              ? { ...i, quantity: Math.max(1, i.quantity - 1) }
              : i
          )
          .filter((i) => i.quantity > 0);
        break;
      case "clear":
        updated = [];
        break;
    }

    set(baseCartAtom, updated);
    if (typeof window !== "undefined") localStorage.setItem("cart", JSON.stringify(updated));
  }
);

export const orderParamsAtom = atom({
  subtotal: 0,
  discount: 0,
  deliveryFee: 15000,
  total: 0,
  promoCode: "",
});
