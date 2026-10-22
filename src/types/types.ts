export type Operation = "+" | "-" | "×" | "÷";

export type KeyKind = "digit" | "operation" | "dot" | "equals" | "clear";

export type KeyConfig = {
  label: string;
  kind: KeyKind;
  ariaLabel: string;
};
