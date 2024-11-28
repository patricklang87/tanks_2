import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { initiateGame } from "../gameDisplay/gameControls";
import { useAppDispatch } from "../../redux/hooks";
const StartScreen = () => {
    const dispatch = useAppDispatch();
    const [playerCount, setPlayerCount] = useState(2);
    return (_jsxs(_Fragment, { children: [_jsx("h1", { className: "title-card", children: "Tanks fer Nuthin'!" }), _jsxs("div", { "data-mdb-input-init": true, className: "form-outline", children: [_jsx("input", { type: "number", defaultValue: playerCount, max: 4, min: 2, id: "playerCount", className: "form-control", onChange: (e) => setPlayerCount(Number(e.target.value)) }), _jsx("label", { className: "form-label", htmlFor: "playerCount", children: "Number of Players" })] }), _jsx("button", { onClick: () => initiateGame({ dispatch, playerCount }), children: "Start Game" })] }));
};
export default StartScreen;
