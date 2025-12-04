import CalendarControls from "../calendarControls/CalendarControls";
import CalendarTable from "../calendarTable/CalendarTable";
import styles from "./Calendar.module.css";

export default function Calendar() {
  return (
    <div className={styles.container}>
      <CalendarControls />
      <CalendarTable />
    </div>
  );
}
