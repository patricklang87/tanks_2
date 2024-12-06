import { jsx as _jsx } from "react/jsx-runtime";
import Canvas from "../../common/canvas";
import { useAppSelector } from "../../../redux/hooks";
import { drawClouds } from "./cloudProps";
import { colorSchemes } from "../../../constants";
const Clouds = () => {
    const clouds = useAppSelector((state) => state.topography.clouds);
    const colorScheme = useAppSelector((state) => state.topography.colorScheme);
    const colors = colorSchemes[colorScheme];
    const cloudColor = colors.cloudColor;
    return (_jsx(Canvas, { staticShapes: drawClouds, customProps: { clouds, cloudColor } }));
};
export default Clouds;
