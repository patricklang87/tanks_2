import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { initiateGame } from "../gameControls";

export const WinnerPopup = () => {
  const dispatch = useAppDispatch();
  const winner = useAppSelector((state) => state.players.winner);
  
  if (winner != null) {
    return (
      <div className="winner-popup-container">
        <div className="winner-popup">
          {" "}
          <h1>Player {winner + 1} wins!</h1>
          <button onClick={() => initiateGame(dispatch)}>Reset Game</button>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default WinnerPopup;
