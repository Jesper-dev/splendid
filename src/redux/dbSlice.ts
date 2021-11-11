import { createSlice } from "@reduxjs/toolkit";

export interface dbState {
  data: [
    {
      _id: string;
      title: string;
      price: number[];
      desc: string;
      name: string;
      date: string;
      category: string;
      pic: string;
      adress: string;
      timeperiod?: string;
    }
  ];
}

const initialState: dbState = {
  data: [
    {
      _id: "",
      title: "",
      price: [],
      desc: "",
      name: "",
      date: "",
      category: "",
      pic: "",
      adress: "",
    },
  ],
};

export const dbSlice = createSlice({
  name: "db",
  initialState,
  reducers: {
    fetchDb: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { fetchDb } = dbSlice.actions;

export default dbSlice.reducer;
