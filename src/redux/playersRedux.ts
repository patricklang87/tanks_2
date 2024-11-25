import { createSlice } from "@reduxjs/toolkit";
import { actions } from "../constants";
import { RootState } from "./store";
import { Tank, Action } from "../types";

interface PlayersState {
  tanks: Tank[];
  currentPlayerIndex: number;
  tanksAnimating: boolean;
}

const initialState: PlayersState = {
  tanks: [],
  currentPlayerIndex: 0,
  tanksAnimating: false,
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
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
      const attackingTank = state.tanks[state.currentPlayerIndex];
      const attackDamage =
        actions[attackingTank.selectedAction as keyof typeof actions].damage ||
        0;
      for (let tankInd of action.payload) {
        const newShieldValue = state.tanks[tankInd].shields - attackDamage;
        state.tanks[tankInd].shields = newShieldValue;
      }
    },
    reduceRemainingRounds: (state) => {
      const attackingTank = state.tanks[state.currentPlayerIndex];
      const actionSelector =
        attackingTank.selectedAction as keyof typeof actions;
      const selectedAction = actions[actionSelector];
      const selectedActionIndex = attackingTank.availableActions.findIndex(
        (option: Action) => option.name === actionSelector
      );
      const selectedActionRounds =
        attackingTank.availableActions[selectedActionIndex].rounds;
      if (
        selectedActionRounds &&
        selectedAction.type === "PROJECTILE" &&
        typeof selectedActionRounds == "number"
      ) {
        state.tanks[state.currentPlayerIndex].availableActions[
          selectedActionIndex
        ].rounds = selectedActionRounds - 1;
      }
    },
    updateTankPosition: (state, action) => {
      const { tankInd, newPosition } = action.payload;
      state.tanks[tankInd].position = newPosition;
    },
    setTanksAnimating: (state, action) => {
      const {tankInd, targetX} = action.payload;
      state.tanks[tankInd].targetX = targetX;
      state.tanksAnimating = true;
    },
    cancelTanksAnimating: (state) => {
      state.tanksAnimating = false;
    }
  },
});

export const {
  setInitialTanks,
  setCurrentTankTurretAngle,
  setCurrentTankShotPower,
  setCurrentTankDriveDistance,
  setCurrentTankSelectedAction,
  advancePlayerTurn,
  setNewTankShields,
  reduceRemainingRounds,
  updateTankPosition,
  setTanksAnimating,
  cancelTanksAnimating,
} = playersSlice.actions;
export const selectTanks = (state: RootState) => state.players.tanks;
export const selectCurrentTank = (state: RootState) =>
  state.players.tanks[state.players.currentPlayerIndex];
export const selectCurrentPlayerIndex = (state: RootState) =>
  state.players.currentPlayerIndex;

export default playersSlice.reducer;
