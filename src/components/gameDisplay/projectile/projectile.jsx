import Canvas from "../../common/canvas";
import { useSelector, useDispatch } from "react-redux";
import { selectProjectilePosition } from "../../../redux/projectileRedux";
import {
  animateProjectile,
  shouldCancelProjectileAnimation,
  resetProjectileAnimationAndAdvanceTurn
} from "./projectileProps";
import { selectCurrentTank, selectTanks } from "../../../redux/playersRedux";

const Projectile = () => {
  const dispatch = useDispatch();
  const projectilePosition = useSelector(selectProjectilePosition);
  const projectileVelocity = useSelector(state => state.projectile.velocity)
  const tank = useSelector(selectCurrentTank);
  const tanks = useSelector(selectTanks);
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
        tank,
        tanks,
      }}
      cancelationCondition={shouldCancelProjectileAnimation}
      onCancelation={resetProjectileAnimationAndAdvanceTurn}
    />
  );
};

export default Projectile;
