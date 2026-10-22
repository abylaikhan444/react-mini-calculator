import { useState } from "react";
import { calculate } from "../calculate";
import type { KeyConfig, Operation } from "../types";
import Display from "../components/Display";
import Keypad from "../components/Keypad";
import History from "../components/History";

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

  let expressionText = "";
  if (previousValue !== null && operation !== null) {
    expressionText = `${previousValue} ${operation}`;
  }

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
    if (currentInput === ERROR_TEXT) {
      setCurrentInput(digit);
      setIsNewNumber(false);
      setPreviousValue(null);
      setOperation(null);
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
    if (currentInput === ERROR_TEXT) {
      setCurrentInput("0.");
      setPreviousValue(null);
      setOperation(null);
      setIsNewNumber(false);
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
        setCurrentInput(ERROR_TEXT);
        setPreviousValue(null);
        setOperation(null);
        setIsNewNumber(false);
        return;
      }

      setPreviousValue(result);
      setOperation(nextOperation);
      setCurrentInput(String(result));
      setIsNewNumber(true);
      return;
    }
    setPreviousValue(Number(currentInput));
    setOperation(nextOperation);
    setIsNewNumber(true);
  }

  function handleEquals() {
    if (currentInput === ERROR_TEXT) {
      return;
    }
    if (isNewNumber) {
      return;
    }
    if (previousValue !== null && operation !== null) {
      const result = calculate(previousValue, operation, Number(currentInput));
      if (result === null) {
        setCurrentInput(ERROR_TEXT);
        setPreviousValue(null);
        setOperation(null);
        setIsNewNumber(false);
        return;
      } else {
        setCurrentInput(String(result));
        const entry = `${previousValue} ${operation} ${currentInput} = ${result}`;
        setHistory((prev) => [entry, ...prev].slice(0, HISTORY_LIMIT));
        setPreviousValue(null);
        setOperation(null);

        setIsNewNumber(true);
      }
    }
  }

  function handleClear() {
    setCurrentInput(INITIAL_INPUT);
    setPreviousValue(null);
    setOperation(null);
    setIsNewNumber(false);
  }

  return (
    <div className="calculator">
      <div className="calcalculator-leftside">
        <section className="calcalculator-header">
          <h1 className="calcalculator-header-h1">Calculator Design</h1>
          <span className="calcalculator-header-p">By-Abylaikhan</span>
        </section>
      </div>
      <section className="calculator-design">
        <Display value={currentInput} expression={expressionText} />
        <Keypad onKeyPress={handleKeyPress} />
        <History entries={history} />
      </section>
    </div>
  );
}
