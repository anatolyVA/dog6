import { Button } from "../ui/button.tsx";
import { SelectedBet } from "../ui/grid-item.tsx";
import { whoWinsT } from "../utils/test-variables.ts";
import { decimalDotToComma } from "../utils/decimal-dot-to-comma.ts";
import { useSelectedStore } from "../utils/stores/use-selected-store.ts";
import { BetType } from "../utils/types/bet-type.ts";

export function WhoWin() {
  const coeffs = [1.4, 3.2, 6.5, 8, 5.3, 9.4];
  const whoWins = useSelectedStore((state) => state.whoWins);
  const setWhoWins = useSelectedStore((state) => state.setWhoWins);

  const filterDogsByBetType = (betType: BetType) => {
    return whoWins
      .filter((bet) => bet.betType === betType)
      .flatMap((bet) => bet.dogs);
  };

  const onSelectBet = (bet: SelectedBet) => {
    setWhoWins(newWhoWinSelect(whoWins, bet));
  };

  return (
    <div className="p-[0_1.4%] who-win">
      <div className="grid grid-cols-6 pl-[15.5%] items-center justify-center">
        <RateItem className="big-1" rate={3} />
        <RateItem className="big-2" rate={2} />
        <RateItem className="big-3" rate={1} />
        <RateItem className="big-4" rate={5} />
        <RateItem className="big-5" rate={4} />
        <RateItem className="big-6" rate={3} />
      </div>
      <div className="who-win__main-table">
        <WhoWinRow
          label="Победитель"
          iconName="win-1_1"
          coeffs={coeffs}
          selected={filterDogsByBetType(BetType.WINNER)}
          onSelectBet={onSelectBet}
          betType={BetType.WINNER}
        />
        <WhoWinRow
          label={BetType.FIRST_OR_SECOND}
          iconName="win-2_1"
          coeffs={coeffs}
          selected={filterDogsByBetType(BetType.FIRST_OR_SECOND)}
          onSelectBet={onSelectBet}
          betType={BetType.FIRST_OR_SECOND}
        />
        <WhoWinRow
          label={BetType.FIRST_BETWEEN_THIRD}
          iconName="win-3_1"
          coeffs={coeffs}
          selected={filterDogsByBetType(BetType.FIRST_BETWEEN_THIRD)}
          onSelectBet={onSelectBet}
          betType={BetType.FIRST_BETWEEN_THIRD}
        />
      </div>
      <div className="flex justify-between items-center h-full w-full">
        <SelectOdd
          label="Нечёт"
          coeff={5.5}
          isSelected={!!whoWins.find((b) => b.betType === BetType.ODD)}
          onSelect={onSelectBet}
          betType={BetType.ODD}
        />
        <SelectOdd
          label="Чёт"
          coeff={5.5}
          isSelected={!!whoWins.find((b) => b.betType === BetType.EVEN)}
          onSelect={onSelectBet}
          betType={BetType.EVEN}
        />
        <SelectOdd
          label="Меньше"
          coeff={5.5}
          isSelected={!!whoWins.find((b) => b.betType === BetType.BELOW)}
          onSelect={onSelectBet}
          betType={BetType.BELOW}
        />
        <SelectOdd
          label="Больше"
          coeff={5.5}
          isSelected={!!whoWins.find((b) => b.betType === BetType.ABOVE)}
          onSelect={onSelectBet}
          betType={BetType.ABOVE}
        />
      </div>
    </div>
  );
}

