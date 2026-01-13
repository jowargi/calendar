import {
  withRemindersCheck,
  type RemindersProps,
} from "../../hocs/withRemindersCheck";
import type { Reminder } from "../../redux/slices/reminders/slice";
import styles from "./RemindersList.module.css";

const Reminders = ({ reminders }: RemindersProps) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {reminders.map((reminder: Reminder, index: number) => (
          <li key={index} className={styles.item}>
            {reminder.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

const EmptyReminders = () => {
  return (
    <div className={styles.container}>
      <p className={styles["no-reminders"]}>There are no reminders yet</p>
    </div>
  );
};

const RemindersList = withRemindersCheck({ Reminders, EmptyReminders });

export default RemindersList;
