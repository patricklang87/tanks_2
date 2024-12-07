import {
  tankDimensions,
  canvasConstants,
  tankColor,
  designConstants,
  actions,
  environmentConstants,
} from "../../../constants";
import { arrayToRgba } from "../../../utils/colors";
import { getCoordinatesOnCircle } from "../../../utils/angleManipulation";
import { Tank, Action, Tuple } from "../../../types";
import {
  cancelTanksAnimating,
  updateTankPosition,
  setTanksFalling,
} from "../../../redux/playersRedux";
import { advancePlayerTurn } from "../gameControls";
import { setOnTopography } from "../../../utils/pointCentering";

export const generateTankPositions = ({
  topography,
  numberOfTanks = 2,
}: {
  topography: number[][];
  numberOfTanks: number;
}): Tuple[] => {
  const rangeWidth = canvasConstants.width / numberOfTanks;
  const rangeStarts = [];
  let count = 0;
  while (count < numberOfTanks) {
    rangeStarts.push(count * rangeWidth);
    count++;
  }
  return rangeStarts.map((start) => {
    const tankX = start + Math.random() * rangeWidth;
    const tankY = getTankY({ topography, tankX });
    return centerTank([tankX, tankY]);
  });
};

export const getTankY = ({
  topography,
  tankX,
}: {
  topography: number[][];
  tankX: number;
}): number => {
  const tankRightIndex = topography.findIndex((point) => point[0] >= tankX);
  const tankRightPoint = topography[tankRightIndex];
  const tankLeftPoint = topography[tankRightIndex - 1];
  if (tankLeftPoint[0] === tankX) return tankLeftPoint[1];
  const gradient =
    (tankRightPoint[1] - tankLeftPoint[1]) /
    (tankRightPoint[0] - tankLeftPoint[0]);
  const yIntercept = tankLeftPoint[1] - gradient * tankLeftPoint[0];
  return gradient * tankX + yIntercept;
};

export const centerTank = (uncenteredPoint: Tuple): Tuple => {
  const { width: tankWidth, height: tankHeight } = tankDimensions;
  const [tankX, tankY] = uncenteredPoint;
  return [tankX - tankWidth / 2, tankY - tankHeight];
};

export const uncenterTank = (centeredPoint: Tuple): Tuple => {
  const { width: tankWidth, height: tankHeight } = tankDimensions;
  const [currX, currY] = centeredPoint;
  return [currX + tankWidth / 2, currY + tankHeight];
};

export const calculateTurretEndpoints = ({
  tankPosition,
  turretAngle,
  factor = 1,
}: {
  tankPosition: Tuple;
  turretAngle: number;
  factor?: number;
}): { startingPoint: Tuple; endingPoint: Tuple } => {
  const [tankX, tankY] = tankPosition;
  const { turretLength, width: tankWidth } = tankDimensions;
  const turretStartingX = tankX + (tankWidth * factor) / 2;
  const turretStartingY = tankY;
  const turretEnding = getCoordinatesOnCircle({
    center: [turretStartingX, turretStartingY],
    radius: turretLength * factor,
    angle: turretAngle,
  });

  return {
    startingPoint: [turretStartingX, turretStartingY],
    endingPoint: turretEnding,
  };
};

export const initiateTank = ({
  index,
  tankPosition,
}: {
  index: number;
  tankPosition: Tuple;
}): Tank => {
  return {
    turretAngle: -90,
    shotPower: 50,
    driveDistance: 0,
    shields: 100,
    position: tankPosition,
    targetX: tankPosition[0],
    targetY: null,
    tankDriveAnimationExecuting: false,
    localColor: arrayToRgba(tankColor[index]),
    currentColor: arrayToRgba(tankColor[index]),
    tankFallAnimationExecuting: false,
    fuel: 100,
    selectedAction: "standardShot",
    availableActions: [
      actions.standardShot,
      actions.steelShotput,
      actions.drive,
      actions.begemot
    ],
    directlyStruck: false,
  };
};

export const drawTank = (
  ctx: CanvasRenderingContext2D,
  customProps: {
    shields: number;
    position: Tuple;
    currentColor: string;
    turretAngle: number;
    factor?: number;
  }
): void => {
  const {
    shields,
    position,
    currentColor,
    turretAngle,
    factor = 1,
  } = customProps;
  const [tankX, tankY] = position;
  const tankFillColor =
    shields > 0 ? currentColor : designConstants.destroyedTankColor;
  ctx.clearRect(0, 0, 100, 100);
  ctx.fillStyle = tankFillColor;
  ctx.fillRect(
    tankX,
    tankY,
    tankDimensions.width * factor,
    tankDimensions.height * factor
  );

  ctx.fillStyle = tankFillColor;
  ctx.beginPath();
  ctx.arc(
    tankX + (tankDimensions.width * factor) / 2,
    tankY,
    (tankDimensions.height * factor) / 2,
    0,
    2 * Math.PI
  );
  ctx.fill();

  const { startingPoint, endingPoint } = calculateTurretEndpoints({
    tankPosition: [tankX, tankY],
    turretAngle: turretAngle,
    factor,
  });
  ctx.beginPath();
  ctx.moveTo(...startingPoint);
  ctx.lineTo(...endingPoint);
  ctx.strokeStyle = tankFillColor;
  ctx.lineWidth = 3 * factor;
  ctx.stroke();
  ctx.closePath();
};

