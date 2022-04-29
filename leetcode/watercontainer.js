// O(n*n)
function solve(waterbars) {
  let maxVolume = 0;
  let maxLeft = waterbars[0];
  for (let i = 0; i < waterbars.length; i++) {
    if (maxLeft > waterbars[i]) continue; // simple optimization
    maxLeft = waterbars[i];
    for (let j = waterbars.length - 1; j > i; j--) {
      const volume = (j - i) * Math.min(waterbars[i], waterbars[j]);
      maxVolume = Math.max(maxVolume, volume);
      if (waterbars[j] > maxLeft) break; // simple optimization
    }
  }
  return maxVolume;
}

const tests = [[1, 8, 6, 2, 5, 4, 8, 3, 7]];

tests.forEach((test) => {
  const result = solve(test);
  console.log(test, result);
});

// O(n)
function maxArea(height) {
  let volume = 0;
  let left = 0;
  let right = height.length - 1;
  while (left < right) {
    volume = Math.max(
      volume,
      (right - left) * Math.min(height[left], height[right])
    );
    if (height[left] < height[right]) left++;
    else right--;
  }
  return volume;
}
