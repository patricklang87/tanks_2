import Canvas from "../../common/canvas";
import { useSelector } from "react-redux";
import { selectTanks } from "../../../redux/playersRedux";
import { drawTanks } from "./tanksProps";

const Tanks = () => {
    const tanks = useSelector(selectTanks);

   return <Canvas staticShapes={drawTanks} customProps={{ tanks }} /> 
}

export default Tanks;