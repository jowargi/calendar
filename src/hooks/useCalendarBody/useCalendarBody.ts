import { useEffect, useRef } from "react";
import styles from "./useCalendarBody.module.css";

interface UseCalendarBodyParams {
  year: number;
  month: number;
}

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const useCalendarBody = ({
  year,
  month,
}: UseCalendarBodyParams): React.RefObject<HTMLTableSectionElement> => {
  const calendarBodyRef = useRef<HTMLTableSectionElement>(null!);
  const todayRef = useRef<Date>(new Date());

  useEffect(() => {
    const calendarBody = calendarBodyRef.current;
    const today = todayRef.current;
    const date = new Date(year, month, 1);
    let weekRow: HTMLTableRowElement | null = null;

    while (true) {
      if (date.getMonth() !== month) {
        if (weekRow) {
          calendarBody.append(weekRow);
        }

        break;
      }

      if (!weekRow) {
        weekRow = document.createElement("tr");

        for (let index = 0; index < 7; index++) {
          const dateCell = document.createElement("td");

          weekRow.append(dateCell);
        }
      }

      const dateNumber = date.getDate();
      const day = date.getDay();
      const dateCells = weekRow.querySelectorAll("td");
      let dateCell: HTMLTableCellElement;

      if (day === 0) dateCell = dateCells[dateCells.length - 1];
      else dateCell = dateCells[day - 1];

      dateCell.append(dateNumber.toString());

      if (isSameDay(today, date)) dateCell.classList.add(styles.today);

      if (day === 0) {
        calendarBody.append(weekRow);

        weekRow = null;
      }

      date.setDate(date.getDate() + 1);
    }

    return () => {
      calendarBody.innerHTML = "";
    };
  }, [year, month]);

  return calendarBodyRef;
};
