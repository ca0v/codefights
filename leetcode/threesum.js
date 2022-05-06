const tests = [
  [1, 3, 4, 5],
  [-2, -1, 0, 1, 2, 3],
];

tests.forEach((test) => {
  console.log(threeSum(test));
});

/**
 * I see now way to speed this up nor why the fastest solution is so 10% faster
 * I'll assume the test server was having a good day
 * Copilot walked me through the solution
 */
function threeSum(nums, sum = 0) {
  nums = nums.sort((a, b) => a - b, 0);
  const result = [];
  const size = nums.length;
  for (let i = 0; i < size; i++) {
    const a = nums[i];
    if (a > sum) break;
    if (i > 0 && nums[i - 1] === a) continue;
    let j = i + 1;
    let k = size - 1;
    while (j < k) {
      const b = nums[j];
      const c = nums[k];
      const val = a + b + c;
      if (sum === val) {
        result.push([a, b, c]);
        while (j < k && nums[j] === nums[++j]);
        while (k > j && nums[k] === nums[--k]);
      } else if (val < sum) j++;
      else k--;
    }
  }
  return result;
}
