function log(...args) {
  //console.log(...args);
}

function asLinkedList(arr) {
  let head = { val: arr[0] };
  let p = head;
  for (let i = 1; i < arr.length; i++) {
    p.next = { val: arr[i] };
    p = p.next;
  }
  return head;
}

function asArray(head) {
  const result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

// solves https://leetcode.com/problems/reverse-nodes-in-k-group/

function reverseNodesInKGroup(input, k) {
  if (!input) return null;
  if (k <= 1) return input;

  // seek a 1st item beyond the items being reversed
  let tail = input;
  let count = 0;
  while (tail && count++ < k) tail = tail.next;

  // not enough items to reverse
  if (count < k) return input;
  count = k;

  // step 1 is to point the 1st item to the tail
  let node1 = input;
  let node2 = node1.next;
  node1.next = tail;
  count--;

  // step 2 is to point the 2nd item to the 1st item
  let node3 = node2.next;
  node2.next = node1;
  count--;

  // now reverse remaining items
  while (count--) {
    log(asArray(node2));
    node1 = node2;
    node2 = node3;
    node3 = node3.next;
    node2.next = node1;
  }

  // repeat for remainder of the list
  input.next = reverseNodesInKGroup(tail, k);
  return node2;
}

// result is "BCD"
reverseNodesInKGroup(asLinkedList("ABCD".split("")), 2);

const tests = ["A", "AB", "ABC", "ABCD", "ABCDE", "ABCDEF", "ABCDEFG"].map(
  (v) => v.split("")
);

for (let k = 2; k <= 4; k++) {
  tests.forEach((test) => {
    const input = asLinkedList(test);
    const solution = reverseNodesInKGroup(input, k);
    console.log(k, test.join(""), "->", asArray(solution).join(""));
  });
}
