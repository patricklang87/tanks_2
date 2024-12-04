import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Canvas from "../../common/canvas";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { selectCurrentPlayerIndex, selectCurrentTank, selectTanks, } from "../../../redux/playersRedux";
import { animateTankDriving, cancelTankAnimationAndAdvanceTurn, cancelTankAnimation, shouldCancelDriveAnimation, shouldCancelFallAnimation, drawTanks, animateTanksFalling, } from "./tanksProps";
import { selectTopography } from "../../../redux/topographyRedux";
const Tanks = () => {
    const tanks = useAppSelector(selectTanks);
    const dispatch = useAppDispatch();
    const tanksAreDriving = useAppSelector((state) => state.players.tanksDriving);
    const tanksAreFalling = useAppSelector((state) => state.players.tanksFalling);
    const tanksAreAnimating = tanksAreDriving || tanksAreFalling;
    const useFallAnimations = !tanksAreDriving && tanksAreFalling;
    const tank = useAppSelector(selectCurrentTank);
    const tankInd = useAppSelector(selectCurrentPlayerIndex);
    const topography = useAppSelector(selectTopography);
    return (_jsx(_Fragment, { children: tanksAreAnimating ? (_jsx(Canvas, { animationFunction: useFallAnimations ? animateTanksFalling : animateTankDriving, customProps: {
                dispatch,
                tankInd,
                tanks,
                tank,
                topography,
            }, cancelationCondition: useFallAnimations
                ? shouldCancelFallAnimation
                : shouldCancelDriveAnimation, onCancelation: useFallAnimations
                ? cancelTankAnimation
                : cancelTankAnimationAndAdvanceTurn })) : (_jsx(Canvas, { staticShapes: drawTanks, customProps: { tanks } })) }));
};
export default Tanks;
