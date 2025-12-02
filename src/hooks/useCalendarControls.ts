import { useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface UseCalendarControlsReturn {
  nextMonth: () => void;
  prevMonth(): void;
}

interface YearMonth {
  year: number;
  month: number;
}

export const useCalendarControls = (): UseCalendarControlsReturn => {
  const { year, month } = useParams();

  const navigate = useNavigate();

  const ymRef = useRef<YearMonth>({ year: +year!, month: +month! });

  const nextMonth = useCallback(() => {
    const ym = ymRef.current;
    const date = new Date(ym.year, ym.month);

    date.setMonth(date.getMonth() + 1);

    ym.year = date.getFullYear();
    ym.month = date.getMonth();

    navigate(`/calendar/${ym.year}/${ym.month}`);
  }, [navigate]);

  const prevMonth = useCallback(() => {
    const ym = ymRef.current;
    const date = new Date(ym.year, ym.month);

    date.setMonth(date.getMonth() - 1);

    ym.year = date.getFullYear();
    ym.month = date.getMonth();

    navigate(`/calendar/${ym.year}/${ym.month}`);
  }, [navigate]);

  return { nextMonth, prevMonth };
};
