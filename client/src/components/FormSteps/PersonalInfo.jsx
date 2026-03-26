import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function PersonalInfo() {
  const { data, updateData, nextStep } = usePortfolio();

  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-3xl mx-auto w-full pb-32">
      <div className="mb-12">
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-wider text-secondary mb-4">
          Step 1 of 6
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white drop-shadow-md">
          Tell us about <span className="text-gradient drop-shadow-lg">yourself</span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
          This is the foundation of your portfolio. Make it count.
        </p>
      </div>

      <div className="glass-card p-6 sm:p-8 md:p-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-2">
            <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Full Name <span className="text-pink-500">*</span>
            </label>
            <input 
              name="name" value={data.name} onChange={handleChange}
              type="text" placeholder="e.g. Alex Johnson"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Professional Title <span className="text-pink-500">*</span>
            </label>
            <input 
              name="title" value={data.title} onChange={handleChange}
              type="text" placeholder="e.g. Full-Stack Developer"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Email Address
            </label>
            <input 
              name="email" value={data.email} onChange={handleChange}
              type="email" placeholder="you@example.com"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-all font-medium"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Location
            </label>
            <input 
              name="location" value={data.location} onChange={handleChange}
              type="text" placeholder="e.g. San Francisco, CA"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Phone (optional)
            </label>
            <input 
              name="phone" value={data.phone} onChange={handleChange}
              type="tel" placeholder="+1 (555) 000-0000"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-all font-medium"
            />
          </div>

          <div className="col-span-1 md:col-span-2 space-y-2">
            <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Bio / About Me <span className="text-pink-500">*</span>
            </label>
            <textarea 
              name="bio" value={data.bio} onChange={handleChange} maxLength="500"
              rows="4" placeholder="Write 2–4 sentences describing who you are, what you do, and what makes you unique..."
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium resize-none"
            ></textarea>
            <div className="text-right text-xs text-slate-500">{data.bio?.length || 0}/500</div>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-2">
            <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Profile Photo URL
            </label>
            <input 
              name="photoUrl" value={data.photoUrl} onChange={handleChange}
              type="url" placeholder="https://your-photo-url.com/photo.jpg"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-all font-medium"
            />
            <p className="text-xs text-slate-400 mt-2">💡 Upload to <a href="https://imgbb.com" target="_blank" rel="noreferrer" className="text-secondary hover:underline">imgbb.com</a> and paste the direct URL here</p>
          </div>
          
          <div className="col-span-1 md:col-span-2 space-y-4">
            <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Social Links</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['linkedin', 'github', 'twitter', 'website'].map(network => (
                <div key={network} className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                    {network === 'linkedin' ? '💼' : network === 'github' ? '🐙' : network === 'twitter' ? '🐦' : '🌐'}
                  </span>
                  <input
                    name={network} value={data[network]} onChange={handleChange}
                    type="url" placeholder={`${network.charAt(0).toUpperCase() + network.slice(1)} URL`}
                    className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-all font-medium"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <div></div>
        <button 
          onClick={nextStep}
          className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition-all text-sm tracking-wide flex items-center gap-2"
        >
          Next: Education <span>→</span>
        </button>
      </div>
    </div>
  );
}
