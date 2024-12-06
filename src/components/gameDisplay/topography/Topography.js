import { jsx as _jsx } from "react/jsx-runtime";
import Canvas from "../../common/canvas";
import { colorSchemes } from "../../../constants";
import { selectTopography } from "../../../redux/topographyRedux";
import { drawTopography } from "./topographyProps";
import { useAppSelector } from "../../../redux/hooks";
const Topography = () => {
    const topography = useAppSelector(selectTopography);
    const colorScheme = useAppSelector(state => state.topography.colorScheme);
    const colors = colorSchemes[colorScheme];
    return _jsx(Canvas, { staticShapes: drawTopography, customProps: { topography, colors } });
};
export default Topography;
