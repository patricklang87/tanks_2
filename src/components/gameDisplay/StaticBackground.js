import { jsx as _jsx } from "react/jsx-runtime";
import Canvas from "../common/canvas";
import { canvasConstants, designConstants } from "../../constants";
const StaticBackground = () => {
    const drawStaticBackground = (ctx, rectDims) => {
        const { lineWidth = 1 } = rectDims;
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = designConstants.skyColor;
        ctx.strokeStyle = designConstants.skyColor;
        ctx.fillRect(0, 0, canvasConstants.width, canvasConstants.height);
    };
    return _jsx(Canvas, { staticShapes: drawStaticBackground });
};
export default StaticBackground;