import { useEffect } from "react";
import { Game } from "./modules/game.tsx";
import {
  defaultSettings,
  getSettings,
  saveSettings,
} from "./utils/stores/settings.ts";

function App() {
  useEffect(() => {
    const settings = getSettings();
    if (!settings) saveSettings(defaultSettings);
  }, []);

  return (
    <main className="flex flex-col justify-center items-center wrapper">
      <Game />
    </main>
  );
}

export default App;
