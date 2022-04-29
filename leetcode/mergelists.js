function log(...args) {
  console.log(...args);
}

// merge k sorted lists as implemented by copilot :)
// https://leetcode.com/problems/merge-k-sorted-lists/

function mergeKLists(lists) {
  if (!lists.length) return null;
  if (lists.length === 1) return lists[0];
  let mid = Math.floor(lists.length / 2);
  let left = lists.slice(0, mid);
  let right = lists.slice(mid);
  log({ lists, left, right });
  return mergeTwoLists(mergeKLists(left), mergeKLists(right));
}

function mergeTwoLists(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  let head = new ListNode(0);
  let cur = head;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = new ListNode(l1.val);
      l1 = l1.next;
    } else {
      cur.next = new ListNode(l2.val);
      l2 = l2.next;
    }
    cur = cur.next;
  }
  cur.next = l1 || l2;
  return head.next;
}

class ListNode {
  val;
  next;
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function asList(arr) {
  let head = new ListNode(0);
  let cur = head;
  for (let i = 0; i < arr.length; i++) {
    cur.next = new ListNode(arr[i]);
    cur = cur.next;
  }
  return head.next;
}

const tests = [
  [
    [1, 4, 5],
    [1, 3, 4],
    [2, 6],
  ],
];

tests.forEach((test) => {
  const input = test.map(asList);
  console.log({ input });
  const result = mergeKLists(input);
  let head = result;
  const output = [];
  while (head) {
    output.push(head.val);
    head = head.next;
  }
  console.log({ input, output });
});
