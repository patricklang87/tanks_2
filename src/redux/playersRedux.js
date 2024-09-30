import { createSlice } from '@reduxjs/toolkit'

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    tanks: [],
    value: 0,
    currentPlayerIndex: 0
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    setInitialTanks: (state, action) => {
      state.tanks = action.payload;
    },
  }
})

export const { increment, decrement, setInitialTanks } = playersSlice.actions
export const selectTanks = (state) => state.players.tanks
export const selectCurrentTank = (state) => state.players.tanks[state.players.currentPlayer];

export default playersSlice.reducer;
