import { useEffect, useRef } from "react";

interface UseCalendarBodyParams {
  year: number;
  month: number;
}

export const useCalendarBody = ({
  year,
  month,
}: UseCalendarBodyParams): React.RefObject<HTMLTableSectionElement> => {
  const calendarBodyRef = useRef<HTMLTableSectionElement>(null!);

  useEffect(() => {
    const calendarBody = calendarBodyRef.current;
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

      const dateCells = weekRow.querySelectorAll("td");
      const dateNumber = date.getDate();
      const day = date.getDay();

      if (day === 0) {
        dateCells[dateCells.length - 1].append(dateNumber.toString());

        calendarBody.append(weekRow);

        weekRow = null;
      } else {
        dateCells[day - 1].append(dateNumber.toString());
      }

      date.setDate(date.getDate() + 1);
    }

    return () => {
      calendarBody.innerHTML = "";
    };
  }, [year, month]);

  return calendarBodyRef;
};
