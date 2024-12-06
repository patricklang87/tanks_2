import Canvas from "../../common/canvas";
import { useAppSelector } from "../../../redux/hooks";
import { drawClouds } from "./cloudProps";
import { colorSchemes } from "../../../constants";
import { ColorScheme } from "../../../types";

const Clouds = () => {
  const clouds = useAppSelector((state) => state.topography.clouds);
  const colorScheme = useAppSelector((state) => state.topography.colorScheme);
  const colors: ColorScheme =
    colorSchemes[colorScheme as keyof typeof colorSchemes];
  const cloudColor = colors.cloudColor;
  return (
    <Canvas staticShapes={drawClouds} customProps={{ clouds, cloudColor }} />
  );
};

export default Clouds;
