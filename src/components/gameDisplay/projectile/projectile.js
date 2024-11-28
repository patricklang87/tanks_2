import { jsx as _jsx } from "react/jsx-runtime";
import Canvas from "../../common/canvas";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { selectProjectilePosition, } from "../../../redux/projectileRedux";
import { animateProjectile, shouldCancelProjectileAnimation, resetProjectileAnimationAndAdvanceTurn, } from "./projectileProps";
import { selectCurrentTank, selectTanks } from "../../../redux/playersRedux";
import { selectTopography } from "../../../redux/topographyRedux";
const Projectile = () => {
    const dispatch = useAppDispatch();
    const topography = useAppSelector(selectTopography);
    const projectilePosition = useAppSelector(selectProjectilePosition);
    const prevPosition = useAppSelector((state) => state.projectile.prevPosition);
    const projectileVelocity = useAppSelector((state) => state.projectile.velocity);
    const currentPlayerIndex = useAppSelector((state) => state.players.currentPlayerIndex);
    const tank = useAppSelector(selectCurrentTank);
    const tanks = useAppSelector(selectTanks);
    const { turretAngle, position, shotPower } = tank;
    return (_jsx(Canvas, { animationFunction: animateProjectile, customProps: {
            dispatch,
            projectilePosition,
            prevPosition,
            projectileVelocity,
            turretAngle,
            tankPosition: position,
            shotPower,
            tank,
            tanks,
            tankInd: currentPlayerIndex,
            topography,
        }, cancelationCondition: shouldCancelProjectileAnimation, onCancelation: resetProjectileAnimationAndAdvanceTurn }));
};
export default Projectile;
