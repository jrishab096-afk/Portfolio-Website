import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function Experience() {
  const { data, updateData, nextStep, prevStep } = usePortfolio();

  const addExp = () => {
    updateData({ 
      experience: [...data.experience, { role: '', company: '', year: '', description: '', id: Date.now() }] 
    });
  };

  const removeExp = (id) => {
    updateData({ experience: data.experience.filter(e => e.id !== id) });
  };

  const updateExp = (id, field, value) => {
    updateData({ 
      experience: data.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  return (
    <div className="max-w-3xl mx-auto w-full pb-32">
      <div className="mb-12">
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-wider text-secondary mb-4">
          Step 3 of 6
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white drop-shadow-md">
          Work <span className="text-gradient drop-shadow-lg">Experience</span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
          Showcase your professional journey.
        </p>
      </div>

      <div className="space-y-6">
        {data.experience.map((exp) => (
          <div key={exp.id} className="glass-card p-6 sm:p-8 space-y-6 relative group">
            <button 
              onClick={() => removeExp(exp.id)}
              className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-white/5"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Role / Position</label>
                <input 
                  value={exp.role} onChange={e => updateExp(exp.id, 'role', e.target.value)}
                  type="text" placeholder="e.g. Frontend Developer"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Company Name</label>
                <input 
                  value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)}
                  type="text" placeholder="e.g. Tech Innovators Inc."
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Duration</label>
                <input 
                  value={exp.year} onChange={e => updateExp(exp.id, 'year', e.target.value)}
                  type="text" placeholder="e.g. Jan 2021 - Present"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-all font-medium"
                />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Key Responsibilities & Impact (optional)</label>
                <textarea 
                  value={exp.description} onChange={e => updateExp(exp.id, 'description', e.target.value)}
                  rows="3" placeholder="Led development of... Increased revenue by..."
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-all font-medium resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={addExp}
          className="w-full py-4 border-2 border-dashed border-white/20 rounded-xl text-slate-400 font-bold tracking-wide hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 bg-black/20"
        >
          <span className="text-xl">+</span> Add Experience
        </button>
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
          Next: Skills <span>→</span>
        </button>
      </div>
    </div>
  );
}
