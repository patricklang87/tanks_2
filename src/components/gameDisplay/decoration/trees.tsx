import Canvas from "../../common/canvas";
import { useAppSelector } from "../../../redux/hooks";
import { drawTrees } from "./treeProps";
import { colorSchemes } from "../../../constants";
import { ColorScheme } from "../../../types";

const Trees = () => {
  const trees = useAppSelector((state) => state.topography.trees);
  const colorScheme = useAppSelector((state) => state.topography.colorScheme);
  const colors: ColorScheme =
    colorSchemes[colorScheme as keyof typeof colorSchemes];
  const treeColor = colors.treeColor;

  return (<Canvas staticShapes={drawTrees} customProps={{ trees, treeColor }} />)
};

export default Trees;
