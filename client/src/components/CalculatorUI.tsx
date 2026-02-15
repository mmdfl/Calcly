import { useMemo, useState } from 'react';
import type { CalculatorTemplate } from '../context/AppContext';

function compute(formula: string, values: Record<string, number>) {
  const args = Object.keys(values);
  const nums = Object.values(values);
  // eslint-disable-next-line no-new-func
  const fn = new Function(...args, `return ${formula};`) as (...v: number[]) => number;
  return fn(...nums);
}

export default function CalculatorUI({ template }: { template: CalculatorTemplate }) {
  const [values, setValues] = useState<Record<string, number>>({});

  const result = useMemo(() => {
    const hasAll = template.variables.every((variable) => values[variable.key] !== undefined);
    if (!hasAll) return null;
    try {
      return compute(template.formula, values);
    } catch {
      return null;
    }
  }, [template, values]);

  return (
    <section className="calculator card">
      <div className="calculator-inputs">
        <h2>Inputs · {template.name}</h2>
        {template.variables.map((variable) => (
          <input
            key={variable.key}
            type="number"
            placeholder={variable.label}
            className="input"
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                [variable.key]: Number(event.target.value)
              }))
            }
          />
        ))}
      </div>
      <div className="result-panel">
        <h3>Result</h3>
        <p className="result-value">{result ?? '--'}</p>
        <small>Live formula output</small>
      </div>
    </section>
  );
}
