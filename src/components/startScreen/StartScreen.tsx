import { initiateGame } from "../gameDisplay/gameControls";
import { useAppDispatch } from "../../redux/hooks";

const StartScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <h1>Tanks fer Nuthin'!</h1>

      <button onClick={() => initiateGame(dispatch)}>Start Game</button>
    </>
  );
};

export default StartScreen;
