
import React, { useState } from 'react';
import { getClinicalAdvice } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse(null);
    try {
      const advice = await getClinicalAdvice(query);
      setResponse(advice || 'No response generated.');
    } catch (err) {
      setResponse('Error connecting to clinical assistant. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-2xl p-6 shadow-xl border dark:border-slate-800 sticky top-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-sky-500 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold">Clinical AI Guide</h2>
          <p className="text-xs text-slate-400">Ask for formula help or case tools</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., 'Patient has a severe burn on their leg and weighs 70kg, what should I use?'"
          className="w-full bg-slate-800 dark:bg-slate-900 border border-slate-700 dark:border-slate-800 rounded-xl p-3 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder:text-slate-500 min-h-[100px] resize-none text-white"
        />
        <button
          disabled={loading}
          className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-900/20 active:scale-95"
        >
          {loading ? (
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : 'Ask Assistant'}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-slate-800/50 dark:bg-slate-900/30 rounded-xl border border-slate-700 dark:border-slate-800 text-sm text-slate-300 animate-in fade-in duration-500">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-1 bg-sky-500 rounded-full"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-500">AI Response</span>
          </div>
          <p className="leading-relaxed whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
