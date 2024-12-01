import { canvasConstants } from "../../constants";
export const drawCircle = (ctx, circleDims) => {
    const { radius, strokeStyle = "blue", startX, startY, lineWidth, colorFill = "pink", } = circleDims;
    ctx?.clearRect(0, 0, canvasConstants.width, canvasConstants.height);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx?.beginPath();
    ctx?.arc(startX, startY, radius, 0, Math.PI * 2, true);
    ctx?.stroke();
    if (colorFill) {
        ctx.fillStyle = colorFill;
        ctx.fill();
    }
};
