export function formatResult(value: number, maxLength: number): string {
  const str = String(value);
  if (str.length <= maxLength) {
    return str;
  }

  if (Math.abs(value) >= 10 ** (maxLength - 1)) {
    return value.toExponential(maxLength - 7);
  }

  return Number(value.toPrecision(maxLength - 2)).toString();
}
