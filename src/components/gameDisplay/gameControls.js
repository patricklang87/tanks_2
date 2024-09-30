import { createInitialTopography } from "./topography/topographyProps";
import { topographyConstants, canvasConstants } from "../../constants";
import { useDispatch } from "react-redux";
import { setTopography } from "../../redux/topographyRedux";
import { setInitialTanks } from "../../redux/playersRedux"; 
import { generateTankPositions, initiateTank } from "./tanks/tanksProps";

export const useInitiateGame = () => {
  const { height: canvasHeight, width: canvasWidth } = canvasConstants;
  const dispatch = useDispatch();

  const initialTopography = createInitialTopography({
    canvasHeight,
    canvasWidth,
    increments: topographyConstants.increments,
    maxVariationCoefficient: topographyConstants.maxVariationCoefficient,
    minHeightCoefficient: topographyConstants.minHeightCoefficient,
    maxHeightCoefficient: topographyConstants.maxHeightCoefficient,
  });

  const tankPositions = generateTankPositions({
    canvasWidth,
    topography: initialTopography,
    numberOfTanks: 3,
  });

  const initialTanks = tankPositions.map((tankPosition, index) => initiateTank({ tankPosition, index }))

  // const [gameState, setGameState] = useState({
  //   numberOfPlayers,
  //   currentPlayer: 1,
  //   topography: initialTopography,
  //   updatedTopography: initialTopography,
  //   lastShot: [],
  //   lastShotAnimationCompleted: false,
  //   tanks: tankPositions.map((tankPosition, index) =>
  //     initiateTank({ tankPosition, index })
  //   ),
  // });

  dispatch(setTopography(initialTopography))
  dispatch(setInitialTanks(initialTanks));
};
