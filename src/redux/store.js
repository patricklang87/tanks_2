import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './playersRedux';
import topographyReducer from './topographyRedux'
import projectileReducer from './projectileRedux';

export default configureStore({
    reducer: {
        players: playersReducer,
        topography: topographyReducer,
        projectile: projectileReducer,
    }
});