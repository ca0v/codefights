# LONGESTPALENDROME

Give a string of characters find the longest string that is equal to itself when reversed.

## Examples

| Input          | Answer          |
| -------------- | --------------- |
| ""             | ""              |
| "A"            | "A"             |
| "AB"           | "A" and "B"     |
| "AAB"          | "AA"            |
| "BAAB"         | "BAAB"          |
| "ABAB"         | "ABA" and "BAB" |
| "ABCDCBBCDCBB" | "BCDCBBCDCB"    |

### Brute Force solution

Consider each position, grow from center
INPUT: "ABCDCBXXBCDCBB"

```
ABCDCBXXBCDCBB
A
 B
  C
 BCDCB
    C
     B
      X
 BCDCBXXBCDCB
        B
         C
        BCDCB
```

## Solving

INPUT: "ABCDCBXXBCDCBB"
Consider `A` the best solution so far.
Cannot be any larger, so now consider `A` + `B` + `A`. No "ABA" so move on.
Consider `C`.
Consider `B` + `C` + `B`. No "BCB" so move on.
Consider `D`.
Consider `C` + `D` + `C`. Success, `CDC` is new solution.
Consider `B` + `CDC` + `B`. Success, `BCDCB` is new solution.
Consider `A` + `BCDCB` + `A`. No "ABCDCBA" so move on.
Consider `BCDCB` + `X` + `BCDCB`. No "BCDCBXBXDCB" so move on.
Consider `X` + `X` + `X`. No, but `X` = `X` so "XX" is a local solution.
Consider `BCDCB` + `XX` + `BCDCB`.

### Is there a dynamic solution?

Compute the longest palendrome about a position i for each position of the string.

| i   | longest                        |
| --- | ------------------------------ |
| 0   | [0]                            |
| 1   | [0,1,2]                        |
| k   | [0..k-1] + [k] + [k+1..2k - 1] |
| k+1 | 2k+1, how use prior answer?    |
