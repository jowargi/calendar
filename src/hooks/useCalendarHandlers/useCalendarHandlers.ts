import { useCallback, useEffect } from "react";
import styles from "./useCalendarHandlers.module.css";
import { store } from "../../redux/store";
import { addReminder, type Reminder } from "../../redux/slices/reminders/slice";

interface UseCalendarHandlersParams {
  calendarBodyRef: React.RefObject<HTMLTableSectionElement>;
}

const addReminderForm = (dateCell: HTMLTableCellElement): void => {
  const form = document.createElement("form");

  form.onsubmit = (event: SubmitEvent): void => {
    event.preventDefault();

    const id = crypto.randomUUID();

    const date = dateCell.dataset.date;

    if (!date) return;

    const form = event.currentTarget as HTMLFormElement;
    const textarea = form.querySelector("textarea");

    if (!textarea) return;

    const text = textarea.value.trim();

    if (!text) return;

    const reminder: Reminder = { id, date, text };

    store.dispatch(addReminder(reminder));

    form.remove();

    dateCell.removeAttribute("data-mode");
  };

  form.onreset = (event: Event): void => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;

    form.remove();

    dateCell.removeAttribute("data-mode");
  };

  form.classList.add(styles.form);

  const textarea = document.createElement("textarea");

  textarea.classList.add(styles.textarea);

  const submit = document.createElement("input");

  submit.type = "submit";

  submit.classList.add(styles.submit);

  const reset = document.createElement("input");

  reset.type = "reset";

  reset.classList.add(styles.reset);

  form.append(textarea, submit, reset);
  dateCell.append(form);

  dateCell.dataset.mode = "adding";
};

export const useCalendarHandlers = ({
  calendarBodyRef,
}: UseCalendarHandlersParams): void => {
  const handleDateSelect = useCallback((event: PointerEvent): void => {
    const target = event.target as HTMLElement;

    if (target.dataset.action === "add-reminder") return;

    const calendarBody = event.currentTarget as HTMLTableSectionElement;
    const dateCell = target.closest("td");

    if (!dateCell) return;

    if (dateCell.dataset.mode === "adding") return;

    if (event.metaKey || event.ctrlKey) {
      dateCell.classList.toggle(styles.selected);

      return;
    }

    const dateCells = calendarBody.querySelectorAll("td");

    dateCells.forEach(
      (cell) =>
        cell !== dateCell &&
        cell.classList.contains(styles.selected) &&
        cell.classList.remove(styles.selected),
    );

    dateCell.classList.toggle(styles.selected);
  }, []);

  const handleReminderAdd = useCallback((event: PointerEvent): void => {
    const target = event.target as HTMLElement;

    if (target.dataset.action !== "add-reminder") return;

    const dateCell = target.closest("td");

    if (!dateCell) return;

    if (dateCell.dataset.mode === "adding") return;

    addReminderForm(dateCell);
  }, []);

  useEffect(() => {
    const calendarBody = calendarBodyRef.current;

    calendarBody.addEventListener("click", handleDateSelect);
    calendarBody.addEventListener("click", handleReminderAdd);

    return () => {
      calendarBody.removeEventListener("click", handleDateSelect);
      calendarBody.removeEventListener("click", handleReminderAdd);
    };
  }, [calendarBodyRef, handleDateSelect, handleReminderAdd]);
};
