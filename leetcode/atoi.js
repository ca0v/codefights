function atoi(a) {
  let result = parseInt(a);
  const max = Math.pow(2, 31);
  return Math.min(Math.max(result, -max), max - 1);
}
