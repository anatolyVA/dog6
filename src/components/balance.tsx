import { useGameStore } from "../utils/stores/use-game-store.ts";

export function Balance() {
  const balance = useGameStore((state) => state.balance);

  const balanceStr = balance.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex items-center">
      <div className="text-36 text-[#fcd703] uppercase mt-[calc(8px*var(--zoomCoef))] scale-text">
        Баланс
      </div>
      <img
        src="src/assets/svg/USD.svg"
        className="rightBlock-balanceCur"
        alt="$"
      />
      <div className="text-52 font-bold scale-text mr-[calc(-10px*var(--zoomCoef))]">
        {balanceStr}
      </div>
    </div>
  );
}
