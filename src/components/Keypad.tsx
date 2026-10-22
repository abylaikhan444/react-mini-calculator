import { KEYS } from "../constants/keys";
import type { KeyConfig } from "../types/types";

type KeypadProps = {
  onKeyPress: (key: KeyConfig) => void;
};

export default function Keypad({ onKeyPress }: KeypadProps) {
  return (
    <div className="keypad">
      {KEYS.map((key) => (
        <button
          key={key.label}
          type="button"
          className={`keypad__key keypad__key--${key.kind}`}
          aria-label={key.ariaLabel}
          onClick={() => onKeyPress(key)}
        >
          {key.label}
        </button>
      ))}
    </div>
  );
}
