import { useEffect } from "react";
import { HoverIntent } from "../hoverIntent/HoverIntent";

interface UseHoverIntentParams {
  sensitivity?: number;
  interval?: number;
  elementRef: React.RefObject<HTMLElement>;
  over: (event?: PointerEvent) => void;
  out: (event: PointerEvent) => void;
}

export const useHoverIntent = ({
  sensitivity = 0.1,
  interval = 100,
  elementRef,
  over,
  out,
}: UseHoverIntentParams): void => {
  useEffect(() => {
    const hoverIntent = new HoverIntent({
      sensitivity,
      interval,
      element: elementRef.current,
      over,
      out,
    });

    return () => {
      hoverIntent.destroy();
    };
  }, [sensitivity, interval, elementRef, over, out]);
};
