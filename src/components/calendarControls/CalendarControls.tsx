import { useCalendarControls } from "../../hooks/useCalendarControls";
import Button from "../button/Button";
import styles from "./CalendarControls.module.css";

export default function CalendarControls() {
  const { nextMonth, prevMonth } = useCalendarControls();

  return (
    <div className={styles.controls}>
      <Button onClick={() => prevMonth()}>
        <span>&larr;</span>
      </Button>
      <Button onClick={() => nextMonth()}>
        <span>&rarr;</span>
      </Button>
    </div>
  );
}
