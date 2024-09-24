import { CSSProperties } from "react";
import { cn } from "../utils/cn.ts";

export function Loading({
  isLoading,
  className,
  style,
}: {
  isLoading: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    isLoading && (
      <div
        style={style}
        className={cn(
          "fixed grid place-content-center bg-black/80 z-10 backdrop-blur-2xl",
          className,
        )}
      >
        loading
      </div>
    )
  );
}
