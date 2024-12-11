export type Action = {
  name: string;
  displayName: string;
  damage?: number;
  type: string;
  rounds?: number | string;
  fuel?: number;
  explosionColor?: number[];
};

export type Tank = {
  turretAngle: number;
  shotPower: number;
  driveDistance: number;
  shields: number;
  position: Tuple;
  targetX: number;
  targetY: number | null;
  tankDriveAnimationExecuting: boolean;
  localColor: number[];
  currentColor: number[];
  tankFallAnimationExecuting: boolean;
  fuel: number;
  selectedAction: string;
  availableActions: Action[];
  directlyStruck: boolean;
};

export type Tuple = [number, number];

export type NullTuple = [null, null];

export type Cloud = { point: Tuple; size: number; cloudColor?: string; };

export type ColorScheme = {
  skyColor: string;
  landscapeStrokeStyle: string;
  landscapeFillStyle: string;
  cloudColor: string;
}
