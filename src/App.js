import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import GameScreen from "./components/gameDisplay/gamescreen/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { initiateGame } from "./components/gameDisplay/gameControls";
import ControlPanel from "./components/gameDisplay/controlPanel/controlPanel";
import { useAppDispatch } from "./redux/hooks";
function App() {
    const dispatch = useAppDispatch();
    initiateGame(dispatch);
    return (_jsxs(_Fragment, { children: [_jsx(GameScreen, {}), _jsx(ControlPanel, {})] }));
}
export default App;
