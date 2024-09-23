import homeIcon from "../assets/svg/home.svg";
import { Button } from "../ui/button.tsx";
import { cn } from "../utils/cn.ts";
import { useCouponStore } from "../utils/stores/use-coupon-store.ts";
import { GameState, useGameStore } from "../utils/stores/use-game-store.ts";
import { BetType } from "../utils/types/bet-type.ts";

export function BetTable() {
  const state = useGameStore((state) => state.state);
  const coupons = useCouponStore((state) => state.coupons);

  const split = (betType: BetType) => {
    if (betType === BetType.QUINELLA) return "/";
    return "-";
  };

  const isRenderDogsNumber = (betType: BetType) => {
    if (
      betType === BetType.ABOVE ||
      betType === BetType.BELOW ||
      betType === BetType.EVEN ||
      betType === BetType.ODD
    )
      return false;
    return true;
  };

  return (
    <div className="bet-table-wrapper">
      <div className="bet-table">
        <header
          className={cn(
            "bet-table__header bet-table__row text-26",
            state === GameState.RESULTS &&
              "grid-cols-[2fr_1fr_1fr_2fr_!important]",
          )}
        >
          <span className="bet-table__header-title">Результат</span>
          <span className="bet-table__header-title">Коэф.</span>
          <span className="bet-table__header-title">Ставка</span>
          <span className="bet-table__header-title">Выигрыш</span>
        </header>
        <main className="bet-table__body">
          <div className="bet-table__items">
            {coupons
              .map((coupon, index) => (
                <div
                  className={cn(
                    "bet-table__row text-32 blinker-animation",
                    state === GameState.RESULTS &&
                      "grid-cols-[2fr_1fr_1fr_2fr_!important]",
                    coupon.win > 0 && "bet-table__row_win",
                  )}
                  key={index}
                >
                  <span className="scale-text">
                    {coupon.betType}
                    {isRenderDogsNumber(coupon.betType) && (
                      <span> ({coupon.dogs.join(split(coupon.betType))})</span>
                    )}
                  </span>
                  <span className="scale-text">{coupon.coeff}</span>
                  <span className="scale-text">{coupon.bet}</span>
                  <span className="scale-text">{coupon.win.toFixed(2)}</span>
                </div>
              ))
              .reverse()}
          </div>
        </main>
        <footer
          className={cn(
            "bet-table__footer bet-table__row text-32",
            state === GameState.RESULTS &&
              "grid-cols-[2fr_1fr_1fr_2fr_!important]",
          )}
        >
          <span className="bet-table__header-title uppercase text-[#fff_!important]">
            Итого
          </span>
          <span className="bet-table__header-title text-[#fff_!important]"></span>
          <span className="bet-table__header-title text-[#fff_!important]">
            {coupons.reduce((acc, coupon) => acc + coupon.bet, 0).toFixed(2)}
          </span>
          <span className="bet-table__header-title text-[#fff_!important]">
            {Math.floor(
              coupons.reduce((acc, coupon) => acc + coupon.win, 0),
            ).toFixed(2)}
          </span>
        </footer>
      </div>
      <div className="bet-table__coupon-text">
        <span className="uppercase scale-text">Купон</span>
      </div>
      <Button className="exit-btn">
        <img
          src={homeIcon}
          className="h-[75%] m-[calc(5px*var(--zoomCoef))]"
          alt="home"
        />
      </Button>
    </div>
  );
}
