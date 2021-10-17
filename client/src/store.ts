import { configureStore } from "@reduxjs/toolkit";
import adReducer from "./redux/adSlice";
import sendedReducer from "./redux/sendedSlice";

export const store = configureStore({
  reducer: { ad: adReducer, sended: sendedReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
