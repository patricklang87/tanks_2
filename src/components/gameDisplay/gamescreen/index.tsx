import StaticBackground from "../staticBackground";
import "../../../css/gamescreen.css";
import Topography from "../topography/topography";
import Tanks from "../tanks/tanks";
import WinnerPopup from "./WinnerPopup";
import { canvasConstants } from "../../../constants";
import Projectile from "../projectile/projectile";
import { useAppSelector } from "../../../redux/hooks";
import { selectProjectileAnimating } from "../../../redux/projectileRedux";

const GameScreen = () => {
  const displayProjectile = useAppSelector(selectProjectileAnimating);
  const winner = useAppSelector((state) => state.players.winner);
  const showWinnerPopup = winner != null;

  return (
    <div className="gamescreen">
      {showWinnerPopup && <WinnerPopup />}

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
    </div>
  );
};

export default GameScreen;
