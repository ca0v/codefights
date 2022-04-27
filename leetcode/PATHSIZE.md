# Folder string

Convert the following string into a directed graph and report the 1st longest path name.

INPUT:

```
dir1
    child1
        child1
        child2
    child2
dir2
    child1
        ch1
            ch
```

Note that "dir2/child1/ch1/c1" is is the correct size but comes after the solution.
OUTPUT: dir1/child1/child2

## Solution

Observations

- Every newline not followed by a tab indicates a new root element
- The tab count related to the depth of the parent folder

Keep a breadcrumb type of a structure to manage the current folder context
For example, if the `context` is [root, c1, c1.c2] and we encounter `\n\t\tfoo`
Then we do this:
`\n` => i = -1 (null)
`\t` => i++ (root)
`\t` => i++ (c1)
`foo` => `context` -> [root, c1, foo], c1.children.push(c1)

Now if we encounter `\ndir2` we do this:
`\n` => i = -1 (null)
`dir2` => `context` -> [dir2], dirs.push(dir2)

It is an error if `i` exceeds the `context` capacity.

For this specific question, there is no need to maintain a directed graph but only the maximum context.
