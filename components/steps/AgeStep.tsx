import React from 'react';
import { InputField } from '../ui/InputField';
import Button from '../ui/Button';

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
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-primary">Your Age</h2>
      <InputField
        id="age-input"
        label="Age (years)"
        type="number"
        value={age}
        onChange={(e) => onAgeChange(e.target.value)}
        placeholder="Enter your age"
        min={16}
        max={100}
        className="mb-8"
      />
      <Button onClick={onNext} disabled={!isValidAge} variant="primary">
        Continue
      </Button>
    </div>
  );
};

export default AgeStep;