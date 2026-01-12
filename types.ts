
export type Specialty = 'General' | 'Critical Care' | 'Nephrology' | 'Cardiology' | 'Pediatrics' | 'Pharmacology' | 'Gastroenterology' | 'Neurology' | 'Emergency';

export type Theme = 'light' | 'dark' | 'midnight' | 'high-contrast';

export interface CalculatorInput {
  id: string;
  name: string;
  unit: string;
  type: 'number' | 'select';
  options?: { label: string; value: number }[];
  defaultValue?: number;
}

export interface Calculator {
  id: string;
  name: string;
  shortName: string;
  specialty: Specialty;
  description: string;
  inputs: CalculatorInput[];
  formula: (values: Record<string, number>) => { value: string; unit: string; interpretation?: string };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
