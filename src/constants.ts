import { Action, ColorScheme } from "./types";

export const canvasConstants: { width: number; height: number } = {
  width: 1400,
  height: 600,
};

export const designConstants: {
  landscapeStrokeWidth: number;
  destroyedTankColor: number[];
  devGridBigLineColor: string;
  devGridSmallLineColor: string;
  devGridBigLineWidth: number;
  devGridSmallLineWidth: number;
} = {
  landscapeStrokeWidth: 8,
  destroyedTankColor: [153, 117, 112],
  devGridBigLineColor: "red",
  devGridSmallLineColor: "grey",
  devGridBigLineWidth: 2,
  devGridSmallLineWidth: 1,
};

export const colorSchemes : {
  dayColors: ColorScheme;
  duskColors: ColorScheme;
} = {
    dayColors: {
      skyColor: "skyblue",
      landscapeStrokeStyle: "darkgreen",
      landscapeFillStyle: "lightgreen",
      cloudColor: "white",
    },
    duskColors: {
      skyColor: "#0f013b",
      landscapeStrokeStyle: "#016308",
      landscapeFillStyle: "#013b2c",
      cloudColor: "hotpink",
    }
}

export const topographyConstants: {
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

export const environmentConstants: {
  gravity: number;
  shotSlowingFactor: number;
  driveAnimationSpeed: number;
  fallAnimationSpeed: number;
  explosionRate: number;
} = {
  gravity: 0.5,
  shotSlowingFactor: 0.3,
  driveAnimationSpeed: 3,
  fallAnimationSpeed: 3,
  explosionRate: 0.5,
};

export const tankDimensions: {
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

export const actions: {
  standardShot: Action;
  drive: Action;
  steelShotput: Action;
  begemot: Action;
} = {
  standardShot: {
    name: "standardShot",
    displayName: "Standard Shot",
    damage: 20,
    type: "PROJECTILE",
    rounds: "Infinite",
    explosionColor: [241, 90, 34, 1],
  },
  drive: { name: "drive", displayName: "Drive", fuel: 1, type: "DRIVE" },
  steelShotput: {
    name: "steelShotput",
    displayName: "Steel Shotput",
    damage: 35,
    type: "PROJECTILE",
    rounds: 3,
    explosionColor: [241, 90, 34, 1],
  },
  begemot: {
    name: "begemot",
    displayName: "Begemot",
    damage: 70,
    type: "PROJECTILE",
    rounds: 1,
    explosionColor: [241, 90, 34, 1],
  },
};
