import { createSlice } from "@reduxjs/toolkit";
import { actions, designConstants, environmentConstants } from "../constants";
import { getSelectedActionData } from "../utils/tankData";
import { RootState } from "./store";
import { Tank, Action } from "../types";

interface PlayersState {
  tanks: Tank[];
  currentPlayerIndex: number;
  tanksDriving: boolean;
  tanksFalling: boolean;
  winner: number | null;
}

const initialState: PlayersState = {
  tanks: [],
  currentPlayerIndex: 0,
  tanksDriving: false,
  tanksFalling: false,
  winner: null,
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setInitialPlayerState: (state, action) => {
      state.tanks = action.payload;
      state.currentPlayerIndex = 0;
      state.tanksDriving = false;
      state.tanksFalling = false;
      state.winner = null;
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
    setPlayerTurn: (state, action) => {
      const currTank: Tank = state.tanks[state.currentPlayerIndex];
      const selectedActionData = getSelectedActionData(
        currTank.selectedAction,
        currTank.availableActions
      );
      const selectedActionRounds = selectedActionData.rounds;
      if (
        typeof selectedActionRounds === "number" &&
        selectedActionRounds <= 0
      ) {
        state.tanks[state.currentPlayerIndex].selectedAction = "standardShot";
      }

      state.currentPlayerIndex = action.payload;
    },
    setNewTankShields: (state, action) => {
      const attackingTank = state.tanks[state.currentPlayerIndex];
      const attackDamage =
        actions[attackingTank.selectedAction as keyof typeof actions].damage ||
        0;
      for (let tankInd of action.payload) {
        const newShieldValue = state.tanks[tankInd].shields - attackDamage;
        state.tanks[tankInd].shields = newShieldValue;
        state.tanks[tankInd].directlyStruck = true;
      }

      let count = 0;
      for (let tank of state.tanks) {
        if (tank.shields > 0) count++;
      }

      if (count < 2) {
        let survivor = state.tanks.findIndex((tank) => tank.shields > 0);
        state.winner = survivor;
      }
    },
    setDamageFollowingExplosion: (state, action) => {
      const damages = action.payload;
      for (let i = 0; i < damages.length; i++) {
        if (damages[i] && !state.tanks[i].directlyStruck) {
          state.tanks[i].shields = state.tanks[i].shields - damages[i];
        }
        state.tanks[i].directlyStruck = false;
      }

      let count = 0;
      for (let tank of state.tanks) {
        if (tank.shields > 0) count++;
      }

      if (count < 2) {
        let survivor = state.tanks.findIndex((tank) => tank.shields > 0);
        state.winner = survivor;
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
        const newRoundValue = selectedActionRounds - 1;
        state.tanks[state.currentPlayerIndex].availableActions[
          selectedActionIndex
        ].rounds = newRoundValue;
      }
    },
    updateTankPosition: (state, action) => {
      const { tankInd, newPosition } = action.payload;
      state.tanks[tankInd].position = newPosition;
    },
    setTanksDriving: (state, action) => {
      const { tankInd, targetX } = action.payload;
      state.tanks[tankInd].targetX = targetX;
      state.tanksDriving = true;
    },
    cancelTanksAnimating: (state) => {
      state.tanksDriving = false;
      state.tanksFalling = false;
    },
    setTanksFalling: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        if (action.payload[i]) {
          state.tanks[i].targetY = action.payload[i];
        }
      }
      state.tanksFalling = true;
    },
    updateTanksFalling: (state) => {
      for (let tank of state.tanks) {
        if (!tank.targetY || tank.targetY === tank.position[1]) continue;
        if (
          Math.abs(tank.position[1] - tank.targetY) <
          environmentConstants.fallAnimationSpeed
        ) {
          tank.position[1] = tank.targetY;
          tank.targetY = null;
        } else if (tank.position[1] >= tank.targetY) {
          tank.position[1] =
            tank.position[1] - environmentConstants.fallAnimationSpeed;
        }
      }
    },
    setStruckTankColors: (state, action) => {
      const { tankInds, newColor } = action.payload;
      for (let tankInd of tankInds) {
        state.tanks[tankInd].currentColor = newColor;
      }
    },
    resetTankColors: (state, action) => {
      for (let tankInd of action.payload) {
        state.tanks[tankInd].currentColor = state.tanks[tankInd].localColor;
      }
    }
  },
});

export const {
  setInitialPlayerState,
  setCurrentTankTurretAngle,
  setCurrentTankShotPower,
  setCurrentTankDriveDistance,
  setCurrentTankSelectedAction,
  setPlayerTurn,
  setNewTankShields,
  reduceRemainingRounds,
  updateTankPosition,
  setTanksDriving,
  cancelTanksAnimating,
  setTanksFalling,
  setDamageFollowingExplosion,
  setStruckTankColors,
  resetTankColors,
} = playersSlice.actions;
export const selectTanks = (state: RootState) => state.players.tanks;
export const selectCurrentTank = (state: RootState) =>
  state.players.tanks[state.players.currentPlayerIndex];
export const selectCurrentPlayerIndex = (state: RootState) =>
  state.players.currentPlayerIndex;

export default playersSlice.reducer;
