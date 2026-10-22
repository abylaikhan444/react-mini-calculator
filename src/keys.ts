import type { KeyConfig } from "./types";

export const KEYS: KeyConfig[] = [
  { label: "C", kind: "clear", ariaLabel: "сбросить" },
  { label: "+", kind: "operation", ariaLabel: "сложить" },
  { label: "×", kind: "operation", ariaLabel: "умножить" },
  { label: "÷", kind: "operation", ariaLabel: "делить" },
  { label: "7", kind: "digit", ariaLabel: "7" },
  { label: "8", kind: "digit", ariaLabel: "8" },
  { label: "9", kind: "digit", ariaLabel: "9" },
  { label: "-", kind: "operation", ariaLabel: "вычесть" },
  { label: "4", kind: "digit", ariaLabel: "4" },
  { label: "5", kind: "digit", ariaLabel: "5" },
  { label: "6", kind: "digit", ariaLabel: "6" },
  { label: ".", kind: "dot", ariaLabel: "точка" },
  { label: "1", kind: "digit", ariaLabel: "1" },
  { label: "2", kind: "digit", ariaLabel: "2" },
  { label: "3", kind: "digit", ariaLabel: "3" },
  { label: "=", kind: "equals", ariaLabel: "равно" },
  { label: "0", kind: "digit", ariaLabel: "0" },
];
