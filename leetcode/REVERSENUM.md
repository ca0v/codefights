# Reverse Number

The goal was to do this without using a 64-bit number so I did it with a (32+4) bit number.
The +4 comes from the fact that any number reversed is still less than 10x the original value and 4 bits covers up to 16x.
