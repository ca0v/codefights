# Solving Sudoku

Copilot is an amazing tool. By writing specific comments it found a performant solver and place it in my IDE.
As I started defining the missing helper functions, they too were added to the IDE. When I started writing my test inputs it generated the puzzle!

I realize these puzzles are a contrived case, but I see that Copilot will change the way we code for the better. It's really like having a junior developer inside your IDE.

The generated solution was much better than what I had in mind, so I won't bother talking about what I was originally going to code and instead discuss the solution as provided by copilot.

## Algorithm

1. Scan the puzzle for a non-solved cell
2. Iterate over the possible values 1-9 until you find a value that is valid for that cell. If no value is valid then the puzzle is unsolvable.
3. For each valid guess, assign that value to the cell and recursively try to solve the new puzzle until a solution is found.

## Links

- [Solution](./sudoku.js)

- [Copilot](https://copilot.github.com/)
