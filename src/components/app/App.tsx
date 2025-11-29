import Calendar from "../calendar/Calendar";
import CalendarContextProvider from "../calendarContextProvider/CalendarContextProvider";

export default function App() {
  return (
    <CalendarContextProvider>
      <Calendar />
    </CalendarContextProvider>
  );
}
