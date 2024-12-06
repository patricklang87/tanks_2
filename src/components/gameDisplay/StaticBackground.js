import { jsx as _jsx } from "react/jsx-runtime";
import Canvas from "../common/canvas";
import { canvasConstants, colorSchemes } from "../../constants";
import { useAppSelector } from "../../redux/hooks";
const StaticBackground = () => {
    const colorScheme = useAppSelector((state) => state.topography.colorScheme) || "dayColors";
    const drawStaticBackground = (ctx, rectDims) => {
        const { lineWidth = 1 } = rectDims;
        const settingColors = colorSchemes[colorScheme];
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = settingColors.skyColor;
        ctx.strokeStyle = settingColors.skyColor;
        ctx.fillRect(0, 0, canvasConstants.width, canvasConstants.height);
    };
    return _jsx(Canvas, { staticShapes: drawStaticBackground });
};
export default StaticBackground;
