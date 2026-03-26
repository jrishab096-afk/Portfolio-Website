import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { generatePortfolioHTML } from '../../utils/portfolioGenerator';

// Theme Configuration
const themes = [
  { id: 'dark-purple', name: 'Dark Purple', gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' },
  { id: 'dark-ocean', name: 'Dark Ocean', gradient: 'linear-gradient(135deg, #0a0e27, #1a3a6e, #0d7ebf)' },
  { id: 'light-peachy', name: 'Light Peachy', gradient: 'linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)' },
  { id: 'light-bloom', name: 'Light Bloom', gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' },
  { id: 'light-minimal', name: 'Light Minimal', gradient: 'linear-gradient(135deg, #f8f9fa, #e9ecef, #dee2e6)' },
  { id: 'glass', name: 'Aurora', gradient: 'linear-gradient(135deg, #667eea, #764ba2, #f64f59)' },
];

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Launch() {
  const { data, updateData, prevStep, isSubmitting, setIsSubmitting, deployUrl, setDeployUrl } = usePortfolio();
  const [showPreview, setShowPreview] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');

  // Close preview on Escape key
  useEffect(() => {
    if (!showPreview) return;
    const onKey = (e) => { if (e.key === 'Escape') setShowPreview(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showPreview]);

  const handlePreview = () => {
    setPreviewHtml(generatePortfolioHTML(data));
    setShowPreview(true);
  };

  const handleDownload = async () => {
    try {
      // Step 1: Save portfolio to get a stable ID
      const res = await fetch(`${API_BASE_URL}/api/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!result.success) throw new Error('Save failed');

      window.location.href = `${API_BASE_URL}/download/${result.id}`;
    } catch (err) {
      console.error('Download failed:', err);
      alert(`Download failed. Make sure the backend is running on ${API_BASE_URL}`);
    }
  };

  const handleDeploy = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        setDeployUrl(`${API_BASE_URL}/p/${result.id}`);
      }
    } catch (err) {
      console.error(err);
      alert(`Failed to connect to backend server. Make sure it is running on ${API_BASE_URL}`);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto w-full pb-32">
        <div className="mb-12">
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-wider text-secondary mb-4">
            Final Step
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white drop-shadow-md">
            Preview & <span className="text-gradient drop-shadow-lg">Launch</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
            Choose a theme, preview your design, and deploy instantly.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase mb-6 flex items-center gap-4">
            <span>Choose Your Theme</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map(t => (
              <div 
                key={t.id}
                onClick={() => updateData({ theme: t.id })}
                className={`glass-card p-4 cursor-pointer transition-all hover:-translate-y-1 ${data.theme === t.id ? 'border-primary ring-2 ring-primary/50 bg-white/5' : 'border-white/5'}`}
              >
                <div className="h-20 rounded-lg mb-3 shadow-inner" style={{ background: t.gradient }}></div>
                <div className="text-sm font-bold text-center text-slate-200">{t.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <button 
            onClick={handlePreview}
            className="glass-card p-5 flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors border-white/10 hover:border-slate-400"
          >
            <span className="text-2xl">👁</span>
            <span className="font-bold text-sm">Live Preview</span>
          </button>
          <button 
            onClick={handleDownload}
            className="glass-card p-5 flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors border-white/10 hover:border-secondary"
          >
            <span className="text-2xl">⬇️</span>
            <span className="font-bold text-sm">Download HTML</span>
          </button>
          <button 
            onClick={handleDeploy}
            disabled={isSubmitting}
            className="bg-gradient-to-br from-primary to-secondary p-5 rounded-2xl flex flex-col items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-2xl">{isSubmitting ? '⌛' : '🚀'}</span>
            <span className="font-bold text-sm text-white">{isSubmitting ? 'Saving...' : 'Deploy to Server'}</span>
          </button>
        </div>

        {deployUrl && (
          <div className="glass-card p-6 border-green-500/30 bg-green-500/5 mb-8 text-center animate-in fade-in zoom-in duration-300">
            <h3 className="text-green-400 font-bold mb-2 text-lg">🎉 Successfully Deployed to Server!</h3>
            <p className="text-slate-300 text-sm mb-4">Your portfolio is live right now on your local Node.js backend.</p>
            <a href={deployUrl} target="_blank" rel="noreferrer" className="inline-block px-6 py-3 bg-green-500/20 text-green-300 rounded-lg font-bold hover:bg-green-500/30 transition-colors border border-green-500/30">
              Open Live Portfolio ↗
            </a>
          </div>
        )}

        <div className="glass-card p-6 sm:p-8 bg-white/5 border-secondary/20 mb-12">
          <h3 className="text-secondary font-bold mb-4 flex items-center gap-2">
            <span className="text-xl">🌐</span> Host on the Internet For Free
          </h3>
          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            Want to share your portfolio with recruiters globally? You can publish it on the web in 3 seconds using Netlify Drop—no account required!
          </p>
          <div className="space-y-4 text-sm text-slate-300">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/30 border border-white/5">
              <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary font-bold flex items-center justify-center shrink-0">1</div>
              <div className="pt-1.5"><strong className="text-white block mb-1">Download Your File</strong> Click the "Download HTML" button above to get your custom <code>.html</code> file.</div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/30 border border-white/5">
              <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary font-bold flex items-center justify-center shrink-0">2</div>
              <div className="pt-1.5"><strong className="text-white block mb-1">Visit Netlify Drop</strong> Open <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-secondary hover:underline">app.netlify.com/drop</a> in a new tab.</div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/30 border border-white/5">
              <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary font-bold flex items-center justify-center shrink-0">3</div>
              <div className="pt-1.5"><strong className="text-white block mb-1">Drag and Drop</strong> Simply drag your downloaded HTML file into the circle on the Netlify page. You will get a live URL instantly!</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-10">
          <button 
            onClick={prevStep}
            className="text-slate-400 hover:text-white font-bold py-3.5 px-6 rounded-xl transition-all text-sm tracking-wide"
          >
            ← Back
          </button>
          <div></div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowPreview(false)}></div>
          <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-darkBg border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/20">
              <span className="font-bold text-slate-200">Portfolio Preview</span>
              <div className="flex gap-4">
                <button onClick={handleDownload} className="text-sm font-bold text-secondary hover:text-white transition-colors">⬇️ Download</button>
                <button onClick={() => setShowPreview(false)} className="text-sm font-bold text-slate-400 hover:text-white transition-colors">✕ Close</button>
              </div>
            </div>
            <iframe 
              srcDoc={previewHtml} 
              className="flex-1 w-full bg-white" 
              title="Preview"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
