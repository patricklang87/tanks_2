import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from "react";
import Form from "react-bootstrap/Form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectCurrentTank, setCurrentTankTurretAngle, setCurrentTankShotPower, } from "../../../redux/playersRedux";
import { getSelectedActionData } from "../tanks/tanksProps";
const ShotControls = () => {
    const dispatch = useAppDispatch();
    const currentTank = useAppSelector(selectCurrentTank);
    const turretAngleInputId = useId();
    const shotPowerIndexId = useId();
    const { turretAngle, shotPower } = currentTank;
    const selectedActionData = getSelectedActionData(currentTank.selectedAction, currentTank.availableActions);
    const remainingRounds = selectedActionData?.rounds;
    return (_jsxs("div", { className: "align-items-center", children: [_jsxs("div", { className: "row", children: [_jsx("div", { className: "col-2", children: _jsx(Form.Label, { children: "Turret Angle" }) }), _jsx("div", { className: "col-1", children: _jsxs("span", { children: [turretAngle + 90, "\u00B0"] }) }), _jsxs("div", { className: "col-9", children: [" ", _jsx(Form.Range, { value: turretAngle + 90, onChange: (e) => dispatch(setCurrentTankTurretAngle(Number(e.target.value) - 90)), id: turretAngleInputId, name: "turretAngle", min: -90, max: 90 })] })] }), _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-2", children: _jsx(Form.Label, { children: "Shot Power" }) }), _jsx("div", { className: "col-1", children: _jsxs("span", { children: [shotPower, "%"] }) }), _jsxs("div", { className: "col-9", children: [" ", _jsx(Form.Range, { value: shotPower, onChange: (e) => dispatch(setCurrentTankShotPower(Number(e.target.value))), id: shotPowerIndexId, name: "shotPower", min: 0, max: 100 })] })] }), _jsx("div", { children: _jsxs("span", { children: ["Rounds: ", remainingRounds] }) })] }));
};
export default ShotControls;
