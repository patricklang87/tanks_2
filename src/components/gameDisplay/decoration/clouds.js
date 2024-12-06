import { jsx as _jsx } from "react/jsx-runtime";
import Canvas from "../../common/canvas";
import { useAppSelector } from "../../../redux/hooks";
import { drawClouds } from "./cloudProps";
const Clouds = () => {
    const clouds = useAppSelector((state) => state.topography.clouds);
    return _jsx(Canvas, { staticShapes: drawClouds, customProps: { clouds } });
};
export default Clouds;
