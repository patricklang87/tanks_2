import { jsx as _jsx } from "react/jsx-runtime";
import Canvas from "../../common/canvas";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { animateExplosion, shouldCancelExplosionAnimation, resetExplosionValues } from "./explosionProps";
const Explosion = () => {
    const dispatch = useAppDispatch();
    const center = useAppSelector((state) => state.explosion.explosionCenter);
    const color = useAppSelector((state) => state.explosion.explosionColor);
    const radius = useAppSelector((state) => state.explosion.explosionMaxRadius);
    const maxRadius = useAppSelector((state) => state.explosion.explosionMaxRadius);
    return (_jsx(Canvas, { animationFunction: animateExplosion, customProps: { dispatch, color, center, radius, maxRadius }, cancelationCondition: shouldCancelExplosionAnimation, onCancelation: resetExplosionValues }));
};
export default Explosion;
