type DisplayProps = {
  value: string;
  expression: string;
};

export default function Display({ value, expression }: DisplayProps) {
  return (
    <div className="display">
      <p className="display__expression">{expression}</p>
      <p className="display__value" aria-live="polite">
        {value}
      </p>
    </div>
  );
}
