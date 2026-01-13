import { createPortal } from "react-dom";
import RemindersPopup from "../remindersPopup/RemindersPopup";

interface PopupModalProps {
  target: HTMLElement | null;
}

export default function PopupModal({ target }: PopupModalProps) {
  if (!target) return;

  const dateCell = target.closest("[data-date]") as HTMLElement | null;

  if (!dateCell) return;

  const date = dateCell.dataset.date;

  if (!date) return;

  return createPortal(<RemindersPopup date={date} />, target);
}
