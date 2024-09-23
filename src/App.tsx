import { useEffect } from "react";
import { Game } from "./modules/game.tsx";
import { defaultSettings, getSettings } from "./utils/settings.ts";
import { useSettingsStore } from "./utils/stores/use-settings-store.ts";

function App() {
  const saveSettingsStore = useSettingsStore((state) => state.saveSettings);
  useEffect(() => {
    const settings = getSettings();
    if (!settings) saveSettingsStore(defaultSettings);
    else saveSettingsStore(settings);
  }, []);

  return (
    <main className="flex flex-col justify-center items-center wrapper">
      <Game />
    </main>
  );
}

export default App;
