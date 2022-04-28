# ATOI

My submitted solution did not use ParseInt, but the solution [here](./atoi.js) does.

There is not much to say about it unless you restrict parseInt to a single character:

```
function myAtoi(s: string): number {
    const max = Math.pow(2,31) - 1;
    const min = -Math.pow(2,31);

    s = s.trim();
    const isNeg = s[0] === "-";
    const isPos = s[0] === "+";
    let i = isNeg ? 1 : isPos ? 1 : 0;
    let result = 0;

    while (i<s.length && '0' <= s[i] && s[i] <= '9') {
        result = 10 * result + parseInt(s[i]);
        if (result > max) break;
        i++;
    }

    if (isNeg) result = -result;
    if (min > result) return min;
    if (max < result) return max;
    return result;
};
```

The key part to this solution is to shift the result left via the 10x multiplier.
