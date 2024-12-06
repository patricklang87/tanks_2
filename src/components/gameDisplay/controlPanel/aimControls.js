import { jsx as _jsx } from "react/jsx-runtime";
import Canvas from "../../common/canvas";
export const drawSemiCircle = (ctx, circleDims) => {
    const { radius, strokeStyle = "blue", startX, startY, lineWidth,
    //   colorFill = "pink",
     } = circleDims;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx?.beginPath();
    ctx?.arc(startX, startY, radius, Math.PI, 0, true);
    ctx?.stroke();
    // if (colorFill) {
    //   ctx.fillStyle = colorFill;
    //   ctx.fill();
    // }
};
const drawScales = (ctx, circleDims) => {
    const { maxRadius, strokeStyle, startX, startY, lineWidth } = circleDims;
    for (let i = 0; i <= maxRadius; i += (maxRadius / 4)) {
        console.log(i);
        drawSemiCircle(ctx, { radius: i, strokeStyle, startX, startY, lineWidth });
    }
};
const aimControls = () => {
    return (_jsx("div", { className: "lightblue", children: _jsx("div", { children: _jsx(Canvas, { staticShapes: drawScales, canvasClass: "indicator-canvas", customProps: {
                    maxRadius: 50,
                    strokeStyle: "red",
                    startX: 75,
                    startY: 25,
                    lineWidth: 2,
                    // colorFill = "pink",
                }, width: 200, height: 150 }) }) }));
};
export default aimControls;
