import { Action } from "../types";

export const getSelectedActionData = (
  selectedAction: string,
  availableActions: Action[]
): Action | {} => {
  return (
    availableActions.find((action) => action.name === selectedAction) || {}
  );
};
