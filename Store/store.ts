import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import toolsReducer from "./slices/toolSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tools: toolsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
