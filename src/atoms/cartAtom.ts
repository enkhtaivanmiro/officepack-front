import { atom } from "jotai";

export type CartItem = {
  id: string;
  name: string;
  color: string | null;
  size: string | null;
  price: number;
  quantity: number;
  image: string;
  variantId?: string;
};

export const cartAtom = atom<CartItem[]>([]);