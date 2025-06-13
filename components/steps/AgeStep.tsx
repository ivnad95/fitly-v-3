import React, { useEffect } from 'react';
import Button from '../ui/Button';
import WheelSelector from '../ui/WheelSelector';

interface AgeStepProps {
  age: string; 
  onAgeChange: (age: string) => void;
  onNext: () => void;
}

const AgeStep: React.FC<AgeStepProps> = ({ age, onAgeChange, onNext }) => {
  // Set default age if empty
  useEffect(() => {
    if (!age) {
      onAgeChange('25'); // Default to 25 years
    }
  }, [age, onAgeChange]);

  const ageNum = parseFloat(age);
  const isValidAge = !isNaN(ageNum) && ageNum >= 16 && ageNum <= 100;
  
  return (
    <div className="w-full max-w-sm mx-auto h-full flex flex-col">
      <div className="flex-shrink-0 text-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary">Your Age</h2>
      </div>
      <div className="flex-1 flex flex-col justify-center min-h-0 pb-4">
        <WheelSelector
          value={age}
          onChange={onAgeChange}
          minValue={16}
          maxValue={100}
          step={1}
          unit="years"
          className="mb-6"
        />
        <div className="mt-auto pt-4">
          <Button 
            onClick={onNext} 
            disabled={!isValidAge} 
            variant="primary"
            className="w-full py-4 px-6 touch-manipulation min-h-[48px] flex-shrink-0"
            aria-label="Continue to next step"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgeStep;