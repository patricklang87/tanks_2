import { useState } from "react";
import { initiateGame } from "../gameDisplay/gameControls";
import { useAppDispatch } from "../../redux/hooks";
import { tankColor } from "../../constants";

const StartScreen = () => {
  const dispatch = useAppDispatch();
  const [playerCount, setPlayerCount] = useState(2);
  const maxPlayerCount = tankColor.length;

  return (
    <>
      <h1 className="title-card">Tanks fer Nuthin'!</h1>
      <div data-mdb-input-init className="form-outline">
        <input
          type="number"
          defaultValue={playerCount}
          max={maxPlayerCount}
          min={2}
          id="playerCount"
          className="form-control"
          onChange={(e) => setPlayerCount(Number(e.target.value))}
        />
        <label className="form-label" htmlFor="playerCount">
          Number of Players
        </label>
      </div>

      <button onClick={() => initiateGame({ dispatch, playerCount })}>
        Start Game
      </button>
    </>
  );
};

export default StartScreen;
