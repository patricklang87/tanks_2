import { jsx as _jsx } from "react/jsx-runtime";
import Canvas from "../../common/canvas";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { selectProjectilePosition } from "../../../redux/projectileRedux";
import { animateProjectile, shouldCancelProjectileAnimation, resetProjectileAnimationAndAdvanceTurn } from "./projectileProps";
import { selectCurrentTank, selectTanks } from "../../../redux/playersRedux";
const Projectile = () => {
    const dispatch = useAppDispatch();
    const projectilePosition = useAppSelector(selectProjectilePosition);
    const projectileVelocity = useAppSelector(state => state.projectile.velocity);
    const tank = useAppSelector(selectCurrentTank);
    const tanks = useAppSelector(selectTanks);
    const { turretAngle, position, shotPower } = tank;
    return (_jsx(Canvas, { animationFunction: animateProjectile, customProps: {
            dispatch,
            projectilePosition,
            projectileVelocity,
            turretAngle,
            tankPosition: position,
            shotPower,
            tank,
            tanks,
        }, cancelationCondition: shouldCancelProjectileAnimation, onCancelation: resetProjectileAnimationAndAdvanceTurn }));
};
export default Projectile;
