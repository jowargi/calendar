import { useCalendarBody } from "../../hooks/useCalendarBody/useCalendarBody";
import styles from "./CalendarBody.module.css";

interface CalendarBodyProps {
  year: number;
  month: number;
}

export default function CalendarBody({ year, month }: CalendarBodyProps) {
  const calendarBodyRef = useCalendarBody({ year, month });

  return <tbody ref={calendarBodyRef} className={styles.tbody} />;
}
