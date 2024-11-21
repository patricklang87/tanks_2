import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './playersRedux';
import topographyReducer from './topographyRedux'
import projectileReducer from './projectileRedux';

const store = configureStore({
    reducer: {
        players: playersReducer,
        topography: topographyReducer,
        projectile: projectileReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store;

export default store;