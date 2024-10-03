import Canvas from "../../common/canvas";
import { useSelector, useDispatch } from "react-redux";
import { selectProjectilePosition } from "../../../redux/projectileRedux";
import {
  animateProjectile,
  cancelProjectileAnimation,
} from "./projectileProps";
import { selectCurrentTank } from "../../../redux/playersRedux";

const Projectile = () => {
  const dispatch = useDispatch();
  const projectilePosition = useSelector(selectProjectilePosition);
  const tank = useSelector(selectCurrentTank);
  const { turretAngle, position } = tank;

  return (
    <Canvas
      animationFunction={animateProjectile}
      customProps={{
        dispatch,
        projectilePosition,
        turretAngle,
        tankPosition: position,
      }}
      cancelationCondition={cancelProjectileAnimation}
    />
  );
};

export default Projectile;
