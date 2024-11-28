import { createSlice } from "@reduxjs/toolkit";

interface GameState{
  activeGame: boolean;
}

const initialState: GameState = {
  activeGame: false,
}

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