export const drawTanks = (
  ctx: CanvasRenderingContext2D,
  customProps: { tanks: Tank[] }
): void => {
  const { tanks } = customProps;
  ctx?.clearRect(0, 0, canvasConstants.width, canvasConstants.height);
  tanks?.forEach((tank) => drawTank(ctx, tank));
};

export const getSelectedActionData = (
  selectedAction: string,
  availableActions: Action[]
): Action | undefined => {
  return availableActions?.find((action) => action.name === selectedAction);
};

export const animateTankDriving = (
  ctx: CanvasRenderingContext2D,
  customProps: {
    tanks: Tank[];
    tank: Tank;
    tankInd: number;
    topography: number[][];
    dispatch: Function;
  }
): void => {
  const { dispatch, tank, tankInd, topography } = customProps;
  const { driveAnimationSpeed } = environmentConstants;
  drawTanks(ctx, customProps);
  const position = tank.position;
  const currX = uncenterTank(position)[0];
  const uncenteredTarget = tank.targetX + tankDimensions.width / 2;
  const driveDirection = uncenteredTarget - currX > 0 ? 1 : -1;
  let newX;
  if (Math.abs(uncenteredTarget - currX) < driveAnimationSpeed) {
    newX = uncenteredTarget;
  } else {
    newX = currX + driveDirection * driveAnimationSpeed;
  }
  const newY = getTankY({ topography, tankX: newX });
  const newPosition = centerTank([newX, newY]);
  dispatch(updateTankPosition({ newPosition, tankInd }));
  ctx?.stroke();
};

export const shouldCancelDriveAnimation = ({
  tank,
}: {
  tank: Tank;
}): boolean => {
  const { targetX, position } = tank;
  const currX = position[0];

  const outOfBounds = currX > canvasConstants.width || currX < 0;

  const atTarget = targetX - currX === 0;

  return outOfBounds || atTarget;
};

export const shouldCancelFallAnimation = ({
  tanks,
}: {
  tanks: Tank[];
}): boolean => {
  return tanks.every((tank) => {
    return !tank.targetY || tank.position[1] >= tank.targetY;
  });
};

export const cancelTankAnimationAndAdvanceTurn = ({
  dispatch,
  tankInd,
  tanks,
}: {
  dispatch: Function;
  tankInd: number;
  tanks: Tank[];
}) => {
  dispatch(cancelTanksAnimating());
  advancePlayerTurn({ dispatch, tankInd, tanks });
};

export const cancelTankAnimation = ({
  dispatch,
}: {
  dispatch: Function;
}): void => {
  dispatch(cancelTanksAnimating());
};

export const startTanksFalling = ({
  topography,
  tanks,
  dispatch,
}: {
  tanks: Tank[];
  topography: Tuple[];
  dispatch: Function;
}): void => {
  let tanksWillFall = false;
  let newYValues = new Array(tanks.length).fill(null);
  for (let i = 0; i < tanks.length; i++) {
    let [currX, currY] = tanks[i].position;
    const centerX = currX + tankDimensions.width / 2;
    const bottomOfTankY = currY + tankDimensions.height;
    const topoPosition = setOnTopography({
      topography,
      point: [centerX, currY],
    });

    if (topoPosition != null && topoPosition[1] > bottomOfTankY) {
      tanksWillFall = true;
      newYValues[i] = topoPosition[1] - tankDimensions.height;
    }
  }

  if (tanksWillFall) {
    dispatch(setTanksFalling(newYValues));
  }
};

export const animateTanksFalling = (
  ctx: CanvasRenderingContext2D,
  customProps: {
    tanks: Tank[];
    topography: number[][];
    dispatch: Function;
  }
): void => {
  const { dispatch, tanks } = customProps;
  const { fallAnimationSpeed } = environmentConstants;
  drawTanks(ctx, customProps);

  for (let i in tanks) {
    const tank = tanks[i];
    if (!tank.targetY || tank.targetY === tank.position[1]) continue;
    let newTankY = tank.position[1];
    if (Math.abs(tank.position[1] - tank.targetY) < fallAnimationSpeed) {
      newTankY = tank.targetY;
    } else if (tank.position[1] < tank.targetY) {
      newTankY = tank.position[1] + fallAnimationSpeed;
    }
    dispatch(
      updateTankPosition({
        newPosition: [tank.position[0], newTankY],
        tankInd: i,
      })
    );
  }

  // const position = tank.position;
  // const currX = uncenterTank(position)[0];
  // const uncenteredTarget = tank.targetX + tankDimensions.width / 2;
  // const driveDirection = uncenteredTarget - currX > 0 ? 1 : -1;
  // let newX;
  // if (Math.abs(uncenteredTarget - currX) < driveAnimationSpeed) {
  //   newX = uncenteredTarget;
  // } else {
  //   newX = currX + driveDirection * driveAnimationSpeed;
  // }
  // const newY = getTankY({ topography, tankX: newX });
  // const newPosition = centerTank([newX, newY]);
  // dispatch(updateTankPosition({ newPosition, tankInd }));
  ctx?.stroke();
};
