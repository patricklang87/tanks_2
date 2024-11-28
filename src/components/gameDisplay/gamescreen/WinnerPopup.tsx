import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { selectTanks } from "../../../redux/playersRedux";
import { initiateGame } from "../gameControls";

export const WinnerPopup = () => {
  const dispatch = useAppDispatch();
  const winner = useAppSelector((state) => state.players.winner);
  const playerCount = useAppSelector(selectTanks).length;
  
  if (winner != null) {
    return (
      <div className="winner-popup-container">
        <div className="winner-popup">
          {" "}
          <h1>Player {winner + 1} wins!</h1>
          <button onClick={() => initiateGame({dispatch, playerCount})}>Reset Game</button>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default WinnerPopup;
