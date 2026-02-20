import { useAtom } from "jotai";
import { packsAtom, Pack } from "../atoms/packsAtom";
import { CartItem } from "../atoms/cartAtom";

export const usePacks = () => {
    const [packs, setPacks] = useAtom(packsAtom);

    const addPack = (name: string, items: CartItem[]) => {
        const newPack: Pack = {
            id: `pack-${Date.now()}`,
            name,
            items,
            createdAt: new Date().toISOString(),
        };
        setPacks([...packs, newPack]);
    };

    const removePack = (id: string) => {
        setPacks(packs.filter((p) => p.id !== id));
    };

    const updatePack = (id: string, newItems: CartItem[]) => {
        setPacks(
            packs.map((p) => {
                if (p.id === id) {
                    // If no items left, typically we might delete the pack, 
                    // but let's keep it empty or decide behavior valid for user.
                    return { ...p, items: newItems };
                }
                return p;
            })
        );
    };

    return {
        packs,
        addPack,
        removePack,
        updatePack,
    };
};
