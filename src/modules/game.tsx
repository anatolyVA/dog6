import { useState } from "react";
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
  const state = useGameStore((state) => state.state);
  useGameWrapperSizes(isFitWindow);
  useZoomCoefficient(isFitWindow);

  const onFit = () => setIsFitWindow(!isFitWindow);

  return (
    <div>
      <header
        className={
          "h-[40px] text-[#cca456] bg-black/80 w-full flex justify-between px-4 items-center"
        }
      >
        <span className="text-40">Dog6</span>
        <span className="text-26">Вы играете на демо счет</span>
        <Button onClick={onFit}>Fit</Button>
      </header>
      <div id="game" className={cn("game-container overflow-hidden")}>
        <MenuSettings />
        <Rules />
        <div
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
