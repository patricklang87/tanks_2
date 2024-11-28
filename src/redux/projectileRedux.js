import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    prevPosition: [null, null],
    position: [null, null],
    velocity: [null, null],
    isAnimating: false,
};
const projectileSlice = createSlice({
    name: "projectile",
    initialState,
    reducers: {
        setProjectilePosition: (state, action) => {
            state.position = action.payload;
        },
        startProjectileAnimating: (state) => {
            state.isAnimating = true;
        },
        setProjectileValues: (state, action) => {
            if (state.isAnimating) {
                const { position, velocity } = action.payload;
                state.prevPosition = state.position;
                state.position = position;
                state.velocity = velocity;
            }
        },
        clearProjectileValues: (state) => {
            state.isAnimating = false;
            state.prevPosition = [null, null];
            state.position = [null, null];
            state.velocity = [null, null];
        },
    },
});
export const { setProjectilePosition, setProjectileValues, clearProjectileValues, startProjectileAnimating, } = projectileSlice.actions;
export const selectProjectilePosition = (state) => state.projectile.position;
export const selectProjectileVelocity = (state) => state.projectile.velocity;
export const selectProjectileAnimating = (state) => state.projectile.isAnimating;
export default projectileSlice.reducer;
