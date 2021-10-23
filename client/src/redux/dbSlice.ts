import { createSlice } from "@reduxjs/toolkit";

export interface dbState {
  data: [
    {
      _id: string;
      title: string;
      price: number[];
      desc: string;
      place: string;
      name: string;
      date: string;
      category: string;
      pic: string;
      address?: string;
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
      place: "",
      name: "",
      date: "",
      category: "",
      pic: "",
      address: "",
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
