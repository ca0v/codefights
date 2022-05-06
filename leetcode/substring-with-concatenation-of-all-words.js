function log() {}

// https://leetcode.com/problems/substring-with-concatenation-of-all-words/
/*
Input: s = "barfoothefoobarman", words = ["foo","bar"]
Output: [0,9]
Explanation: Substrings starting at index 0 and 9 are "barfoo" and "foobar" respectively.
The output order does not matter, returning [9,0] is fine too.
 */

function solve(s, words) {
  const result = [];
  const found = [];
  const len = words[0].length;
  // track what has been found and in what order
  // keep a fast lookup of the words found
  const map = {};
  let i = 0;
  while (i < s.length) {
    // get the word chunk
    const word = s.substring(i, i + len);
    // if it matches a word...
    if (words.some((w) => w === word)) {
      // add it to the queue
      found.push(word);
      // if we have not seen it mark it as found
      if (!map[word]) {
        log("found", i, word, found, map);
        map[word] = true;
        i += len;
      } else {
        log("already found", i, word, found, map);
        // if we have seen it, remove it and items left of it from the queue
        while (map[word]) {
          map[found[0]] = false;
          found.shift();
          log("forget", i, word, found, map);
        }
        // restore the flag cause it is still in the queue
        map[word] = true;
        i += len;
      }
      if (words.length === found.length) result.push(i - words.length * len);
    } else {
      // backtrack and try again
      log("miss", i, word, found, map);
      while (found.length) {
        i -= len;
        map[found.pop()] = false;
        log("backtracking", i, word, found, map);
      }
      i++;
    }
  }
  return result;
}

/*
 notice it finds "AB" and then jumps to "CD" and fails it must backtrack to consider "BC".
 notice that dups are possible so need a resource queue instead of a Set
*/
const tests = [
  { phrase: "ABCDEAB", words: ["AB", "BC", "DE"] },
  { phrase: "barfoothefoobarman", words: ["foo", "bar"] },
  { phrase: "barfoofoobarthefoobarman", words: ["bar", "foo", "the"] },
  {
    phrase: "wordgoodgoodgoodbestword",
    words: ["word", "good", "best", "good"],
  },
];
tests.forEach((test) => {
  log(test);
  console.log(solve(test.phrase, test.words));
});
