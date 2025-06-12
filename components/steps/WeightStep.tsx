import React from 'react';
import { InputField } from '../ui/InputField';
import Button from '../ui/Button';

interface WeightStepProps {
  weight: string; 
  onWeightChange: (weight: string) => void;
  onNext: () => void;
}

const WeightStep: React.FC<WeightStepProps> = ({ weight, onWeightChange, onNext }) => {
  const weightNum = parseFloat(weight);
  const isValidWeight = !isNaN(weightNum) && weightNum >= 30 && weightNum <= 200;

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-primary">Your Weight</h2>
      <InputField
        id="weight-input"
        label="Weight (kg)"
        type="number"
        value={weight}
        onChange={(e) => onWeightChange(e.target.value)}
        placeholder="Enter your weight"
        min={30}
        max={200}
        className="mb-8"
      />
      <Button onClick={onNext} disabled={!isValidWeight} variant="primary">
        Continue
      </Button>
    </div>
  );
};

export default WeightStep;