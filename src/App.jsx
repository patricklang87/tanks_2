import GameScreen from "./components/gameDisplay/gamescreen";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { useInitiateGame } from "./components/gameDisplay/gameControls";
import ControlPanel from "./components/gameDisplay/controlPanel/ControlPanel";

function App() {
  useInitiateGame();

  return (
    <>
      <h1>Tanks a million!</h1>
      <ControlPanel />
      <GameScreen />
    </>
  );
}

export default App;
