import { createSlice } from "@reduxjs/toolkit";

export interface AdState {
  AdObj: {
    _id: string;
    title: string;
    price: string[];
    desc: string;
    place: string;
    name: string;
    date: string;
    category: string;
    pic: string;
    address?: string;
    timeperiod?: string;
    totalPrice?: number;
  };
}

const initialState: AdState = {
  AdObj: {
    _id: "",
    title: "",
    price: [""],
    desc: "",
    place: "",
    name: "",
    date: "",
    category: "",
    pic: "",
    address: "",
    timeperiod: "",
    totalPrice: 0,
  },
};

export const adSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {
    add: (state, action) => {
      state.AdObj = action.payload;
    },
  },
});

export const { add } = adSlice.actions;

export default adSlice.reducer;
