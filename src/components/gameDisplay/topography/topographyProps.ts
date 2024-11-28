import { canvasConstants, designConstants } from "../../../constants";
import { getYForXInLine } from "../../../utils/linearEval";
import { Tuple, NullTuple } from "../../../types";

const calculateStartingHeight = ({
  canvasHeight,
  minHeightCoefficient,
  maxHeightCoefficient,
  getStartingHeight,
}: {
  canvasHeight: number;
  minHeightCoefficient: number;
  maxHeightCoefficient: number;
  getStartingHeight: Function;
}): number => {
  const maxHeight: number = canvasHeight * maxHeightCoefficient;
  let startingHeight = getStartingHeight(maxHeight);
  if (startingHeight < minHeightCoefficient * canvasHeight)
    startingHeight = minHeightCoefficient * canvasHeight;
  return startingHeight;
};

const risingFallingValleyFlatOrPeak = (): {
  getStartingHeight: Function;
  getDirection: Function;
} => {
  const indicator = Math.random();
  let returnObject = {
    getStartingHeight: (maxHeight: number): number =>
      Math.min(Math.random(), 0.3) * maxHeight,
    getDirection: () => 0.5,
  };
  switch (true) {
    case 1 >= indicator && indicator > 0.8:
      // rising
      return {
        getStartingHeight: (maxHeight: number): number =>
          Math.min(Math.random(), 0.1) * maxHeight,
        getDirection: () => 0.3,
      };
    case 0.8 >= indicator && indicator > 0.6:
      //falling
      return {
        getStartingHeight: (maxHeight: number): number =>
          Math.max(Math.random(), 0.9) * maxHeight,
        getDirection: () => 0.7,
      };
    case 0.6 >= indicator && indicator > 0.4:
      // valley
      return {
        getStartingHeight: (maxHeight: number): number =>
          Math.max(Math.random(), 0.9) * maxHeight,
        getDirection: (xLocation: number, canvasWidth: number): number => {
          return xLocation > canvasWidth / 2 ? 0.1 : 0.9;
        },
      };
    case 0.4 >= indicator && indicator > 0.2:
      // peak
      return {
        getStartingHeight: (maxHeight: number): number =>
          Math.min(Math.random(), 0.1) * maxHeight,
        getDirection: (xLocation: number, canvasWidth: number): number => {
          return xLocation > canvasWidth / 2 ? 0.9 : 0.1;
        },
      };
    default:
      // flat
      return returnObject;
  }
};

export const createInitialTopography = ({
  canvasHeight,
  canvasWidth,
  increments,
  maxVariationCoefficient,
  minHeightCoefficient,
  maxHeightCoefficient,
}: {
  canvasHeight: number;
  canvasWidth: number;
  increments: number;
  maxVariationCoefficient: number;
  minHeightCoefficient: number;
  maxHeightCoefficient: number;
}): number[][] => {
  const points: Tuple[] = [];

  const { getDirection, getStartingHeight } = risingFallingValleyFlatOrPeak();

  const maxHeight = canvasHeight * maxHeightCoefficient;
  const incrementWidth = canvasWidth / increments;
  points.push([
    0,
    calculateStartingHeight({
      canvasHeight,
      minHeightCoefficient,
      maxHeightCoefficient,
      getStartingHeight,
    }),
  ]);
  let incrementCount = 1;
  while (incrementCount <= increments) {
    const previousX = points[incrementCount - 1][0];
    const previousY = points[incrementCount - 1][1];
    const currentX = previousX + incrementWidth;
    const negativeOrPositive =
      Math.random() > getDirection(currentX, canvasWidth) ? 1 : -1;
    const variation =
      negativeOrPositive *
      canvasHeight *
      maxVariationCoefficient *
      Math.random();
    let currentY = previousY + variation;
    if (currentY > maxHeight) currentY = maxHeight;
    if (currentY < 0) currentY = 0;
    points.push([currentX, currentY]);
    incrementCount++;
  }

  return points.map((point) => [point[0], canvasHeight - point[1]]);
};

export const drawTopography = (
  ctx: CanvasRenderingContext2D,
  customProps: { topography: Tuple[] }
): void => {
  const { topography } = customProps;
  ctx.clearRect(0, 0, canvasConstants.width, canvasConstants.height);
  ctx.beginPath();
  topography?.forEach((point, index) => {
    const positionX = point[0];
    const positionY = point[1];

    if (index === 0) {
      ctx.moveTo(positionX, positionY);
    } else {
      ctx.lineTo(positionX, positionY);
    }
  });
  ctx.lineTo(
    canvasConstants.width,
    canvasConstants.height + designConstants.landscapeStrokeWidth
  );
  ctx.lineTo(0, canvasConstants.height);
  ctx.strokeStyle = designConstants.landscapeStrokeStyle;
  ctx.lineWidth = designConstants.landscapeStrokeWidth;
  ctx.stroke();
  ctx.fillStyle = designConstants.landscapeFillStyle;
  ctx.fill();
  ctx.closePath();
};

export const checkForGroundCollision = ({
  topography,
  point,
}: {
  topography: Tuple[];
  point: Tuple | NullTuple;
}): Tuple | null => {
  if (point[0] === null) return null;
  const currentSectorEndIndex = topography.findIndex(
    (sector) => sector[0] >= point[0]
  );
  if (currentSectorEndIndex === -1) return null;
  const currentSectorStartIndex = currentSectorEndIndex - 1;
  const startPoint = topography[currentSectorStartIndex];
  const endPoint = topography[currentSectorEndIndex];

  const topographyLineY = getYForXInLine({
    point1: startPoint,
    point2: endPoint,
    currentX: point[0],
  });
  if (topographyLineY < point[1]) {
    return [point[0], topographyLineY];
  }
  return null;
};
