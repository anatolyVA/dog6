import React from "react";
import { cn } from "../utils/cn.ts";
import { getSettings } from "../utils/stores/settings.ts";

interface ButtonProps extends React.ComponentProps<"button"> {
  backgroundImage?: string;
}

export function Button({ onClick, children, ...props }: ButtonProps) {
  const settings = getSettings();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const sound = new Audio("src/assets/sounds/but.mp3");
    if (sound && settings.sound === "on") {
      sound.play().catch(() => console.error("Unable to play sound"));
    }
    onClick?.(e);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={cn(
        `text-white hover:opacity-60 transition-opacity`,
        props.className,
      )}
    >
      {children}
    </button>
  );
}
