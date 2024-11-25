import Canvas from "../../common/canvas";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { selectProjectilePosition } from "../../../redux/projectileRedux";
import {
  animateProjectile,
  shouldCancelProjectileAnimation,
  resetProjectileAnimationAndAdvanceTurn
} from "./projectileProps";
import { selectCurrentTank, selectTanks } from "../../../redux/playersRedux";

const Projectile = () => {
  const dispatch = useAppDispatch();
  const projectilePosition = useAppSelector(selectProjectilePosition);
  const projectileVelocity = useAppSelector(state => state.projectile.velocity)
  const currentPlayerIndex = useAppSelector(state => state.players.currentPlayerIndex);
  const tank = useAppSelector(selectCurrentTank);
  const tanks = useAppSelector(selectTanks);
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
        tankInd: currentPlayerIndex,
      }}
      cancelationCondition={shouldCancelProjectileAnimation}
      onCancelation={resetProjectileAnimationAndAdvanceTurn}
    />
  );
};

export default Projectile;
