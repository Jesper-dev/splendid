import { configureStore } from "@reduxjs/toolkit";
import adReducer from "./redux/adSlice";
import sendedReducer from "./redux/sendedSlice";
import dbSlice from "./redux/dbSlice";

export const store = configureStore({
  reducer: { ad: adReducer, sended: sendedReducer, dbSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
