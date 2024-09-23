import { Top } from "../components/top.tsx";
import { BetType } from "./types/bet-type.ts";

// Hot|cold variables
export const whoWinsT: Top = {
  hot: [
    { dogs: [1], coeff: 1.4, betType: BetType.FIRST_BETWEEN_THIRD },
    { dogs: [2], coeff: 3.2, betType: BetType.FIRST_BETWEEN_THIRD },
  ],
  cold: [
    { dogs: [3], coeff: 6.5, betType: BetType.FIRST_OR_SECOND },
    { dogs: [4], coeff: 8, betType: BetType.FIRST_OR_SECOND },
  ],
};
export const quinellaT: Top = {
  hot: [
    { dogs: [1, 2], coeff: 2.5, betType: BetType.QUINELLA },
    { dogs: [1, 3], coeff: 2.5, betType: BetType.QUINELLA },
  ],
  cold: [
    { dogs: [1, 4], coeff: 2.5, betType: BetType.QUINELLA },
    { dogs: [2, 3], coeff: 2.5, betType: BetType.QUINELLA },
  ],
};
export const exactaT: Top = {
  hot: [
    { dogs: [1, 2], coeff: 2.5, betType: BetType.EXACTA },
    { dogs: [1, 3], coeff: 2.5, betType: BetType.EXACTA },
  ],
  cold: [
    { dogs: [1, 4], coeff: 2.5, betType: BetType.EXACTA },
    { dogs: [2, 3], coeff: 2.5, betType: BetType.EXACTA },
  ],
};
export const trifectaT: Top = {
  hot: [
    { dogs: [1, 2, 3], coeff: 2.5, betType: BetType.TRIFECTA },
    { dogs: [1, 2, 4], coeff: 2.5, betType: BetType.TRIFECTA },
    { dogs: [1, 3, 4], coeff: 2.5, betType: BetType.TRIFECTA },
    { dogs: [2, 3, 4], coeff: 2.5, betType: BetType.TRIFECTA },
    { dogs: [2, 1, 4], coeff: 2.5, betType: BetType.TRIFECTA },
    { dogs: [3, 1, 4], coeff: 2.5, betType: BetType.TRIFECTA },
  ],
  cold: [
    { dogs: [3, 2, 4], coeff: 2.5, betType: BetType.TRIFECTA },
    { dogs: [4, 1, 2], coeff: 2.5, betType: BetType.TRIFECTA },
    { dogs: [4, 1, 3], coeff: 2.5, betType: BetType.TRIFECTA },
    { dogs: [4, 2, 3], coeff: 2.5, betType: BetType.TRIFECTA },
    { dogs: [5, 1, 2], coeff: 2.5, betType: BetType.TRIFECTA },
    { dogs: [5, 1, 3], coeff: 2.5, betType: BetType.TRIFECTA },
  ],
};
