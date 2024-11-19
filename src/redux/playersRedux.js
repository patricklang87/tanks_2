import { createSlice } from "@reduxjs/toolkit";
import { actions } from "../constants";

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
    advancePlayerTurn: (state) => {
      if (state.currentPlayerIndex < state.tanks.length - 1) {
        state.currentPlayerIndex = state.currentPlayerIndex + 1;
      } else {
        state.currentPlayerIndex = 0;
      }
    },
    setNewTankShields: (state, action) => {
      for (let tankInd of action.payload) {
        const attackDamage =
          actions[state.tanks[state.currentPlayerIndex].selectedAction].damage;
        const newShieldValue = state.tanks[tankInd].shields - attackDamage;
        state.tanks[tankInd].shields = newShieldValue;
      }
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
  advancePlayerTurn,
  setNewTankShields,
} = playersSlice.actions;
export const selectTanks = (state) => state.players.tanks;
export const selectCurrentTank = (state) =>
  state.players.tanks[state.players.currentPlayerIndex];

export default playersSlice.reducer;
