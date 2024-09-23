import { useEffect, useState } from "react";
import { formatTime } from "../utils/format-time.ts";

export function Video() {
  const [timer, setTimer] = useState(10);

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
      <div className="video__controls">1</div>
    </div>
  );
}
