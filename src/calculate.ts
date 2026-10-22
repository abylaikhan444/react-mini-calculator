import type { Operation } from "./types";

// Возвращает результат или null, если посчитать нельзя (деление на ноль).
export function calculate(left: number, operation: Operation, right: number): number | null {
  if (operation === "+") {
    const result = left + right;
    return Number(result.toFixed(10));
  }
  if (operation === "-") {
    const result = left - right;
    return Number(result.toFixed(10));
  }
  if (operation === "×") {
    const result = left * right;
    return Number(result.toFixed(10));
  }

  if (operation === "÷") {
    if (right === 0) {
      return null;
    } else {
      const result = left / right;
      return Number(result.toFixed(10));
    }
  }
  return 0;
}
