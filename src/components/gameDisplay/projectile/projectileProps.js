import { canvasConstants } from "../../../constants";
import { setProjectilePosition } from "../../../redux/projectileRedux";

export const animateProjectile = (ctx, customProps) => {

    const {dispatch, projectilePosition } = customProps;
    const [currX, currY] = projectilePosition;
    drawCircle(ctx, {
      radius: 50,
      lineWidth: 3,
      strokeStyle: "#4F7CAC",
      colorFill: "#4F7CAC",
      startY: currY,
      startX: currX
    });
    const newProjectilePosition = [currX + 5, currY]
    dispatch(setProjectilePosition(newProjectilePosition));
    ctx?.stroke();
  }

  export const cancelProjectileAnimation = (customProps) => {
    const {projectilePosition, dispatch} = customProps;
    const [currX, currY] = projectilePosition;
    const outOfBounds = currX > canvasConstants.width || currX < 0 || currY > canvasConstants.height
    if (outOfBounds) {
        dispatch(setProjectilePosition([null, null]))
    }
    // add additional logic
    return outOfBounds
  }

  export const drawCircle = (
    ctx,
    circleDims = {},
  ) => {
   const {
      radius = 5,
      strokeStyle = "blue",
      startX = 10,
      startY = 10,
      lineWidth = 1,
      colorFill = "pink"
    } = circleDims;
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
