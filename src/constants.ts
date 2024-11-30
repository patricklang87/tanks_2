import { Action } from "./types";

export const canvasConstants: { width: number; height: number } = {
  width: 1400,
  height: 600,
};

export const designConstants: {
  skyColor: string;
  landscapeStrokeStyle: string;
  landscapeStrokeWidth: number;
  landscapeFillStyle: string;
  destroyedTankColor: string;
} = {
  skyColor: "skyblue",
  landscapeStrokeStyle: "darkgreen",
  landscapeStrokeWidth: 8,
  landscapeFillStyle: "lightgreen",
  destroyedTankColor: "#997570",
};

export const topographyConstants : {
  increments: number;
  maxVariationCoefficient: number;
  minHeightCoefficient: number;
  maxHeightCoefficient: number;
} = {
  increments: 50,
  maxVariationCoefficient: 0.05,
  minHeightCoefficient: 0.2,
  maxHeightCoefficient: 0.8,
};

export const environmentConstants : {
  gravity: number;
  shotSlowingFactor: number;
  driveAnimationSpeed: number;
} = {
  gravity: 0.5,
  shotSlowingFactor: 0.3,
  driveAnimationSpeed: 3,
};

export const tankDimensions : {
  height: number;
  width: number;
  turretLength: number;
} = {
  height: 10,
  width: 20,
  turretLength: 15,
};

export const tankColor: number[][] = [
  [129, 90, 160, 1],
  [223, 242, 102, 1],
  [35, 123, 145, 1],
  [253, 150, 90, 1],
  [0, 148, 84, 1],
  [255, 22, 133, 1],
];

export const actions : {
  standardShot: Action;
  drive: Action;
  steelShotput: Action;
} = {
  standardShot: {
    name: "standardShot",
    displayName: "Standard Shot",
    damage: 20,
    type: "PROJECTILE",
    rounds: "Infinite",
  },
  drive: { name: "drive", displayName: "Drive", fuel: 1, type: "DRIVE" },
  steelShotput: {
    name: "steelShotput",
    displayName: "Steel Shotput",
    damage: 35,
    type: "PROJECTILE",
    rounds: 3,
  },
};
