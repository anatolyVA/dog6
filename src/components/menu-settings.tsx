import { Button } from "../ui/button.tsx";
import { VideoQualityValue } from "../utils/settings.ts";
import { useMenuPopupStore } from "../utils/stores/use-menu-popup-store.ts";
import { useSettingsStore } from "../utils/stores/use-settings-store.ts";

export function MenuSettings() {
  const isOpen = useMenuPopupStore((state) => state.isOpen);
  const close = useMenuPopupStore((state) => state.close);

  const settings = useSettingsStore((state) => state.userSettings);
  const updateSetting = useSettingsStore((state) => state.updateSetting);

  const handleChangeOnOff = (key: "sound" | "video") => {
    const newSetting = settings[key] === "on" ? "off" : "on";
    updateSetting(key, newSetting);
  };

  const handleVideoQuality = () => {
    const arr: VideoQualityValue[] = ["auto", "high", "low"];
    const newSetting = arr[arr.indexOf(settings.videoQuality) + 1] || arr[0];
    updateSetting("videoQuality", newSetting);
  };

  return (
    isOpen && (
      <div className="menu-settings">
        <img src="src/assets/svg/line.svg" className="menu-settings__divider" />
        <header className="flex text-40 justify-center items-center uppercase scale-text">
          Menu
        </header>
        <main className="grid grid-cols-2 w-full grid-rows-1 justify-center">
          <section className="flex justify-center">
            <Button className="menu-exit-button uppercase text-[#fcd703]">
              <img
                src="src/assets/svg/home.svg"
                className="h-[60%] m-[calc(5px*var(--zoomCoef))]"
              />
              Quit the game
            </Button>
          </section>
          <section className="grid grid-rows-3 grid-cols-1">
            <div className="flex uppercase justify-between items-center p-[0_calc(10px*var(--zoomCoef))]">
              <div className="scale-text">Sound</div>
              <Button
                onClick={() => handleChangeOnOff("sound")}
                className={settings.sound === "on" ? "toggle-on" : "toggle-off"}
              />
            </div>
            <div className="flex uppercase justify-between items-center p-[0_calc(10px*var(--zoomCoef))]">
              <div className="scale-text">Video</div>
              <Button
                onClick={() => handleChangeOnOff("video")}
                className={settings.video === "on" ? "toggle-on" : "toggle-off"}
              />
            </div>
            <div className="flex uppercase justify-between items-center p-[0_calc(10px*var(--zoomCoef))]">
              <div className="scale-text">Video quality</div>
              <Button
                onClick={handleVideoQuality}
                className="menu-video-quality-button uppercase text-[#fcd703]"
              >
                {settings.videoQuality}
              </Button>
            </div>
          </section>
        </main>
        <footer className="flex justify-center items-center">
          <Button
            onClick={close}
            className="menu-ok-button uppercase text-[#fcd703]"
          >
            Ok
          </Button>
        </footer>
      </div>
    )
  );
}
