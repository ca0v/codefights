// roman -> decimal
function solve(romanNumeral) {
  const tokens = romanNumeral;
  const romanToDecimal = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;
  let prev = 0;
  for (let i = tokens.length - 1; i >= 0; i--) {
    const v = romanToDecimal[tokens[i]];
    result += v < prev ? -v : v;
    prev = v;
  }
  return result;
}

const tests = ["I", "II", "III", "IV", "VI", "IX", "LVIII", "MCMXCIV", "MMMCMXCIX"];

tests.forEach((test) => {
  const solution = solve(test);
  console.log(`${test} -> ${solution}`);
});
