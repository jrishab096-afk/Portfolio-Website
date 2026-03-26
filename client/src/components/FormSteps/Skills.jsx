import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function Skills() {
  const { data, updateData, nextStep, prevStep } = usePortfolio();
  
  const [techInput, setTechInput] = useState('');
  const [softInput, setSoftInput] = useState('');
  const [langInput, setLangInput] = useState('');

  const handleKeyDown = (e, field, inputVal, setInputVal) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = inputVal.trim().replace(/^,/, '').replace(/,$/, '');
      if (val && !data[field].includes(val)) {
        updateData({ [field]: [...data[field], val] });
      }
      setInputVal('');
    }
  };

  const removeTag = (field, indexToRemove) => {
    updateData({ 
      [field]: data[field].filter((_, i) => i !== indexToRemove) 
    });
  };

  const renderTagInput = (label, field, inputVal, setInputVal, placeholder, colorClass) => (
    <div className="space-y-3">
      <label className="text-xs font-bold tracking-wider text-slate-400 uppercase block">{label}</label>
      <div className="bg-black/30 border border-white/10 rounded-xl p-3 min-h-[56px] flex flex-wrap gap-2 items-center transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50">
        {data[field].map((tag, i) => (
          <span key={i} className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 ${colorClass}`}>
            {tag}
            <button type="button" onClick={() => removeTag(field, i)} className="hover:text-white transition-colors">×</button>
          </span>
        ))}
        <input 
          type="text" value={inputVal} 
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => handleKeyDown(e, field, inputVal, setInputVal)}
          onBlur={e => handleKeyDown({ key: 'Enter', preventDefault: () => {} }, field, inputVal, setInputVal)}
          placeholder={data[field].length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent text-white outline-none text-sm placeholder-slate-500"
        />
      </div>
      <p className="text-[11px] text-slate-500 uppercase tracking-wider">Press Enter or comma to add</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto w-full pb-32">
      <div className="mb-12">
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-wider text-secondary mb-4">
          Step 4 of 6
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white drop-shadow-md">
          Skills & <span className="text-gradient drop-shadow-lg">Technologies</span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
          What tools and technologies do you use?
        </p>
      </div>

      <div className="glass-card p-6 sm:p-8 space-y-8">
        {renderTagInput(
          'Technical Skills', 'techSkills', techInput, setTechInput, 
          'e.g. React, Python, AWS...', 'bg-primary/20 text-primary border border-primary/30'
        )}
        
        {renderTagInput(
          'Soft Skills', 'softSkills', softInput, setSoftInput, 
          'e.g. Leadership, Communication...', 'bg-secondary/20 text-secondary border border-secondary/30'
        )}
        
        {renderTagInput(
          'Languages', 'languages', langInput, setLangInput, 
          'e.g. English (Native), Spanish (B2)...', 'bg-white/10 text-slate-200 border border-white/20'
        )}
      </div>

      <div className="flex justify-between items-center mt-10">
        <button 
          onClick={prevStep}
          className="text-slate-400 hover:text-white font-bold py-3.5 px-6 rounded-xl transition-all text-sm tracking-wide"
        >
          ← Back
        </button>
        <button 
          onClick={nextStep}
          className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition-all text-sm tracking-wide flex items-center gap-2"
        >
          Next: Projects <span>→</span>
        </button>
      </div>
    </div>
  );
}
