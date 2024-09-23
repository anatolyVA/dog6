import React from "react";
import { cn } from "../utils/cn.ts";

interface ButtonProps extends React.ComponentProps<"button"> {
  backgroundImage?: string;
}

export function Button({ onClick, children, ...props }: ButtonProps) {
  const sound = new Audio("src/assets/sounds/but.mp3");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
      sound.play();
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
