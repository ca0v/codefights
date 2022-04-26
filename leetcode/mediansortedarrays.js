const enableLogging = process.argv.includes("--log");

function log(...message) {
  enableLogging && console.log(...message);
}

function indexOfLessThan(nums1, value, left = 0, right = nums1.length - 1) {
  // binary search a sorted list to find the left index of the value
  const mid = (left + right) >> 1;
  log("indexOfLessThan", { nums1, value, left, right, mid });
  if (nums1[mid] === value || left >= right) {
    return mid;
  }
  if (nums1[mid] > value) {
    return indexOfLessThan(nums1, value, left, mid - 1);
  }
  const result = indexOfLessThan(nums1, value, mid + 1, right);
  // if the result is equal or too large then return the item to the left (which will be too small)
  return result - (nums1[result] >= value);
}

function findMedianSortedArrays(nums1, nums2) {
  // this has to be done in O(log(n+m)) time but here is O(n+m) solution
  let i1 = 0;
  let i2 = 0;
  const leftEdge = (nums1.length + nums2.length - 1) >> 1;
  const rightEdge = (nums1.length + nums2.length) >> 1;
  const isEven = leftEdge < rightEdge;
  log({ leftEdge, rightEdge });

  while (i1 + i2 < rightEdge) {
    // skip to the largest item still less than the current largest item
    if (nums1[i1] < nums2[i2]) {
      i1 = indexOfLessThan(nums1, nums2[i2], i1);
      i1++;
    } else if (nums1[i1] > nums2[i2]) {
      i2 = indexOfLessThan(nums2, nums1[i1], i2);
      i2++;
    }

    log(i1, i2, nums1[i1], nums2[i2]);

    if (i1 >= nums1.length) {
      i2 = rightEdge - i1;
      break;
    }
    if (i2 >= nums2.length) {
      i1 = rightEdge - i2;
      break;
    }
  }
  log(i1, i2, nums1[i1], nums2[i2]);
  if (i1 >= nums1.length) {
    if (!isEven) return nums2[i2];
    if (i2 > 0) {
      return (nums2[i2 - 1] + nums2[i2]) / 2;
    } else {
      return (nums1[i1 - 1] + nums2[i2]) / 2;
    }
  }
  if (i2 >= nums2.length) {
    if (!isEven) return nums1[i1];
    if (i1 > 0) {
      return (nums1[i1 - 1] + nums1[i1]) / 2;
    } else {
      return (nums1[i1] + nums2[i2 - 1]) / 2;
    }
  }
  return isEven ? (nums1[i1] + nums2[i2]) / 2 : Math.max(nums1[i1], nums2[i2]);
}

const tests = [
  [[], [4, 5, 6], 5],
  [[1], [4, 5, 6], 4.5],
  [[1, 2, 3], [4, 5, 6], 3.5],
  [[1, 2, 3, 4], [5, 6, 7], 4],
];
tests.forEach((test) => {
  log(test);
  console.log(`${test[2]} = ${findMedianSortedArrays(test[0], test[1])}`);
});
