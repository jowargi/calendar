import { createContext, useContext } from "react";
import { useCalendarPopup } from "../../hooks/useCalendarPopup";
import CalendarControls from "../calendarControls/CalendarControls";
import CalendarTable from "../calendarTable/CalendarTable";
import styles from "./Calendar.module.css";
import PopupModal from "../popupModal/PopupModal";

interface PopupRectContextValue {
  width: number | undefined;
  maxHeight: number | undefined;
  left: number | undefined;
  top: number | undefined;
}

const PopupRectContext = createContext<PopupRectContextValue>({
  width: undefined,
  maxHeight: undefined,
  left: undefined,
  top: undefined,
});

export const usePopupRectContext = (): PopupRectContextValue =>
  useContext(PopupRectContext);

export default function Calendar() {
  const { targetRef, popupRectState, onPointerOver, onPointerOut } =
    useCalendarPopup();

  return (
    <div
      className={styles.container}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <CalendarControls />
      <CalendarTable />
      {!popupRectState.isHidden && (
        <PopupRectContext.Provider
          value={{
            width: popupRectState.width,
            maxHeight: popupRectState.maxHeight,
            left: popupRectState.left,
            top: popupRectState.top,
          }}
        >
          <PopupModal target={targetRef.current} />
        </PopupRectContext.Provider>
      )}
    </div>
  );
}
