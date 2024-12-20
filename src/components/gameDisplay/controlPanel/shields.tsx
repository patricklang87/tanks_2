import { useAppSelector } from "../../../redux/hooks";
import { selectTanks } from "../../../redux/playersRedux";
import ProgressBar from "react-bootstrap/ProgressBar";
import { designConstants } from "../../../constants";
import { arrayToRgba } from "../../../utils/colors";

const Shields = () => {
  const tanks = useAppSelector(selectTanks);
  const { destroyedTankColor } = designConstants;

  return (
    <div style={{ padding: "10px" }}>
      {tanks.map((tank, index) => (
        <div
          key={`shields_${index}`}
          className="row shields-indicator"
          style={{
            backgroundColor:
              tank.shields > 0 ? arrayToRgba(tank.localColor) : arrayToRgba(destroyedTankColor),
          }}
        >
          <span className="col-4">
            {tank.shields > 0 ? tank.shields + "%" : "Deadzo"}
          </span>
          <div className="col-8">
            {" "}
            <ProgressBar
              animated
              now={tank.shields}
              style={{ color: arrayToRgba(tank.localColor) }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shields;
