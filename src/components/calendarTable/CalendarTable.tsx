import { useCalendarContext } from "../calendarContextProvider/CalendarContextProvider";
import CalendarHead from "../calendarHead/CalendarHead";
import CalendarBody from "../calendarBody/CalendarBody";
import CalendarCaption from "../calendarCaption/CalendarCaption";

export default function CalendarTable() {
  const { calendarState } = useCalendarContext();

  const { year, month } = calendarState || {};

  return Number.isFinite(year) && Number.isFinite(month) ? (
    <table>
      <CalendarCaption year={year!} month={month!} />
      <CalendarHead />
      <CalendarBody year={year!} month={month!} />
    </table>
  ) : null;
}
