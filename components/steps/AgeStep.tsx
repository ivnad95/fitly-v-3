import React from 'react';
import Button from '../ui/Button';
import WheelSelector from '../ui/WheelSelector';

interface AgeStepProps {
  age: string; 
  onAgeChange: (age: string) => void;
  onNext: () => void;
}

const AgeStep: React.FC<AgeStepProps> = ({ age, onAgeChange, onNext }) => {
  const ageNum = parseFloat(age);
  const isValidAge = !isNaN(ageNum) && ageNum >= 16 && ageNum <= 100;
  
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-primary">Your Age</h2>
      <WheelSelector
        value={age}
        onChange={onAgeChange}
        minValue={16}
        maxValue={100}
        step={1}
        unit="years"
        className="mb-8"
      />
      <Button 
        onClick={onNext} 
        disabled={!isValidAge} 
        variant="primary"
        className="w-full py-4 px-6 touch-manipulation min-h-[48px]"
        aria-label="Continue to next step"
      >
        Continue
      </Button>
    </div>
  );
};

export default AgeStep;