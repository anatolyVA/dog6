import homeIcon from "../assets/svg/home.svg";
import { Button } from "../ui/button.tsx";

export function BetTable() {
  return (
    <div className="bet-table-wrapper">
      <div className="bet-table">
        <header className="bet-table__header bet-table__row text-26">
          <span className="bet-table__header-title">Результат</span>
          <span className="bet-table__header-title">Коэффициент</span>
          <span className="bet-table__header-title">Ставка</span>
          <span className="bet-table__header-title">Выигрыш</span>
        </header>
        <main className="bet-table__body">
          {/*<div className="bet-table__row"></div>*/}
          <div className="bet-table__items"></div>
        </main>
        <footer className="bet-table__footer bet-table__row text-32">
          <span className="bet-table__header-title uppercase">Итого</span>
          <span className="bet-table__header-title"></span>
          <span className="bet-table__header-title">0</span>
          <span className="bet-table__header-title"></span>
        </footer>
      </div>
      <div className="bet-table__coupon-text">
        <span className="uppercase">Купон</span>
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
