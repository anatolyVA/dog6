import { useEffect } from "react";
import { Game } from "./modules/game.tsx";

function App() {
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
    window.addEventListener("resize", updateZoom);

    return () => window.removeEventListener("resize", updateZoom);
  }, []);

  return (
    <main className="flex flex-col justify-center items-center wrapper">
      <Game />
    </main>
  );
}

export default App;
