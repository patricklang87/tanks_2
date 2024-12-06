import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Cloud } from "../types";

interface TopographyState{
  current: number[];
  clouds: Cloud[];
}

const initialState: TopographyState = {
  current: [],
  clouds: []
}

const topographySlice = createSlice({
  name: "topography",
  initialState,
  reducers: {
    setTopography: (state, action) => {
      state.current = action.payload;
    },
    setClouds: (state, action) => {
      console.log("in redux", action.payload)
      state.clouds = action.payload;
    }
  },
});

export const { setTopography, setClouds } = topographySlice.actions;
export const selectTopography = (state : RootState) => state.topography.current;

export default topographySlice.reducer;
