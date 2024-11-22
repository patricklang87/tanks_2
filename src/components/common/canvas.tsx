import { useEffect, useRef, RefObject } from "react";
import { canvasConstants } from "../../constants";
import { ToastContainer } from "react-bootstrap";

interface Props {
  animationFunction?: Function;
  staticShapes?: Function;
  customProps?: {};
  cancelationCondition?: Function;
  onCancelation?: Function;
}

const Canvas = (props: Props) => {
  const {
    animationFunction = null,
    staticShapes = null,
    customProps = {},
    cancelationCondition,
    onCancelation = null,
  } = props;

  interface CanvasRef extends RefObject<HTMLCanvasElement> {
    width?: number;
    height?: number;
    clientWidth?: number;
    clientHeight?: number;
  }

  const canvasRef: CanvasRef = useRef(null);

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
        let animationId = requestAnimationFrame(() =>
          animationFunction(ctx, customProps)
        );
        if (cancelationCondition && cancelationCondition(customProps)) {
          cancelAnimationFrame(animationId);
          if (onCancelation) {
            onCancelation(customProps);
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

export default Canvas;
