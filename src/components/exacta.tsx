import { GridItem, SelectedBet } from "../ui/grid-item.tsx";
import { exactaT } from "../utils/config.ts";
import { generateUniquePairs } from "../utils/generate-unique-pairs.ts";
import { newSelect } from "../utils/new-select.ts";
import { useSelectedStore } from "../utils/stores/use-selected-store.ts";

export function Exacta() {
  const exacta = useSelectedStore((state) => state.exacta);
  const setExacta = useSelectedStore((state) => state.setExacta);

  const uniquePairs = generateUniquePairs(6);

  const onSelect = (bet: SelectedBet) => {
    setExacta(newSelect(exacta, bet));
  };

  return (
    <div className="exacta">
      {uniquePairs.map((dogs, index) => {
        const isOdd = Math.floor(index / 5) % 2 !== 0;
        return (
          <GridItem
            dogs={dogs}
            coeff={5.5}
            isHot={
              !!exactaT.hot.find((b) => b.dogs.join("-") === dogs.join("-"))
            }
            isCold={
              !!exactaT.cold.find((b) => b.dogs.join("-") === dogs.join("-"))
            }
            key={dogs.join("-")}
            className={isOdd ? "text-[#8bbaea_!important]" : ""}
            onSelect={onSelect}
            isSelected={
              !!exacta.find((b) => b.dogs.join("-") === dogs.join("-"))
            }
          />
        );
      })}
    </div>
  );
}
