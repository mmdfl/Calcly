import type { CalculatorTemplate } from '../context/AppContext';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';

export async function fetchTemplates(token: string): Promise<CalculatorTemplate[]> {
  const res = await fetch(`${API_BASE}/templates`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    throw new Error('Failed to load templates');
  }

  return res.json();
}
