import { create } from "zustand/index";

type State = {
  isOpen: boolean;
};

type Action = {
  open: () => void;
  close: () => void;
};

export const useRulesPopupStore = create<State & Action>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
