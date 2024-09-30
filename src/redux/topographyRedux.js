import { createSlice } from "@reduxjs/toolkit";

const topographySlice = createSlice({
  name: "topography",
  initialState: {
    current: [],
  },
  reducers: {
    setTopography: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { setTopography } = topographySlice.actions;
export const selectTopography = (state) => state.topography.current;

export default topographySlice.reducer;
