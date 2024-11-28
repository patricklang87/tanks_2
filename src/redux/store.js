import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './playersRedux';
import topographyReducer from './topographyRedux';
import projectileReducer from './projectileRedux';
import gameReducer from './gameRedux';
const store = configureStore({
    reducer: {
        players: playersReducer,
        topography: topographyReducer,
        projectile: projectileReducer,
        game: gameReducer,
    }
});
export default store;
