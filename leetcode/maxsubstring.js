const tests = ["bbbbb", "aab", "abcabcbb", "bbbbb", "pwwkew", "au", "", "a"];

function log(...message) {
    //console.log(...message);
}

function maximumSubstring(list) {
  if (!list) return "";
  let head = 0;
  let tail = 1;
  let answer = list[0];
  let bestAnswer = answer;
  while (tail < list.length) {
    const dupIndex = answer.indexOf(list[tail]);
    if (dupIndex === -1) {
      answer += list[tail];
    } else {
      head += dupIndex + 1;
      log("move head to", head, tail);
      answer = list.substring(head, tail + 1);
    }
    log("answer", answer);
    if (answer.length > bestAnswer.length) {
      bestAnswer = answer;
      log("best", bestAnswer);
    }
    tail++;
    log("move tail to", tail, head);
  }
  return bestAnswer;
}

tests.slice(0, 20).forEach((t) => console.log(t, maximumSubstring(t)));
