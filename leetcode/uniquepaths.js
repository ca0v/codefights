// unique-paths, this solution is twice as slow as the best submission.  Why?

/**
 * @param {number[][]} grid
 * @return {number}
 */
function uniquePathsIII(grid) {
  // find the starting cell
  const start = findCell(grid, 1);
  if (!start) return 0;

  // find empty neighbors
  const neighbors = findNeighbors(grid, start);

  const emptyCells = neighbors.filter((cell) => grid[cell[0]][cell[1]] === 0);

  // if no empty neighbors, did we find a solution?
  if (!emptyCells.length) {
    // the neighbor is either the ending square or there is no solution
    const finalCells = findNeighbors(grid, start).filter(
      (cell) => grid[cell[0]][cell[1]] === 2
    );
    if (!finalCells.length) return 0;
    // if the neighbor is an ending square but there are empty cells then there is no solution
    if (findCell(grid, 0)) return 0;
    return 1;
  }

  // reduce the puzzle by marking current cell as an obsticle
  grid[start[0]][start[1]] = -1;

  // now solve for each puzzle where the empty neighbor begins the starting cell
  let solutions = 0;
  emptyCells.forEach((emptyCell) => {
    grid[emptyCell[0]][emptyCell[1]] = 1;
    solutions += uniquePathsIII(grid);
    grid[emptyCell[0]][emptyCell[1]] = 0;
  });

  return solutions;
}

function findCell(grid, val) {
  const cols = grid.length;
  const rows = grid[0].length;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] === val) return [i, j];
    }
  }
  return false;
}

function findNeighbors(grid, cell) {
  const maxCol = grid.length - 1;
  const maxRow = grid[0].length - 1;
  const [col, row] = cell;
  const result = [];
  if (0 <= col - 1) result.push([col - 1, row]);
  if (col + 1 <= maxCol) result.push([col + 1, row]);
  if (0 <= row - 1) result.push([col, row - 1]);
  if (row + 1 <= maxRow) result.push([col, row + 1]);
  return result;
}

// this is the fastest solution submitted
/**
 * @param {number[][]} grid
 * @return {number}
 */
var fastUniquePathsIII = function (grid) {
  var output = 0;
  var [seen, obsLen, startIdxs] = makeSeen(grid);
  var maxSeen = grid.length * grid[0].length - 1 - obsLen;
  var currSeen = 0;
  var dfs = (i, j) => {
    // ensure in boundary and not seen before
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[i].length || seen[i][j])
      return;
    // ensure not an obstacle
    if (grid[i][j] === -1) return;
    // valid path check
    if (grid[i][j] === 2 && maxSeen === currSeen) {
      output++;
      return;
    } else if (grid[i][j] === 2 && maxSeen !== currSeen) {
      return;
    }
    // valid empty space mark it as seen
    seen[i][j] = true;
    currSeen = currSeen + 1;

    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);

    // back track
    seen[i][j] = false;
    currSeen = currSeen - 1;
  };

  dfs(startIdxs[0], startIdxs[1]);

  return output;
};

// returns an array that will contain the seen matrix, number of obstacles found and the starting point of the grid
var makeSeen = (grid) => {
  var s = [];
  var numberOfObstacles = 0;
  var start = [-1, -1];
  for (let i = 0; i < grid.length; i++) {
    s.push([]);
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === -1) numberOfObstacles++;
      if (grid[i][j] === 1) start = [i, j];
      s[s.length - 1].push(false);
    }
  }

  return [s, numberOfObstacles, start];
};

// 1) bruteforce to find the unique starting cell
// 2) dfs with backtracking find all pall from starting to ending cell
