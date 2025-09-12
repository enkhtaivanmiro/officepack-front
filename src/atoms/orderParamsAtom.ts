"use client";

import { atom } from "jotai";

export type OrderParams = {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
};

export const orderParamsAtom = atom<OrderParams>({
  subtotal: 0,
  discount: 0,
  deliveryFee: 0,
  total: 0,
});
