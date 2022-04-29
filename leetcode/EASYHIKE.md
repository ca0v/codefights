# Easy Hike

Given a topo map like this,

```
4 2 3 2 3
5 5 6 4 4
6 5 4 2 3
```

Find a route from the top-left to the bottom-right that minimizes the maximum elevation change between neighboring cells.
You can only move up/down and left/right.

## Solution

Given a topo map like this,

```
A B
C D
```

There are two routes: ABD and ACD
The cost of AB is Min(ACDB, abs(A-B))
The cost of AC is Min(ABDC, abs(A-C))
The cost of BD is abs(B-D)
The cost of CD is abs(C-D)
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

Compute AI using BI and CI
Compute BI using EI and DI
Compute CI using DI and GI
Compute EI using FI
Compute DI using FI and HI
Compute GI using HI
Compute FI using DI (a cycle)
Compute HI using DI (a cycle)

### Might be Correct

I do not have an efficient solution. Presently I am doing this:

computeDistanceTo(A, B) =>
get neighbors of A
for each neighbor, N, getDistanceTo(N, B)
if no neighbors have a distance to B then
if no neighbors are between A and B then there is no solution
for each neighbor, N, that is between A and B, computeDistanceTo(N, B)
return computeDistanceTo(A, B)
for each neighbor, N, get Max(distanceTo(A,N), distanceTo(N, B))
setDistanceTo(A, B, Min(getDistanceTo(A,B), distances through neighbors))
