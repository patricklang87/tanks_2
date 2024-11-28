import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { useAppSelector } from "./redux/hooks";
import GameDisplay from "./components/gameDisplay/GameDisplay";
import StartScreen from "./components/startScreen/StartScreen";

function App() {
  const gameActive = useAppSelector(state => state.game.activeGame);
  return (
    <>
      {gameActive ?  <GameDisplay /> : <StartScreen />}
    </>
  );
}

export default App;
