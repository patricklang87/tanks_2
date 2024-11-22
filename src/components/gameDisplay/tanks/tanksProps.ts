import {
  tankDimensions,
  canvasConstants,
  tankColor,
  designConstants,
  actions,
} from "../../../constants";
import { arrayToRgba } from "../../../utils/colors";
import { getCoordinatesOnCircle } from "../../../utils/angleManipulation";
import { Tank } from "../../../types";
import { Action } from "../../../types";

export const generateTankPositions = ({
  topography,
  numberOfTanks = 2,
}: {
  topography: number[][];
  numberOfTanks: number;
}): number[][] => {
  const rangeWidth = canvasConstants.width / numberOfTanks;
  const rangeStarts: number[] = [];
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

export const centerTank = (uncenteredPoint: number[]): number[] => {
  const { width: tankWidth, height: tankHeight } = tankDimensions;
  const [tankX, tankY] = uncenteredPoint;
  return [tankX - tankWidth / 2, tankY - tankHeight];
};

export const calculateTurretEndpoints = ({
  tankPosition,
  turretAngle,
}: {
  tankPosition: number[];
  turretAngle: number;
}): { startingPoint: [number, number]; endingPoint: [number, number] } => {
  const [tankX, tankY] = tankPosition;
  const { turretLength, width: tankWidth } = tankDimensions;
  const turretStartingX = tankX + tankWidth / 2;
  const turretStartingY = tankY;
  const turretEnding = getCoordinatesOnCircle({
    center: [turretStartingX, turretStartingY],
    radius: turretLength,
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
  tankPosition: number[];
}): Tank => {
  return {
    turretAngle: -90,
    shotPower: 50,
    driveDistance: 0,
    shields: 100,
    position: tankPosition,
    targetPosition: tankPosition,
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
    ],
  };
};

const drawTank = (
  ctx: CanvasRenderingContext2D,
  customProps: {
    shields: number;
    position: number[];
    currentColor: string;
    turretAngle: number;
  }
): void => {
  const { shields, position, currentColor, turretAngle } = customProps;
  const [tankX, tankY] = position;
  const tankFillColor =
    shields > 0 ? currentColor : designConstants.destroyedTankColor;
  ctx.fillStyle = tankFillColor;
  ctx.fillRect(tankX, tankY, tankDimensions.width, tankDimensions.height);

  ctx.fillStyle = tankFillColor;
  ctx.beginPath();
  ctx.arc(
    tankX + tankDimensions.width / 2,
    tankY,
    tankDimensions.height / 2,
    0,
    2 * Math.PI
  );
  ctx.fill();

  const { startingPoint, endingPoint } = calculateTurretEndpoints({
    tankPosition: [tankX, tankY],
    turretAngle: turretAngle,
  });
  ctx.beginPath();
  ctx.moveTo(...startingPoint);
  ctx.lineTo(...endingPoint);
  ctx.strokeStyle = tankFillColor;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.closePath();
};

export const drawTanks = (
  ctx: CanvasRenderingContext2D,
  customProps: { tanks: [] }
): void => {
  const { tanks } = customProps;
  ctx?.clearRect(0, 0, canvasConstants.width, canvasConstants.height);
  tanks?.forEach((tank) => drawTank(ctx, tank));
};

export const getSelectedActionData = (
  selectedAction: string,
  availableActions: Action[]
): Action | undefined => {
  return (
    availableActions?.find((action) => action.name === selectedAction) 
  );
};
