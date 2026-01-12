
import React from 'react';
import { Calculator } from '../types';

interface CalculatorCardProps {
  calculator: Calculator;
  onClick: () => void;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ calculator, onClick }) => {
  const getSpecialtyColor = (s: string) => {
    switch (s) {
      case 'Critical Care': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'Nephrology': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Cardiology': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Pediatrics': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400';
      case 'Pharmacology': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-slate-800 dark:border-slate-700 rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group active:scale-95"
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${getSpecialtyColor(calculator.specialty)}`}>
          {calculator.specialty}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300 dark:text-slate-600 group-hover:text-sky-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1 leading-tight">{calculator.name}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{calculator.description}</p>
    </div>
  );
};

export default CalculatorCard;
