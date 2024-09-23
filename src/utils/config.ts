import { WhoWinBet, WhoWinSelectedBet } from "../components/who-win.tsx";
import { SelectedBet } from "../ui/grid-item.tsx";

type Top = {
  hot: SelectedBet[];
  cold: SelectedBet[];
};

type WhoWinTop = {
  hot: WhoWinSelectedBet[];
  cold: WhoWinSelectedBet[];
};

export const whoWinsT: WhoWinTop = {
  hot: [
    { dogs: [1], coeff: 1.4, betType: WhoWinBet.WINNER },
    { dogs: [2], coeff: 3.2, betType: WhoWinBet.FIRST_BETWEEN_THIRD },
  ],
  cold: [
    { dogs: [3], coeff: 6.5, betType: WhoWinBet.FIRST_OR_SECOND },
    { dogs: [4], coeff: 8, betType: WhoWinBet.FIRST_OR_SECOND },
  ],
};
export const quinellaT: Top = {
  hot: [
    { dogs: [1, 2], coeff: 2.5 },
    { dogs: [1, 3], coeff: 2.5 },
  ],
  cold: [
    { dogs: [1, 4], coeff: 2.5 },
    { dogs: [2, 3], coeff: 2.5 },
  ],
};
export const exactaT: Top = {
  hot: [
    { dogs: [1, 2], coeff: 2.5 },
    { dogs: [1, 3], coeff: 2.5 },
  ],
  cold: [
    { dogs: [1, 4], coeff: 2.5 },
    { dogs: [2, 3], coeff: 2.5 },
  ],
};
export const trifectaT: Top = {
  hot: [
    { dogs: [1, 2, 3], coeff: 2.5 },
    { dogs: [1, 2, 4], coeff: 2.5 },
    { dogs: [1, 3, 4], coeff: 2.5 },
    { dogs: [2, 3, 4], coeff: 2.5 },
    { dogs: [2, 1, 4], coeff: 2.5 },
    { dogs: [3, 1, 4], coeff: 2.5 },
  ],
  cold: [
    { dogs: [3, 2, 4], coeff: 2.5 },
    { dogs: [4, 1, 2], coeff: 2.5 },
    { dogs: [4, 1, 3], coeff: 2.5 },
    { dogs: [4, 2, 3], coeff: 2.5 },
    { dogs: [5, 1, 2], coeff: 2.5 },
    { dogs: [5, 1, 3], coeff: 2.5 },
  ],
};
