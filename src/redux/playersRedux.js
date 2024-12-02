import { createSlice } from "@reduxjs/toolkit";
import { actions } from "../constants";
const initialState = {
    tanks: [],
    currentPlayerIndex: 0,
    tanksAnimating: false,
    winner: null,
};
const playersSlice = createSlice({
    name: "players",
    initialState,
    reducers: {
        setInitialPlayerState: (state, action) => {
            state.tanks = action.payload;
            state.currentPlayerIndex = 0;
            state.tanksAnimating = false;
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
            state.currentPlayerIndex = action.payload;
        },
        setNewTankShields: (state, action) => {
            const attackingTank = state.tanks[state.currentPlayerIndex];
            const attackDamage = actions[attackingTank.selectedAction].damage ||
                0;
            for (let tankInd of action.payload) {
                const newShieldValue = state.tanks[tankInd].shields - attackDamage;
                state.tanks[tankInd].shields = newShieldValue;
            }
            let count = 0;
            for (let tank of state.tanks) {
                if (tank.shields > 0)
                    count++;
            }
            if (count < 2) {
                let survivor = state.tanks.findIndex((tank) => tank.shields > 0);
                state.winner = survivor;
            }
        },
        reduceRemainingRounds: (state) => {
            const attackingTank = state.tanks[state.currentPlayerIndex];
            const actionSelector = attackingTank.selectedAction;
            const selectedAction = actions[actionSelector];
            const selectedActionIndex = attackingTank.availableActions.findIndex((option) => option.name === actionSelector);
            const selectedActionRounds = attackingTank.availableActions[selectedActionIndex].rounds;
            if (selectedActionRounds &&
                selectedAction.type === "PROJECTILE" &&
                typeof selectedActionRounds == "number") {
                const newRoundValue = selectedActionRounds - 1;
                state.tanks[state.currentPlayerIndex].availableActions[selectedActionIndex].rounds = newRoundValue;
                if (newRoundValue <= 0) {
                    state.tanks[state.currentPlayerIndex].selectedAction = "standardShot";
                }
            }
        },
        updateTankPosition: (state, action) => {
            const { tankInd, newPosition } = action.payload;
            state.tanks[tankInd].position = newPosition;
        },
        setTanksAnimating: (state, action) => {
            const { tankInd, targetX } = action.payload;
            state.tanks[tankInd].targetX = targetX;
            state.tanksAnimating = true;
        },
        cancelTanksAnimating: (state) => {
            state.tanksAnimating = false;
        },
    },
});
export const { setInitialPlayerState, setCurrentTankTurretAngle, setCurrentTankShotPower, setCurrentTankDriveDistance, setCurrentTankSelectedAction, setPlayerTurn, setNewTankShields, reduceRemainingRounds, updateTankPosition, setTanksAnimating, cancelTanksAnimating, } = playersSlice.actions;
export const selectTanks = (state) => state.players.tanks;
export const selectCurrentTank = (state) => state.players.tanks[state.players.currentPlayerIndex];
export const selectCurrentPlayerIndex = (state) => state.players.currentPlayerIndex;
export default playersSlice.reducer;
