import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "../../../css/controlPanel.css";
import Shields from "./shields";
import ShotControls from "./shotControls";
import DriveControls from "./driveControls";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setCurrentTankSelectedAction, selectCurrentTank, selectCurrentPlayerIndex, } from "../../../redux/playersRedux";
import { getSelectedActionData } from "../tanks/tanksProps";
import { selectProjectileAnimating } from "../../../redux/projectileRedux";
import { actions } from "../../../constants";
import { launchProjectile, driveTank } from "../gameControls";
// import { getAnimationStatement } from "./playDashboardHooks";
const ControlSection = () => {
    const dispatch = useAppDispatch();
    const tank = useAppSelector(selectCurrentTank);
    const selectedAction = actions[tank.selectedAction];
    const availableActions = tank.availableActions;
    const availableActionsFiltered = availableActions.filter((action) => action.name !== selectedAction.name);
    return (_jsxs(_Fragment, { children: [" ", _jsxs("select", { onChange: (e) => dispatch(setCurrentTankSelectedAction(e.target.value)), className: "form-select", "aria-label": "Select action", children: [_jsx("option", { defaultValue: selectedAction.displayName, children: selectedAction.displayName }), availableActionsFiltered.map((action) => {
                        return (_jsx("option", { value: action.name, disabled: action.rounds === 0, children: action.displayName }, action.name));
                    })] }), selectedAction.type === "PROJECTILE" && _jsx(ShotControls, {}), selectedAction.type === "DRIVE" && _jsx(DriveControls, {}), " "] }));
};
const ControlPanel = () => {
    const dispatch = useAppDispatch();
    const tank = useAppSelector(selectCurrentTank);
    const currentPlayerIndex = useAppSelector(selectCurrentPlayerIndex);
    const animationsExecuting = useAppSelector(selectProjectileAnimating);
    // const animationStatement = getAnimationStatement(gameState);
    const selectedAction = getSelectedActionData(tank.selectedAction, tank.availableActions);
    const noRoundsRemain = selectedAction?.rounds === 0 && selectedAction?.type === "PROJECTILE";
    const handleClick = () => {
        if (selectedAction?.type === "PROJECTILE") {
            dispatch(() => launchProjectile({ dispatch, tank }));
        }
        if (selectedAction?.type === "DRIVE") {
            driveTank({ tank, tankInd: currentPlayerIndex, dispatch });
        }
    };
    return (_jsx("div", { className: "control-panel-container", children: _jsxs("div", { className: "row control-panel", children: [_jsx("div", { className: "col-4", children: _jsx(Shields, {}) }), _jsx("div", { className: "col-7", children: _jsx(ControlSection, {}) }), _jsx("div", { className: "col-1", children: _jsx("button", { disabled: animationsExecuting || noRoundsRemain, onClick: handleClick, children: selectedAction?.type === "DRIVE" ? "Drive!" : "Fire!" }) })] }) }));
};
export default ControlPanel;
