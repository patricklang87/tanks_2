import { useState } from "react";
import { canvasConstants, environmentConstants } from "../../../constants";
import {
  setProjectileValues,
  clearProjectileValues,
} from "../../../redux/projectileRedux";
import { advancePlayerTurn } from "../../../redux/playersRedux";
import { degreesToRadians } from "../../../utils/angleManipulation";

export const animateProjectile = (ctx, customProps) => {
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

export const shouldCancelProjectileAnimation = (customProps) => {
  const { projectilePosition } = customProps;
  const [currX, currY] = projectilePosition;
  const outOfBounds =
    currX > canvasConstants.width ||
    currX < 0 ||
    currY > canvasConstants.height;

  return outOfBounds;
};

export const resetProjectileAnimationAndAdvanceTurn = (customProps) => {
  const { dispatch } = customProps;
  console.log("out of bounds");
  dispatch(advancePlayerTurn());
  dispatch(clearProjectileValues());
};

export const drawCircle = (ctx, circleDims = {}) => {
  const {
    radius,
    strokeStyle = "blue",
    startX,
    startY,
    lineWidth,
    colorFill = "pink",
  } = circleDims;
  ctx?.clearRect(0, 0, canvasConstants.width, canvasConstants.height);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;

  ctx?.beginPath();
  ctx?.arc(startX, startY, radius, 0, Math.PI * 2, true);
  ctx?.stroke();
  if (colorFill) {
    ctx.fillStyle = colorFill;
    ctx.fill();
  }
};

export const calculateNewProjectileValues = (props) => {
  const {
    currX,
    currY,
    currVelX,
    currVelY,
    currAccelX = 0,
    currAccelY = environmentConstants.gravity,
  } = props;
  const newPosX = currX + currVelX;
  const newPosY = currY + currVelY;
  const newVelX = currVelX + currAccelX;
  const newVelY = currVelY + currAccelY;
  return { position: [newPosX, newPosY], velocity: [newVelX, newVelY] };
};

export const calculateInitialVelocities = (props) => {
  const { turretAngle, initialVelocity } = props;
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

const getLaunchAngle = (props) => {
  const { turretAngle } = props;
  let turretAngleAgainstHorizon;
  if (turretAngle <= 0 && turretAngle >= -90)
    turretAngleAgainstHorizon = turretAngle * -1;
  if (turretAngle < -90 && turretAngle >= -180)
    turretAngleAgainstHorizon = turretAngle;
  return turretAngleAgainstHorizon;
};
