import { weekdays } from "../../constants/weekdays";

export default function CalendarHead() {
  return (
    <thead>
      <tr>
        {weekdays.map((weekday, index) => (
          <th key={index}>{weekday}</th>
        ))}
      </tr>
    </thead>
  );
}
