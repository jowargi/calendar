import { useCallback, useReducer } from "react";

export interface PopupRectState {
  isHidden: boolean;
  width: number;
  maxHeight: number;
  left: number;
  top: number;
}

interface ReducerAction {
  type: string;
  payload?: unknown;
}

interface UsePopupRectReturn {
  popupRectState: PopupRectState;
  showPopup: () => void;
  hidePopup: () => void;
  setWidth: (width: number) => void;
  setMaxHeight: (maxHeight: number) => void;
  setLeft: (left: number) => void;
  setTop: (top: number) => void;
  resetSize: () => void;
  resetOffset: () => void;
  reset: () => void;
}

const INITIAL_POPUP_RECT_STATE: PopupRectState = {
  isHidden: true,
  width: 0,
  maxHeight: 0,
  left: 0,
  top: 0,
};

const SHOW_POPUP_ACTION = "showPopup";
const HIDE_POPUP_ACTION = "hidePopup";
const SET_WIDTH_ACTION = "setWidth";
const SET_MAX_HEIGHT_ACTION = "setMaxHeight";
const SET_LEFT_ACTION = "setLeft";
const SET_TOP_ACTION = "setTop";
const RESET_SIZE_ACTION = "resetSize";
const RESET_OFFSET_ACTION = "resetOffset";
const RESET_ACTION = "reset";

const reducer = (
  popupRectState: PopupRectState,
  { type, payload }: ReducerAction,
): PopupRectState => {
  switch (type) {
    case SHOW_POPUP_ACTION:
      return { ...popupRectState, isHidden: false };

    case HIDE_POPUP_ACTION:
      return { ...popupRectState, isHidden: true };

    case SET_WIDTH_ACTION:
      return {
        ...popupRectState,
        width: typeof payload === "number" ? payload : popupRectState.width,
      };

    case SET_MAX_HEIGHT_ACTION:
      return {
        ...popupRectState,
        maxHeight:
          typeof payload === "number" ? payload : popupRectState.maxHeight,
      };

    case SET_LEFT_ACTION:
      return {
        ...popupRectState,
        left: typeof payload === "number" ? payload : popupRectState.left,
      };

    case SET_TOP_ACTION:
      return {
        ...popupRectState,
        top: typeof payload === "number" ? payload : popupRectState.top,
      };

    case RESET_SIZE_ACTION:
      return {
        ...popupRectState,
        width: INITIAL_POPUP_RECT_STATE.width,
        maxHeight: INITIAL_POPUP_RECT_STATE.maxHeight,
      };

    case RESET_OFFSET_ACTION:
      return {
        ...popupRectState,
        left: INITIAL_POPUP_RECT_STATE.left,
        top: INITIAL_POPUP_RECT_STATE.top,
      };

    case RESET_ACTION:
      return { ...INITIAL_POPUP_RECT_STATE };

    default:
      return popupRectState;
  }
};

export const usePopupRect = (): UsePopupRectReturn => {
  const [popupRectState, dispatch] = useReducer(
    reducer,
    INITIAL_POPUP_RECT_STATE,
  );

  const showPopup = useCallback(
    (): void => dispatch({ type: SHOW_POPUP_ACTION }),
    [],
  );

  const hidePopup = useCallback(
    (): void => dispatch({ type: HIDE_POPUP_ACTION }),
    [],
  );

  const setWidth = useCallback(
    (width: number): void =>
      dispatch({ type: SET_WIDTH_ACTION, payload: width }),
    [],
  );

  const setMaxHeight = useCallback(
    (maxHeight: number): void =>
      dispatch({ type: SET_MAX_HEIGHT_ACTION, payload: maxHeight }),
    [],
  );

  const setLeft = useCallback(
    (left: number): void => dispatch({ type: SET_LEFT_ACTION, payload: left }),
    [],
  );

  const setTop = useCallback(
    (top: number): void => dispatch({ type: SET_TOP_ACTION, payload: top }),
    [],
  );

  const resetSize = useCallback(
    (): void => dispatch({ type: RESET_SIZE_ACTION }),
    [],
  );

  const resetOffset = useCallback(
    (): void => dispatch({ type: RESET_OFFSET_ACTION }),
    [],
  );

  const reset = useCallback((): void => dispatch({ type: RESET_ACTION }), []);

  return {
    popupRectState,
    showPopup,
    hidePopup,
    setWidth,
    setMaxHeight,
    setLeft,
    setTop,
    resetSize,
    resetOffset,
    reset,
  };
};
