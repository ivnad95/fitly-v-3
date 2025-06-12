import React from 'react';
import { Gender } from '../../types';

interface OptionCardProps {
  iconClass: string;
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ iconClass, text, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected} // This will apply .liquid-glass-panel[aria-pressed="true"] styles
      className={`
        liquid-glass-panel 
        p-5 sm:p-6 rounded-2xl text-center cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
        focus-visible:outline-none 
        hover:!bg-[var(--panel-bg-color-hover)] hover:border-[rgba(255,255,255,0.2)]
      `}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      <div className={`text-3xl sm:text-4xl mb-2.5 sm:mb-3 transition-colors duration-300
        ${isSelected ? 'text-accent' : 'text-[rgba(var(--accent-color-rgb),0.7)]' }`}>
        <i className={iconClass}></i>
      </div>
      <div className={`font-semibold text-sm sm:text-base transition-colors duration-300
        ${isSelected ? 'text-primary' : 'text-secondary'}`}>
        {text}
      </div>
    </div>
  );
};


interface GenderStepProps {
  selectedGender: Gender;
  onSelectGender: (gender: Gender) => void;
}

const GenderStep: React.FC<GenderStepProps> = ({ selectedGender, onSelectGender }) => {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-primary">Select Your Gender</h2>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">
        <OptionCard
          iconClass="fas fa-mars"
          text="Male"
          isSelected={selectedGender === 'male'}
          onClick={() => onSelectGender('male')}
        />
        <OptionCard
          iconClass="fas fa-venus"
          text="Female"
          isSelected={selectedGender === 'female'}
          onClick={() => onSelectGender('female')}
        />
      </div>
    </div>
  );
};

export default GenderStep;