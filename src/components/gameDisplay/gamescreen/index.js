import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import StaticBackground from "../staticBackground";
import "../../../css/gamescreen.css";
import Topography from "../topography/topography";
import Tanks from "../tanks/tanks";
import { canvasConstants } from "../../../constants";
import Projectile from "../projectile/projectile";
import { useAppSelector } from "../../../redux/hooks";
import { selectProjectileAnimating } from "../../../redux/projectileRedux";
const GameScreen = () => {
    const displayProjectile = useAppSelector(selectProjectileAnimating);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "title-container", children: [" ", _jsx("h1", { className: "title-card", children: "Tanks A Million!" })] }), _jsxs("div", { className: "canvas-container", style: {
                    height: canvasConstants.height,
                    width: canvasConstants.width,
                }, children: [_jsx(StaticBackground, {}), _jsx(Topography, {}), _jsx(Tanks, {}), displayProjectile && _jsx(Projectile, {})] })] }));
};
export default GameScreen;
