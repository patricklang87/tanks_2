import StaticBackground from "../staticBackground";
import "../../../css/gamescreen.css";
import Topography from "../topography/topography";

const GameScreen = () => {
  return (
    <>
      <div className="canvas-container">
        <StaticBackground />
        <Topography />
      </div>
    </>
  );
};

export default GameScreen;
