import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './playersRedux';
import topographyReducer from './topographyRedux'

export default configureStore({
    reducer: {
        players: playersReducer,
        topography: topographyReducer,
    }
});