import { createSlice } from "@reduxjs/toolkit";

const projectileSlice = createSlice({
  name: "projectile",
  initialState: {
    position: [null, null],
  },
  reducers: {
    setProjectilePosition: (state, action) => {
      state.position = action.payload;
    },
  },
});

export const { setProjectilePosition } = projectileSlice.actions;
export const selectProjectilePosition = (state) => state.projectile.position;

export default projectileSlice.reducer;
