import USD from "../assets/svg/USD.svg";
import { BetTable } from "../components/bet-table.tsx";
import { Button } from "../ui/button.tsx";

export function GameRightBlock() {
  return (
    <div className="rightBlock">
      <header className="flex items-center justify-end">
        <span className="text-36 text-[#fcd703] uppercase mt-[calc(8px*var(--zoomCoef))]">
          Баланс
        </span>
        <img src={USD} className="rightBlock-balanceCur" alt="$" />
        <span className="text-52 font-bold">50 000</span>
      </header>
      <BetTable />
      <div className="right-block__footer">
        <div className="grid grid-cols-1 grid-rows-[2_1fr]">
          <div className="flex justify-between items-center text-30">
            <Button className="button-menu sprite uppercase text-[#fcd703]">
              Меню
            </Button>
            <Button className="button-menu sprite uppercase text-[#fcd703]">
              Мои ставки
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <Button className="make-bet-button button-stake sprite grid-rows-2 uppercase text-[#fcd703]">
              <span className="flex items-center justify-center text-50 leading-[calc(70px*var(--zoomCoef))] text-white">
                1
              </span>
              <span className="uppercase text-34 text-black">Ставка</span>
            </Button>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Button className="button-ok sprite uppercase text-[#fcd703]">
            <div className="scale-text text-34 text-black">Сделать ставку</div>
            <span className="absolute"></span>
          </Button>
        </div>
      </div>
    </div>
  );
}
