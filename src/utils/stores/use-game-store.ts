import { create } from "zustand";

export enum GameState {
  BETS,
  BETS_CLOSED,
  GAME,
  RESULTS,
}

type State = {
  state: GameState;
};

type Action = {
  startBets: () => void;
  startBetsClosed: () => void;
  startGame: () => void;
  startResults: () => void;
};

export const useGameStore = create<State & Action>((set) => ({
  state: GameState.BETS,
  startBets: () => set({ state: GameState.BETS }),
  startBetsClosed: () => set({ state: GameState.BETS_CLOSED }),
  startGame: () => set({ state: GameState.GAME }),
  startResults: () => set({ state: GameState.RESULTS }),
}));
