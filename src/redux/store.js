import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './playersRedux';

export default configureStore({
    reducer: {
        players: playersReducer,
    }
});