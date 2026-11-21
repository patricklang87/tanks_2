import { describe, it, expect } from "vitest";
import { degreesToRadians, getCoordinatesOnCircle } from "../utils/angleManipulation";
import { arrayToRgba } from "../utils/colors";
import { getSlopeOfLine, getYInterceptForLine, getYForXInLine } from "../utils/linearEval";
import { setOnTopography } from "../utils/pointCentering";
import { getSelectedActionData } from "../utils/tankData";
import { actions } from "../constants";
import type { Tuple } from "../types";

describe("angleManipulation", () => {
  it("converts degrees to radians", () => {
    expect(degreesToRadians(0)).toBe(0);
    expect(degreesToRadians(180)).toBeCloseTo(Math.PI);
    expect(degreesToRadians(90)).toBeCloseTo(Math.PI / 2);
  });

  it("finds points on a circle", () => {
    const [x0, y0] = getCoordinatesOnCircle({ center: [10, 10], radius: 5, angle: 0 });
    expect(x0).toBeCloseTo(15);
    expect(y0).toBeCloseTo(10);

    const [x90, y90] = getCoordinatesOnCircle({ center: [10, 10], radius: 5, angle: 90 });
    expect(x90).toBeCloseTo(10);
    expect(y90).toBeCloseTo(15);
  });
});

describe("arrayToRgba", () => {
  it("formats a color array as an rgba string", () => {
    expect(arrayToRgba([255, 0, 10, 1])).toBe("rgba(255, 0, 10, 1)");
  });
});

describe("linearEval", () => {
  const p1: Tuple = [0, 2];
  const p2: Tuple = [4, 10];

  it("computes slope and intercept", () => {
    expect(getSlopeOfLine({ point1: p1, point2: p2 })).toBe(2);
    expect(getYInterceptForLine({ slope: 2, point: p2 })).toBe(2);
  });

  it("interpolates y for a given x", () => {
    expect(getYForXInLine({ point1: p1, point2: p2, currentX: 2 })).toBe(6);
  });
});

describe("setOnTopography", () => {
  const topography: Tuple[] = [
    [0, 100],
    [10, 120],
    [20, 80],
  ];

  it("places a point on the line between surrounding topography points", () => {
    expect(setOnTopography({ topography, point: [5, 0] })).toEqual([5, 110]);
    expect(setOnTopography({ topography, point: [15, 0] })).toEqual([15, 100]);
  });

  it("returns null for null points or points beyond the map", () => {
    expect(setOnTopography({ topography, point: [null, null] })).toBeNull();
    expect(setOnTopography({ topography, point: [50, 0] })).toBeNull();
  });
});

describe("getSelectedActionData", () => {
  const available = [actions.standardShot, actions.steelShotput];

  it("returns the matching action", () => {
    expect(getSelectedActionData("steelShotput", available)).toBe(actions.steelShotput);
  });

  it("falls back to a zero-damage action when not found", () => {
    expect(getSelectedActionData("begemot", available)).toEqual({ damage: 0, rounds: 0 });
  });
});
