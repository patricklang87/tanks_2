import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from "react";
import Form from "react-bootstrap/Form";
import { setCurrentTankDriveDistance, selectCurrentTank, } from "../../../redux/playersRedux";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
const DriveControls = () => {
    const dispatch = useAppDispatch();
    const driveInputId = useId();
    const currentTank = useAppSelector(selectCurrentTank);
    const { driveDistance } = currentTank;
    return (_jsx("div", { className: "align-items-center", children: _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-2", children: _jsx(Form.Label, { children: "Drive to" }) }), _jsx("div", { className: "col-1", children: _jsx("span", { children: driveDistance }) }), _jsxs("div", { className: "col-9", children: [" ", _jsx(Form.Range, { value: driveDistance, onChange: (e) => dispatch(setCurrentTankDriveDistance(e.target.value)), id: driveInputId, name: "driveDistance", min: -150, max: 150 })] })] }) }));
};
export default DriveControls;
