import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    current: []
};
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
export const selectTopography = (state) => state.topography.current;
export default topographySlice.reducer;
