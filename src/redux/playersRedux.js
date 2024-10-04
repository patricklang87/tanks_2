import { createSlice } from "@reduxjs/toolkit";

const playersSlice = createSlice({
  name: "players",
  initialState: {
    tanks: [],
    currentPlayerIndex: 0,
    upcomingPlayerIndex: 1,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setInitialTanks: (state, action) => {
      state.tanks = action.payload;
    },
    setCurrentTankTurretAngle: (state, action) => {
      state.tanks[state.currentPlayerIndex].turretAngle = action.payload;
    },
    setCurrentTankShotPower: (state, action) => {
      state.tanks[state.currentPlayerIndex].shotPower = action.payload;
    },
    setCurrentTankDriveDistance: (state, action) => {
      state.tanks[state.currentPlayerIndex].driveDistance = action.payload;
    },
    setCurrentTankSelectedAction: (state, action) => {
      state.tanks[state.currentPlayerIndex].selectedAction = action.payload;
    },
    setUpcomingPlayerIndex: (state) => {
      if (state.currentPlayerIndex < state.tanks.length - 1) {
        state.upcomingPlayerIndex = state.currentPlayerIndex + 1;
      } else {
        state.upcomingPlayerIndex = 0;
      }
    },
    advancePlayerTurn: (state) => {
      state.currentPlayerIndex = state.upcomingPlayerIndex;
    },
  },
});

export const {
  increment,
  decrement,
  setInitialTanks,
  setCurrentTankTurretAngle,
  setCurrentTankShotPower,
  setCurrentTankDriveDistance,
  setCurrentTankSelectedAction,
  setUpcomingPlayerIndex,
  advancePlayerTurn,
} = playersSlice.actions;
export const selectTanks = (state) => state.players.tanks;
export const selectCurrentTank = (state) =>
  state.players.tanks[state.players.currentPlayerIndex];

export default playersSlice.reducer;
