import Canvas from "../../common/canvas";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  selectCurrentPlayerIndex,
  selectCurrentTank,
  selectTanks,
} from "../../../redux/playersRedux";
import {
  animateTankDriving,
  cancelTankAnimationAndAdvanceTurn,
  shouldCancelDriveAnimation,
  shouldCancelFallAnimation,
  drawTanks,
  animateTanksFalling,
} from "./tanksProps";
import { selectTopography } from "../../../redux/topographyRedux";

const Tanks = () => {
  const tanks = useAppSelector(selectTanks);
  const dispatch = useAppDispatch();
  const tanksAreDriving = useAppSelector((state) => state.players.tanksDriving);
  const tanksAreFalling = useAppSelector((state) => state.players.tanksFalling);
  console.log("tanksAreDriving", tanksAreDriving, "tanksAreFalling", tanksAreFalling)

  const tanksAreAnimating = tanksAreDriving || tanksAreFalling;
  const useFallAnimations = !tanksAreDriving && tanksAreFalling;

  const tank = useAppSelector(selectCurrentTank);
  const tankInd = useAppSelector(selectCurrentPlayerIndex);
  const topography = useAppSelector(selectTopography);
  console.log("tanksAreAnimating", tanksAreAnimating);

  return (
    <>
      {tanksAreAnimating ? (
        <Canvas
          animationFunction={
            useFallAnimations ? animateTanksFalling : animateTankDriving
          }
          customProps={{
            dispatch,
            tankInd,
            tanks,
            tank,
            topography,
          }}
          cancelationCondition={
            useFallAnimations
              ? shouldCancelFallAnimation
              : shouldCancelDriveAnimation
          }
          onCancelation={cancelTankAnimationAndAdvanceTurn}
        />
      ) : (
        <Canvas staticShapes={drawTanks} customProps={{ tanks }} />
      )}
    </>
  );
};

export default Tanks;
