import StaticBackground from "../staticBackground";
import "../../../css/gamescreen.css";
import Topography from "../topography/topography";
import Tanks from "../tanks/tanks";
import { canvasConstants } from "../../../constants";

const GameScreen = () => {
  return (
    <>
        <div
          className="canvas-container"
          style={{
            height: canvasConstants.height,
            width: canvasConstants.width,
          }}
        >
          <StaticBackground />
          <Topography />
          <Tanks />
        </div>

    </>
  );
};

export default GameScreen;
