import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentPlayerIndex } from "../../../redux/playersRedux";
import Canvas from "../../common/canvas";
import { drawTank } from "../tanks/tanksProps";
import { tankColor, tankDimensions } from "../../../constants";
import { arrayToRgba } from "../../../utils/colors";

const CurrentPlayerIndicator = () => {
  const currentPlayerIndex = useAppSelector(selectCurrentPlayerIndex);
  const currentColor = arrayToRgba(tankColor[currentPlayerIndex]);
  const width = 100;
  const height = 100;
  const factor = 2;
  const position = [(width - tankDimensions.width * factor) / 2, height / 2];

  return (
    <div className="indicator-canvas-container">
      <Canvas
        staticShapes={drawTank}
        canvasClass={"indicator-canvas"}
        customProps={{
          shields: 50,
          position,
          currentColor,
          turretAngle: -45,
          factor,
        }}
        width={width}
        height={height}
      />
    </div>
  );
};

export default CurrentPlayerIndicator;
