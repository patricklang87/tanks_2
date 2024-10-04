import Canvas from "../../common/canvas";
import { useSelector, useDispatch } from "react-redux";
import { selectProjectilePosition } from "../../../redux/projectileRedux";
import {
  animateProjectile,
  shouldCancelProjectileAnimation,
  resetProjectileAnimationAndAdvanceTurn
} from "./projectileProps";
import { selectCurrentTank } from "../../../redux/playersRedux";

const Projectile = () => {
  const dispatch = useDispatch();
  const projectilePosition = useSelector(selectProjectilePosition);
  const projectileVelocity = useSelector(state => state.projectile.velocity)
  const tank = useSelector(selectCurrentTank);
  const { turretAngle, position, shotPower } = tank;

  return (
    <Canvas
      animationFunction={animateProjectile}
      customProps={{
        dispatch,
        projectilePosition,
        projectileVelocity,
        turretAngle,
        tankPosition: position,
        shotPower,
      }}
      cancelationCondition={shouldCancelProjectileAnimation}
      onCancelation={resetProjectileAnimationAndAdvanceTurn}
    />
  );
};

export default Projectile;
