import { createSlice } from "@reduxjs/toolkit";
import { actions } from "../constants";

const playersSlice = createSlice({
  name: "players",
  initialState: {
    tanks: [],
    newTankShields: {},
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
    setNewTankShields: (state, action) => {
      for (let tankInd of action.payload) {
        const attackDamage =
          actions[state.tanks[state.currentPlayerIndex].selectedAction].damage;
        const newShieldValue = state.tanks[tankInd].shields - attackDamage;
        state.newTankShields[tankInd] = newShieldValue;
      }
    },
    reduceTankShields: (state) => {
      if (Object.keys(state.newTankShields).length > 0) {
        for (let [tankInd, newShields] of Object.entries(state.newTankShields)) {
          state.tanks[tankInd].shields = newShields;
        }
        state.newTankShields = {};
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
  setUpcomingPlayerIndex,
  advancePlayerTurn,
  reduceTankShields,
  setNewTankShields,
} = playersSlice.actions;
export const selectTanks = (state) => state.players.tanks;
export const selectCurrentTank = (state) =>
  state.players.tanks[state.players.currentPlayerIndex];

export default playersSlice.reducer;
