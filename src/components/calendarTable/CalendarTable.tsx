import CalendarHead from "../calendarHead/CalendarHead";
import CalendarBody from "../calendarBody/CalendarBody";
import CalendarCaption from "../calendarCaption/CalendarCaption";
import { useParams } from "react-router-dom";
import styles from "./CalendarTable.module.css";

export default function CalendarTable() {
  const { year, month } = useParams();

  return (
    <table className={styles.table}>
      <CalendarCaption year={+year!} month={+month!} />
      <CalendarHead />
      <CalendarBody year={+year!} month={+month!} />
    </table>
  );
}
