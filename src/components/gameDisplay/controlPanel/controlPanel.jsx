import Shields from "./Shields";
import ShotControls from "./ShotControls";
import DriveControls from "./DriveControls";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentTankSelectedAction,
  selectCurrentTank,
  advancePlayerTurn,
} from "../../../redux/playersRedux";
import { getSelectedActionData } from "../tanks/tanksProps";
import { actions } from "../../../constants";
// import { animationsAreExecuting } from "./playDashboardHooks";
// import { getAnimationStatement } from "./playDashboardHooks";

const ControlSection = () => {
  const dispatch = useDispatch();
  const tank = useSelector(selectCurrentTank);
  const selectedAction = actions[tank.selectedAction];
  const availableActions = tank.availableActions;
  const availableActionsFiltered = availableActions.filter(
    (action) => action.name !== selectedAction.name
  );

  return (
    <>
      {" "}
      <select
        onChange={(e) => dispatch(setCurrentTankSelectedAction(e.target.value))}
        className="form-select"
        aria-label="Select action"
      >
        <option defaultValue>{selectedAction.displayName}</option>
        {availableActionsFiltered.map((action) => {
          return (
            <option
              key={action.name}
              value={action.name}
              disabled={action.rounds === 0}
            >
              {action.displayName}
            </option>
          );
        })}
      </select>
      {selectedAction.type === "PROJECTILE" && <ShotControls />}
      {selectedAction.type === "DRIVE" && <DriveControls />}{" "}
    </>
  );
};

const ControlPanel = () => {
  const dispatch = useDispatch();
  const tank = useSelector(selectCurrentTank);
  const currentPlayerIndex = useSelector(state => state.players.currentPlayerIndex)

  //   const animationsExecuting = animationsAreExecuting(gameState);
  // const animationStatement = getAnimationStatement(gameState);

  const selectedAction = getSelectedActionData(
    tank.selectedAction,
    tank.availableActions
  );

  const noRoundsRemain =
    selectedAction.rounds === 0 && selectedAction.type === "PROJECTILE";

  return (
    <div style={{ backgroundColor: "lightgrey", padding: "10px" }}>
      <div className="row">
        <div className="col-4">
          <Shields />
        </div>
        <div className="col-7">
          {/* {animationsExecuting && <p>&quot;{animationStatement}&quot;</p>}
          {!animationsExecuting && ( */}
          <ControlSection />
          {/* )} */}
        </div>

        <div className="col-1">
          <button
            disabled={
            //   animationsExecuting ||
              noRoundsRemain
            }
            onClick={() => {
                console.log("clicked fire")
                console.log("currentPlayerIndex", currentPlayerIndex)
                dispatch(advancePlayerTurn())
            }}
          >
            {selectedAction.type === "DRIVE" ? "Drive!" : "Fire!"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
