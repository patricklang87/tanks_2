import { drawCircle } from "../../common/commonAnimationFunctions";
import { updateExplosionAnimation, clearExplosionValues, setExplosionAnimating, } from "../../../redux/explosionRedux";
import { arrayToRgba } from "../../../utils/colors";
import { actions } from "../../../constants";
export const startExplosion = ({ dispatch, center, tank, }) => {
    console.log(center, tank);
    const actionSelector = tank.selectedAction;
    const selectedAction = actions[actionSelector];
    const { explosionColor, damage } = selectedAction;
    const maxRadius = damage ? damage / 10 : 10;
    dispatch(setExplosionAnimating({
        explosionCenter: center,
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
export const shouldCancelExplosionAnimation = ({ radius, maxRadius, }) => {
    return radius >= maxRadius;
};
export const resetExplosionValues = ({ dispatch }) => {
    dispatch(clearExplosionValues());
};
