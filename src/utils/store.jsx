import { create } from 'zustand';

const useStore = create((set) => ({
    results: [],
    setResults: (param) =>
        set(() => ({
        results: param,
    })),
    gameOver: false,
    setGameOver: (param) =>
        set(() => ({
        gameOver: param,
    })),
    skin: null,
    setSkin: (param) =>
        set(() => ({
        skin: param,
    })),
    mod: [],
    addMod: (param) =>
        set((state) => ({
        mod: [...state.mod, param],
    })),
    
    removeMod: (param) =>
        set((state) => ({
        mod: state.mod.filter((_mod) => _mod !== param),
    })),
}));

export default useStore;