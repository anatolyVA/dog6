import { create } from "zustand";
import { betsTime } from "../config.ts";

type State = {
  timer: number;
  seconds: number;
  resultTimeout: number | undefined;
  gameTimeout: number | undefined;
};

type Action = {
  setTimer: (newTimer: number) => void;
  setResultTimeout: (timeout: number | undefined) => void;
  setGameTimeout: (timeout: number | undefined) => void;
  resetTimeouts: () => void;
};

export const useTimerStore = create<State & Action>((set) => ({
  timer: betsTime,
  seconds: betsTime,
  resultTimeout: undefined,
  gameTimeout: undefined,

  setTimer: (newTimer) => set({ timer: newTimer }),
  setResultTimeout: (timeout) => set({ resultTimeout: timeout }),
  setGameTimeout: (timeout) => set({ gameTimeout: timeout }),

  resetTimeouts: () => {
    set((state) => {
      if (state.resultTimeout) {
        clearTimeout(state.resultTimeout);
      }
      if (state.gameTimeout) {
        clearTimeout(state.gameTimeout);
      }
      return {
        resultTimeout: undefined,
        gameTimeout: undefined,
      };
    });
  },
}));
