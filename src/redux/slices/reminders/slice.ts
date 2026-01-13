import {
  createEntityAdapter,
  createSlice,
  type EntityState,
} from "@reduxjs/toolkit";
import { type GlobalState } from "../../store";

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
      { payload }: { payload: Reminder },
    ): void => {
      remindersAdapter.addOne(state, payload);
    },

    removeReminderById: (
      state: EntityState<Reminder, string>,
      { payload }: { payload: string },
    ): void => {
      remindersAdapter.removeOne(state, payload);
    },
  },

  selectors: {
    selectRemindersByDate: (
      state: EntityState<Reminder, string>,
      date: string,
    ): Reminder[] =>
      Object.values(state.entities).filter(
        (entity: Reminder): boolean => entity.date === date,
      ),
  },
});

export const { addReminder, removeReminderById } = remindersSlice.actions;

export const { selectRemindersByDate } = remindersSlice.selectors;

export const {
  selectIds: selectReminderIds,
  selectById: selectReminderById,
  selectAll: selectAllReminders,
} = remindersAdapter.getSelectors(
  (state: GlobalState) => state[remindersSlice.name],
);
