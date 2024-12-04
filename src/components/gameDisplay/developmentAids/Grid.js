import { jsx as _jsx } from "react/jsx-runtime";
import Canvas from "../../common/canvas";
import { drawGrid } from "./devAidProps";
const Grid = () => {
    return _jsx(Canvas, { staticShapes: drawGrid });
};
export default Grid;
