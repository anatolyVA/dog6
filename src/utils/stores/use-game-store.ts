import { create } from "zustand";
import { testBalance } from "../config.ts";

export enum GameState {
  BETS,
  BETS_CLOSED,
  GAME,
  RESULTS,
}

type State = {
  state: GameState;
  balance: number;
};

type Action = {
  startBets: () => void;
  startBetsClosed: () => void;
  setBalance: (balance: number) => void;
  startGame: () => void;
  startResults: () => void;
};

export const useGameStore = create<State & Action>((set) => ({
  state: GameState.BETS,
  balance: testBalance,
  setBalance: (balance: number) => set({ balance }),
  startBets: () => set({ state: GameState.BETS }),
  startBetsClosed: () => set({ state: GameState.BETS_CLOSED }),
  startGame: () => set({ state: GameState.GAME }),
  startResults: () => set({ state: GameState.RESULTS }),
}));
