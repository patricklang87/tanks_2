import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
            const { position, velocity } = action.payload;
            state.position = position;
            state.velocity = velocity;
        },
        clearProjectileValues: (state) => {
            state.position = [null, null];
            state.velocity = [null, null];
            state.isAnimating = false;
        },
    },
});
export const { setProjectilePosition, setProjectileValues, clearProjectileValues, startProjectileAnimating, } = projectileSlice.actions;
export const selectProjectilePosition = (state) => state.projectile.position;
export const selectProjectileVelocity = (state) => state.projectile.velocity;
export const selectProjectileAnimating = (state) => state.projectile.isAnimating;
export default projectileSlice.reducer;
