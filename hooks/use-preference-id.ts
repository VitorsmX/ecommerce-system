import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";

interface PreferenceIDStore {
    item: string | null;
    setItem: (data: string) => void;
    removeItem: () => void;
}

const usePref = create(
    persist<PreferenceIDStore>((set, get) => ({
        item: '' || null,
        setItem: (data: string) => {
            set({ item: data });
        },
        removeItem: () => {
            set({ item: null })
        }
    }), {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage)
    })
)

export default usePref;