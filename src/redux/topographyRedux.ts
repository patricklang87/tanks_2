import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface TopographyState{
  current: number[];
}

const initialState: TopographyState = {
  current: []
}

const topographySlice = createSlice({
  name: "topography",
  initialState,
  reducers: {
    setTopography: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { setTopography } = topographySlice.actions;
export const selectTopography = (state : RootState) => state.topography.current;

export default topographySlice.reducer;
