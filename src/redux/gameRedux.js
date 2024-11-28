import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    activeGame: false,
};
const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        activateGame: (state) => {
            state.activeGame = true;
        },
        endGame: (state) => {
            state.activeGame = false;
        },
    },
});
export const { activateGame, endGame } = gameSlice.actions;
export default gameSlice.reducer;
