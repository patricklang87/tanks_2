import { Action } from "../types";

export const getSelectedActionData = (
  selectedAction: string,
  availableActions: Action[]
): Action | {damage: number} => {
  return (
    availableActions.find((action) => action.name === selectedAction) || {damage: 0}
  );
};
