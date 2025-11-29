import Button from "../button/Button";
import { useCalendarContext } from "../calendarContextProvider/CalendarContextProvider";

export default function CalendarControls() {
  const { nextMonth, prevMonth } = useCalendarContext();

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
