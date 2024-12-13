import Canvas from "../common/canvas";
import { canvasConstants, colorSchemes } from "../../constants";
import { useAppSelector } from "../../redux/hooks";
import { ColorScheme } from "../../types";

const StaticBackground = () => {
  const colorScheme = useAppSelector((state) => state.topography.colorScheme) || "dayColors";

  const drawStaticBackground = (
    ctx: CanvasRenderingContext2D,
    rectDims: { lineWidth?: number }
  ) => {
    const { lineWidth = 1 } = rectDims;
    const settingColors: ColorScheme = colorSchemes[colorScheme as keyof typeof colorSchemes]
    ctx.lineWidth = lineWidth;
    const skyGrad=ctx.createLinearGradient(0, canvasConstants.height, 0,0);
    skyGrad.addColorStop(0, settingColors.lowSkyColor);
    skyGrad.addColorStop(1, settingColors.skyColor);
    ctx.fillStyle = skyGrad;
    ctx.strokeStyle = skyGrad;
    ctx.fillRect(0, 0, canvasConstants.width, canvasConstants.height);
  };

  return <Canvas staticShapes={drawStaticBackground} />;
};

export default StaticBackground;
