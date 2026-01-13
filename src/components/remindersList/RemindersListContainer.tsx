import { useSelector } from "react-redux";
import type { GlobalState } from "../../redux/store";
import {
  selectRemindersByDate,
  type Reminder,
} from "../../redux/slices/reminders/slice";
import RemindersList from "./RemindersList";

export default function RemindersListContainer({ date }: { date: string }) {
  const reminders = useSelector((state: GlobalState): Reminder[] =>
    selectRemindersByDate(state, date),
  );

  return <RemindersList reminders={reminders} />;
}
