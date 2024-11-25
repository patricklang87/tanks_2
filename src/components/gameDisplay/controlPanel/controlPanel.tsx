import "../../../css/controlPanel.css";
import Shields from "./shields";
import ShotControls from "./shotControls";
import DriveControls from "./driveControls";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setCurrentTankSelectedAction,
  selectCurrentTank,
  selectCurrentPlayerIndex,
} from "../../../redux/playersRedux";
import { getSelectedActionData } from "../tanks/tanksProps";
import { selectProjectileAnimating } from "../../../redux/projectileRedux";
import { actions } from "../../../constants";
import { launchProjectile, driveTank } from "../gameControls";
// import { getAnimationStatement } from "./playDashboardHooks";

const ControlSection = () => {
  const dispatch = useAppDispatch();
  const tank = useAppSelector(selectCurrentTank);
  const selectedAction = actions[tank.selectedAction as keyof typeof actions];
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
        <option defaultValue={selectedAction.displayName}>
          {selectedAction.displayName}
        </option>
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
  const dispatch = useAppDispatch();
  const tank = useAppSelector(selectCurrentTank);
  const currentPlayerIndex = useAppSelector(selectCurrentPlayerIndex);

  const animationsExecuting = useAppSelector(selectProjectileAnimating);
  // const animationStatement = getAnimationStatement(gameState);

  const selectedAction = getSelectedActionData(
    tank.selectedAction,
    tank.availableActions
  );

  const noRoundsRemain =
    selectedAction?.rounds === 0 && selectedAction?.type === "PROJECTILE";

  const handleClick = () => {
    if (selectedAction?.type === "PROJECTILE") {
      dispatch(() => launchProjectile({ dispatch, tank }));
    }
    if (selectedAction?.type === "DRIVE") {
      driveTank({tank, tankInd: currentPlayerIndex, dispatch })
    }
  }

  return (
    <div className="control-panel-container">
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
            disabled={animationsExecuting || noRoundsRemain}
            onClick={handleClick}
          >
            {selectedAction?.type === "DRIVE" ? "Drive!" : "Fire!"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
