export const getSelectedActionData = (selectedAction, availableActions) => {
    return (availableActions.find((action) => action.name === selectedAction) || {});
};
