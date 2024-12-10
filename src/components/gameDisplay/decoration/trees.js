import { jsx as _jsx } from "react/jsx-runtime";
import Canvas from "../../common/canvas";
import { useAppSelector } from "../../../redux/hooks";
import { drawTrees } from "./treeProps";
import { colorSchemes } from "../../../constants";
const Trees = () => {
    const trees = useAppSelector((state) => state.topography.trees);
    const colorScheme = useAppSelector((state) => state.topography.colorScheme);
    const colors = colorSchemes[colorScheme];
    const treeColor = colors.treeColor;
    return (_jsx(Canvas, { staticShapes: drawTrees, customProps: { trees, treeColor } }));
};
export default Trees;
