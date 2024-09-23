import { useState } from "react";
import { Balance } from "../components/balance.tsx";
import { BetTable } from "../components/bet-table.tsx";
import { Button } from "../ui/button.tsx";
import { cn } from "../utils/cn.ts";
import { Coupon, useCouponStore } from "../utils/stores/use-coupon-store.ts";
import { GameState, useGameStore } from "../utils/stores/use-game-store.ts";
import { useMenuPopupStore } from "../utils/stores/use-menu-popup-store.ts";
import { useSelectedStore } from "../utils/stores/use-selected-store.ts";

export function GameRightBlock() {
  const state = useGameStore((state) => state.state);

  return (
    <div
      className={cn(
        "rightBlock",
        (state === GameState.GAME || state === GameState.RESULTS) &&
          "grid-rows-[calc(85px*var(--zoomCoef))_1fr_0_!important]",
      )}
    >
      <header className="flex items-center justify-end">
        <Balance />
      </header>
      <BetTable />
      {
        <div className={cn("right-block__footer")}>
          <GameRightBlockControls />
        </div>
      }
    </div>
  );
}

function GameRightBlockControls() {
  const [count, setCount] = useState(0.5);
  const gameState = useGameStore((state) => state.state);

  const whoWins = useSelectedStore((state) => state.whoWins);
  const exacta = useSelectedStore((state) => state.exacta);
  const trifecta = useSelectedStore((state) => state.trifecta);
  const quinella = useSelectedStore((state) => state.quinella);
  const clear = useSelectedStore((state) => state.clear);

  const addCoupons = useCouponStore((state) => state.addCoupons);

  const selectedLength =
    whoWins.length + exacta.length + trifecta.length + quinella.length;
  const isActive = selectedLength > 0 && gameState === GameState.BETS;
  const openMenu = useMenuPopupStore((state) => state.open);

  const handleBet = () => {
    const coupons: Coupon[] = [
      ...whoWins,
      ...exacta,
      ...trifecta,
      ...quinella,
    ].map((val) => ({
      ...val,
      bet: count,
      win: 0,
    }));
    addCoupons(coupons);
    clear();
  };

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-[2_1fr]">
        <div className="flex justify-between items-center text-30">
          <Button onClick={openMenu} className="button-menu sprite">
            <div className="uppercase text-[#fcd703] scale-text">Меню</div>
          </Button>
          <Button className="button-menu sprite">
            <div className="uppercase text-[#fcd703] scale-text">
              Мои ставки
            </div>
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <BetCount count={count} onCountChange={setCount} />
        </div>
      </div>
      <div className="flex justify-end items-center">
        <Button
          onClick={handleBet}
          disabled={!isActive}
          className={cn(
            "button-ok sprite uppercase text-[#fcd703] relative text-center",
            !isActive && "opacity-50 hover:opacity-50",
          )}
        >
          <div className="scale-text text-34 text-black">Сделать ставку</div>
          <div className="absolute text-34 w-full scale-text text-black bottom-[calc(34px*var(--zoomCoef))]">
            {selectedLength > 0 && `(${(selectedLength * count).toFixed(2)})`}
          </div>
        </Button>
      </div>
    </>
  );
}

function BetCount({
  count,
  onCountChange,
}: {
  count: number;
  onCountChange: (count: number) => void;
}) {
  const betValues = [0.1, 0.5, 1, 5, 10];

  const handleClick = () => {
    const currentIndex = betValues.indexOf(count);
    const nextIndex = (currentIndex + 1) % betValues.length;

    onCountChange(betValues[nextIndex]);
  };

  return (
    <Button
      onClick={handleClick}
      className="make-bet-button button-stake sprite grid-rows-2 uppercase text-[#fcd703]"
    >
      <div className="flex items-center justify-center text-50 leading-[calc(70px*var(--zoomCoef))] scale-text text-white">
        {count}
      </div>
      <div className="scale-text uppercase text-34 text-black">Ставка</div>
    </Button>
  );
}
