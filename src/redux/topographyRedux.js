import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    current: [],
    clouds: [],
    colorScheme: "",
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
        },
        setColorScheme: (state, action) => {
            state.colorScheme = action.payload;
        }
    },
});
export const { setTopography, setClouds, setColorScheme } = topographySlice.actions;
export const selectTopography = (state) => state.topography.current;
export default topographySlice.reducer;
