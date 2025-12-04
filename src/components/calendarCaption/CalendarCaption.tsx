import styles from "./CalendarCaption.module.css";

interface CalendarCaptionProps {
  year: number;
  month: number;
}

export default function CalendarCaption({ year, month }: CalendarCaptionProps) {
  const date = new Date(year, month);

  return (
    <caption className={styles.caption}>
      {date.toLocaleString("en", {
        year: "numeric",
        month: "long",
      })}
    </caption>
  );
}
