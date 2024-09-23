import homeIcon from "../assets/svg/home.svg";
import { Button } from "../ui/button.tsx";
import { cn } from "../utils/cn.ts";
import { GameState, useGameStore } from "../utils/stores/use-game-store.ts";

export function BetTable() {
  const state = useGameStore((state) => state.state);

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
          {/*<div className="bet-table__row"></div>*/}
          <div className="bet-table__items"></div>
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
            0
          </span>
          <span className="bet-table__header-title text-[#fff_!important]"></span>
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
