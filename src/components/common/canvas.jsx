import { useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { canvasConstants } from "../../constants";

const Canvas = (props) => {
  const {
    animationFunction = null,
    staticShapes = null,
    customProps = {},
    cancelationCondition,
    onCancelation = null,
  } = props;
  const canvasRef = useRef(null);
  canvasRef.width =
    canvasRef.height * (canvasRef.clientWidth / canvasRef.clientHeight);

  useEffect(() => {
    if (canvasRef?.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (staticShapes) {
        staticShapes(ctx, customProps);
      }
      if (animationFunction) {
        let animationId = requestAnimationFrame(() =>
          animationFunction(ctx, customProps)
        );
        if (cancelationCondition(customProps)) {
          cancelAnimationFrame(animationId);
          if (onCancelation) {
            onCancelation(customProps)
          }
        }
      }
    }
  }, [customProps]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasConstants.width}
      height={canvasConstants.height}
      className="layering-canvas"
    />
  );
};

Canvas.propTypes = {
  animationFunction: PropTypes.func || null,
  staticShapes: PropTypes.func || null,
  customProps: PropTypes.object || null,
  cancelationCondition: PropTypes.func || null,
  onCancelation: PropTypes.func || null,
};

export default Canvas;
