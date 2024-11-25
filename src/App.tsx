import GameScreen from "./components/gameDisplay/gamescreen/index";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { initiateGame } from "./components/gameDisplay/gameControls";
import ControlPanel from "./components/gameDisplay/controlPanel/controlPanel";
import { useAppDispatch } from "./redux/hooks";

function App() {
  const dispatch = useAppDispatch();
  initiateGame(dispatch);

  return (
    <>
      <GameScreen />
      <ControlPanel />
    </>
  );
}

export default App;
