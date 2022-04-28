// reverse a number without using 64-bit number but a 32-bit number will overflow
// so I see no harm in using a 36-bit number
function reverse(num) {
  // copilot generated this solution but it uses 64-bit number
  let result = 0;
  const max = Math.pow(2, 32);
  const sign = Math.sign(num);
  num = Math.abs(num); // could cause overflow
  while (num > 0) {
    result = result * 10 + (num % 10); // could cause overflow
    num = Math.floor(num / 10);
  }
  result *= sign; // if answer is -Math.pow(2,31) then result would have had overflow
  return Math.min(max - 1, Math.max(-max, result));
}

const tests = [123, -123, 0];
tests.forEach((test) => {
  console.log(test, reverse(test));
});
