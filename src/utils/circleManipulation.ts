import { Tuple } from "@reduxjs/toolkit";
import { degreesToRadians } from "./angleManipulation";

export const getCoordinatesOnCircle = ({
  center,
  radius,
  angle,
}: {
  center: Tuple;
  radius: number;
  angle: number;
}) => {
  const [x, y] = center;
  const xPosition = x + radius * Math.cos(degreesToRadians(angle));
  const yPosition = y + radius * Math.sin(degreesToRadians(angle));
  return [xPosition, yPosition];
};
