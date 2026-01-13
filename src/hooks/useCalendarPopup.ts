import { useCallback, useEffect, useRef } from "react";
import { usePopup } from "./usePopup";
import type { PopupRectState } from "./usePopupRect";

interface UseCalendarPopupReturn {
  targetRef: React.RefObject<HTMLElement | null>;
  popupRectState: PopupRectState;
  onPointerOver: (event: React.PointerEvent<HTMLTableSectionElement>) => void;
  onPointerOut: (event: React.PointerEvent<HTMLTableSectionElement>) => void;
}

interface TargetHandlers {
  pointerCancel: (event: PointerEvent) => void;
  click: (event: MouseEvent) => void;
}

export const useCalendarPopup = (): UseCalendarPopupReturn => {
  const { popupRectState, addPopup, removePopup } = usePopup();

  const targetRef = useRef<HTMLElement | null>(null);

  const targetHandlersRef = useRef<TargetHandlers>({
    pointerCancel: (event: PointerEvent): void => {
      event.stopPropagation();

      cleanupTarget();
    },
    click: (event: MouseEvent): void => {
      const target = event.target as HTMLElement;

      if (target.dataset.action !== "add-reminder") {
        event.stopPropagation();

        return;
      }

      cleanupTarget();
    },
  });

  const setupTarget = useCallback(
    (target: HTMLElement): void => {
      if (!targetRef.current) {
        targetRef.current = target;

        targetRef.current.style.zIndex = "4000";

        targetRef.current.addEventListener(
          "pointercancel",
          targetHandlersRef.current.pointerCancel,
        );

        targetRef.current.addEventListener(
          "click",
          targetHandlersRef.current.click,
        );

        addPopup(targetRef.current);
      }
    },
    [addPopup],
  );

  const cleanupTarget = useCallback((): void => {
    if (targetRef.current) {
      targetRef.current.style.zIndex = "";

      targetRef.current.removeEventListener(
        "pointercancel",
        targetHandlersRef.current.pointerCancel,
      );

      targetRef.current.removeEventListener(
        "click",
        targetHandlersRef.current.click,
      );

      targetRef.current = null;
    }

    removePopup();
  }, [removePopup]);

  const onPointerOver = useCallback(
    (event: React.PointerEvent<HTMLTableSectionElement>): void => {
      const target = event.target as HTMLElement;

      if (target.dataset.action !== "add-reminder") return;

      setupTarget(target);
    },
    [setupTarget],
  );

  const onPointerOut = useCallback(
    (event: React.PointerEvent<HTMLTableSectionElement>): void => {
      const target = event.target as HTMLElement;
      const relatedTarget = event.relatedTarget as HTMLElement;

      if (!target.closest('[data-action="add-reminder"]')) return;

      if (
        target.closest('[data-action="add-reminder"]')?.contains(relatedTarget)
      )
        return;

      cleanupTarget();
    },
    [cleanupTarget],
  );

  useEffect(
    () => () => {
      if (targetRef.current) {
        targetRef.current.style.zIndex = "";

        targetRef.current.removeEventListener(
          "pointercancel",
          targetHandlersRef.current.pointerCancel,
        );

        targetRef.current.removeEventListener(
          "click",
          targetHandlersRef.current.click,
        );

        targetRef.current = null;
      }
    },
    [],
  );

  return { targetRef, popupRectState, onPointerOver, onPointerOut };
};
