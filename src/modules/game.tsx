import { useEffect } from "react";
import { GameLeftBlock } from "./game.left-block.tsx";
import { GameRightBlock } from "./game.right-block.tsx";

export function Game() {
  const isFitWindow = !0;
  useEffect(() => {
    const updateSize = () => {
      const game = document.getElementById("game");
      if (!game) return;
      let e = Math.min(
        (window.innerHeight - (isFitWindow ? 40 : 0)) / 1080,
        window.innerWidth / 1920,
      );

      if (isFitWindow) e *= 0.812;

      game.style.width = (1920 * e).toFixed(0) + "px";
      game.style.height = (1080 * e).toFixed(0) + "px";
    };

    updateSize();

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return (
    <div id="game" className="border-2 border-black game-container">
      <GameLeftBlock />
      <div className="bg-line sprite" />
      <GameRightBlock />
    </div>
  );
}
