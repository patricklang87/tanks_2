import Canvas from "../../common/canvas";

export const drawSemiCircle = (
  ctx: CanvasRenderingContext2D,
  circleDims: {
    radius: number;
    strokeStyle: string;
    startX: number;
    startY: number;
    lineWidth: number;
    // colorFill: string;
  }
): void => {
  const {
    radius,
    strokeStyle = "blue",
    startX,
    startY,
    lineWidth,
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

const drawScales = (
  ctx: CanvasRenderingContext2D,
  circleDims: {
    maxRadius: number;
    strokeStyle: string;
    startX: number;
    startY: number;
    lineWidth: number;
  }
) => {

    const {maxRadius, strokeStyle, startX, startY, lineWidth} = circleDims;
    for (let i = 0; i <= maxRadius; i+= (maxRadius / 4)) {
        console.log(i)
        drawSemiCircle(ctx, {radius: i, strokeStyle, startX, startY, lineWidth  })
    }

   

};

const aimControls = () => {
  return (
    <div className="lightblue">
      <div>
        <Canvas
          staticShapes={drawScales}
          canvasClass={"indicator-canvas"}
          customProps={{
            maxRadius: 50,
            strokeStyle: "red",
            startX: 75,
            startY: 25,
            lineWidth: 2,
            // colorFill = "pink",
          }}
          width={200}
          height={150}
        />
      </div>
    </div>
  );
};

export default aimControls;
