import { createSlice } from "@reduxjs/toolkit";

export interface SendedState {
  sended: boolean;
}

const initialState: SendedState = {
  sended: false,
};

export const sendedSlice = createSlice({
  name: "sended",
  initialState,
  reducers: {
    sended: (state, action) => {
      state.sended = action.payload;
    },
  },
});

export const { sended } = sendedSlice.actions;

export default sendedSlice.reducer;
