export const getSelectedActionData = (selectedAction, availableActions) => {
    return (availableActions.find((action) => action.name === selectedAction) || { damage: 0, rounds: 0 });
};
