import { atom } from "jotai";
import { CartItem } from "./cartAtom";

export type Pack = {
    id: string;
    name: string;
    items: CartItem[];
    createdAt: string;
};

const getInitialPacks = (): Pack[] => {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem("userPacks");
        if (saved) {
            try {
                return JSON.parse(saved) as Pack[];
            } catch (e) {
                console.error("Failed to parse packs", e);
            }
        }
    }
    return [];
};

const basePacksAtom = atom<Pack[]>(getInitialPacks());

export const packsAtom = atom(
    (get) => get(basePacksAtom),
    (get, set, newPacks: Pack[]) => {
        set(basePacksAtom, newPacks);
        if (typeof window !== "undefined") {
            localStorage.setItem("userPacks", JSON.stringify(newPacks));
        }
    }
);
