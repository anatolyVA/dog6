import { useEffect, useState } from "react";
import { Button } from "../ui/button.tsx";
import { formatTime } from "../utils/format-time.ts";
import {
  getSettings,
  ISettings,
  updateSetting,
  VideoQualityValue,
} from "../utils/stores/settings.ts";

export function Video() {
  const [timer, setTimer] = useState(10);
  const settings = getSettings();
  const [state, setState] = useState<ISettings>(settings);

  const handleChangeOnOff = (key: "sound" | "video") => {
    const newSetting = settings[key] === "on" ? "off" : "on";
    updateSetting(key, newSetting);
    setState({
      ...state,
      [key]: newSetting,
    });
  };

  const handleVideoQuality = () => {
    const arr: VideoQualityValue[] = ["auto", "high", "low"];
    const newSetting = arr[arr.indexOf(state.videoQuality) + 1] || arr[0];
    updateSetting("videoQuality", newSetting);
    setState({
      ...state,
      videoQuality: newSetting,
    });
  };

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
          <div className="no-video-content">
            <div className="uppercase font-bold text-42">
              До окончания забега
            </div>
            <div className="text-70 font-bold">{formatTime(timer)}</div>
          </div>
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
