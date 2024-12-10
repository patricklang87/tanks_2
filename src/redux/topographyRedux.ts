import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Cloud, Tree } from "../types";

interface TopographyState{
  current: number[];
  clouds: Cloud[];
  trees: Tree[];
  colorScheme: string
}

const initialState: TopographyState = {
  current: [],
  clouds: [],
  trees:[],
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
    setTrees: (state, action) => {
      state.trees = action.payload;
    },
    setColorScheme: (state, action) => {
      state.colorScheme = action.payload;
    }
  },
});

export const { setTopography, setClouds, setColorScheme, setTrees } = topographySlice.actions;
export const selectTopography = (state : RootState) => state.topography.current;

export default topographySlice.reducer;
