# Unique Paths

Solves https://leetcode.com/problems/unique-paths-iii

Here we have a starting and ending cell, cells we are not allowed to pass through and cells we must pass through.
The goal is to count the number of unique paths from the starting cell to the ending cell.

## Algorithm

Given the intial state of the board, the walker can either go left/right or up/down (a 4-walk).

1. Mark the starting location as restricted
2. For each neighboring cell that is not restricted, mark it as the starting cell and solve this new board
3. Return the total solution count
4. If there are no unrestricted neighbors then one of the neighbors must be the ending cell and there must be no unrestricted cells remaining, otherwise there is so solution (return 0)

[Solution](./uniquepaths.js)
