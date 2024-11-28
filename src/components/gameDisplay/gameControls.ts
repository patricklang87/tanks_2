import { createInitialTopography } from "./topography/topographyProps";
import {
  topographyConstants,
  canvasConstants,
  tankDimensions,
} from "../../constants";
import { setTopography } from "../../redux/topographyRedux";
import {
  reduceRemainingRounds,
  setInitialPlayerState,
  setTanksAnimating,
  setPlayerTurn,
} from "../../redux/playersRedux";
import {
  setProjectileValues,
  startProjectileAnimating,
} from "../../redux/projectileRedux";
import {
  calculateTurretEndpoints,
  generateTankPositions,
  initiateTank,
} from "./tanks/tanksProps";
import { calculateInitialVelocities } from "./projectile/projectileProps";
import { Tank } from "../../types";
import { activateGame } from "../../redux/gameRedux";

export const initiateGame = ({
  dispatch,
  playerCount,
}: {
  dispatch: Function;
  playerCount: number;
}): void => {
  const { height: canvasHeight, width: canvasWidth } = canvasConstants;

  const initialTopography = createInitialTopography({
    canvasHeight,
    canvasWidth,
    increments: topographyConstants.increments,
    maxVariationCoefficient: topographyConstants.maxVariationCoefficient,
    minHeightCoefficient: topographyConstants.minHeightCoefficient,
    maxHeightCoefficient: topographyConstants.maxHeightCoefficient,
  });

  const tankPositions = generateTankPositions({
    topography: initialTopography,
    numberOfTanks: playerCount,
  });

  const initialTanks = tankPositions.map((tankPosition, index) =>
    initiateTank({ tankPosition, index })
  );
  dispatch(setTopography(initialTopography));
  dispatch(setInitialPlayerState(initialTanks));
  dispatch(activateGame());
};

export const launchProjectile = ({
  dispatch,
  tank,
}: {
  dispatch: Function;
  tank: Tank;
}): void => {
  const { turretAngle, position, shotPower } = tank;
  const { endingPoint } = calculateTurretEndpoints({
    turretAngle,
    tankPosition: position,
  });
  const { initialVelocities } = calculateInitialVelocities({
    turretAngle,
    initialVelocity: shotPower,
  });

  dispatch(reduceRemainingRounds());
  dispatch(startProjectileAnimating());
  dispatch(
    setProjectileValues({ position: endingPoint, velocity: initialVelocities })
  );
  dispatch(startProjectileAnimating());
};

export const driveTank = ({
  dispatch,
  tank,
  tankInd,
}: {
  dispatch: Function;
  tank: Tank;
  tankInd: number;
}): void => {
  const { position, driveDistance } = tank;
  const currX = position[0];
  let targetX = currX + driveDistance;
  if (targetX < 0) targetX = 0;
  if (targetX > canvasConstants.width - tankDimensions.width) {
    targetX = canvasConstants.width - tankDimensions.width;
  }
  dispatch(setTanksAnimating({ tankInd, targetX }));
};

export const advancePlayerTurn = ({
  dispatch,
  tankInd,
  tanks,
}: {
  dispatch: Function;
  tankInd: number;
  tanks: Tank[];
}): void => {
  let nextPlayer = tankInd + 1;
  if (nextPlayer > tanks.length - 1) nextPlayer = 0;
  while (tanks[nextPlayer].shields <= 0) {
    nextPlayer++;
    if (nextPlayer > tanks.length - 1) nextPlayer = 0;
    if (nextPlayer === tankInd) break;
  }
  dispatch(setPlayerTurn(nextPlayer));
};
