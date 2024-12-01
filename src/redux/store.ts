import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './playersRedux';
import topographyReducer from './topographyRedux'
import projectileReducer from './projectileRedux';
import gameReducer from './gameRedux';
import explosionReducer from './explosionRedux';

const store = configureStore({
    reducer: {
        players: playersReducer,
        topography: topographyReducer,
        projectile: projectileReducer,
        game: gameReducer,
        explosion: explosionReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store;

export default store;