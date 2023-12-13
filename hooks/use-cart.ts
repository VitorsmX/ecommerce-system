import { create } from "zustand";
import { Product, ProductCard } from "@/types"
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";

interface CartStore {
    items: ProductCard[];
    addItem: (data: ProductCard) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
}

const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (data: ProductCard) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);

            if(existingItem) {
                return toast("O item já está no carrinho")
            }

            set({ items: [...get().items, data] });
            toast.success("Item adicionado no carrinho")
        },
        removeItem: (id: string) => {
            set({ items: [...get().items.filter((item) => item.id !== id)] })
            toast.success("Item removido do carrinho")
        },
        removeAll: () => set({
            items: []
        })
    }), {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage)
    })
)

export default useCart;