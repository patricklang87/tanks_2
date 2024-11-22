import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { canvasConstants } from "../../constants";
const Canvas = (props) => {
    const { animationFunction = null, staticShapes = null, customProps = {}, cancelationCondition, onCancelation = null, } = props;
    const canvasRef = useRef(null);
    if (canvasRef.height && canvasRef.clientWidth && canvasRef.clientHeight) {
        canvasRef.width =
            canvasRef.height * (canvasRef.clientWidth / canvasRef.clientHeight);
    }
    useEffect(() => {
        if (canvasRef?.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (staticShapes) {
                staticShapes(ctx, customProps);
            }
            if (animationFunction) {
                let animationId = requestAnimationFrame(() => animationFunction(ctx, customProps));
                if (cancelationCondition && cancelationCondition(customProps)) {
                    cancelAnimationFrame(animationId);
                    if (onCancelation) {
                        onCancelation(customProps);
                    }
                }
            }
        }
    }, [customProps]);
    return (_jsx("canvas", { ref: canvasRef, width: canvasConstants.width, height: canvasConstants.height, className: "layering-canvas" }));
};
export default Canvas;
