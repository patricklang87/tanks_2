import "../../../css/controlPanel.css";
import Shields from "./Shields";
import ShotControls from "./ShotControls";
import DriveControls from "./DriveControls";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentTankSelectedAction,
  selectCurrentTank,
} from "../../../redux/playersRedux";
import { getSelectedActionData } from "../tanks/tanksProps";
import { selectProjectileAnimating } from "../../../redux/projectileRedux";
import { actions } from "../../../constants";
import { launchProjectile } from "../gameControls";
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

    const animationsExecuting = useSelector(selectProjectileAnimating)
  // const animationStatement = getAnimationStatement(gameState);

  const selectedAction = getSelectedActionData(
    tank.selectedAction,
    tank.availableActions
  );

  const noRoundsRemain =
    selectedAction.rounds === 0 && selectedAction.type === "PROJECTILE";

  return (
    <div
    className="control-panel-container"
    >
      <div className="row control-panel">
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
              animationsExecuting ||
              noRoundsRemain
            }
            onClick={() => {
              dispatch(() => launchProjectile({dispatch, tank}))
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
