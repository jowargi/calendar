import { useEffect, useRef } from "react";
import styles from "./useCalendarBody.module.css";

interface UseCalendarBodyParams {
  calendarBodyRef: React.RefObject<HTMLTableSectionElement>;
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

const addDateSpan = (
  dateCell: HTMLTableCellElement,
  dateNumber: number
): void => {
  const dateSpan = document.createElement("span");

  dateSpan.classList.add(styles.text);

  dateSpan.innerHTML = dateNumber.toString();

  dateCell.append(dateSpan);
};

const addPlusSpan = (dateCell: HTMLTableCellElement): void => {
  const plusSpan = document.createElement("span");

  plusSpan.classList.add(styles.plus);

  plusSpan.innerHTML = "+";
  plusSpan.dataset.action = "add-reminder";

  dateCell.append(plusSpan);
};

export const useCalendarBody = ({
  calendarBodyRef,
  year,
  month,
}: UseCalendarBodyParams): void => {
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

          dateCell.classList.add(
            index === 5 || index === 6 ? styles.weekend : styles.weekday
          );

          weekRow.append(dateCell);
        }
      }

      const [dateNumber, day]: [number, number] = [
        date.getDate(),
        date.getDay(),
      ];

      const dateCells = weekRow.querySelectorAll("td");

      let dateCell: HTMLTableCellElement;

      if (day === 0) dateCell = dateCells[dateCells.length - 1];
      else dateCell = dateCells[day - 1];

      dateCell.dataset.date = date.toLocaleDateString();

      addDateSpan(dateCell, dateNumber);
      addPlusSpan(dateCell);

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
  }, [calendarBodyRef, year, month]);
};