function WhoWinRow({
  label,
  iconName,
  coeffs,
  selected,
  betType,
  onSelectBet,
}: {
  label: string;
  iconName?: string;
  selected: number[];
  coeffs: number[];
  onSelectBet: (bet: SelectedBet) => void;
  betType: BetType;
}) {
  const handleClick = (index: number) => {
    onSelectBet({ betType, dogs: [index + 1], coeff: coeffs[index] });
  };

  const isTypeFirstOrSecond = betType === BetType.FIRST_OR_SECOND;

  return (
    <>
      <div className="who-win__name-cell sprite cell-win-1 uppercase">
        <div className={`who-win__name-cell-icon sprite ${iconName}`}></div>
        <span
          className={`scale-text ${isTypeFirstOrSecond ? "text-[#8bbaea_!important]" : ""}`}
        >
          {label}
        </span>
      </div>
      {coeffs.map((coeff, index) => {
        const isHot = whoWinsT.hot.find(
          (b) => b.betType === betType && b.dogs.join() === index + 1 + "",
        );
        const isCold = whoWinsT.cold.find(
          (b) => b.betType === betType && b.dogs.join() === index + 1 + "",
        );

        return (
          <Button
            onClick={() => handleClick(index)}
            key={index}
            className={`relative who-win__value-cell sprite cell-win ${isTypeFirstOrSecond ? "text-[#8bbaea_!important]" : ""} ${selected.includes(index + 1) ? "cell-win_active text-[#fcd703_!important] hover:opacity-100" : ""}`}
          >
            {decimalDotToComma(coeff)}
            {(isCold && <div className="cold-pos sprite cold"></div>) ||
              (isHot && <div className="hot-pos sprite hot"></div>)}
          </Button>
        );
      })}
    </>
  );
}

function RateItem({
  rate = 1,
  className,
}: {
  rate?: number;
  className?: string;
}) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="rating-wrapper">
        {new Array(5).fill(0).map((_, index) => (
          <span
            key={index}
            className={`sprite ${index + 1 > rate ? "star-0" : "star-1"}`}
          />
        ))}
      </div>
      <div className={`sprite ${className}`}></div>
    </div>
  );
}

function SelectOdd({
  label,
  coeff,
  isSelected,
  onSelect,
  betType,
}: {
  label: string;
  coeff: number;
  isSelected: boolean;
  onSelect: (bet: SelectedBet) => void;
  betType: BetType;
}) {
  const dogs = [1, 2, 3, 4, 5, 6].filter((value) => {
    switch (betType) {
      case BetType.ODD:
        return value % 2 !== 0;
      case BetType.EVEN:
        return value % 2 === 0;
      case BetType.ABOVE:
        return value > 3;
      case BetType.BELOW:
        return value < 4;
      default:
        return true;
    }
  });

  const handleClick = () => {
    onSelect({ betType, dogs: dogs, coeff });
  };

  const firstSprite = `sprite s${dogs[0]}`;
  const secondSprite = `sprite s${dogs[1]}`;
  const thirdSprite = `sprite s${dogs[2]}`;

  return (
    <Button
      className={`who-win__winner-item sprite cell-win-odd ${isSelected ? "cell-win-odd_active" : ""}`}
      onClick={handleClick}
    >
      <div className="flex justify-around items-center">
        <span
          className={`uppercase text-28 scale-text ${isSelected ? "text-[#00297c_!important]" : "text-[#8bbaea_!important]"}`}
        >
          {label}
        </span>
        <div className="flex justify-between w-[52%]">
          <div className={firstSprite}></div>
          <div className={secondSprite}></div>
          <div className={thirdSprite}></div>
        </div>
      </div>
      <span
        className={`flex justify-center items-center text-36 scale-text ${isSelected ? "text-[#fcd703_!important]" : ""}`}
      >
        {decimalDotToComma(coeff)}
      </span>
    </Button>
  );
}

export const newWhoWinSelect = (prev: SelectedBet[], bet: SelectedBet) => {
  if (
    bet.betType === BetType.ABOVE ||
    bet.betType === BetType.BELOW ||
    bet.betType === BetType.ODD ||
    bet.betType === BetType.EVEN
  ) {
    if (prev.find((b) => b.betType === bet.betType)) {
      return prev.filter((b) => b.betType !== bet.betType);
    } else {
      return [...prev, bet];
    }
  }
  if (
    prev.find(
      (b) =>
        b.dogs.join("-") === bet.dogs.join("-") && b.betType === bet.betType,
    )
  ) {
    return prev.filter(
      (b) =>
        b.dogs.join("-") !== bet.dogs.join("-") || b.betType !== bet.betType,
    );
  } else {
    return [...prev, bet];
  }
};
