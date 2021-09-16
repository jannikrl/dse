import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import arenaReducer from "../features/arena/arenaSlice";
import topbarReducer from "../features/topbar/topbarSlice";

export const store = configureStore({
  reducer: {
    arena: arenaReducer,
    topbar: topbarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
