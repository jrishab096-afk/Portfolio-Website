import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const steps = [
  { num: 1, title: 'Personal Info', sub: 'Name, bio & links' },
  { num: 2, title: 'Education', sub: 'Degrees & courses' },
  { num: 3, title: 'Experience', sub: 'Jobs & internships' },
  { num: 4, title: 'Skills', sub: 'Tech & tools' },
  { num: 5, title: 'Projects', sub: 'Achievements & work' },
  { num: 6, title: 'Launch', sub: 'Preview & deploy' },
];

export default function Sidebar() {
  const { currentStep, goToStep, highestStep } = usePortfolio();

  const progress = Math.round(((highestStep - 1) / 5) * 100);

  return (
    <aside className="w-full md:w-72 glass-card flex-none h-auto md:h-full rounded-none md:border-t-0 border-b md:border-b-0 md:border-r border-white/5 flex flex-col pt-4 md:pt-8 bg-[#0b0a15] md:bg-darkCard/80 z-20 shrink-0 pb-4 md:pb-0">
      
      {/* Top Header Row */}
      <div className="px-5 md:px-8 flex items-center justify-between md:justify-start gap-3 md:mb-10">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-[22px] md:text-2xl text-yellow-500">⚡</span>
          <span className="font-display font-bold text-lg md:text-xl tracking-wide text-white">PortfolioForge</span>
        </div>
        
        {/* Mobile Progress indicator (Top Right) */}
        <div className="md:hidden flex items-center text-xs font-bold tracking-[0.15em] text-[#0fbcf9]">
           STEP {currentStep}/6
        </div>
      </div>

      {/* Navigation Steps */}
      <nav className="flex md:flex-1 flex-row md:flex-col items-center md:items-stretch justify-center md:justify-start gap-4 md:gap-0 mt-6 md:mt-0 px-4 md:px-4 overflow-x-auto hide-scrollbar w-full">
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
        
        {steps.map((step) => {
          const isActive = currentStep === step.num;
          const isCompleted = step.num < highestStep;
          const isReachable = step.num <= highestStep;
          
          return (
            <div 
              key={step.num}
              onClick={() => isReachable && goToStep(step.num)}
              // Mobile layout matches the image exactly:
              // Mobile: Active = wide pill. Others = pure circles without text.
              className={`
                flex items-center md:items-start gap-3 md:gap-4 md:p-4 md:rounded-xl transition-all md:mb-2
                ${isActive ? 'bg-[#242131] md:bg-white/5 p-1.5 pr-5 rounded-full cursor-default' : 
                  isReachable ? 'p-0 md:bg-transparent rounded-full hover:bg-white/5 cursor-pointer opacity-100 md:opacity-60 md:hover:opacity-100' : 'p-0 md:bg-transparent rounded-full opacity-40 cursor-not-allowed'}
              `}
            >
              {/* Circle Icon */}
              <div 
                className={`w-10 h-10 md:w-8 md:h-8 rounded-full font-bold flex items-center justify-center shrink-0 text-sm transition-all shadow-sm
                  ${isActive ? 'bg-gradient-to-br from-[#4d6bfe] to-[#3db4f6] text-white' : 
                    isCompleted ? 'bg-[#1a1431] text-indigo-400 border border-[#3b3554]' : 'bg-transparent text-slate-500 border border-white/10'}
                `}
              >
                {/* Custom checkmark for completed, number for others */}
                {isCompleted ? (
                  <svg className="w-4 h-4 md:w-3.5 md:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : step.num}
              </div>

              {/* Step Text (Hidden on mobile unless active) */}
              <div className={`${isActive ? 'block' : 'hidden md:block'} flex flex-col justify-center`}>
                <div className={`font-bold text-[15px] md:text-sm tracking-wide leading-tight whitespace-nowrap
                  ${isActive ? 'text-white' : 'text-slate-200'}
                `}>
                  {step.title}
                </div>
                <div className="text-[11px] md:text-xs text-slate-400 mt-0.5 hidden md:block">
                  {step.sub}
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      <div className="p-8 border-t border-white/10 mt-auto hidden md:block">
        <div className="flex justify-between text-xs text-slate-400 font-bold tracking-wider mb-3">
          <span>PROGRESS</span>
          <span className="text-slate-200">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </aside>
  );
}
