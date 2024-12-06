import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Cloud } from "../types";

interface TopographyState{
  current: number[];
  clouds: Cloud[];
  colorScheme: string
}

const initialState: TopographyState = {
  current: [],
  clouds: [],
  colorScheme: "",
}

const topographySlice = createSlice({
  name: "topography",
  initialState,
  reducers: {
    setTopography: (state, action) => {
      state.current = action.payload;
    },
    setClouds: (state, action) => {
      state.clouds = action.payload;
    },
    setColorScheme: (state, action) => {
      state.colorScheme = action.payload;
    }
  },
});

export const { setTopography, setClouds, setColorScheme } = topographySlice.actions;
export const selectTopography = (state : RootState) => state.topography.current;

export default topographySlice.reducer;
