import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppSelector } from "../../../redux/hooks";
import { selectTanks } from "../../../redux/playersRedux";
import ProgressBar from "react-bootstrap/ProgressBar";
import { designConstants } from "../../../constants";
const Shields = () => {
    const tanks = useAppSelector(selectTanks);
    const { destroyedTankColor } = designConstants;
    return (_jsx("div", { style: { padding: "10px" }, children: tanks.map((tank, index) => (_jsxs("div", { className: "row shields-indicator", style: {
                backgroundColor: tank.shields > 0 ? tank.localColor : destroyedTankColor,
            }, children: [_jsx("span", { className: "col-4", children: tank.shields > 0 ? tank.shields + "%" : "Deadzo" }), _jsxs("div", { className: "col-8", children: [" ", _jsx(ProgressBar, { animated: true, now: tank.shields, style: { color: tank.localColor } })] })] }, `shields_${index}`))) }));
};
export default Shields;
