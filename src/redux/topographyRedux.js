import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    current: [],
    clouds: []
};
const topographySlice = createSlice({
    name: "topography",
    initialState,
    reducers: {
        setTopography: (state, action) => {
            state.current = action.payload;
        },
        setClouds: (state, action) => {
            state.clouds = action.payload;
        }
    },
});
export const { setTopography, setClouds } = topographySlice.actions;
export const selectTopography = (state) => state.topography.current;
export default topographySlice.reducer;
