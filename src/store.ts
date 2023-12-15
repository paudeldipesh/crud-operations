import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./features/users/usersSlice";

const store = configureStore({
  reducer: {
    usersState: usersReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
