import { canvasConstants, designConstants } from "../../../constants";

const calculateStartingHeight = (props) => {
    const { canvasHeight, minHeightCoefficient, maxHeightCoefficient } = props;
    const maxHeight = canvasHeight * maxHeightCoefficient;
    let startingHeight = Math.random() * maxHeight;
    if (startingHeight < minHeightCoefficient * canvasHeight)
      startingHeight = minHeightCoefficient * canvasHeight;
    return startingHeight;
  };

// const risingFallingValleyFlatOrPeak = () => {
//     const indicator = Math.random();
//     let returnObject = {startingHeight: () => Math.random() * maxHeight, directionFunction: () => 0.5}
//     switch (indcator) {

//     }
// }

export const createInitialTopography = (props) => {
    const {
      canvasHeight,
      canvasWidth,
      increments,
      maxVariationCoefficient,
      minHeightCoefficient,
      maxHeightCoefficient,
    } = props;
    const points = [];

    const maxHeight = canvasHeight * maxHeightCoefficient;
    const incrementWidth = canvasWidth / increments;
    points.push([
      0,
      calculateStartingHeight({
        canvasHeight,
        minHeightCoefficient,
        maxHeightCoefficient,
      }),
    ]);
    let incrementCount = 1;
    while (incrementCount <= increments) {
      const previousX = points[incrementCount - 1][0];
      const previousY = points[incrementCount - 1][1];
      const currentX = previousX + incrementWidth;
      const negativeOrPositive = Math.random() > 0.5 ? 1 : -1;
      const variation =
        negativeOrPositive *
        canvasHeight *
        maxVariationCoefficient *
        Math.random();
      let currentY = previousY + variation;
      if (currentY > maxHeight) currentY = maxHeight;
      if (currentY < 0) currentY = 0;
      points.push([currentX, currentY]);
      incrementCount++;
    }
  
    return points.map((point) => [point[0], canvasHeight - point[1]]);
  };

  export const drawTopography = (ctx, customProps) => {
    const { topography } = customProps;

    ctx.beginPath();
    topography?.forEach((point, index) => {
      const positionX = point[0];
      const positionY = point[1];
      if (index === 0) {
        ctx.moveTo(positionX, positionY);
      } else {
        ctx.lineTo(positionX, positionY);
      }
    });
    ctx.lineTo(
      canvasConstants.width,
      canvasConstants.height +
        designConstants.landscapeStrokeWidth
    );
    ctx.lineTo(0, canvasConstants.height);
    ctx.strokeStyle = designConstants.landscapeStrokeStyle;
    ctx.lineWidth = designConstants.landscapeStrokeWidth;
    ctx.stroke();
    ctx.fillStyle = designConstants.landscapeFillStyle;
    ctx.fill();
    ctx.closePath();
  }