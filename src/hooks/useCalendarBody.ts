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
    const weekRows = calendarBody.querySelectorAll("tr");

    const date = new Date(year, month, 1);

    weekRows: for (const weekRow of weekRows) {
      const dateCells = weekRow.querySelectorAll("td");

      while (true) {
        if (date.getMonth() !== month) break weekRows;

        const dateNumber = date.getDate();
        const day = date.getDay();

        date.setDate(date.getDate() + 1);

        if (day === 0) {
          dateCells[dateCells.length - 1].append(dateNumber.toString());

          continue weekRows;
        }

        dateCells[day - 1].append(dateNumber.toString());
      }
    }

    return () => {
      weekRows.forEach((weekRow) => {
        const dateCells = weekRow.querySelectorAll("td");

        dateCells.forEach((dateCell) => (dateCell.innerHTML = ""));
      });
    };
  }, [year, month]);

  return calendarBodyRef;
};
