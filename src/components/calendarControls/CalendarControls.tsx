import { useCalendarControls } from "../../hooks/useCalendarControls";
import Button from "../button/Button";

export default function CalendarControls() {
  const { nextMonth, prevMonth } = useCalendarControls();

  return (
    <div>
      <Button onClick={() => prevMonth()}>
        <span>&larr;</span>
      </Button>
      <Button onClick={() => nextMonth()}>
        <span>&rarr;</span>
      </Button>
    </div>
  );
}
