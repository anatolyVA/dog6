import { BetType } from "../utils/types/bet-type.ts";
import { cn } from "../utils/cn.ts";
import { decimalDotToComma } from "../utils/decimal-dot-to-comma.ts";
import { Button } from "./button.tsx";

export type SelectedBet = {
  coeff: number;
  dogs: number[];
  betType: BetType;
};

export function GridItem({
  dogs,
  coeff,
  betType,
  isHot,
  isCold,
  className,
  label,
  isSelected,
  onSelect,
}: {
  dogs: number[];
  coeff: number;
  betType?: BetType;
  isHot?: boolean;
  isCold?: boolean;
  className?: string;
  label?: string;
  isSelected: boolean;
  onSelect: (bet: SelectedBet) => void;
}) {
  const handleSelect = () => {
    onSelect({ dogs, coeff, betType: betType ?? BetType.WINNER });
  };
  return (
    <Button
      onClick={handleSelect}
      className={cn(
        `grid-item sprite cell relative`,
        isSelected && "cell-active hover:opacity-100",
        className,
      )}
    >
      <span
        className={`flex items-center justify-center text-34 scale-text ${isSelected ? "text-[#00297c_!important]" : ""}`}
      >
        {label || dogs.join("-")}
      </span>
      <span
        className={`flex items-center justify-center text-34 scale-text ${isSelected ? "text-[#fcd703_!important]" : ""}`}
      >
        {decimalDotToComma(coeff)}
      </span>
      {(isCold && <div className="cold-pos sprite cold"></div>) ||
        (isHot && <div className="hot-pos sprite hot"></div>)}
    </Button>
  );
}
