import {
  createEntityAdapter,
  createSlice,
  type EntityState,
} from "@reduxjs/toolkit";
import type { GlobalState } from "../../store";

export interface Reminder {
  id: string;
  date: string;
  text: string;
}

const remindersAdapter = createEntityAdapter<Reminder>();

export const remindersSlice = createSlice({
  name: "reminders",
  initialState: remindersAdapter.getInitialState(),

  reducers: {
    addReminder: (
      state: EntityState<Reminder, string>,
      { payload }: { payload: Reminder }
    ) => {
      remindersAdapter.addOne(state, payload);
    },

    removeReminderById: (
      state: EntityState<Reminder, string>,
      { payload }: { payload: string }
    ) => {
      remindersAdapter.removeOne(state, payload);
    },
  },
});

export const { addReminder, removeReminderById } = remindersSlice.actions;

export const {
  selectIds: selectReminderIds,
  selectById: selectReminderById,
  selectAll: selectAllReminders,
} = remindersAdapter.getSelectors(
  (state: GlobalState) => state[remindersSlice.name]
);
