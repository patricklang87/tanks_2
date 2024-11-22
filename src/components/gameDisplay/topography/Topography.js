import { jsx as _jsx } from "react/jsx-runtime";
import Canvas from "../../common/canvas";
useAppSelector;
import { selectTopography } from "../../../redux/topographyRedux";
import { drawTopography } from "./topographyProps";
import { useAppSelector } from "../../../redux/hooks";
const Topography = () => {
    const topography = useAppSelector(selectTopography);
    return _jsx(Canvas, { staticShapes: drawTopography, customProps: { topography } });
};
export default Topography;
