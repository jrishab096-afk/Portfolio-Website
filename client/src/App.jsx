import React from 'react';
import { usePortfolio } from './context/PortfolioContext';

import Sidebar from './components/Sidebar';
import PersonalInfo from './components/FormSteps/PersonalInfo';
import Education from './components/FormSteps/Education';
import Experience from './components/FormSteps/Experience';
import Skills from './components/FormSteps/Skills';
import Projects from './components/FormSteps/Projects';
import Launch from './components/FormSteps/Launch';

function App() {
  const { currentStep } = usePortfolio();

  return (
    <>
      <div className="bg-glow"></div>
      
      <div className="flex flex-col md:flex-row h-screen overflow-hidden text-slate-200">
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto relative scroll-smooth p-6 sm:p-8 md:p-14 lg:p-20">
          {currentStep === 1 && <PersonalInfo />}
          {currentStep === 2 && <Education />}
          {currentStep === 3 && <Experience />}
          {currentStep === 4 && <Skills />}
          {currentStep === 5 && <Projects />}
          {currentStep === 6 && <Launch />}
        </main>
      </div>
    </>
  );
}

export default App;
