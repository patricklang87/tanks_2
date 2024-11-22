import Canvas from "../../common/canvas";
import { useAppSelector } from "../../../redux/hooks";
import { selectTanks } from "../../../redux/playersRedux";
import { drawTanks } from "./tanksProps";

const Tanks = () => {
  const tanks = useAppSelector(selectTanks);

  return <Canvas staticShapes={drawTanks} customProps={{ tanks }} />;
};

export default Tanks;
