export function JackpotValue() {
  return (
    <div className="h-[calc(115px*var(--zoomCoef))] text-center">
      <div className="flex justify-end overflow-hidden relative text-black">
        <div>
          <img
            className="left-jackpot__currency"
            src="src/assets/svg/USD.svg"
            alt="$"
          />
        </div>
        <div className="grid h-[calc(113px*var(--zoomCoef))] bg-contain float-left">
          <div className="flex text-39 font-bold">
            <div className="jackpot-item jackpot-item sprite">6</div>
            <div className="jackpot-item jackpot-item sprite">3</div>
            <span className="dot">.</span>
            <div className="jackpot-item jackpot-item sprite">0</div>
            <div className="jackpot-item jackpot-item sprite">4</div>
          </div>
          <div className="jackpot__done-items">
            <div className="done-item"></div>
            <div className="done-item"></div>
            <div className="done-item"></div>
            <div className="done-item"></div>
          </div>
        </div>
        <div className="jackpot-text">
          {/*<img className="jackpot-text" src="src/assets/png/jp.png" />*/}
        </div>
      </div>
    </div>
  );
}
