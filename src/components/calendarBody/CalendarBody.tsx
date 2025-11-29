import { useCalendarBody } from "../../hooks/useCalendarBody";
import { useWeeksCount } from "../../hooks/useWeeksCount";
import WeekRow from "../weekRow/WeekRow";

interface CalendarBodyProps {
  year: number;
  month: number;
}

export default function CalendarBody({ year, month }: CalendarBodyProps) {
  const weeksCount = useWeeksCount({ year, month });
  const calendarBodyRef = useCalendarBody({ year, month });

  return (
    <tbody ref={calendarBodyRef}>
      {new Array(weeksCount).fill(null).map((_, index) => (
        <WeekRow key={index} />
      ))}
    </tbody>
  );
}
