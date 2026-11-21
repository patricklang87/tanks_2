import { describe, it, expect } from "vitest";
import reducer, {
  setInitialPlayerState,
  setCurrentTankSelectedAction,
  setPlayerTurn,
  setNewTankShields,
  setDamageFollowingExplosion,
  reduceRemainingRounds,
  setTanksFalling,
} from "../redux/playersRedux";

// Not exported from the slice yet (fall damage is still in progress).
const updateTanksFalling = () => ({ type: "players/updateTanksFalling" });
import { actions, environmentConstants } from "../constants";
import type { Tank } from "../types";

const makeTank = (overrides: Partial<Tank> = {}): Tank => ({
  turretAngle: 45,
  shotPower: 50,
  driveDistance: 0,
  shields: 100,
  position: [100, 200],
  targetX: 100,
  targetY: null,
  tankDriveAnimationExecuting: false,
  localColor: [0, 0, 255, 1],
  currentColor: [0, 0, 255, 1],
  tankFallAnimationExecuting: false,
  fuel: 100,
  selectedAction: "standardShot",
  availableActions: [
    { ...actions.standardShot },
    { ...actions.steelShotput },
    { ...actions.begemot },
  ],
  directlyStruck: false,
  ...overrides,
});

const startGame = (tanks: Tank[]) =>
  reducer(undefined, setInitialPlayerState(tanks));

describe("playersRedux", () => {
  it("initialises a fresh game", () => {
    const state = startGame([makeTank(), makeTank()]);
    expect(state.tanks).toHaveLength(2);
    expect(state.currentPlayerIndex).toBe(0);
    expect(state.winner).toBeNull();
  });

  it("applies direct-hit damage from the attacker's selected weapon", () => {
    let state = startGame([makeTank(), makeTank(), makeTank()]);
    state = reducer(state, setCurrentTankSelectedAction("steelShotput"));
    state = reducer(state, setNewTankShields([1]));
    expect(state.tanks[1].shields).toBe(100 - 35);
    expect(state.tanks[1].directlyStruck).toBe(true);
    expect(state.winner).toBeNull();
  });

  it("declares a winner when only one tank has shields left", () => {
    let state = startGame([makeTank(), makeTank({ shields: 10 })]);
    state = reducer(state, setNewTankShields([1]));
    expect(state.tanks[1].shields).toBeLessThanOrEqual(0);
    expect(state.winner).toBe(0);
  });

  it("does not double-count explosion damage on directly struck tanks", () => {
    let state = startGame([makeTank(), makeTank(), makeTank()]);
    state = reducer(state, setNewTankShields([1]));
    state = reducer(state, setDamageFollowingExplosion([0, 15, 15]));
    expect(state.tanks[1].shields).toBe(100 - actions.standardShot.damage!);
    expect(state.tanks[2].shields).toBe(85);
    expect(state.tanks.every((t) => !t.directlyStruck)).toBe(true);
  });

  it("uses up limited ammunition but not the infinite standard shot", () => {
    let state = startGame([makeTank(), makeTank()]);
    state = reducer(state, reduceRemainingRounds());
    expect(state.tanks[0].availableActions[0].rounds).toBe("Infinite");

    state = reducer(state, setCurrentTankSelectedAction("steelShotput"));
    state = reducer(state, reduceRemainingRounds());
    expect(state.tanks[0].availableActions[1].rounds).toBe(2);
  });

  it("switches back to the standard shot when a weapon runs out", () => {
    let state = startGame([makeTank(), makeTank()]);
    state = reducer(state, setCurrentTankSelectedAction("begemot"));
    state = reducer(state, reduceRemainingRounds());
    state = reducer(state, setPlayerTurn(1));
    expect(state.tanks[0].selectedAction).toBe("standardShot");
    expect(state.currentPlayerIndex).toBe(1);
  });

  it("animates falling tanks towards their target height", () => {
    const speed = environmentConstants.fallAnimationSpeed;
    let state = startGame([makeTank({ position: [0, 100] }), makeTank()]);
    state = reducer(state, setTanksFalling([100 - speed * 2 - 1, null]));
    expect(state.tanksFalling).toBe(true);

    state = reducer(state, updateTanksFalling());
    expect(state.tanks[0].position[1]).toBe(100 - speed);

    for (let i = 0; i < 5; i++) state = reducer(state, updateTanksFalling());
    expect(state.tanks[0].position[1]).toBe(100 - speed * 2 - 1);
    expect(state.tanks[0].targetY).toBeNull();
  });
});
