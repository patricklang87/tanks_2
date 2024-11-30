import { createSlice } from "@reduxjs/toolkit";
import { environmentConstants } from "../constants";
const initialState = {
    explosionIsAnimating: false,
    explosionCenter: [null, null],
    explosionMaxRadius: 0,
    explosionRadius: 0,
    explosionColor: "none",
};
const explosionSlice = createSlice({
    name: "explosion",
    initialState,
    reducers: {
        setExplosionAnimating: (state, action) => {
            const { explosionCenter, explosionMaxRadius, explosionColor } = action.payload;
            state.explosionIsAnimating = true;
            state.explosionCenter = explosionCenter;
            state.explosionMaxRadius = explosionMaxRadius;
            state.explosionColor = explosionColor;
        },
        updateExplosionAnimation: (state) => {
            if (state.explosionRadius < state.explosionMaxRadius &&
                state.explosionIsAnimating) {
                state.explosionRadius += environmentConstants.explosionRate;
            }
        },
        clearExplosionValues: (state) => {
            state.explosionIsAnimating = false;
            state.explosionCenter = [null, null];
            state.explosionMaxRadius = 0;
            state.explosionRadius = 0;
            state.explosionColor = "none";
        },
    },
});
export const { setExplosionAnimating, updateExplosionAnimation, clearExplosionValues, } = explosionSlice.actions;
export default explosionSlice.reducer;
