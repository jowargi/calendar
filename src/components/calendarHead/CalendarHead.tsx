import { weekdays } from "../../constants/weekdays";
import styles from "./CalendarHead.module.css";

export default function CalendarHead() {
  return (
    <thead className={styles.thead}>
      <tr>
        {weekdays.map((weekday, index) => (
          <th key={index} className={styles.th}>
            {weekday}
          </th>
        ))}
      </tr>
    </thead>
  );
}
