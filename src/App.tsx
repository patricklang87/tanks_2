import GameScreen from "./components/gameDisplay/gamescreen/index";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { useInitiateGame } from "./components/gameDisplay/gameControls";
import ControlPanel from "./components/gameDisplay/controlPanel/controlPanel";

function App() {
  useInitiateGame();

  return (
    <>
      <GameScreen />
      <ControlPanel />
    </>
  );
}

export default App;
