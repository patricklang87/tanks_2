import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import GameScreen from "./components/gameDisplay/gamescreen";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useInitiateGame } from "./components/gameDisplay/gameControls";
import ControlPanel from "./components/gameDisplay/controlPanel/controlPanel";
function App() {
    useInitiateGame();
    return (_jsxs(_Fragment, { children: [_jsx(GameScreen, {}), _jsx(ControlPanel, {})] }));
}
export default App;
