import { useCallback } from "react";
import { useCalendarBody } from "../../hooks/useCalendarBody/useCalendarBody";
import styles from "./CalendarBody.module.css";

interface CalendarBodyProps {
  year: number;
  month: number;
}

export default function CalendarBody({ year, month }: CalendarBodyProps) {
  const calendarBodyRef = useCalendarBody({ year, month });

  const handleDateSelect: React.MouseEventHandler<HTMLTableSectionElement> =
    useCallback((event) => {
      const target = event.target as HTMLElement;
      const calendarBody = event.currentTarget as HTMLTableSectionElement;
      const dateCell = target.closest("td");

      if (!dateCell) return;

      if (event.metaKey || event.ctrlKey) {
        dateCell.classList.toggle(styles.selected);

        return;
      }

      const dateCells = calendarBody.querySelectorAll("td");

      dateCells.forEach(
        (dateCell) =>
          dateCell.classList.contains(styles.selected) &&
          dateCell.classList.remove(styles.selected)
      );

      dateCell.classList.add(styles.selected);
    }, []);

  return (
    <tbody
      ref={calendarBodyRef}
      className={styles.tbody}
      onClick={handleDateSelect}
    />
  );
}
