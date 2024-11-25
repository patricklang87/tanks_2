import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { initiateGame } from "../gameControls";
export const WinnerPopup = () => {
    const dispatch = useAppDispatch();
    const winner = useAppSelector((state) => state.players.winner);
    if (winner != null) {
        return (_jsx("div", { className: "winner-popup-container", children: _jsxs("div", { className: "winner-popup", children: [" ", _jsxs("h1", { children: ["Player ", winner + 1, " wins!"] }), _jsx("button", { onClick: () => initiateGame(dispatch), children: "Reset Game" })] }) }));
    }
    else {
        return _jsx(_Fragment, {});
    }
};
export default WinnerPopup;
