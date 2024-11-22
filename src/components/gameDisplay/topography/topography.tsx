import Canvas from "../../common/canvas";
useAppSelector
import { selectTopography } from "../../../redux/topographyRedux";
import { drawTopography } from "./topographyProps";
import { useAppSelector } from "../../../redux/hooks";

const Topography = () => {
  const topography = useAppSelector(selectTopography);

  return <Canvas staticShapes={drawTopography} customProps={{ topography }} />;
};

export default Topography;
