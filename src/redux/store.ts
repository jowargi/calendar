import { configureStore } from "@reduxjs/toolkit";
import { remindersSlice } from "./slices/reminders/slice";

export const store = configureStore({
  reducer: {
    [remindersSlice.name]: remindersSlice.reducer,
  },
});

export type GlobalState = ReturnType<typeof store.getState>;
