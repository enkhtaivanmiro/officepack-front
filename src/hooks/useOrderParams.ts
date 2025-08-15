"use client";

import { useSearchParams } from "next/navigation";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { orderParamsAtom } from "../atoms/orderParamsAtom";

export default function useOrderParams() {
  const searchParams = useSearchParams();
  const setOrderParams = useSetAtom(orderParamsAtom);

  useEffect(() => {
    const subtotal = Number(searchParams.get("subtotal")) || 0;
    const discount = Number(searchParams.get("discount")) || 0;
    const deliveryFee = Number(searchParams.get("delivery")) || 0;
    const total = Number(searchParams.get("total")) || 0;

    setOrderParams({ subtotal, discount, deliveryFee, total });
  }, [searchParams, setOrderParams]);
}
