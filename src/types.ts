export type Action = {
    name: string;
    displayName: string;
    damage?: number;
    type: string;
    rounds?: number | string;
    fuel?: number;
  }