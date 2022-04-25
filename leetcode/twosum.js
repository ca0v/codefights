function twoSum(nums, target) {
  // faster than nested looping?
  // sort the array and advance from left and right until solution found
  // but how to remember original index values?
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const sum = nums[i] + nums[j];
      if (sum === target) return [i, j];
    }
  }
  return [];
}

const tests = [{ nums: [2, 7, 11, 15], target: 9 }];

tests.forEach((test) => console.log(twoSum(test.nums, test.target)));
