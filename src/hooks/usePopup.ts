import { useCallback, useEffect, useRef } from "react";
import { usePopupRect, type PopupRectState } from "./usePopupRect";

interface UsePopupReturn {
  popupRectState: PopupRectState;
  addPopup: (target: HTMLElement) => void;
  removePopup: () => void;
}

export const usePopup = (): UsePopupReturn => {
  const {
    popupRectState,
    showPopup,
    setWidth,
    setMaxHeight,
    setLeft,
    setTop,
    reset,
  } = usePopupRect();

  const isPopupHiddenRef = useRef<boolean>(null!);

  isPopupHiddenRef.current = popupRectState.isHidden;

  const addPopup = useCallback(
    (target: HTMLElement): void => {
      if (!isPopupHiddenRef.current) return;

      const targetRect = target.getBoundingClientRect();

      const targetLeftOffset = targetRect.left;

      const targetRightOffset =
        document.documentElement.clientWidth - targetRect.right;

      const targetBottomOffset =
        document.documentElement.clientHeight - targetRect.bottom;

      const popupWidth =
        15 * parseFloat(getComputedStyle(document.documentElement).fontSize);

      const popupMaxHeight = targetBottomOffset;

      let popupLeft = target.clientWidth / 2 - popupWidth / 2;

      const popupOverflow = popupWidth / 2 - target.offsetWidth / 2;

      if (popupOverflow > 0) {
        if (popupOverflow > targetRightOffset) {
          popupLeft -= popupOverflow - targetRightOffset;
        } else if (popupOverflow > targetLeftOffset) {
          popupLeft += popupOverflow - targetLeftOffset;
        }
      }

      const popupTop =
        target.clientHeight +
        parseFloat(getComputedStyle(target).borderBottomWidth);

      showPopup();
      setWidth(popupWidth);
      setMaxHeight(popupMaxHeight);
      setLeft(popupLeft);
      setTop(popupTop);
    },
    [showPopup, setWidth, setMaxHeight, setLeft, setTop],
  );

  const removePopup = useCallback((): void => {
    if (isPopupHiddenRef.current) return;

    reset();
  }, [reset]);

  useEffect(() => () => removePopup(), [removePopup]);

  return { popupRectState, addPopup, removePopup };
};
