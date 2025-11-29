import CalendarBody from "../calendarBody/CalendarBody";
import CalendarHead from "../calendarHead/CalendarHead";

export default function Calendar() {
  return (
    <table>
      <CalendarHead />
      <CalendarBody year={2025} month={10} />
    </table>
  );
}
