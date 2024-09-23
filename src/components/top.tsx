import { GridItem, SelectedBet } from "../ui/grid-item.tsx";
import { cn } from "../utils/cn.ts";
import { exactaT, quinellaT, trifectaT, whoWinsT } from "../utils/config.ts";
import { newSelect } from "../utils/new-select.ts";
import { useSelectedStore } from "../utils/stores/use-selected-store.ts";
import { newWhoWinSelect, WhoWinSelectedBet } from "./who-win.tsx";

export function Top() {
  const whoWins = useSelectedStore((state) => state.whoWins);
  const exacta = useSelectedStore((state) => state.exacta);
  const quinella = useSelectedStore((state) => state.quinella);
  const trifecta = useSelectedStore((state) => state.trifecta);

  const setWhoWins = useSelectedStore((state) => state.setWhoWins);
  const setExacta = useSelectedStore((state) => state.setExacta);
  const setQuinella = useSelectedStore((state) => state.setQuinella);
  const setTrifecta = useSelectedStore((state) => state.setTrifecta);

  const handleWhoWinsSelect = (bet: SelectedBet | WhoWinSelectedBet) => {
    setWhoWins(newWhoWinSelect(whoWins, bet as WhoWinSelectedBet));
  };

  const handleExactaSelect = (bet: SelectedBet) => {
    setExacta(newSelect(exacta, bet));
  };

  const handleQuinellaSelect = (bet: SelectedBet) => {
    setQuinella(newSelect(quinella, bet));
  };

  const handleTrifectaSelect = (bet: SelectedBet) => {
    setTrifecta(newSelect(trifecta, bet));
  };

  return (
    <div className="top">
      <div className="top__content">
        <TopContentLine
          selected={whoWins}
          onSelect={handleWhoWinsSelect}
          label="Кто выиграет"
          hot={whoWinsT.hot}
          cold={whoWinsT.cold}
        />
        <TopContentLine
          labelsClassName="text-[#8bbaea]"
          label="Exacta"
          selected={exacta}
          hot={exactaT.hot}
          onSelect={handleExactaSelect}
          cold={exactaT.cold}
        />
        <TopContentLine
          label="Quinella"
          selected={quinella}
          onSelect={handleQuinellaSelect}
          hot={quinellaT.hot}
          cold={quinellaT.cold}
        />
        <TopContentLine
          labelsClassName="text-[#8bbaea]"
          selected={trifecta}
          onSelect={handleTrifectaSelect}
          className="top__title-cell-big"
          label="Trifecta"
          hot={trifectaT.hot}
          cold={trifectaT.cold}
        />
      </div>
    </div>
  );
}

function TopContentLine({
  label,
  hot,
  cold,
  className,
  selected,
  onSelect,
  labelsClassName,
}: {
  label: string;
  hot: SelectedBet[] | WhoWinSelectedBet[];
  cold: SelectedBet[] | WhoWinSelectedBet[];
  selected: SelectedBet[] | WhoWinSelectedBet[];
  onSelect: (bet: SelectedBet | WhoWinSelectedBet) => void;
  labelsClassName?: string;
  className?: string;
}) {
  const handleSelect = (bet: SelectedBet | WhoWinSelectedBet) => {
    onSelect(bet);
  };

  return (
    <div className={cn("top__content-line")}>
      <div className={cn("top__title-item sprite top__title-cell", className)}>
        <div className={cn("uppercase scale-text", labelsClassName)}>
          {label}
        </div>
      </div>
      <div className="top__value-cells">
        <div className="grid grid-cols-2 items-center">
          {cold.map((item, index) => (
            <GridItem
              key={index}
              dogs={item.dogs}
              coeff={item.coeff}
              isCold={true}
              className={
                cold.length > 2
                  ? Math.floor(index / 2) % 2 === 0
                    ? labelsClassName
                    : ""
                  : labelsClassName
              }
              isSelected={
                !!selected.find((i) => i.dogs.join("-") === item.dogs.join("-"))
              }
              onSelect={() => handleSelect(item)}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 items-center">
          {hot.map((item, index) => (
            <GridItem
              key={index}
              dogs={item.dogs}
              coeff={item.coeff}
              isHot={true}
              className={
                hot.length > 2
                  ? Math.floor(index / 2) % 2 === 0
                    ? labelsClassName
                    : ""
                  : labelsClassName
              }
              isSelected={
                !!selected.find((i) => i.dogs.join("-") === item.dogs.join("-"))
              }
              onSelect={() => handleSelect(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
