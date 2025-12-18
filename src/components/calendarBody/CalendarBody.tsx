import { useRef } from "react";
import { useCalendarBody } from "../../hooks/useCalendarBody/useCalendarBody";
import { useCalendarHandlers } from "../../hooks/useCalendarHandlers/useCalendarHandlers";
import styles from "./CalendarBody.module.css";

interface CalendarBodyProps {
  year: number;
  month: number;
}

export default function CalendarBody({ year, month }: CalendarBodyProps) {
  const calendarBodyRef = useRef<HTMLTableSectionElement>(null!);

  useCalendarBody({ calendarBodyRef, year, month });
  useCalendarHandlers({ calendarBodyRef });

  return <tbody ref={calendarBodyRef} className={styles.tbody} />;
}
