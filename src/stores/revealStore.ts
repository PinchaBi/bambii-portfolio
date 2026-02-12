import { create } from "zustand";

interface RevealState {
    isRevealed: boolean;
    setRevealed: (value: boolean) => void;
}

const useRevealStore = create<RevealState>((set) => ({
    isRevealed: false,
    setRevealed: (value) => set({ isRevealed: value }),
}));

export default useRevealStore;
