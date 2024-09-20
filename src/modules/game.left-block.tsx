export function GameLeftBlock() {
  return (
    <div className="leftBlock">
      <div className="left-block__top">
        <header className="left-block__header">1</header>
        <div className="timeline">
          <div className="timeline-border"></div>
          <div className="timeline-content">
            <span className="text-50 z-[1] font-bold m-[0_2%]">00:00</span>
            <span className="text-30 z-[1] opacity-60 scale-text">
              # 2222222
            </span>
            <div className="timeline__line-wrapper">
              <div className="fill-line"></div>
            </div>
          </div>
          <div className="timeline-border"></div>
        </div>
      </div>
    </div>
  );
}
