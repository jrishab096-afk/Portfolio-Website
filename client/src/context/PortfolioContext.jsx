import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

const initialData = {
  name: '', title: '', email: '', location: '', phone: '',
  bio: '', photoUrl: '', linkedin: '', github: '', twitter: '', website: '',
  education: [], experience: [], 
  techSkills: [], softSkills: [], languages: [],
  projects: [], achievements: [],
  theme: 'dark-purple'
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('portfolioForgeV2');
    return saved ? JSON.parse(saved) : initialData;
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [highestStep, setHighestStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deployUrl, setDeployUrl] = useState('');

  useEffect(() => {
    localStorage.setItem('portfolioForgeV2', JSON.stringify(data));
  }, [data]);

  const updateData = (fields) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const nextStep = () => {
    setCurrentStep(prev => {
      const next = Math.min(prev + 1, 6);
      setHighestStep(h => Math.max(h, next));
      return next;
    });
  };
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const goToStep = (step) => {
    if (step <= highestStep) {
      setCurrentStep(step);
    }
  };

  return (
    <PortfolioContext.Provider value={{
      data, updateData, currentStep, highestStep, nextStep, prevStep, goToStep, 
      isSubmitting, setIsSubmitting, deployUrl, setDeployUrl
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
