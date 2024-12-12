import { distance } from "mathjs";
import { drawCircle } from "../../common/commonAnimationFunctions";
import { updateExplosionAnimation, clearExplosionValues, setExplosionAnimating, } from "../../../redux/explosionRedux";
import { setDamageFollowingExplosion } from "../../../redux/playersRedux";
import { arrayToRgba } from "../../../utils/colors";
import { actions, tankDimensions } from "../../../constants";
import { setOnTopography } from "../../../utils/pointCentering";
import { startTanksFalling, initiateTankDamageAnimation } from "../tanks/tanksProps";
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
export const shouldCancelExplosionAnimation = ({ radius, maxReached, dispatch, center, tanks, maxRadius, }) => {
    if (radius <= 0 && maxReached) {
        registerExplosionDamage({ tanks, maxRadius, center, dispatch });
        return true;
    }
    return false;
};
export const resetExplosionValues = ({ dispatch, topography, tanks, }) => {
    dispatch(clearExplosionValues());
    startTanksFalling({ topography, tanks, dispatch });
};
export const registerExplosionDamage = ({ tanks, maxRadius, center, dispatch, }) => {
    const tankDamageTaken = new Array(tanks.length).fill(null);
    for (let i in tanks) {
        const [tankX, tankY] = tanks[i].position;
        const tankCenter = [
            tankX + tankDimensions.width / 2,
            tankY + tankDimensions.height / 2,
        ];
        const dist = Number(distance(tankCenter, center));
        if (dist <= tankDimensions.width / 2 + maxRadius) {
            const approxOverlap = Math.abs(maxRadius - (dist - 0.5 * tankDimensions.width));
            const percent = approxOverlap / maxRadius;
            const damage = maxRadius * 2 * percent;
            tankDamageTaken[i] = Math.floor(damage);
        }
    }
    dispatch(setDamageFollowingExplosion(tankDamageTaken));
    const struckTanks = [];
    tankDamageTaken.forEach((tank, i) => {
        if (typeof tank === "number") {
            struckTanks.push(i);
        }
    });
    initiateTankDamageAnimation({ dispatch, struckTanks });
};
