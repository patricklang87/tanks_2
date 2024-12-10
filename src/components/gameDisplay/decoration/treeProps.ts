import { Tuple, Tree } from "../../../types";
import { canvasConstants } from "../../../constants";
import { getYForXInLine } from "../../../utils/linearEval";
import { getCurrentTopographySector } from "../topography/topographyProps";

export const initiateTrees = (topography: Tuple[]): Tree[] => {
  const treeArray = [];
  let numTrees = Math.floor(Math.random() * 200);
  for (let i = 0; i < numTrees; i++) {
    const newTree: Tree = { point: [0, 0], size: 0 };
    newTree.size = 10 + Math.floor(Math.random() * 10);
    const treeX = Math.floor(Math.random() * canvasConstants.width);
    const currSector = getCurrentTopographySector({
      topography,
      currentX: treeX,
    });
    if (!currSector) continue;
    const { startPoint, endPoint } = currSector;
    const minY =
      getYForXInLine({
        point1: startPoint,
        point2: endPoint,
        currentX: treeX,
      }) -
      0.8 * newTree.size;
    const treeY =
      minY + Math.floor(Math.random() * (canvasConstants.height - minY));
    newTree.point = [treeX, treeY];
    treeArray.push(newTree);
  }
  return treeArray;
};

export const drawTrees = (
  ctx: CanvasRenderingContext2D,
  customProps: { trees: Tree[]; treeColor: string }
): void => {
  const { trees, treeColor } = customProps;
  for (let tree of trees) {
    drawTree(ctx, { ...tree, treeColor });
  }
};

const drawTree = (ctx: CanvasRenderingContext2D, tree: Tree): void => {
  const { point, size, treeColor } = tree;
  const [x, y] = point;
  ctx.beginPath();
  ctx.moveTo(x + size / 2, y);
  ctx.lineTo(x + size, 2 * size + y);
  ctx.lineTo(x, 2 * size + y);
  ctx.lineTo(x + size / 2, y);
  ctx.closePath();

  ctx.lineWidth = 1;
  ctx.strokeStyle = treeColor || "green";

  ctx?.stroke();
  ctx.fillStyle = treeColor || "green";
  ctx.fill();
};
