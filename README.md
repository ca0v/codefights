# Code Fights

Coding challenge solutions and notes

## Leetcode - Median of two Sorted Arrays

Find the median of the values in two separated sorted lists in O(log(n+m)) time.
The nieve solution runs in O(n+m) time and incrementally scans both lists from the left until the midpoint is found.
An advancement of that would be to replace the incremental search with a binary search.

INPUT: List 1 (l1) and List 2 (l2), both sorted
OUTPUT: Median value

INPUT: [], []
output: NaN

INPUT: [], [1]
output: 1

INPUT: [], [1,2]
output: 1.5

INPUT: [1], [2]
output: 1.5

INPUT: [1], [2,3]
output: 2

INPUT: [1,2], [3,4]
output: 2.5

## How to implement this?

Assume: size(l1) >= size(l2)

- Make a guess for a median, ith, at position i in l1
- How many items in l1 + l2 are less than ith?
- How many items in l1 + l2 are greater than ith?
- If there are more items less than the ith then those that are greater then i is too large
- Likewise, i can be too small
- Modify i by some amount
- Repeat until the number to the left of the ith element is equal to the number to the right
- This is a Log(n) \* Log(m) solution, which is the same as Log(n+m).

## Example 1

INPUT: [B,D], [A,C]
OUTPUT: (B+C)/2

Guess: i = 0

- In O(log(n)) time, get the count lesser than B: 1
- In O(1) time, get the count greater than B: 2
- 1 less, 2 greater so move right by `FLOOR((greater-lesser)/2)` = 0
- No movement, so answer computed from either BD or BA (because greater > lesser)
- We want the smaller of D and A unless A is less than B, `A < B ? D : Min(B,D)`

## Example 1

INPUT: [A,B,D,E], [C]
OUTPUT: C

Guess: i = 1

- In O(log(n)) time, get the count lesser than B: 1
- In O(1) time, get the count greater than B: 3
- 1 lesser, 3 greater so move right by `FLOOR((greater-lesser)/2)` = 1
- i = 2
- get count lesser than D: 3
- get count greater than D: 1
- 3 lesser, 1 greater so move right by `FLOOR((greater-lesser)/2)` = -1
- i = 1 again :(
- No movement, so answer computed from either BD or BA (because greater > lesser)
- We want the smaller of D and A unless A is less than B, `A < B ? D : Min(B,D)`
