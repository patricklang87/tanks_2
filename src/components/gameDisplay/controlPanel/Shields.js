import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useAppSelector } from "../../../redux/hooks";
import { selectTanks } from "../../../redux/playersRedux";
import ProgressBar from "react-bootstrap/ProgressBar";
import { designConstants } from "../../../constants";
const Shields = () => {
    const tanks = useAppSelector(selectTanks);
    const { destroyedTankColor } = designConstants;
    return (_jsx("div", { style: { padding: "10px" }, children: tanks.map((tank, index) => (_jsxs("div", { className: "row", style: {
                margin: "5px",
                borderRadius: "10px",
                padding: "5px",
                backgroundColor: tank.shields > 0 ? tank.localColor : destroyedTankColor,
            }, children: [_jsxs("span", { className: "col-4", children: [tank.shields, "%"] }), _jsxs("div", { className: "col-8", children: [" ", _jsx(ProgressBar, { animated: true, now: tank.shields, style: { color: tank.localColor } })] })] }, `shields_${index}`))) }));
};
export default Shields;
