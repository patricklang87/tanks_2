import { useId } from "react";
import Form from "react-bootstrap/Form";
import {
  setCurrentTankDriveDistance,
  selectCurrentTank,
} from "../../../redux/playersRedux";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const DriveControls = () => {
  const dispatch = useAppDispatch();
  const driveInputId = useId();
  const currentTank = useAppSelector(selectCurrentTank);
  const { driveDistance } = currentTank;
  return (
    <div className="align-items-center">
      <div className="row">
        <div className="col-2">
          <Form.Label>Drive to</Form.Label>
        </div>
        <div className="col-1">
          <span>{driveDistance}</span>
        </div>
        <div className="col-9">
          {" "}
          <Form.Range
            value={driveDistance}
            onChange={(e) =>
              dispatch(setCurrentTankDriveDistance(Number(e.target.value)))
            }
            id={driveInputId}
            name="driveDistance"
            min={-150}
            max={150}
          />
        </div>
      </div>
    </div>
  );
};

export default DriveControls;
