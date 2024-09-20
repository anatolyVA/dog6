import React from "react";
import { cn } from "../utils/cn.ts";

interface ButtonProps extends React.ComponentProps<"button"> {
  backgroundImage?: string;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        `text-white hover:opacity-60 transition-opacity`,
        props.className,
      )}
    >
      {children}
    </button>
  );
}
