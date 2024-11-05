import { create } from 'zustand';

const useStore = create((set) => ({
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