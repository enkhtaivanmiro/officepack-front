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
  variantAttributeId?: string; 
  customName?: string;
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
  | { type: "add"; item: CartItem; maxStock: number } // Added maxStock
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
        const { item, maxStock } = action;
        
        const idx = prev.findIndex(
          (i) => i.id === item.id && i.variantId === item.variantId
        );

        if (idx > -1) {
          const existingItem = prev[idx];
          const potentialQuantity = existingItem.quantity + item.quantity;
          
          const finalQuantity = Math.min(potentialQuantity, maxStock);
          
          if (finalQuantity === existingItem.quantity) {
             updated = prev;
          } else {
             updated = prev.map((i, iidx) =>
                iidx === idx ? { ...i, quantity: finalQuantity } : i
             );
          }
          
        } else {
          if (item.quantity > maxStock) {
            const quantityToSet = Math.max(0, maxStock);
            if (quantityToSet > 0) {
               updated = [...prev, { ...item, quantity: quantityToSet }];
            } else {
               updated = prev; 
            }
          } else {
            updated = [...prev, item];
          }
        }
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
      default:
        updated = prev;
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