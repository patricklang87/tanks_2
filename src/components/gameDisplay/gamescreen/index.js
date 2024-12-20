import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import StaticBackground from "../staticBackground";
import "../../../css/gamescreen.css";
import Topography from "../topography/topography";
import Clouds from "../decoration/clouds";
import Tanks from "../tanks/tanks";
import Explosion from "../explosion/explosion";
import WinnerPopup from "./WinnerPopup";
// import Grid from "../developmentAids/Grid";
import { canvasConstants } from "../../../constants";
import Projectile from "../projectile/projectile";
import { useAppSelector } from "../../../redux/hooks";
import { selectProjectileAnimating } from "../../../redux/projectileRedux";
const GameScreen = () => {
    const displayProjectile = useAppSelector(selectProjectileAnimating);
    const displayExplosion = useAppSelector((state) => state.explosion.explosionIsAnimating);
    const winner = useAppSelector((state) => state.players.winner);
    const showWinnerPopup = winner != null;
    return (_jsxs("div", { className: "gamescreen", children: [showWinnerPopup && _jsx(WinnerPopup, {}), _jsxs("div", { className: "canvas-container", style: {
                    height: canvasConstants.height,
                    width: canvasConstants.width,
                }, children: [_jsx(StaticBackground, {}), _jsx(Clouds, {}), _jsx(Topography, {}), _jsx(Tanks, {}), displayProjectile && _jsx(Projectile, {}), displayExplosion && _jsx(Explosion, {})] })] }));
};
export default GameScreen;
