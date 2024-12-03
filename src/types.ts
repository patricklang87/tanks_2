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
  targetY: number;
  tankDriveAnimationExecuting: boolean;
  localColor: string;
  currentColor: string;
  tankFallAnimationExecuting: boolean;
  fuel: number;
  selectedAction: string;
  availableActions: Action[];
};

export type Tuple = [number, number];

export type NullTuple = [null, null];
