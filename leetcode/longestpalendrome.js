const tests = [
  ["", undefined],
  ["A", "A"],
  ["AA", "AA"],
  ["AB", "A"],
  ["AAB", "AA"],
  ["ABBA", "ABBA"],
  ["ABCBA", "ABCBA"],
  ["ABCBBA", "BCB"],
  ["XABAABABAABAY", "ABAABABAABA"],
];

tests.forEach((test) => {
  const [input, expected] = test;
  const actual = compute(input);
  if (actual != expected) console.log({ input, expected, actual });
  console.log(fastLongestPalindromes(input));
});

// return the longest palindrome in string, O(n^2)
function compute(str) {
  const results = [];
  const chars = str.split("");

  for (let i = 0; i < chars.length; i++) {
    // even case, like "abba"
    let j = 0;
    while (i - j >= 0 && i + j + 1 < chars.length) {
      if (chars[i - j] !== chars[i + j + 1]) {
        break;
      }
      results[i] = [i - j, i + j + 1];
      j++;
    }
    if (!results[i]) {
      // odd case, like "aba"
      j = 1;
      while (i - j >= 0 && i + j < chars.length) {
        if (chars[i - j] !== chars[i + j]) {
          break;
        }
        results[i] = [i - j, i + j];
        j++;
      }
    }
    if (!results[i]) results[i] = [i, i];
  }
  return results
    .filter((range) => !!range)
    .map((range) => str.substring(range[0], range[1] + 1))
    .sort((a, b) => b.length - a.length)[0];
}

// from https://www.akalin.com/longest-palindrome-linear-time, not correct?
function fastLongestPalindromes(seq) {
  const seqLen = seq.length;
  const l = [];
  let i = 0;
  let palLen = 0;
  let d = 0;
  // seq[(i - palLen):i] is a palindrome
  while (i < seqLen) {
    // extend the current palindrome if possible
    if (i > palLen && seq[i - palLen - 1] === seq[i]) {
      palLen += 2;
      i += 1;
      continue;
    }
    // palindrome is finished, record it
    l.push(palLen);

    const s = l.length - 2;
    const e = s - palLen;
    let resetLength = true;

    for (let j = s; j > e; j--) {
      d = j - e - 1;
      if (l[j] == d) {
        palLen = d;
        break;
      }
      resetLength = false;
      l.push(Math.min(d, l[j]));
    }

    if (resetLength) {
      palLen = 1;
      i += 1;
    }
    l.push(palLen);
  }

  const lLen = l.length;
  let s = lLen - 2;
  let e = s - (2 * seqLen + 1 - lLen);
  for (let i = s; i > e; i--) {
    l.push(Math.min(d, l[i]));
  }
  return l;
}
