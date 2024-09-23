import { useEffect, useState } from "react";
import { Button } from "../ui/button.tsx";
import { resultsTime } from "../utils/config.ts";
import { useGameStore } from "../utils/stores/use-game-store.ts";
import { useTimerStore } from "../utils/stores/use-timer-store.ts";
import { WinBlock } from "./win-block.tsx";

export function Result() {
  const winners = [1, 2, 3];
  const [timer, setTimer] = useState(resultsTime);
  const startBets = useGameStore((state) => state.startBets);
  const resetTimeouts = useTimerStore((state) => state.resetTimeouts);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleCloseResult = () => {
    resetTimeouts();
    startBets();
  };

  return (
    <div className="result">
      <div className="result__header">
        <div className="uppercase text-34">
          Окно автоматически закроется через
        </div>
        <div className="text-34 uppercase text-[#fcd703] ">{timer} секунд</div>
      </div>

      <div className="result__content">
        <div className="flex flex-col justify-center items-center mb-[calc(15px*var(--zoomCoef))]">
          <div className="scale-text text-50 uppercase">
            Забег <span className="text-[#fcd703]"># 22222222</span> закончился
          </div>
          <div className="scale-text text-50 uppercase text-[#fcd703]">
            Выигрышные ставки
          </div>
        </div>
        <div className="sprite win-table">
          <div className="result__table-item uppercase text-34">Место</div>
          <div className="result__table-item"></div>
          <div className="result__table-item"></div>
          <div className="result__table-item"></div>
          <div className="result__table-item text-34">#</div>
          <div
            className={`result__table-item final-item-scaled sprite big-${winners[0]}`}
          ></div>
          <div
            className={`result__table-item final-item-scaled sprite big-${winners[1]}`}
          ></div>
          <div
            className={`result__table-item final-item-scaled sprite big-${winners[2]}`}
          ></div>
        </div>
      </div>
      <WinBlock />
      <Button onClick={handleCloseResult} className="result__close"></Button>
    </div>
  );
}
