import { canvasConstants } from "../../../constants";
export const initiateClouds = () => {
    const cloudArray = [];
    let numClouds = Math.floor(Math.random() * 15);
    for (let i = 0; i < numClouds; i++) {
        const newCloud = { point: [0, 0], size: 0 };
        newCloud.size = 10 + Math.floor(Math.random() * 40);
        const cloudX = Math.floor(Math.random() * canvasConstants.width);
        const cloudY = Math.floor(Math.random() * canvasConstants.height);
        newCloud.point = [cloudX, cloudY];
        cloudArray.push(newCloud);
    }
    return cloudArray;
};
export const drawClouds = (ctx, customProps) => {
    const { clouds } = customProps;
    for (let cloud of clouds) {
        drawCloud(ctx, cloud);
    }
};
const drawCloud = (ctx, cloud) => {
    const { point, size } = cloud;
    const [x, y] = point;
    ctx.beginPath();
    ctx.arc(x, y, size, 0.5 * Math.PI, (3 / 2) * Math.PI);
    ctx.rect(x, y - size, size * 4, size * 2);
    ctx.arc(x + size * 4, y, size, (3 / 2) * Math.PI, 0.5 * Math.PI);
    ctx.arc(x + 1.5 * size, y - size, 1.5 * size, 0, 2 * Math.PI);
    //   ctx.arc(x + 1.5 * size, y - size, 1.5 * size, 0, 2 * Math.PI);
    //   ctx.arc(x + 2 * size, y - size, .9 * size, 0, 2 * Math.PI);
    ctx.arc(x + 3 * size, y - size, size, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";
    ctx?.stroke();
    ctx.fillStyle = "white";
    ctx.fill();
};
