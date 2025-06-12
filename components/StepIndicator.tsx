import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs sm:text-sm text-secondary">Step {currentStep} of {totalSteps}</span>
        <span className="text-xs sm:text-sm text-secondary">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
      </div>
      <div className="h-1 sm:h-1.5 w-full bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
        <div 
          className="h-full bg-accent-color transition-all duration-500 ease-out rounded-full" 
          style={{ 
            width: `${(currentStep / totalSteps) * 100}%`,
            backgroundColor: 'var(--accent-color-hex)'
          }}
        ></div>
      </div>
    </div>
  );
};

export default StepIndicator;