import { usePopupRectContext } from "../calendar/Calendar";
import RemindersListContainer from "../remindersList/RemindersListContainer";

export default function RemindersPopup({ date }: { date: string }) {
  const { width, maxHeight, left, top } = usePopupRectContext();

  return (
    <div
      style={{
        overflowX: "hidden",
        overflowY: "auto",
        position: "absolute",
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        maxHeight: `${maxHeight}px`,
        padding: "0.5rem",
      }}
    >
      <RemindersListContainer date={date} />
    </div>
  );
}
