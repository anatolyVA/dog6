import { create } from "zustand/index";
import { WhoWinSelectedBet } from "../../components/who-win.tsx";
import { SelectedBet } from "../../ui/grid-item.tsx";

type State = {
  whoWins: WhoWinSelectedBet[];
  exacta: SelectedBet[];
  trifecta: SelectedBet[];
  quinella: SelectedBet[];
};

type Action = {
  setWhoWins: (whoWins: WhoWinSelectedBet[]) => void;
  setExacta: (exacta: SelectedBet[]) => void;
  setTrifecta: (trifecta: SelectedBet[]) => void;
  setQuinella: (quinella: SelectedBet[]) => void;
  clear: () => void;
};

export const useSelectedStore = create<State & Action>((set) => ({
  whoWins: [],
  exacta: [],
  trifecta: [],
  quinella: [],

  setWhoWins: (whoWins) => set({ whoWins }),
  setExacta: (exacta) => set({ exacta }),
  setTrifecta: (trifecta) => set({ trifecta }),
  setQuinella: (quinella) => set({ quinella }),
  clear: () => set({ whoWins: [], exacta: [], trifecta: [], quinella: [] }),
}));
