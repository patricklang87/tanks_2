import { createSlice } from "@reduxjs/toolkit";

const projectileSlice = createSlice({
  name: "projectile",
  initialState: {
    position: [null, null],
    velocity: [null, null],
  },
  reducers: {
    setProjectilePosition: (state, action) => {
      state.position = action.payload;
    },
    setProjectileValues: (state, action) => {
      const { position, velocity } = action.payload;
      state.position = position;
      state.velocity = velocity;
    },
    clearProjectileValues: (state) => {
      state.position = [null, null];
      state.velocity = [null, null];
    },
  },
});

export const {
  setProjectilePosition,
  setProjectileValues,
  clearProjectileValues,
} = projectileSlice.actions;
export const selectProjectilePosition = (state) => state.projectile.position;
export const selectProjectileVelocity = (state) => state.projectile.velocity;

export default projectileSlice.reducer;
