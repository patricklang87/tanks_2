import { Tuple } from "../types";

export const getYForXInLine = ({
  point1,
  point2,
  currentX,
}: {
  point1: Tuple;
  point2: Tuple;
  currentX: number;
}): number => {
  const slope = getSlopeOfLine({ point1, point2 });
  const yIntercept = getYInterceptForLine({ slope, point: point1 });
  return slope * currentX + yIntercept;
};

export const getYInterceptForLine = ({
  slope,
  point,
}: {
  slope: number;
  point: Tuple;
}): number => {
  const [xValue, yValue] = point;
  return yValue - slope * xValue;
};

export const getSlopeOfLine = ({
  point1,
  point2,
}: {
  point1: Tuple;
  point2: Tuple;
}): number => {
  return (point2[1] - point1[1]) / (point2[0] - point1[0]);
};
