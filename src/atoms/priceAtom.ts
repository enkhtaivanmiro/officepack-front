import { atom } from "jotai";

type PriceState = {
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
};

export const priceAtom = atom<PriceState>({
  subtotal: 0,
  discount: 0,
  delivery: 0,
  total: 0,
});
