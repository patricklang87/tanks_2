import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { initiateGame } from "../gameDisplay/gameControls";
import { useAppDispatch } from "../../redux/hooks";
const StartScreen = () => {
    const dispatch = useAppDispatch();
    return (_jsxs(_Fragment, { children: [_jsx("h1", { children: "Tanks fer Nuthin'!" }), _jsx("button", { onClick: () => initiateGame(dispatch), children: "Start Game" })] }));
};
export default StartScreen;
