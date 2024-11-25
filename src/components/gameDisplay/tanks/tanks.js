import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Canvas from "../../common/canvas";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { selectCurrentPlayerIndex, selectCurrentTank, selectTanks } from "../../../redux/playersRedux";
import { animateTankDriving, cancelDriveAnimationAndAdvanceTurn, shouldCancelDriveAnimation, drawTanks } from "./tanksProps";
import { selectTopography } from "../../../redux/topographyRedux";
const Tanks = () => {
    const tanks = useAppSelector(selectTanks);
    const dispatch = useAppDispatch();
    const tanksAreAnimating = useAppSelector((state) => state.players.tanksAnimating);
    const tank = useAppSelector(selectCurrentTank);
    const tankInd = useAppSelector(selectCurrentPlayerIndex);
    const topography = useAppSelector(selectTopography);
    return (_jsx(_Fragment, { children: tanksAreAnimating ? (_jsx(Canvas, { animationFunction: animateTankDriving, customProps: {
                dispatch,
                tankInd,
                tanks,
                tank,
                topography,
            }, cancelationCondition: shouldCancelDriveAnimation, onCancelation: cancelDriveAnimationAndAdvanceTurn })) : (_jsx(Canvas, { staticShapes: drawTanks, customProps: { tanks } })) }));
};
export default Tanks;
