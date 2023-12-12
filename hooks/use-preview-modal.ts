import { create } from "zustand";
import { Product, ProductCard } from "@/types"

interface PreviewModalStore {
    isOpen: boolean;
    data?: ProductCard;
    onOpen: (data: ProductCard) => void;
    onClose: () => void
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data: ProductCard) => set({ data, isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default usePreviewModal;