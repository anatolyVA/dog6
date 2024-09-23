import { useEffect, useState } from "react";
import { MenuSettings } from "../components/menu-settings.tsx";
import { Button } from "../ui/button.tsx";
import { cn } from "../utils/cn.ts";
import { useGameWrapperSizes } from "../utils/hooks/useGameWrapperSizes.ts";
import { GameState, useGameStore } from "../utils/stores/use-game-store.ts";
import { GameLeftBlock } from "./game.left-block.tsx";
import { GameRightBlock } from "./game.right-block.tsx";

export function Game() {
  const [isFitWindow, setIsFitWindow] = useState(false);
  const state = useGameStore((state) => state.state);
  useGameWrapperSizes(isFitWindow);

  useEffect(() => {
    const updateZoom = () => {
      const game = document.getElementById("game");
      if (!game) return;
      const vh = 0.01 * game.offsetHeight;
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      const width = game.offsetWidth;
      const height = game.offsetHeight;
      const aspectRatio = width / height;

      let newZoomCoef;
      if (aspectRatio > 1.77) {
        newZoomCoef = height / 1080;
      } else {
        newZoomCoef = width / 1920;
        console.log(vh);
      }

      document.documentElement.style.setProperty(
        "--zoomCoef",
        `${newZoomCoef}`,
      );
    };

    updateZoom();
    document.addEventListener("fullscreenchange", updateZoom);
    window.addEventListener("resize", updateZoom);
    return () => {
      window.removeEventListener("resize", updateZoom);
      document.removeEventListener("fullscreenchange", updateZoom);
    };
  }, [isFitWindow]);

  const onFit = () => setIsFitWindow(!isFitWindow);

  //calc(58px*var(--zoomCoef))

  return (
    <div>
      <header
        className={
          "h-[40px] bg-black/80 w-full flex justify-center items-center"
        }
      >
        <span className="text-28">Game header</span>
        <Button onClick={onFit}>Fit</Button>
      </header>
      <div id="game" className={cn("game-container overflow-hidden")}>
        <MenuSettings />
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
