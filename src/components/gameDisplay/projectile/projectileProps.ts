import {
  canvasConstants,
  environmentConstants,
  tankDimensions,
} from "../../../constants";
import {
  setProjectileValues,
  clearProjectileValues,
} from "../../../redux/projectileRedux";
import { drawCircle } from "../../common/commonAnimationFunctions";
import { degreesToRadians } from "../../../utils/angleManipulation";
import { setNewTankShields } from "../../../redux/playersRedux";
import { setTopography } from "../../../redux/topographyRedux";
import { Tank, Tuple } from "../../../types";
import { advancePlayerTurn } from "../gameControls";
import { intersect } from "mathjs";
import { calculateNewTopographyOnStrike, checkForGroundCollision } from "../topography/topographyProps";
import { startExplosion } from "../explosion/explosionProps";

export const animateProjectile = (
  ctx: CanvasRenderingContext2D,
  customProps: {
    dispatch: Function;
    projectilePosition: Tuple;
    projectileVelocity: Tuple;
  }
): void => {
  const { dispatch, projectilePosition, projectileVelocity } = customProps;
  const [currX, currY] = projectilePosition;
  const [currVelX, currVelY] = projectileVelocity;

  drawCircle(ctx, {
    radius: 2,
    lineWidth: 3,
    strokeStyle: "#4F7CAC",
    colorFill: "#4F7CAC",
    startY: currY,
    startX: currX,
  });
  const newProjectileValues = calculateNewProjectileValues({
    currX,
    currY,
    currVelX,
    currVelY,
  });

  dispatch(setProjectileValues(newProjectileValues));

  ctx?.stroke();
};

export const shouldCancelProjectileAnimation = ({
  projectilePosition,
  prevPosition,
  tanks,
  dispatch,
  topography,
  tank,
}: {
  projectilePosition: Tuple;
  prevPosition: Tuple | [null, null];
  tanks: Tank[];
  tank: Tank;
  dispatch: Function;
  topography: Tuple[];
}): boolean => {
  const [currX, currY] = projectilePosition;
  const outOfBounds =
    currX > canvasConstants.width ||
    currX < 0 ||
    currY > canvasConstants.height;

  const struckTanks = checkForStrike({
    prevPosition,
    projectilePosition,
    tanks,
  });

  // check for topography struck
  const topographyStruck = checkForGroundCollision({
    topography,
    point: prevPosition,
  });

  if (struckTanks.length) {
    dispatch(setNewTankShields(struckTanks));
  }

  if (!!struckTanks.length || !!topographyStruck) {
    startExplosion({
      dispatch,
      center: prevPosition,
      tank,
      topography,
      topographyStruck: !!topographyStruck,
    });
  }

  if (topographyStruck) {
    const newTopography = calculateNewTopographyOnStrike({
      point: topographyStruck,
      topography,
      tank
    });
    dispatch(setTopography(newTopography))
  }

  return outOfBounds || !!struckTanks.length || !!topographyStruck;
};

export const resetProjectileAnimationAndAdvanceTurn = ({
  dispatch,
  tankInd,
  tanks,
}: {
  dispatch: Function;
  tankInd: number;
  tanks: Tank[];
}) => {
  dispatch(clearProjectileValues());
  advancePlayerTurn({ dispatch, tankInd, tanks });
};

export const calculateNewProjectileValues = ({
  currX,
  currY,
  currVelX,
  currVelY,
  currAccelX = 0,
  currAccelY = environmentConstants.gravity,
}: {
  currX: number;
  currY: number;
  currVelX: number;
  currVelY: number;
  currAccelX?: number;
  currAccelY?: number;
}): { position: Tuple; velocity: Tuple } => {
  const newPosX = currX + currVelX;
  const newPosY = currY + currVelY;
  const newVelX = currVelX + currAccelX;
  const newVelY = currVelY + currAccelY;
  return { position: [newPosX, newPosY], velocity: [newVelX, newVelY] };
};

export const calculateInitialVelocities = ({
  turretAngle,
  initialVelocity,
}: {
  turretAngle: number;
  initialVelocity: number;
}): { projectileDirection: number; initialVelocities: Tuple } => {
  const adjustedInitialVelocity =
    initialVelocity * environmentConstants.shotSlowingFactor;
  const launchAngle = getLaunchAngle({ turretAngle });
  const projectileDirection = turretAngle >= -90 ? 1 : -1;
  const initialVelocityY =
    projectileDirection *
    -adjustedInitialVelocity *
    Math.sin(degreesToRadians(launchAngle));
  const initialVelocityX =
    adjustedInitialVelocity * Math.cos(degreesToRadians(launchAngle));
  return {
    projectileDirection,
    initialVelocities: [initialVelocityX, initialVelocityY],
  };
};

const getLaunchAngle = ({ turretAngle }: { turretAngle: number }): number => {
  let turretAngleAgainstHorizon;
  if (turretAngle <= 0 && turretAngle >= -90)
    turretAngleAgainstHorizon = turretAngle * -1;
  else turretAngleAgainstHorizon = turretAngle;
  return turretAngleAgainstHorizon;
};

const checkForStrike = ({
  prevPosition,
  projectilePosition,
  tanks,
}: {
  prevPosition: Tuple | [null, null];
  projectilePosition: Tuple;
  tanks: Tank[];
}): number[] => {
  const { height, width } = tankDimensions;
  let struckTanks: number[] = [];
  if (prevPosition[0] == null && prevPosition[1] == null) return [];
  tanks?.forEach((tank, index) => {
    const [tankX, tankY] = tank.position;
    const tankTopLeft: Tuple = [tankX, tankY];
    const tankTopRight: Tuple = [tankX + width, tankY];
    const tankBottomLeft: Tuple = [tankX, tankY + height];
    const tankBottomRight: Tuple = [tankX + width, tankY + height];
    const tankLines: Tuple[][] = [
      [tankTopLeft, tankTopRight],
      [tankBottomLeft, tankBottomRight],
      [tankTopLeft, tankBottomLeft],
      [tankTopRight, tankBottomRight],
    ];

    for (let i = 0; i < tankLines.length; i++) {
      const intersection = intersect(
        projectilePosition,
        prevPosition,
        tankLines[i][0],
        tankLines[i][1]
      );

      if (intersection) {
        const xVal = Number(intersection[0]);
        const yVal = Number(intersection[1]);
        const [currX, currY] = projectilePosition;
        const [prevX, prevY] = prevPosition;

        const projGreaterX = Math.max(currX, prevX);
        const projLesserX = Math.min(currX, prevX);
        const projGreaterY = Math.max(currY, prevY);
        const projLesserY = Math.min(currY, prevY);
        const yValWithinProjLine = yVal <= projGreaterY && yVal >= projLesserY;
        const xValWithinProjLine = xVal <= projGreaterX && xVal >= projLesserX;
        const yValWithinTargLine = yVal >= tankY && yVal <= tankY + height;
        const xValWithinTargLine = xVal >= tankX && xVal <= tankX + width;

        if (
          xValWithinProjLine &&
          yValWithinProjLine &&
          xValWithinTargLine &&
          yValWithinTargLine
        ) {
          struckTanks.push(index);
          break;
        }
      }
    }
  });
  return struckTanks;
};
