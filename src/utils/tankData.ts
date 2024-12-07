import { Action } from "../types";

export const getSelectedActionData = (
  selectedAction: string,
  availableActions: Action[]
): Action | {damage: number; rounds: number} => {
  return (
    availableActions.find((action) => action.name === selectedAction) || {damage: 0, rounds: 0}
  );
};
