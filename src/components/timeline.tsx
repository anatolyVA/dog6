import { useEffect } from "react";
import { cn } from "../utils/cn.ts";
import { betsClosedTime, gameTime, resultsTime } from "../utils/config.ts";
import { formatTime } from "../utils/format-time.ts";
import { useCouponStore } from "../utils/stores/use-coupon-store.ts";
import { GameState, useGameStore } from "../utils/stores/use-game-store.ts";
import { useSelectedStore } from "../utils/stores/use-selected-store.ts";
import { useTimerStore } from "../utils/stores/use-timer-store.ts";

export function Timeline() {
  const seconds = useTimerStore((state) => state.seconds);
  const timer = useTimerStore((state) => state.timer);
  const setTimer = useTimerStore((state) => state.setTimer);

  const gameTimeout = useTimerStore((state) => state.gameTimeout);
  const resultTimeout = useTimerStore((state) => state.resultTimeout);
  const setResultTimeout = useTimerStore((state) => state.setResultTimeout);
  const setGameTimeout = useTimerStore((state) => state.setGameTimeout);

  const state = useGameStore((state) => state.state);

  const startGame = useGameStore((state) => state.startGame);
  const startBets = useGameStore((state) => state.startBets);
  const startBetsClosed = useGameStore((state) => state.startBetsClosed);
  const startResult = useGameStore((state) => state.startResults);
  const clearSelected = useSelectedStore((state) => state.clear);

  const clearCoupons = useCouponStore((state) => state.clear);
  const setCoupons = useCouponStore((state) => state.setCoupons);
  const coupons = useCouponStore((state) => state.coupons);

  const balance = useGameStore((state) => state.balance);
  const setBalance = useGameStore((state) => state.setBalance);

  useEffect(() => {
    if (state === GameState.BETS) {
      clearCoupons();
    }
  }, [state]);

  useEffect(() => {
    let interval = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer > 0 ? timer - 0.1 : 0);
      }, 100);
    } else {
      setTimer(0);
      startBetsClosed();
      clearSelected();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      const delayTimeout = setTimeout(() => {
        startGame();
        const gameTimeoutId = setTimeout(() => {
          startResult();

          // random win
          const randomWin = coupons.map((value) => ({
            ...value,
            win: Math.random() > 0.9 ? value.coeff * value.bet : 0,
          }));
          const total = randomWin.reduce((acc, val) => acc + val.win, 0);
          setBalance(balance + total);
          setCoupons(randomWin);
          setTimer(seconds);
          const resultTimeoutId = setTimeout(() => {
            startBets();
          }, resultsTime * 1000);
          setResultTimeout(resultTimeoutId);
        }, gameTime * 1000);
        setGameTimeout(gameTimeoutId);
      }, betsClosedTime * 1000);

      return () => {
        clearTimeout(delayTimeout);
        clearTimeout(gameTimeout);
        clearTimeout(resultTimeout);
      };
    }
  }, [timer, seconds, setGameTimeout, setResultTimeout]);

  return (
    <div className="timeline">
      <div className="timeline-border"></div>
      <div
        className={cn(
          "timeline-content",
          state === GameState.GAME && "h-[0_!important] invisible",
        )}
      >
        <span className="text-50 z-[1] font-bold m-[0_2%] scale-text leading-3">
          {timer > 0 ? formatTime(timer) : "00:00"}
        </span>
        <span className="text-30 z-[1] opacity-60 scale-text"># 2222222</span>
        <div className="timeline__line-wrapper">
          <div
            className={`fill-line ${Math.floor(timer % 60) <= 2 ? "bg-[#c20030]" : Math.floor(timer % 60) <= 5 ? "blink-red" : "bg-[#044ba3]"}`}
            style={{
              transform: `translateX(-${(timer / seconds) * 100}%)`,
            }}
          />
        </div>
      </div>
      <div className="timeline-border"></div>
    </div>
  );
}
