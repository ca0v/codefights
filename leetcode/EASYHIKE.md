# Easy Hike

Given a topo map like this,

```
4 2 7 6 5
5 5 6 4 4
6 5 4 2 3
```

Find a route from the top-left to the bottom-right that minimizes the maximum elevation change between neighboring cells.
You can only move up/down and left/right.

4->5->5->6->7->6->5->4->3 is one solution with an effort of 1
4->5->6->5->5->6->7->6->5->4->3 is another solution with effort of 1

All other paths have an effort > 1.

## Solution

Given a topo map like this,

```
A B
C D
```

There are two routes: ABD and ACD
The cost of AB is abs(A-B), coming from D is not an option
The cost of AC is abs(A-C), coming from D is not an option
The cost of BD is abs(B-D), returning to A is not an option
The cost of CD is abs(C-D), returning to A is not an option
The cost of ABD is max(AB, BD)
The cost of ACD is max(AC, CD)
The cost of AD is max(ABD, ACD)

If we expand the map, we can see that there is an AD that goes through CGH or BEF

```
A B E
C D F
G H I
```

The goal is now to get to `I` but it is possible we must pass through `D` so we must re-compute `AD`.

Also, the formula for computing `D` is much harder because there are now 4 ways to solve `AD`.
ABD, ABEFD, ACD, ACGHD

### Might be Correct

I could only devise a responsive solution that recomputes neighbors each time a local minimum is found.
I do not know how to put a time bound on it but I think it is at least O(n^3).

Presently I am doing this,

computeDistanceTo(A, B) =>
get neighbors of A
for each neighbor, N, getDistanceTo(N, B)
if no neighbors have a distance to B then
if no neighbors are between A and B then there is no solution
for each neighbor, N, that is between A and B, computeDistanceTo(N, B)
return computeDistanceTo(A, B)
for each neighbor, N, get Max(distanceTo(A,N), distanceTo(N, B))
setDistanceTo(A, B, Min(getDistanceTo(A,B), distances through neighbors))
