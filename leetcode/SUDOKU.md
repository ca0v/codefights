# Solving Sudoku

Copilot is an amazing tool. By writing specific comments it was able find a performant solver and place it in my IDE.
As I started defining the missing helper functions, they to were added to the IDE.

I realize these puzzles are a contrived case, but I see that it will change the way we code for the better. It's really like having a junior developer inside your IDE.

The generated solution was much better than what I had in mind, so I won't bother talking about what I was originally going to code and instead discuss the solution as provided by copilot.

## Solution

You scan the puzzle for a non-solved cell, you iterate over the possible values 1-9 until you find a value that is valid for that cell.

If no value is valid then the puzzle is unsolvable.

For each valid guess, assign that value to the cell and recursively try to solve the new puzzle until a solution is found.

You can view the code [here](./sudoku.js)
