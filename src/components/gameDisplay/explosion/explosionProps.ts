import { Tuple, Tank, NullTuple } from "../../../types";
import { drawCircle } from "../../common/commonAnimationFunctions";
import {
  updateExplosionAnimation,
  clearExplosionValues,
  setExplosionAnimating,
} from "../../../redux/explosionRedux";
import { arrayToRgba } from "../../../utils/colors";
import { actions } from "../../../constants";
import { setOnTopography } from "../../../utils/pointCentering";

export const startExplosion = ({
  dispatch,
  center,
  tank,
  topography,
  topographyStruck,
}: {
  dispatch: Function;
  center: Tuple | NullTuple;
  tank: Tank;
  topography: Tuple[];
  topographyStruck: boolean;
}): void => {
  const actionSelector = tank.selectedAction as keyof typeof actions;
  const selectedAction = actions[actionSelector];
  const { explosionColor, damage } = selectedAction;
  const maxRadius = damage ? damage / 2: 5;
  const centerPoint = topographyStruck ? setOnTopography({point: center, topography}) : center;
  console.log("in start explosion", maxRadius)

  dispatch(
    setExplosionAnimating({
      explosionCenter: centerPoint,
      explosionColor: explosionColor,
      explosionMaxRadius: maxRadius,
    })
  );
};

export const animateExplosion = (
  ctx: CanvasRenderingContext2D,
  customProps: {
    dispatch: Function;
    center: Tuple;
    color: number[];
    radius: number;
  }
): void => {
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

export const shouldCancelExplosionAnimation = ({
  radius,
  maxRadius,
}: {
  radius: number;
  maxRadius: number;
}) => {
  return radius >= maxRadius;
};

export const resetExplosionValues = ({ dispatch }: { dispatch: Function }) => {
  dispatch(clearExplosionValues());
};
