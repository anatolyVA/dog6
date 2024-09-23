import React, { ReactElement, ReactNode, useState } from "react";
import { BetsClosed } from "../components/bets-closed.tsx";
import { cn } from "../utils/cn.ts";
import { sanitizeForId } from "../utils/santize-for-id.ts";
import { GameState, useGameStore } from "../utils/stores/use-game-store.ts";
import { Button } from "./button.tsx";

export interface TabItemProps {
  label: string;
  activeLabel?: string;
  className?: string;
  children: ReactNode;
}

export interface TabListProps {
  activeTabIndex: number;
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
}

export const TabItem: React.FC<TabItemProps> = ({
  label,
  className,
  children,
}) => (
  <div
    className={cn("tab-panel", className)}
    role="tabpanel"
    aria-labelledby={`tab-${sanitizeForId(label)}`}
    id={`panel-${sanitizeForId(label)}`}
  >
    {children}
  </div>
);

export const TabList: React.FC<TabListProps> = ({
  children,
  activeTabIndex = 0,
}) => {
  const [activeTab, setActiveTab] = useState(activeTabIndex);
  const state = useGameStore((state) => state.state);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  const tabs = React.Children.toArray(children).filter(
    (child): child is ReactElement<TabItemProps> =>
      React.isValidElement(child) && child.type === TabItem,
  );

  return (
    <div className="tabs">
      {state === GameState.BETS ? tabs[activeTab] : <BetsClosed />}
      <nav className="">
        <ul
          className="flex justify-around p-[0_1%] items-center h-full"
          role="tablist"
          aria-orientation="horizontal"
        >
          {tabs.map((tab, index) => (
            <li key={`tab-${index}`}>
              <Button
                key={`tab-btn-${index}`}
                role="tab"
                id={`tab-${sanitizeForId(tab.props.label)}`}
                aria-controls={`panel-${sanitizeForId(tab.props.label)}`}
                aria-selected={activeTab === index}
                onClick={() => handleTabClick(index)}
                className={`tab-button sprite ${
                  activeTab === index && "tab-button--active"
                }`}
              >
                <div className="flex flex-col text-center scale-text text-30 uppercase">
                  {tab.props.label}
                  {activeTab === index && tab.props.activeLabel && (
                    <span className="text-26 normal-case">
                      {tab.props.activeLabel}
                    </span>
                  )}
                </div>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
