export type Action = {
  name: string;
  displayName: string;
  damage?: number;
  type: string;
  rounds?: number | string;
  fuel?: number;
};

export type Tank = {
  turretAngle: number;
  shotPower: number;
  driveDistance: number;
  shields: number;
  position: [number, number];
  targetX: number;
  tankDriveAnimationExecuting: boolean;
  localColor: string;
  currentColor: string;
  tankFallAnimationExecuting: boolean;
  fuel: number;
  selectedAction: string;
  availableActions: Action[];
};
