import React from "react";
import { Button } from "../ui/button.tsx";
import { GridItem, SelectedBet } from "../ui/grid-item.tsx";
import { cn } from "../utils/cn.ts";
import { trifectaT } from "../utils/test-variables.ts";
import { newSelect } from "../utils/new-select.ts";
import { useSelectedStore } from "../utils/stores/use-selected-store.ts";
import { BetType } from "../utils/types/bet-type.ts";

export function Trifecta() {
  const trifecta = useSelectedStore((state) => state.trifecta);
  const setTrifecta = useSelectedStore((state) => state.setTrifecta);
  const [current, setCurrent] = React.useState(0);

  const onSelect = (bet: SelectedBet) => {
    setTrifecta(newSelect(trifecta, bet));
  };

  return (
    <div className="trifecta">
      <div className="trifecta__set-block">
        <GridManager onCurrentChange={setCurrent} current={current} />
      </div>
      <div className={cn("trifecta__content-block", `pos${current + 1}`)}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="trifecta__grid" key={index}>
            {generateTriplets(index + 1, 6).map((dogs, index) => {
              const isOdd = Math.floor(index / 4) % 2 !== 0;

              return (
                <GridItem
                  isSelected={
                    !!trifecta.find((b) => b.dogs.join("-") === dogs.join("-"))
                  }
                  betType={BetType.TRIFECTA}
                  isHot={
                    !!trifectaT.hot.find(
                      (b) => b.dogs.join("-") === dogs.join("-"),
                    )
                  }
                  isCold={
                    !!trifectaT.cold.find(
                      (b) => b.dogs.join("-") === dogs.join("-"),
                    )
                  }
                  onSelect={onSelect}
                  className={isOdd ? "text-[#8bbaea_!important]" : ""}
                  dogs={dogs}
                  coeff={2.5}
                  key={dogs.join("-")}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function GridManager({
  current: init,
  onCurrentChange,
}: {
  current: number;
  onCurrentChange: (current: number) => void;
}) {
  const [current, setCurrent] = React.useState(init);

  const onUp = () => {
    if (current < 1) return;
    const newCurrent = current - 1;
    setCurrent(newCurrent);
    onCurrentChange(current - 1);
  };

  const onDown = () => {
    if (current >= 5) return;
    const newCurrent = current + 1;
    setCurrent(newCurrent);
    onCurrentChange(newCurrent);
  };

  return (
    <div className="grid-manager">
      <Button
        onClick={onUp}
        disabled={current === 0}
        className={cn(
          "sprite up",
          current === 0 && "opacity-25 hover:opacity-25",
        )}
      ></Button>
      <div className={`sprite trif-${current + 1}`}></div>
      <Button
        onClick={onDown}
        disabled={current === 5}
        className={cn(
          "sprite down",
          current === 5 && "opacity-25 hover:opacity-25",
        )}
      ></Button>
    </div>
  );
}

function generateTriplets(firstDigit: number, rowSize: number) {
  const result = [];

  for (let i = 1; i <= rowSize; i++) {
    for (let j = 1; j <= rowSize; j++) {
      if (i !== j && firstDigit !== i && firstDigit !== j) {
        result.push([firstDigit, i, j]);
      }
    }
  }

  return result;
}
