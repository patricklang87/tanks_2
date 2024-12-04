import { canvasConstants, designConstants } from "../../../constants";
export const drawGrid = (ctx) => {
    ctx.clearRect(0, 0, canvasConstants.width, canvasConstants.height);
    const { width, height } = canvasConstants;
    const bigStep = 100;
    const smallStep = bigStep / 2;
    ctx.font = "10px sans-serif";
    ctx.beginPath();
    for (let y = bigStep; y < height; y += bigStep) {
        ctx.fillText(y.toString(), 2, y + 12);
        ctx.fillStyle = designConstants.devGridBigLineColor;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }
    for (let x = bigStep; x < width; x += bigStep) {
        ctx.fillText(x.toString(), x + 5, 10);
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }
    ctx.strokeStyle = designConstants.devGridBigLineColor;
    ctx.lineWidth = designConstants.devGridBigLineWidth;
    ctx.stroke();
    for (let y = smallStep; y < height; y += smallStep) {
        if (y % bigStep !== 0) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }
    }
    for (let x = smallStep; x < width; x += smallStep) {
        if (x % bigStep !== 0) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }
    ctx.strokeStyle = designConstants.devGridSmallLineColor;
    ctx.lineWidth = designConstants.devGridSmallLineWidth;
    ctx.stroke();
    ctx.closePath();
};
