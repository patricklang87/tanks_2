import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    current: [],
    clouds: [],
    trees: [],
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
        setTrees: (state, action) => {
            state.trees = action.payload;
        },
        setColorScheme: (state, action) => {
            state.colorScheme = action.payload;
        }
    },
});
export const { setTopography, setClouds, setColorScheme, setTrees } = topographySlice.actions;
export const selectTopography = (state) => state.topography.current;
export default topographySlice.reducer;
