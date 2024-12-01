import { Tuple, NullTuple } from "../types";
import { getYForXInLine } from "./linearEval";

export const setOnTopography = ({
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

  return [point[0], topographyLineY];
};
