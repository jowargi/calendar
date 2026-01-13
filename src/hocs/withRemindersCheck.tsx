import type { ComponentType, FC } from "react";
import type { Reminder } from "../redux/slices/reminders/slice";

export interface RemindersProps {
  reminders: Reminder[];
}

export const withRemindersCheck = <P extends RemindersProps>({
  Reminders,
  EmptyReminders,
}: {
  Reminders?: ComponentType<P>;
  EmptyReminders?: ComponentType;
}): FC<P> => {
  return function WithRemindersCheck(props: P) {
    const { reminders } = props;

    if (reminders.length) return Reminders ? <Reminders {...props} /> : null;

    return EmptyReminders ? <EmptyReminders /> : null;
  };
};
