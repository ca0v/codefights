// solves https://leetcode.com/problems/reverse-nodes-in-k-group/
// the copilot solution does not make sense, count is ignored

function reverseNodesInKGroup(head, k) {
  if (!head) return null;
  if (k === 1) return head;
  const fakeHead = { next: head };
  let x = fakeHead;
  let y = head;
  let count = 0;

  while (true) {
    // find y, the node after the kth node
    while (y && count++ < k) y = y.next;
    if (!y) break; // nothing changes

    // step 1 is to point the head to "last" node
    let e = head;
    let f = e.next;
    e.next = y;

    // step 2 is to reverse the k nodes
    let g = f.next;
    f.next = e;

    // reverse remaining items
    while (g != y) {
      e = f;
      f = g;
      g = g.next;
      f.next = e;
    }

    // final step
    x.next = f;
    x = f; // the node before y
  }
  return fakeHead.next;
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

const tests = ["THIS IS A TEST".split("")];

tests.forEach((test) => {
  const input = asLinkedList(test);
  console.log(input);
  const solution = reverseNodesInKGroup(input, 3);
  console.log(test, asArray(solution));
});
