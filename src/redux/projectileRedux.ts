import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ProjectileState{
  position: [number | null, number | null];
  velocity: [number | null, number | null];
  isAnimating: boolean;
}

const initialState: ProjectileState =  {
  position: [null, null],
  velocity: [null, null],
  isAnimating: false,
}

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

export const {
  setProjectilePosition,
  setProjectileValues,
  clearProjectileValues,
  startProjectileAnimating,
} = projectileSlice.actions;
export const selectProjectilePosition = (state: RootState) => state.projectile.position;
export const selectProjectileVelocity = (state: RootState) => state.projectile.velocity;
export const selectProjectileAnimating = (state: RootState) => state.projectile.isAnimating;

export default projectileSlice.reducer;
