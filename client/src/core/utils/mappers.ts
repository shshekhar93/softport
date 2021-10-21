export function fixedDigitsStr(num: number, digits: number = 2) {
  const adder = Math.pow(10, digits);
  num += adder;
  return ('' + num).substring(1);
}
