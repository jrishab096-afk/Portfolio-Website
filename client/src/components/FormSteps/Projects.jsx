import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function Projects() {
  const { data, updateData, nextStep, prevStep } = usePortfolio();

  const addProject = () => {
    updateData({ 
      projects: [...data.projects, { name: '', link: '', description: '', technologies: '', id: Date.now() }] 
    });
  };

  const removeProject = (id) => {
    updateData({ projects: data.projects.filter(p => p.id !== id) });
  };

  const updateProject = (id, field, value) => {
    updateData({ 
      projects: data.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  const addAchievement = () => {
    updateData({ 
      achievements: [...data.achievements, { title: '', year: '', description: '', id: Date.now() }] 
    });
  };

  const removeAchievement = (id) => {
    updateData({ achievements: data.achievements.filter(a => a.id !== id) });
  };

  const updateAchievement = (id, field, value) => {
    updateData({ 
      achievements: data.achievements.map(a => a.id === id ? { ...a, [field]: value } : a)
    });
  };

  return (
    <div className="max-w-3xl mx-auto w-full pb-32">
      <div className="mb-12">
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-wider text-secondary mb-4">
          Step 5 of 6
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white drop-shadow-md">
          Projects & <span className="text-gradient drop-shadow-lg">Achievements</span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
          Show the world what you've built and accomplished.
        </p>
      </div>

      <div className="space-y-6 mb-12">
        {data.projects.map((proj) => (
          <div key={proj.id} className="glass-card p-6 sm:p-8 space-y-6 relative group border-t-2 border-t-primary/30">
            <button 
              onClick={() => removeProject(proj.id)}
              className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-white/5"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Project Name</label>
                <input 
                  value={proj.name} onChange={e => updateProject(proj.id, 'name', e.target.value)}
                  type="text" placeholder="e.g. Portfolio Builder App"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-all font-medium"
                />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Live URL / Repository Link</label>
                <input 
                  value={proj.link} onChange={e => updateProject(proj.id, 'link', e.target.value)}
                  type="url" placeholder="https://..."
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-all font-medium"
                />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Description</label>
                <textarea 
                  value={proj.description} onChange={e => updateProject(proj.id, 'description', e.target.value)}
                  rows="3" placeholder="What does it do? What problems does it solve?"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-all font-medium resize-none"
                ></textarea>
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Technologies Used</label>
                <input 
                  value={proj.technologies} onChange={e => updateProject(proj.id, 'technologies', e.target.value)}
                  type="text" placeholder="e.g. React, Node.js, Tailwind (comma separated)"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-all font-medium"
                />
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={addProject}
          className="w-full py-4 border-2 border-dashed border-white/20 rounded-xl text-slate-400 font-bold tracking-wide hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 bg-black/20"
        >
          <span className="text-xl">+</span> Add Project
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6 relative">
        <div className="h-px bg-white/10 flex-1"></div>
        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase px-4 bg-darkBg text-center">Achievements & Awards</span>
        <div className="h-px bg-white/10 flex-1"></div>
      </div>

      <div className="space-y-6">
        {data.achievements.map((ach) => (
          <div key={ach.id} className="glass-card p-6 sm:p-8 space-y-6 relative group border-l-2 border-l-secondary/50">
            <button 
              onClick={() => removeAchievement(ach.id)}
              className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-white/5"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Award / Achievement</label>
                <input 
                  value={ach.title} onChange={e => updateAchievement(ach.id, 'title', e.target.value)}
                  type="text" placeholder="e.g. Employee of the Year"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-secondary/50 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Year / Date</label>
                <input 
                  value={ach.year} onChange={e => updateAchievement(ach.id, 'year', e.target.value)}
                  type="text" placeholder="e.g. 2023"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-secondary/50 transition-all font-medium"
                />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Description (optional)</label>
                <textarea 
                  value={ach.description} onChange={e => updateAchievement(ach.id, 'description', e.target.value)}
                  rows="2" placeholder="Brief details about the accomplishment..."
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-secondary/50 transition-all font-medium resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={addAchievement}
          className="w-full py-4 border-2 border-dashed border-white/20 rounded-xl text-slate-400 font-bold tracking-wide hover:border-secondary/50 hover:text-secondary transition-all flex items-center justify-center gap-2 bg-black/20"
        >
          <span className="text-xl">+</span> Add Achievement
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
          🚀 Preview & Launch
        </button>
      </div>
    </div>
  );
}
