import { useEffect, useState } from "react";
import { Loading } from "../components/loading.tsx";
import { MenuSettings } from "../components/menu-settings.tsx";
import { Rules } from "../components/rules.tsx";
import { Button } from "../ui/button.tsx";
import { cn } from "../utils/cn.ts";
import { useGameWrapperSizes } from "../utils/hooks/use-game-wrapper-sizes.ts";
import { GameState, useGameStore } from "../utils/stores/use-game-store.ts";
import { GameLeftBlock } from "./game.left-block.tsx";
import { GameRightBlock } from "./game.right-block.tsx";
import { useZoomCoefficient } from "../utils/hooks/use-zoom-coefficient.ts";

export function Game() {
  const [isFitWindow, setIsFitWindow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const state = useGameStore((state) => state.state);
  const { width, height } = useGameWrapperSizes(isFitWindow);
  useZoomCoefficient(isFitWindow);

  const onFit = () => setIsFitWindow(!isFitWindow);
  const onFull = () => {
    const elem = document.documentElement;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      elem.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
        );
      });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      style={{
        width: width + "px",
      }}
      className="grid overflow-hidden"
    >
      <header
        style={{
          width: width + 1 + "px",
        }}
        className={
          "header h-[40px] text-[#cca456] bg-black/80 flex justify-between px-4 items-center"
        }
      >
        <span className="text-40">Dog6</span>
        <span className="text-26">Вы играете на демо счет</span>
        <div className="flex gap-4">
          <Button
            onClick={onFull}
            className="game-panel__header__controls__item"
            title="Открыть на полный экран"
          >
            <svg
              className="w-[calc(36px*var(--zoomCoef))] h-[calc(36px*var(--zoomCoef))]"
              viewBox="62.521 63.146 17.095 17.094"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <path
                fill="#D5B577"
                d="M63.938 68.693v-4.121h14.229v14.23h-3.673v1.351h3.847c.648 0 1.177-.527 1.177-1.176V64.399c0-.648-.527-1.177-1.177-1.177H63.765a1.18 1.18 0 0 0-1.178 1.177v4.294h1.351z"
              ></path>
              <path
                fill="#D5B577"
                d="M71.59 70.927h-8.436a.568.568 0 0 0-.566.567v8.089a.57.57 0 0 0 .566.568h8.436a.568.568 0 0 0 .566-.568v-8.089a.568.568 0 0 0-.566-.567zm-.817 8.014H63.97v-6.803h6.803v6.803z"
              ></path>
            </svg>
          </Button>
          <Button onClick={onFit} title="Растянуть на весь экран">
            <svg
              className="w-[calc(36px*var(--zoomCoef))] h-[calc(36px*var(--zoomCoef))]"
              viewBox="62.24 63.24 17.125 17.109"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <path
                fill="#D5B577"
                d="M78.562 63.917a.758.758 0 0 0-.509-.211h-3.39a.548.548 0 0 0-.546.548v.187c0 .302.245.548.546.548h1.966l-6.381 6.371a.55.55 0 0 0 .001.772l.138.136a.539.539 0 0 0 .384.155.56.56 0 0 0 .387-.159l6.377-6.371v1.752c0 .302.246.547.548.547h.187a.548.548 0 0 0 .548-.547V64.47a.81.81 0 0 0-.256-.553z"
              ></path>
              <path
                fill="#D5B577"
                d="M77.933 71.554v7.365h-14.23v-14.23h7.365v-1.351h-7.539c-.648 0-1.176.527-1.176 1.177v14.576a1.18 1.18 0 0 0 1.176 1.179h14.576a1.18 1.18 0 0 0 1.177-1.179v-7.537h-1.349z"
              ></path>
            </svg>
          </Button>
          <Button title="Закрыть">
            <svg
              className="w-[calc(36px*var(--zoomCoef))] h-[calc(36px*var(--zoomCoef))]"
              viewBox="63.021 63.412 16.797 16.796"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <path
                fill="#D5B577"
                d="M72.49 71.818l7.173-7.172a.284.284 0 0 0 0-.4l-.678-.678a.284.284 0 0 0-.4 0l-7.173 7.172-7.138-7.137a.334.334 0 0 0-.47 0l-.609.608a.334.334 0 0 0 0 .47l7.139 7.138-7.173 7.171a.284.284 0 0 0 0 .4l.678.678c.11.111.29.111.4 0l7.173-7.172 7.139 7.139c.13.129.341.129.47 0l.608-.609a.333.333 0 0 0 0-.469l-7.139-7.139z"
              ></path>
            </svg>
          </Button>
        </div>
      </header>
      <div id="game" className={cn("game-container overflow-hidden")}>
        <Loading
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          isLoading={isLoading}
        />
        <MenuSettings />
        <Rules />
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          className={cn(
            "game-container__content",
            state === GameState.RESULTS &&
              "grid-cols-[calc(1115px*var(--zoomCoef))_calc(20px*var(--zoomCoef))_1fr_!important]",
          )}
        >
          <GameLeftBlock />
          <div className="bg-line sprite" />
          <GameRightBlock />
        </div>
      </div>
    </div>
  );
}
