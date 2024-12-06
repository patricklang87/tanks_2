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
    ctx.fillStyle = settingColors.skyColor;
    ctx.strokeStyle = settingColors.skyColor;
    ctx.fillRect(0, 0, canvasConstants.width, canvasConstants.height);
  };

  return <Canvas staticShapes={drawStaticBackground} />;
};

export default StaticBackground;
