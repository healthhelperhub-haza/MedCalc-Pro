
import React, { useState, useMemo, useEffect } from 'react';
import { CALCULATORS, SPECIALTIES } from './constants';
import { Calculator, Specialty, Theme } from './types';
import CalculatorCard from './components/CalculatorCard';
import CalculatorModal from './components/CalculatorModal';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSpecialty, setActiveSpecialty] = useState<Specialty | 'All'>('All');
  const [selectedCalc, setSelectedCalc] = useState<Calculator | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('medcalc-theme');
    return (saved as Theme) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('medcalc-theme', theme);
  }, [theme]);

  const filteredCalculators = useMemo(() => {
    return CALCULATORS.filter(calc => {
      const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          calc.shortName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = activeSpecialty === 'All' || calc.specialty === activeSpecialty;
      return matchesSearch && matchesSpecialty;
    });
  }, [searchTerm, activeSpecialty]);

  const themeClasses = {
    light: 'bg-slate-50 text-slate-900',
    dark: 'dark bg-slate-900 text-slate-100',
    midnight: 'theme-midnight dark bg-slate-950 text-indigo-100',
    'high-contrast': 'theme-high-contrast dark bg-black text-white'
  };

  const getThemeIcon = (t: Theme) => {
    switch(t) {
      case 'dark': return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
      case 'midnight': return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>;
      case 'high-contrast': return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
      default: return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${themeClasses[theme]}`}>
      {/* Header */}
      <header className={`border-b sticky top-0 z-40 px-4 py-4 md:px-8 ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-sky-600 p-2 rounded-xl shadow-lg shadow-sky-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className={`text-xl font-black tracking-tight ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>
                  MedCalc<span className="text-sky-500">Pro</span>
                </h1>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Hospital Edition</p>
              </div>
            </div>

            {/* Mobile Theme Toggle */}
            <div className="md:hidden">
                <select 
                  value={theme} 
                  onChange={(e) => setTheme(e.target.value as Theme)}
                  className={`text-xs font-bold rounded-lg px-2 py-1 border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700'}`}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="midnight">Midnight</option>
                  <option value="high-contrast">Contrast</option>
                </select>
            </div>
          </div>

          <div className="flex-1 max-w-lg w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search formulas, scores, calculators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all shadow-sm ${
                  theme === 'light' 
                  ? 'bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400' 
                  : 'bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500'
                }`}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Desktop Theme Switcher */}
          <div className="hidden md:flex items-center gap-2">
            {(['light', 'dark', 'midnight', 'high-contrast'] as Theme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`p-2 rounded-xl transition-all ${
                  theme === t 
                  ? 'bg-sky-600 text-white shadow-lg' 
                  : theme === 'light' ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
                title={`${t.charAt(0).toUpperCase() + t.slice(1)} Mode`}
              >
                {getThemeIcon(t)}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Calculators */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setActiveSpecialty('All')}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                activeSpecialty === 'All' 
                ? 'bg-sky-600 text-white shadow-md' 
                : theme === 'light' ? 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              All Tools
            </button>
            {SPECIALTIES.map(s => (
              <button
                key={s}
                onClick={() => setActiveSpecialty(s)}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  activeSpecialty === s 
                  ? 'bg-sky-600 text-white shadow-md' 
                  : theme === 'light' ? 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Calculator Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCalculators.length > 0 ? (
              filteredCalculators.map(calc => (
                <CalculatorCard
                  key={calc.id}
                  calculator={calc}
                  onClick={() => setSelectedCalc(calc)}
                />
              ))
            ) : (
              <div className={`col-span-full py-12 text-center rounded-3xl border border-dashed ${
                theme === 'light' ? 'bg-white border-slate-300' : 'bg-slate-800/50 border-slate-700'
              }`}>
                <p className="text-slate-500 font-medium">No calculators match your search.</p>
              </div>
            )}
          </div>

          {/* Warning Footer */}
          <div className={`p-4 rounded-xl border ${
            theme === 'light' ? 'bg-orange-50 border-orange-100 text-orange-800' : 'bg-orange-950/20 border-orange-900/50 text-orange-200'
          }`}>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-1">Clinical Disclaimer</p>
            <p className="text-[10px] leading-relaxed opacity-80">
              These calculators are provided for informational purposes only. Results should not replace professional clinical judgment. 
              Always verify calculations independently before administering medication or treatments.
            </p>
          </div>
        </div>

        {/* Right Column: AI Assistant */}
        <div className="lg:col-span-4">
          <AIAssistant />
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t py-6 text-center text-xs ${
        theme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-slate-900 border-slate-800 text-slate-500'
      }`}>
        <p>&copy; 2026 MedCalc Pro v2.4. Hospital Integrated Systems.</p>
      </footer>

      {/* Calculator Modal */}
      {selectedCalc && (
        <CalculatorModal
          calculator={selectedCalc}
          onClose={() => setSelectedCalc(null)}
        />
      )}
    </div>
  );
};

export default App;
