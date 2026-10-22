// Служебные символы в научной записи: минус (1) + целая цифра (1) + точка (1) + "e+XX" (4)
const EXPONENTIAL_OVERHEAD = 7;
// Резерв под нечисловые символы при обычном выводе: знак минус "-" и точка "."
const PRECISION_OVERHEAD = 2;

export function formatResult(value: number, maxLength: number): string {
  const str = String(value);
  if (str.length <= maxLength) {
    return str;
  }

  if (Math.abs(value) >= 10 ** (maxLength - 1)) {
    const fractionDigits = Math.max(maxLength - EXPONENTIAL_OVERHEAD, 0);
    return value.toExponential(fractionDigits);
  }

  const precision = Math.max(maxLength - PRECISION_OVERHEAD, 1);
  return Number(value.toPrecision(precision)).toString();
}
