import { useEffect, useState } from "react";
import { Button } from "../ui/button.tsx";
import { gameTime } from "../utils/config.ts";
import { formatTime } from "../utils/format-time.ts";
import { VideoQualityValue } from "../utils/settings.ts";
import { useSettingsStore } from "../utils/stores/use-settings-store.ts";

export function Video() {
  const [timer, setTimer] = useState(gameTime);
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

  const isVideoLoading = true;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="video">
      <div className="video__top">
        <div className="text-42 scale-text m-[calc(15px*var(--zoomCoef))] uppercase">
          Раунд
        </div>
        <div className="text-36 scale-text text-[#fcd703]"># 2222222</div>
      </div>
      <div className="video__block">
        <div className="video-container">
          {settings.video === "on" ? (
            isVideoLoading ? (
              <span className="uppercase text-32 text-[#fcd703]">Loading</span>
            ) : (
              <video className="video-container__video" />
            )
          ) : (
            <div className="no-video-content">
              <div className="uppercase font-bold text-42">
                До окончания забега
              </div>
              <div className="text-70 font-bold">{formatTime(timer)}</div>
            </div>
          )}
        </div>
      </div>
      <div className="video__controls">
        <Button
          onClick={() => handleChangeOnOff("video")}
          className={settings.video === "on" ? `video-on` : `video-off`}
        />
        <Button
          onClick={handleVideoQuality}
          className={`video-quality video-quality_${settings.videoQuality} uppercase text-[#fcd703]`}
        ></Button>
        <Button
          onClick={() => handleChangeOnOff("sound")}
          className={settings.sound === "on" ? `sound-on` : `sound-off`}
        />
      </div>
    </div>
  );
}
