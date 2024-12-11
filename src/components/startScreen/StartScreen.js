import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { initiateGame } from "../gameDisplay/gameControls";
import { useAppDispatch } from "../../redux/hooks";
import { tankColor } from "../../constants";
const StartScreen = () => {
    const dispatch = useAppDispatch();
    const [playerCount, setPlayerCount] = useState(2);
    const maxPlayerCount = tankColor.length;
    const invalidPlayerCount = playerCount < 2 || playerCount > maxPlayerCount;
    return (_jsxs(_Fragment, { children: [_jsx("h1", { className: "title-card", children: "Tanks fer Nuthin'!" }), _jsxs("div", { "data-mdb-input-init": true, className: "form-outline", children: [_jsx("input", { type: "number", defaultValue: playerCount, max: maxPlayerCount, min: 2, id: "playerCount", className: "form-control", onChange: (e) => setPlayerCount(Number(e.target.value)) }), _jsx("label", { className: "form-label", htmlFor: "playerCount", children: "Number of Players" })] }), _jsx("button", { disabled: invalidPlayerCount, onClick: () => initiateGame({ dispatch, playerCount }), children: "Start Game" }), invalidPlayerCount && (_jsxs("p", { children: ["Number of Players must be between 2 and ", maxPlayerCount, "."] }))] }));
};
export default StartScreen;
