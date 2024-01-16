import { createSlice } from "@reduxjs/toolkit";
import { sliderData } from "../../assets/data/dummyData";

export const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    value: 0,
    length: sliderData.length,
  },
  reducers: {
    nextSlice: (state, action) => {
      state.value = action.payload > state.length - 1 ? 0 : action.payload;
    },
    prevSlice: (state, action) => {
      state.value = action.payload < 0 ? state.length - 1 : action.payload;
    },
    doSlice: (state, action) => {
      const slide = action.payload;
      state.value = slide;
    },
  },
});

export const { nextSlice, prevSlice, doSlice } = sliderSlice.actions;
