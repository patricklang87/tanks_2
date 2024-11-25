import { createInitialTopography } from "./topography/topographyProps";
import { topographyConstants, canvasConstants, tankDimensions } from "../../constants";
import { useAppDispatch } from "../../redux/hooks";
import { setTopography } from "../../redux/topographyRedux";
import { reduceRemainingRounds, setInitialTanks, setTanksAnimating, setPlayerTurn, setWinner, } from "../../redux/playersRedux";
import { setProjectileValues, startProjectileAnimating, } from "../../redux/projectileRedux";
import { calculateTurretEndpoints, generateTankPositions, initiateTank, } from "./tanks/tanksProps";
import { calculateInitialVelocities } from "./projectile/projectileProps";
export const useInitiateGame = () => {
    const { height: canvasHeight, width: canvasWidth } = canvasConstants;
    const dispatch = useAppDispatch();
    const initialTopography = createInitialTopography({
        canvasHeight,
        canvasWidth,
        increments: topographyConstants.increments,
        maxVariationCoefficient: topographyConstants.maxVariationCoefficient,
        minHeightCoefficient: topographyConstants.minHeightCoefficient,
        maxHeightCoefficient: topographyConstants.maxHeightCoefficient,
    });
    const tankPositions = generateTankPositions({
        topography: initialTopography,
        numberOfTanks: 3,
    });
    const initialTanks = tankPositions.map((tankPosition, index) => initiateTank({ tankPosition, index }));
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
    dispatch(setTopography(initialTopography));
    dispatch(setInitialTanks(initialTanks));
};
export const launchProjectile = ({ dispatch, tank, }) => {
    const { turretAngle, position, shotPower } = tank;
    const { endingPoint } = calculateTurretEndpoints({
        turretAngle,
        tankPosition: position,
    });
    const { initialVelocities } = calculateInitialVelocities({
        turretAngle,
        initialVelocity: shotPower,
    });
    dispatch(reduceRemainingRounds());
    dispatch(setProjectileValues({ position: endingPoint, velocity: initialVelocities }));
    dispatch(startProjectileAnimating());
};
export const driveTank = ({ dispatch, tank, tankInd, }) => {
    const { position, driveDistance } = tank;
    const currX = position[0];
    let targetX = currX + driveDistance;
    if (targetX < 0)
        targetX = 0;
    if (targetX > canvasConstants.width - tankDimensions.width) {
        targetX = canvasConstants.width - tankDimensions.width;
    }
    dispatch(setTanksAnimating({ tankInd, targetX }));
};
export const checkForWinnerAndAdvanceTurn = ({ dispatch, tankInd, tanks }) => {
    let survivingTanks = 0;
    for (let tank of tanks) {
        if (tank.shields > 0)
            survivingTanks++;
    }
    if (survivingTanks === 1) {
        setWinner(tankInd);
    }
    else {
        let nextPlayer = findNextPlayer(tankInd, tanks);
        dispatch(setPlayerTurn(nextPlayer));
    }
};
const findNextPlayer = (tankInd, tanks) => {
    let nextPlayer = tankInd + 1;
    if (nextPlayer > tanks.length - 1)
        nextPlayer = 0;
    while (tanks[nextPlayer].shields <= 0) {
        nextPlayer++;
        if (nextPlayer > tanks.length - 1)
            nextPlayer = 0;
        if (nextPlayer === tankInd)
            return tankInd;
    }
    return nextPlayer;
};
