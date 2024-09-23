export function JackpotValue() {
  const value = 100.59;

  const valueStr = value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const valueArray = valueStr.split("");

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
            {valueArray.map((char, index) => {
              if (char === "," || char === ".") {
                return (
                  <span key={index} className="dot">
                    {char}
                  </span>
                );
              } else {
                return (
                  <div key={index} className="jackpot-item jackpot-item sprite">
                    {char}
                  </div>
                );
              }
            })}
          </div>
          <div className="jackpot__done-items">
            <div className="done-item"></div>
            <div className="done-item"></div>
            <div className="done-item"></div>
            <div className="done-item"></div>
            <div className="done-item"></div>
            <div className="done-item"></div>
            <div className="done-item"></div>
            <div className="done-item bg-[#f4bc35_!important]"></div>
            <div className="done-item bg-[#f4bc35_!important]"></div>
            <div className="done-item bg-[#eb4302_!important]"></div>
          </div>
        </div>
        <div className="jackpot-text" />
      </div>
    </div>
  );
}
