import Canvas from "../../common/canvas";
import { useSelector } from "react-redux";
import { selectTopography } from "../../../redux/topographyRedux";
import { drawTopography } from "./topographyProps";

const Topography = () => {
  const topography = useSelector(selectTopography);

  return <Canvas staticShapes={drawTopography} customProps={{ topography }} />;
};

export default Topography;
