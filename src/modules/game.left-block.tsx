import { Exacta } from "../components/exacta.tsx";
import { JackpotValue } from "../components/jackpot-value.tsx";
import { Quinella } from "../components/quinella.tsx";
import { Result } from "../components/result.tsx";
import { Timeline } from "../components/timeline.tsx";
import { Top } from "../components/top.tsx";
import { Trifecta } from "../components/trifecta.tsx";
import { Video } from "../components/video.tsx";
import { WhoWin } from "../components/who-win.tsx";
import { Button } from "../ui/button.tsx";
import { TabItem, TabList } from "../ui/tabs.tsx";
import { cn } from "../utils/cn.ts";
import { GameState, useGameStore } from "../utils/stores/use-game-store.ts";
import { useRulesPopupStore } from "../utils/stores/use-rules-popup-store.ts";

export function GameLeftBlock() {
  const state = useGameStore((state) => state.state);
  const openRules = useRulesPopupStore((state) => state.open);

  return (
    <div
      className={cn(
        "leftBlock",
        state === GameState.GAME
          ? "grid-rows-[calc(125px*var(--zoomCoef))_1fr_!important]"
          : "",
      )}
    >
      <div
        className={cn(
          "left-block__top",
          state === GameState.RESULTS && "d-none",
        )}
      >
        <header className="left-block__header overflow-hidden">
          <div className="flex items-center overflow-hidden">
            <div className="left-logo items-center" />
          </div>
          <div className="left-jackpot__wrapper">
            <JackpotValue />
          </div>
          <Button
            onClick={openRules}
            className="button-info self-center mb-[calc(8px*var(--zoomCoef))]"
          />
        </header>
        <Timeline />
      </div>
      {state === GameState.GAME ? (
        <Video />
      ) : state === GameState.RESULTS ? (
        <Result />
      ) : (
        <TabList activeTabIndex={0}>
          <TabItem className="appearance-animation" label="Кто выиграет">
            <WhoWin />
          </TabItem>
          <TabItem
            className="appearance-animation"
            label="Exacta"
            activeLabel="(1 и 2 место)"
          >
            <Exacta />
          </TabItem>
          <TabItem
            className="appearance-animation"
            label="Quinella"
            activeLabel="(1 или 2)"
          >
            <Quinella />
          </TabItem>
          <TabItem
            className="appearance-animation"
            label="Trifecta"
            activeLabel="(1,2 и 3 место)"
          >
            <Trifecta />
          </TabItem>
          <TabItem className="appearance-animation" label="Top">
            <Top />
          </TabItem>
        </TabList>
      )}
    </div>
  );
}
