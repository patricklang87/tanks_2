import { createSlice } from "@reduxjs/toolkit";
import { environmentConstants } from "../constants";
const initialState = {
    explosionIsAnimating: false,
    explosionCenter: [null, null],
    explosionMaxRadius: 0,
    explosionRadius: 0,
    explosionColor: "none",
    maxReached: false,
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
            if (!state.maxReached &&
                state.explosionIsAnimating) {
                state.explosionRadius += environmentConstants.explosionRate;
            }
            else if (state.maxReached && state.explosionIsAnimating) {
                state.explosionRadius -= environmentConstants.explosionRate;
            }
            if (state.explosionIsAnimating && state.explosionRadius >= state.explosionMaxRadius)
                state.maxReached = true;
        },
        clearExplosionValues: (state) => {
            state.explosionIsAnimating = false;
            state.explosionCenter = [null, null];
            state.explosionMaxRadius = 0;
            state.explosionRadius = 0;
            state.explosionColor = "none";
            state.maxReached = false;
        },
    },
});
export const { setExplosionAnimating, updateExplosionAnimation, clearExplosionValues, } = explosionSlice.actions;
export default explosionSlice.reducer;
