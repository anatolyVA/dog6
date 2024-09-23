import { SelectedBet } from "../ui/grid-item.tsx";

export const newSelect = (prev: SelectedBet[], bet: SelectedBet) => {
  if (prev.find((b) => b.dogs.join("-") === bet.dogs.join("-"))) {
    return prev.filter((b) => b.dogs.join("-") !== bet.dogs.join("-"));
  } else {
    return [...prev, bet];
  }
};
