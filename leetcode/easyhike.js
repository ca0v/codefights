function log(...args) {
  //console.log(...args);
}

class Hike {
  cols = 0;
  rows = 0;
  topo = [[]];

  distances = [];

  constructor(topo) {
    this.cols = topo[0].length;
    this.rows = topo.length;
    this.topo = topo;
    // compute the distances to immediate neighbors
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (row > 0) {
          const distanceTo = Math.abs(
            this.getCell(row, col) - this.getCell(row - 1, col)
          );
          this.setDistanceTo(
            { r: row - 1, c: col },
            { r: row, c: col },
            distanceTo
          );
        }
        if (col > 0) {
          const distanceTo = Math.abs(
            this.getCell(row, col) - this.getCell(row, col - 1)
          );
          this.setDistanceTo(
            { r: row, c: col - 1 },
            { r: row, c: col },
            distanceTo
          );
        }
      }
    }
  }

  getCell(row, col) {
    return this.topo[row][col];
  }

  getNeighbors(row, col) {
    const result = [];
    const rows = [row - 1, row + 1].filter((r) => r >= 0 && r < this.rows);
    const cols = [col - 1, col + 1].filter((c) => c >= 0 && c < this.cols);
    log("neighbors", { row, col, rows, cols });
    rows.forEach((r) => {
      result.push({ r, c: col });
    });
    cols.forEach((c) => {
      result.push({ r: row, c });
    });
    return result;
  }

  indexOf(cell) {
    return cell.r * this.cols + cell.c;
  }

  cellOfIndex(index) {
    const row = Math.floor(index / this.cols);
    const col = index % this.cols;
    return { r: row, c: col };
  }

  setDistanceTo(cell1, cell2, distanceTo) {
    let index1 = this.indexOf(cell1);
    let index2 = this.indexOf(cell2);
    [index1, index2] = [Math.min(index1, index2), Math.max(index1, index2)];
    if (!this.distances[index1]) {
      this.distances[index1] = [];
    }
    this.distances[index1][index2] = distanceTo;
  }

  getDistanceTo(cell1, cell2) {
    let index1 = this.indexOf(cell1);
    let index2 = this.indexOf(cell2);
    [index1, index2] = [Math.min(index1, index2), Math.max(index1, index2)];
    if (!this.distances[index1]) {
      this.distances[index1] = [];
    }
    const distanceTo = this.distances[index1][index2];
    if (typeof distanceTo !== "number") return Number.MAX_SAFE_INTEGER;
    return distanceTo;
  }

  computeDistanceTo(cell1, cell2) {
    const row1 = Math.min(cell1.r, cell2.r);
    const col1 = Math.min(cell1.c, cell2.c);
    const row2 = Math.max(cell1.r, cell2.r);
    const col2 = Math.max(cell1.c, cell2.c);

    log("computeDistanceTo", cell1, cell2);

    if (row1 === row2 && col1 === col2) {
      return 0;
    }

    // find neighbors that can reach the target
    const neighbors = this.getNeighbors(row1, col1);
    log("Neighbors", neighbors.length);

    const candidates = neighbors.filter(
      (n) => this.getDistanceTo(n, cell2) < Number.MAX_SAFE_INTEGER
    );

    log("Candidates", candidates);

    const currentDistance = this.getDistanceTo(cell1, cell2);

    if (!candidates.length) {
      // compute a distance from a neighbor that are closer to the target
      let d;
      if (row1 === row2) {
        d = this.computeDistanceTo({ r: row1, c: col1 + 1 }, cell2);
      } else if (col1 === col2) {
        d = this.computeDistanceTo({ r: row1 + 1, c: col1 }, cell2);
      } else {
        d = this.computeDistanceTo({ r: row1 + 1, c: col1 }, cell2);
        d = this.computeDistanceTo({ r: row1, c: col1 + 1 }, cell2);
      }

      console.assert(d < Number.MAX_SAFE_INTEGER, d);
      log("recomputing");
      return this.computeDistanceTo(cell1, cell2);
    }

    const distances = candidates.map((n) =>
      Math.max(this.getDistanceTo(cell1, n), this.getDistanceTo(n, cell2))
    );

    log("distances", distances);

    const distance = Math.min(...distances);

    if (distance < currentDistance) {
      this.setDistanceTo(cell1, cell2, distance);
      // recompute neighbors
      neighbors.forEach((n) => this.computeDistanceTo(n, cell2));
    }
    return distance;
  }
}

function solve(topo) {
  const hike = new Hike(topo);
  if (!hike.rows || !hike.cols) return;

  const distances = hike.distances;
  distances.forEach((fromCells, from) => {
    fromCells.forEach((distance, to) => {
      if (distance === undefined) return;
      log(`${from}->${to}: ${distance}`);
    });
  });

  const from = { r: 0, c: 0 };
  const to = { r: hike.rows - 1, c: hike.cols - 1 };
  const solution = hike.computeDistanceTo(from, to);

  console.log({ from, to, solution });
}

const tests = [
  [[]],
  [[1]],
  [
    [1, 2],
    [3, 1],
  ],
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  [
    [1, 2, 3],
    [6, 5, 4],
    [7, 8, 9],
  ],
];
tests.forEach((test) => solve(test));
