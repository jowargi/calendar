import { useCalendarBody } from "../../hooks/useCalendarBody/useCalendarBody";

interface CalendarBodyProps {
  year: number;
  month: number;
}

export default function CalendarBody({ year, month }: CalendarBodyProps) {
  const calendarBodyRef = useCalendarBody({ year, month });

  return <tbody ref={calendarBodyRef} />;
}
