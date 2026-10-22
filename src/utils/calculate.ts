import type { Operation } from "../types/types";

// Возвращает результат или null, если посчитать нельзя (деление на ноль).
export function calculate(left: number, operation: Operation, right: number): number | null {
  if (operation === "÷" && right === 0) return null;

  let result: number;
  switch (operation) {
    case "+":
      result = left + right;
      break;
    case "-":
      result = left - right;
      break;
    case "×":
      result = left * right;
      break;
    case "÷":
      result = left / right;
      break;
  }

  return Number(result.toFixed(10));
}
