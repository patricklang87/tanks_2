import StaticBackground from "../staticBackground";
import "../../../css/gamescreen.css";
import Topography from "../topography/topography";
import Tanks from "../tanks/tanks";

const GameScreen = () => {
  return (
    <>
    <div>
    <div className="canvas-container">
        <StaticBackground />
        <Topography />
        <Tanks />
      </div>
    </div>

    </>
  );
};

export default GameScreen;
