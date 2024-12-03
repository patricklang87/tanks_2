import { drawCircle } from "../../common/commonAnimationFunctions";
import { updateExplosionAnimation, clearExplosionValues, setExplosionAnimating, } from "../../../redux/explosionRedux";
import { arrayToRgba } from "../../../utils/colors";
import { actions } from "../../../constants";
import { setOnTopography } from "../../../utils/pointCentering";
import { startTanksFalling } from "../tanks/tanksProps";
export const startExplosion = ({ dispatch, center, tank, topography, topographyStruck, }) => {
    const actionSelector = tank.selectedAction;
    const selectedAction = actions[actionSelector];
    const { explosionColor, damage } = selectedAction;
    const maxRadius = damage ? damage / 2 : 5;
    const centerPoint = topographyStruck
        ? setOnTopography({ point: center, topography })
        : center;
    dispatch(setExplosionAnimating({
        explosionCenter: centerPoint,
        explosionColor: explosionColor,
        explosionMaxRadius: maxRadius,
    }));
};
export const animateExplosion = (ctx, customProps) => {
    const { dispatch, center, color, radius } = customProps;
    const [startX, startY] = center;
    const colorRgba = arrayToRgba(color);
    drawCircle(ctx, {
        radius,
        lineWidth: 3,
        strokeStyle: colorRgba,
        colorFill: colorRgba,
        startY,
        startX,
    });
    dispatch(updateExplosionAnimation());
    ctx?.stroke();
};
export const shouldCancelExplosionAnimation = ({ radius, maxReached, }) => {
    return radius <= 0 && maxReached;
};
export const resetExplosionValues = ({ dispatch, topography, tanks, }) => {
    dispatch(clearExplosionValues());
    startTanksFalling({ topography, tanks, dispatch });
};
