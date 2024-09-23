import { GridItem, SelectedBet } from "../ui/grid-item.tsx";
import { quinellaT } from "../utils/test-variables.ts";
import { generateUniquePairs } from "../utils/generate-unique-pairs.ts";
import { newSelect } from "../utils/new-select.ts";
import { useSelectedStore } from "../utils/stores/use-selected-store.ts";
import { BetType } from "../utils/types/bet-type.ts";

export function Quinella() {
  const quinella = useSelectedStore((state) => state.quinella);
  const setQuinella = useSelectedStore((state) => state.setQuinella);

  const onSelect = (bet: SelectedBet) => {
    setQuinella(newSelect(quinella, bet));
  };

  const uniquePairs = generateUniquePairs(6);

  return (
    <div className="quinella">
      {uniquePairs.map((dogs, index) => {
        const isOdd = Math.floor(index / 5) % 2 !== 0;

        return (
          <GridItem
            dogs={dogs}
            coeff={2.5}
            className={
              dogs[1] < dogs[0]
                ? "invisible"
                : isOdd
                  ? "text-[#8bbaea_!important]"
                  : ""
            }
            betType={BetType.QUINELLA}
            isHot={
              !!quinellaT.hot.find((b) => b.dogs.join("-") === dogs.join("-"))
            }
            isCold={
              !!quinellaT.cold.find((b) => b.dogs.join("-") === dogs.join("-"))
            }
            label={dogs.join("/")}
            key={dogs.join("/")}
            onSelect={onSelect}
            isSelected={
              !!quinella.find((b) => b.dogs.join("-") === dogs.join("-"))
            }
          />
        );
      })}
    </div>
  );
}
