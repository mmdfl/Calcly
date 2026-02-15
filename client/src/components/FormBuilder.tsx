import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function FormBuilder() {
  const { setTemplates } = useAppContext();
  const [name, setName] = useState('');
  const [formula, setFormula] = useState('a + b');
  const [variables, setVariables] = useState('a,b');

  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    const fields = variables.split(',').map((item) => item.trim()).filter(Boolean);
    setTemplates((prev) => [
      {
        id: crypto.randomUUID(),
        name,
        description: 'Custom template from form builder.',
        formula,
        variables: fields.map((field) => ({ key: field, label: field, type: 'number' as const }))
      },
      ...prev
    ]);
    setName('');
  }

  return (
    <form className="card builder" onSubmit={handleSave}>
      <h2>Form Builder</h2>
      <input
        className="input"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Template name"
        required
      />
      <input
        className="input"
        value={variables}
        onChange={(event) => setVariables(event.target.value)}
        placeholder="Variables (comma separated)"
      />
      <input
        className="input"
        value={formula}
        onChange={(event) => setFormula(event.target.value)}
        placeholder="Formula, e.g. length*width*height"
      />
      <button className="btn btn-primary" type="submit">
        Save Template
      </button>
    </form>
  );
}
