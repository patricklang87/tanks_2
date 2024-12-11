import { useState } from "react";
import { initiateGame } from "../gameDisplay/gameControls";
import { useAppDispatch } from "../../redux/hooks";
import { tankColor } from "../../constants";

const StartScreen = () => {
  const dispatch = useAppDispatch();
  const [playerCount, setPlayerCount] = useState(2);
  const maxPlayerCount = tankColor.length;

  const invalidPlayerCount = playerCount < 2 || playerCount > maxPlayerCount;

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

      <button
        disabled={invalidPlayerCount}
        onClick={() => initiateGame({ dispatch, playerCount })}
      >
        Start Game
      </button>

      {invalidPlayerCount && (
        <p>Number of Players must be between 2 and {maxPlayerCount}.</p>
      )}
    </>
  );
};

export default StartScreen;
