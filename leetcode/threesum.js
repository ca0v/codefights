function threesum(values) {
  const result = [];
  const sorted = values.sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i++) {
    let value = values[i];
    const sums = twosum(sorted, 0 - value, i + 1);
    sums.forEach((s) => result.push([i, ...s]));
  }

  const solutions = [];
  result.forEach(
    ([i, j, k]) => (solutions[`${sorted[i]} ${sorted[j]} ${sorted[k]}`] = true)
  );
  return Object.keys(solutions).map((s) => s.split(" ").map(Number));
}

function twosum(values, sum, start = 0) {
  const result = [];
  for (let i = start; i < values.length; i++) {
    let value = values[i];
    const j = find(values, sum - value, i + 1);
    if (j > i) result.push([i, j]);
  }
  return result;
}

// binary search values for value
function find(values, value, start = 0) {
  let end = values.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (values[mid] === value) {
      return mid;
    }
    if (values[mid] < value) {
      start = mid + 1;
    }
    if (values[mid] > value) {
      end = mid - 1;
    }
  }
  return -1;
}

const tests = [
  [-1, 0, 1, 2, -1, -4],
  [0, 0, 0, 0, 0, 0, 1, -1, 7, -3, -4, 2, 1],
];
tests.forEach((test) => {
  console.log(threesum(test));
});
