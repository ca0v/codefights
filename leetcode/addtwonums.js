function log(...message) {
  //console.log(...message);
}

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
  val;
  next;
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbers(l1, l2, overflow) {
  log("addTwoNumbers", l1, l2, overflow);
  // nothing left to add, return any overflow or null
  if (!l1 && !l2) return overflow ? new ListNode(overflow) : null;

  let sum = overflow || 0;

  // there is still an l1 value, accumulate and advance pointer
  if (l1) {
    sum += l1.val;
    l1 = l1.next;
  }

  // there is still an l2 value, accumulate and advance pointer
  if (l2) {
    sum += l2.val;
    l2 = l2.next;
  }

  // drop the ones place and shift to compute overflow
  overflow = Math.floor(sum / 10);

  // compute the value and child nodes
  return new ListNode(sum % 10, addTwoNumbers(l1, l2, overflow));
}

const tests = [[asList([2, 4, 3]), asList([5, 6, 4])]];

function asList(nums) {
  const list = new ListNode(nums[0]);
  let current = list;
  for (let i = 1; i < nums.length; i++) {
    current.next = new ListNode(nums[i]);
    current = current.next;
  }
  return list;
}

tests.forEach((test) => console.log(test, addTwoNumbers(test[0], test[1], 0)));
