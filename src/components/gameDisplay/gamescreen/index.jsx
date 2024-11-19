import StaticBackground from "../staticBackground";
import "../../../css/gamescreen.css";
import Topography from "../topography/topography";
import Tanks from "../tanks/tanks";
import { canvasConstants } from "../../../constants";
import Projectile from "../projectile/projectile";
import { useSelector } from "react-redux";
import { selectProjectileAnimating } from "../../../redux/projectileRedux";

const GameScreen = () => {
  const displayProjectile = useSelector(selectProjectileAnimating);
  return (
    <>
      <div className="title-container">
        {" "}
        <h1 className="title-card">Tanks A Million!</h1>
      </div>

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
        {displayProjectile && <Projectile />}
      </div>
    </>
  );
};

export default GameScreen;
