
import React, { useState, useEffect } from 'react';
import { Calculator } from '../types.ts';

interface CalculatorModalProps {
  calculator: Calculator;
  onClose: () => void;
}

const CalculatorModal: React.FC<CalculatorModalProps> = ({ calculator, onClose }) => {
  const [values, setValues] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ value: string; unit: string; interpretation?: string } | null>(null);

  useEffect(() => {
    // Initialize default values
    const initial: Record<string, number> = {};
    calculator.inputs.forEach(input => {
      if (input.defaultValue !== undefined) initial[input.id] = input.defaultValue;
      else if (input.type === 'select' && input.options?.length) initial[input.id] = input.options[0].value;
    });
    setValues(initial);
  }, [calculator]);

  const handleInputChange = (id: string, val: string) => {
    const numVal = parseFloat(val);
    setValues(prev => ({ ...prev, [id]: isNaN(numVal) ? 0 : numVal }));
  };

  const calculate = () => {
    const res = calculator.formula(values);
    setResult(res);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border dark:border-slate-800">
        <div className="bg-sky-600 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{calculator.name}</h2>
            <p className="text-sky-100 text-sm opacity-80">{calculator.specialty}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {calculator.inputs.map(input => (
            <div key={input.id}>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {input.name} {input.unit && <span className="text-slate-400 dark:text-slate-500 font-normal">({input.unit})</span>}
              </label>
              {input.type === 'number' ? (
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all dark:text-white"
                  value={values[input.id] === 0 ? '' : (values[input.id] || '')}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                />
              ) : (
                <select
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all dark:text-white"
                  value={values[input.id]}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                >
                  {input.options?.map(opt => (
                    <option key={opt.label} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              )}
            </div>
          ))}

          <button
            onClick={calculate}
            className="w-full py-3 bg-sky-600 text-white font-bold rounded-xl hover:bg-sky-700 transition-colors shadow-lg shadow-sky-200 dark:shadow-none mt-2"
          >
            Calculate
          </button>

          {result && (
            <div className="mt-6 p-6 bg-sky-50 dark:bg-sky-950/30 rounded-2xl border border-sky-100 dark:border-sky-900/50 animate-in slide-in-from-bottom-4">
              <div className="text-center">
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">Result</span>
                <div className="flex items-baseline justify-center gap-2 mt-1">
                  <span className="text-4xl font-black text-sky-900 dark:text-sky-100">{result.value}</span>
                  <span className="text-lg font-medium text-sky-600 dark:text-sky-400">{result.unit}</span>
                </div>
                {result.interpretation && (
                  <p className="mt-3 text-sm font-semibold text-sky-800 dark:text-sky-200 bg-white/50 dark:bg-sky-900/30 py-2 px-4 rounded-lg inline-block border dark:border-sky-800">
                    {result.interpretation}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculatorModal;
