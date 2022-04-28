# Reverse Number

The goal was to do this without using a 64-bit number so I did it with a (32+4) bit number.
The +4 comes from the fact that any number reversed is still less than 10x the original value and 4 bits covers up to 16x.

When I looked at the other solutions, one stood out that use Number() instead of parseInt().
Casting a string to a number is much faster than parsing test to divine a number.

The solution I re-submitted went from faster than 54% of the solutions to faster than 93% of the solutions:

```
function reverse(x: number): number {
    const max = Math.pow(2, 31);
    const sign = Math.sign(x);
    x = Math.abs(x);
    const result = Number((x+"").split("").reverse().join("")) * sign;
    if (result > max - 1) return 0;
    if (result < -max) return 0;
    return result;
};
```
