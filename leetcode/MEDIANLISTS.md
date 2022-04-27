# Code Fights

Coding challenge solutions and notes

## Leetcode - Median of two Sorted Arrays

Find the median of the values in two separated sorted lists in O(log(n+m)) time.
The nieve solution runs in O(n+m) time and incrementally scans both lists from the left until the midpoint is found.
An advancement of that would be to replace the O(n) incremental search with a O(log(n)) binary search.

INPUT: List 1 and List 2 are both sorted
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

Assume: size(A) >= size(B)

- Make a guess for a median, ith, at position `i` in A
- How many items in A + B are less than ith?
- How many items in A + B are greater than ith?
- If there are more items less than the ith then those that are greater then `i` is too large
- Likewise, i can be too small
- Modify i by some amount
- Repeat until the number to the left of the ith element is equal to the number to the right
- This is a Log(|A|) \* Log(|B|) solution, which is the same as Log(|A|+|B|).

We are looking for the location in list A and list B where, if the lists were merged, one of the following sequences would exist:

| Sequence    | Scenario                            |
| ----------- | ----------------------------------- |
| Ai,Aj,Bm,Bn | All B items are right of the median |
| Ai,Bm,Aj,Bn | Interleave near the median          |
| Bm,Ai,Aj,Bn | Interleave near the median          |
| Bm,Ai,Bn,Aj | Interleave near the median          |
| Ai,Bm,Bn,Aj | Interleave near the median          |
| Bm,Bn,Ai,Aj | All A items are right of the median |

Define `j = i + 1`
Define `n = m + 1`
Define `L` as the combined size of list A and B

Consider these two sorted lists: [A0,A1,A2,A3,A4], [B0,B1,B2,B3,B4]
L = 10
We can clearly see that if i = 2 then m = 2 so try this definition:
`m = ceil(L / 2) - (i + 1)`

Quick study to show this formula makes sense, at least when both lists are of equal size and odd:

| i   | m = 4 - i |
| --- | --------- |
| 0   | 4         |
| 2   | 2         |
| 4   | 0         |

Once again with an asymetic configuration:

Consider these two sorted lists: [A0,A1], [B0,B1,B2,B3,B4]
L = 7

Does it still make sense?

| i   | m = Ceil(7/2) - (i+1) = 3-i |
| --- | --------------------------- |
| 0   | 3                           |
| 1   | 2                           |

Modify `i` to find the interleave or until we determine no interleave is possible.

Interleave found? The median can be computed from the 1st and 2nd items in this sorted list:
[Ai,Aj,Bm,Bn].sort()

## Example 1

INPUT: [B,D], [A,C]
OUTPUT: (B+C)/2

L = 2 + 2 = 4

| i   | m = Ceil(L/2) - (i+1) |
| --- | --------------------- |
| 0   | 1                     |
| 1   | 0                     |

Interleave found at 0,1 since A < B < C
Compute median using first two items in [B,D,A,C].sort().

## Example 2a - A contains no median values

INPUT: [], [A,B,C,D,E]
OUTPUT: C

## Example 2a - A contains no median values

INPUT: [A], [B,C,D,E]
OUTPUT: C

## Example 2a - A contains no median values

INPUT: [A,E], [B,C,D]
OUTPUT: C

## Example 2a - A contains one median

INPUT: [C], [A,B,D,E]
OUTPUT: C

L = 1 + 4 = 5

| i   | m = Ceil(L/2) - (i+1) |
| --- | --------------------- |
| 0   | 2                     |

Interleave found at 0,2 since B < C < D
Median must be C

## Example 2b - A contains one median

INPUT: [C,F], [A,B,D,E]
OUTPUT: (C+D)/2

L = 2 + 4 = 6

| i   | m = Ceil(L/2) - (i+1) |
| --- | --------------------- |
| 0   | 2                     |
| 1   | 1                     |

Interleave found at 0,2 since B < C < D
Median is median of [C,D]

## Example 2b - A contains two medians

INPUT: [C,D], [A,B,E,F]
OUTPUT: (C+D)/2

## Example 2c - List A bookends

INPUT: [A,F], [B,C,D,E]
OUTPUT: (C+D)/2

L = 2 + 4 = 6

| i   | m = Ceil(L/2) - (i+1) |
| --- | --------------------- |
| 0   | 2                     |
| 1   | 1                     |

Interleave not found at 0,2 since A < C
Interleave not found at 1,1 since F > D
No interleave exists, i = -1 or 2?
If -1 then m = 3, if 2 then m = 0, both are bad choices unless we say `m_low < median index < m_hi`

Median is median of [C,D]

## Example 3 - List A left of median

INPUT: [A,B], [C,D,E,F]
OUTPUT: (C+D)/2

L = 2 + 4 = 6

| i   | m = Ceil(L/2) - (i+1) |
| --- | --------------------- |
| 0   | 2                     |
| 1   | 1                     |
| 2   | 0                     |

No interleave found, since A < D and B < C, median must exist in list `B`, i must be 2 so m = 0
This is a `A` < median scenario we need to use `m` and `m+1`,

## Example 3 - List A right of median

INPUT: [G,H], [C,D,E,F]
OUTPUT: (E+F)/2

L = 2 + 4 = 6

| i   | m = Ceil(L/2) - (i+1) |
| --- | --------------------- |
| -1  | 3                     |
| 0   | 2                     |
| 1   | 1                     |

No interleave found, since G > D and (therefore) H > C, median must exist in list `B`, i must be -1 so m = 3
This is a `A` > median scenario we need to use `m` and `m-1`.
