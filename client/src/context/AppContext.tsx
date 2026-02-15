import { createContext, type Dispatch, type SetStateAction, useContext, useMemo, useState } from 'react';

export interface VariableField {
  key: string;
  label: string;
  type: 'number' | 'text';
}

export interface CalculatorTemplate {
  id: string;
  name: string;
  description: string;
  formula: string;
  variables: VariableField[];
}

interface AppContextType {
  templates: CalculatorTemplate[];
  setTemplates: Dispatch<SetStateAction<CalculatorTemplate[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialTemplates: CalculatorTemplate[] = [
  {
    id: 'vol-cost',
    name: 'Concrete Volume & Cost',
    description: 'Compute volume and estimated concrete spend.',
    formula: 'length * width * height',
    variables: [
      { key: 'length', label: 'Length (m)', type: 'number' },
      { key: 'width', label: 'Width (m)', type: 'number' },
      { key: 'height', label: 'Height (m)', type: 'number' }
    ]
  },
  {
    id: 'rgb-hex',
    name: 'RGB to Hex Converter',
    description: 'Convert channels to hex code.',
    formula: 'r * 65536 + g * 256 + b',
    variables: [
      { key: 'r', label: 'Red', type: 'number' },
      { key: 'g', label: 'Green', type: 'number' },
      { key: 'b', label: 'Blue', type: 'number' }
    ]
  }
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [templates, setTemplates] = useState(initialTemplates);

  const value = useMemo(() => ({ templates, setTemplates }), [templates]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return ctx;
}
