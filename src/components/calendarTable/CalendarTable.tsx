import CalendarHead from "../calendarHead/CalendarHead";
import CalendarBody from "../calendarBody/CalendarBody";
import CalendarCaption from "../calendarCaption/CalendarCaption";
import { useParams } from "react-router-dom";

export default function CalendarTable() {
  const { year, month } = useParams();

  return (
    <table>
      <CalendarCaption year={+year!} month={+month!} />
      <CalendarHead />
      <CalendarBody year={+year!} month={+month!} />
    </table>
  );
}
