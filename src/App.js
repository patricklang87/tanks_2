import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useAppSelector } from "./redux/hooks";
import GameDisplay from "./components/gameDisplay/GameDisplay";
import StartScreen from "./components/startScreen/StartScreen";
function App() {
    const gameActive = useAppSelector(state => state.game.activeGame);
    return (_jsx(_Fragment, { children: gameActive ? _jsx(GameDisplay, {}) : _jsx(StartScreen, {}) }));
}
export default App;
