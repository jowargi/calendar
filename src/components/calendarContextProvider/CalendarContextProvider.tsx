import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

interface CalendarContextProviderProps {
  children: React.ReactNode;
}

interface CalendarState {
  year: number;
  month: number;
}

interface CalendarContextValue {
  calendarState: CalendarState | undefined;
  nextMonth(): void;
  prevMonth: () => void;
}

const calendarContextDefaultValue: CalendarContextValue = {
  calendarState: undefined,
  nextMonth: () => undefined,
  prevMonth: () => {},
};

const CalendarContext = createContext(calendarContextDefaultValue);

export const useCalendarContext = () => useContext(CalendarContext);

export default function CalendarContextProvider({
  children,
}: CalendarContextProviderProps) {
  const date = new Date();

  date.setDate(1);

  const dateRef = useRef<Date>(date);

  const [calendarState, setCalendarState] = useState<CalendarState>({
    year: dateRef.current.getFullYear(),
    month: dateRef.current.getMonth(),
  });

  const nextMonth = useCallback(() => {
    const date = dateRef.current;

    date.setMonth(date.getMonth() + 1);

    const calendarState: CalendarState = {
      year: date.getFullYear(),
      month: date.getMonth(),
    };

    setCalendarState(calendarState);
  }, []);

  const prevMonth = useCallback(() => {
    const date = dateRef.current;

    date.setMonth(date.getMonth() - 1);

    const calendarState: CalendarState = {
      year: date.getFullYear(),
      month: date.getMonth(),
    };

    setCalendarState(calendarState);
  }, []);

  const calendarContextValue: CalendarContextValue = {
    calendarState,
    nextMonth,
    prevMonth,
  };

  return (
    <CalendarContext.Provider value={calendarContextValue}>
      {children}
    </CalendarContext.Provider>
  );
}
