import Canvas from "../../common/canvas";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { animateExplosion, shouldCancelExplosionAnimation, resetExplosionValues } from "./explosionProps";

const Explosion = () => {
  const dispatch = useAppDispatch();
  const center = useAppSelector((state) => state.explosion.explosionCenter);
  const color = useAppSelector((state) => state.explosion.explosionColor);
  const radius = useAppSelector((state) => state.explosion.explosionRadius);
  const maxRadius = useAppSelector((state) => state.explosion.explosionMaxRadius);
  const maxReached = useAppSelector((state) => state.explosion.maxReached)

  return (
    <Canvas
      animationFunction={animateExplosion}
      customProps={{ dispatch, color, center, radius, maxRadius, maxReached }}
      cancelationCondition={shouldCancelExplosionAnimation}
      onCancelation={resetExplosionValues}
    />
  );
};

export default Explosion;
