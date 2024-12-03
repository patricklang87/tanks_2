import { jsx as _jsx } from "react/jsx-runtime";
import Canvas from "../../common/canvas";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { animateExplosion, shouldCancelExplosionAnimation, resetExplosionValues, } from "./explosionProps";
import { selectTopography } from "../../../redux/topographyRedux";
import { selectTanks } from "../../../redux/playersRedux";
const Explosion = () => {
    const dispatch = useAppDispatch();
    const center = useAppSelector((state) => state.explosion.explosionCenter);
    const color = useAppSelector((state) => state.explosion.explosionColor);
    const radius = useAppSelector((state) => state.explosion.explosionRadius);
    const maxRadius = useAppSelector((state) => state.explosion.explosionMaxRadius);
    const maxReached = useAppSelector((state) => state.explosion.maxReached);
    const topography = useAppSelector(selectTopography);
    const tanks = useAppSelector(selectTanks);
    return (_jsx(Canvas, { animationFunction: animateExplosion, customProps: {
            dispatch,
            color,
            center,
            radius,
            maxRadius,
            maxReached,
            topography,
            tanks,
        }, cancelationCondition: shouldCancelExplosionAnimation, onCancelation: resetExplosionValues }));
};
export default Explosion;
