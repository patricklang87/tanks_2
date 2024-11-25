import Canvas from "../../common/canvas";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { selectCurrentPlayerIndex, selectCurrentTank, selectTanks } from "../../../redux/playersRedux";
import { animateTankDriving, cancelDriveAnimationAndAdvanceTurn, shouldCancelDriveAnimation, drawTanks } from "./tanksProps";
import { selectTopography } from "../../../redux/topographyRedux";

const Tanks = () => {
  const tanks = useAppSelector(selectTanks);
  const dispatch = useAppDispatch();
  const tanksAreAnimating = useAppSelector(
    (state) => state.players.tanksAnimating
  );
  const tank = useAppSelector(selectCurrentTank);
  const tankInd = useAppSelector(selectCurrentPlayerIndex)
  const topography = useAppSelector(selectTopography);

  return (
    <>
      {tanksAreAnimating ? (
        <Canvas animationFunction={animateTankDriving} 
        customProps={{
          dispatch,
          tankInd,
          tanks,
          tank,
          topography,
        }}
        cancelationCondition={shouldCancelDriveAnimation}
        onCancelation={cancelDriveAnimationAndAdvanceTurn}
        
        />
      ) : (
        <Canvas staticShapes={drawTanks} customProps={{ tanks }} />
      )}
    </>
  );
};

export default Tanks;
