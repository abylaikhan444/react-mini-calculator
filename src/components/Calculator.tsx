import { useState } from "react";
import type { KeyConfig, Operation } from "../types/types";
import Display from "../components/Display";
import Keypad from "../components/Keypad";
import History from "../components/History";
import { formatResult } from "../utils/formatResult";
import { calculate } from "../utils/calculate";

const INITIAL_INPUT = "0";
const ERROR_TEXT = "Ошибка";
const MAX_INPUT_LENGTH = 12;
const HISTORY_LIMIT = 5;

export default function Calculator() {
  // --- состояние ---
  const [currentInput, setCurrentInput] = useState(INITIAL_INPUT);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [isNewNumber, setIsNewNumber] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  // --- вычисляемое ---
  const hasError = currentInput === ERROR_TEXT;

  const expressionText = previousValue !== null && operation !== null ? `${previousValue} ${operation}` : "";

  // --- обработчики ---
  function handleKeyPress(key: KeyConfig) {
    switch (key.kind) {
      case "digit":
        handleDigit(key.label);
        break;
      case "dot":
        handleDot();
        break;
      case "operation":
        handleOperation(key.label as Operation);
        break;
      case "equals":
        handleEquals();
        break;
      case "clear":
        handleClear();
        break;
    }
  }

  function handleDigit(digit: string) {
    if (hasError) {
      resetCalculator(INITIAL_INPUT);
      setCurrentInput(digit);
      return;
    }
    setCurrentInput((prev) => {
      if (isNewNumber) {
        return digit;
      }
      if (prev.length >= MAX_INPUT_LENGTH) {
        return prev;
      }
      if (prev === "0") {
        return digit;
      }
      return prev + digit;
    });
    setIsNewNumber(false);
  }

  function handleDot() {
    if (hasError) {
      resetCalculator("0.");
      return;
    }

    setCurrentInput((prev) => {
      if (isNewNumber) {
        return "0.";
      }
      if (prev.length >= MAX_INPUT_LENGTH) {
        return prev;
      }
      if (prev.includes(".")) {
        return prev;
      }
      return prev + ".";
    });
    setIsNewNumber(false);
  }

  function handleOperation(nextOperation: Operation) {
    if (hasError) {
      return;
    }
    if (operation && isNewNumber) {
      setOperation(nextOperation);
      return;
    }

    if (previousValue !== null && operation !== null) {
      const result = calculate(previousValue, operation, Number(currentInput));

      if (result === null) {
        resetCalculator(ERROR_TEXT);
        return;
      }

      setPreviousValue(result);
      setOperation(nextOperation);
      setCurrentInput(formatResult(result, MAX_INPUT_LENGTH));
      setIsNewNumber(true);
      return;
    }
    setPreviousValue(Number(currentInput));
    setOperation(nextOperation);
    setIsNewNumber(true);
  }

  function handleEquals() {
    if (hasError || isNewNumber || previousValue === null || operation === null) {
      return;
    }

    const result = calculate(previousValue, operation, Number(currentInput));
    if (result === null) {
      resetCalculator(ERROR_TEXT);
      return;
    }

    setCurrentInput(formatResult(result, MAX_INPUT_LENGTH));

    const entry = `${previousValue} ${operation} ${Number(currentInput)} = ${result}`;
    setHistory((prev) => [entry, ...prev].slice(0, HISTORY_LIMIT));
    setPreviousValue(null);
    setOperation(null);
    setIsNewNumber(true);
  }

  function handleClear() {
    resetCalculator(INITIAL_INPUT);
  }

  function resetCalculator(nextInput: string) {
    setCurrentInput(nextInput);
    setPreviousValue(null);
    setOperation(null);
    setIsNewNumber(false);
  }

  return (
    <div className="calculator">
      <div className="calculator__left-side">
        <section className="calculator__header">
          <h1 className="calculator__title">
            Calculator <br /> Design
          </h1>
          <span className="calculator__author">By-Abylaikhan</span>
        </section>
      </div>
      <section className="calculator__design">
        <Display value={currentInput} expression={expressionText} />
        <Keypad onKeyPress={handleKeyPress} />
        <History entries={history} />
      </section>
    </div>
  );
}
