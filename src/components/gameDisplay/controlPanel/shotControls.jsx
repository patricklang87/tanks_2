import { useId } from "react";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentTank,
  setCurrentTankTurretAngle,
  setCurrentTankShotPower,
} from "../../../redux/playersRedux";
import { getSelectedActionData } from "../tanks/tanksProps";

const ShotControls = () => {
  const dispatch = useDispatch();
  const currentTank = useSelector(selectCurrentTank);

  const turretAngleInputId = useId();
  const shotPowerIndexId = useId();
  const { turretAngle, shotPower } = currentTank;
  const selectedActionData = getSelectedActionData(
    currentTank.selectedAction,
    currentTank.availableActions
  );
  const remainingRounds = selectedActionData.rounds;
  return (
    <div className="align-items-center">
      <div className="row">
        <div className="col-2">
          <Form.Label>Turret Angle</Form.Label>
        </div>
        <div className="col-1">
          <span>{turretAngle + 90}&deg;</span>
        </div>
        <div className="col-9">
          {" "}
          <Form.Range
            value={turretAngle + 90}
            onChange={(e) =>
              dispatch(setCurrentTankTurretAngle(e.target.value - 90))
            }
            id={turretAngleInputId}
            name="turretAngle"
            min={-90}
            max={90}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <Form.Label>Shot Power</Form.Label>
        </div>
        <div className="col-1">
          <span>{shotPower}%</span>
        </div>
        <div className="col-9">
          {" "}
          <Form.Range
            value={shotPower}
            onChange={(e) => dispatch(setCurrentTankShotPower(e.target.value))}
            id={shotPowerIndexId}
            name="shotPower"
            min={0}
            max={100}
            type="number"
          />
        </div>
      </div>
      <div>
        <span>Rounds: {remainingRounds}</span>
      </div>
    </div>
  );
};

export default ShotControls;
