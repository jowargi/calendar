import { useMemo } from "react";

interface UseWeeksCountParams {
  year: number;
  month: number;
}

export const useWeeksCount = ({ year, month }: UseWeeksCountParams): number => {
  const weeksCount = useMemo(() => {
    const firstDateOfMonth = new Date(year, month, 1);
    const firstDayOfMonth = firstDateOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Math.ceil((firstDayOfMonth + daysInMonth) / 7);
  }, [year, month]);

  return weeksCount;
};
