import React, { useEffect } from 'react';
import Button from '../ui/Button';
import WheelSelector from '../ui/WheelSelector';

interface WeightStepProps {
  weight: string; 
  onWeightChange: (weight: string) => void;
  onNext: () => void;
}

const WeightStep: React.FC<WeightStepProps> = ({ weight, onWeightChange, onNext }) => {
  // Set default weight if empty
  useEffect(() => {
    if (!weight) {
      onWeightChange('70'); // Default to 70 kg
    }
  }, [weight, onWeightChange]);

  const weightNum = parseFloat(weight);
  const isValidWeight = !isNaN(weightNum) && weightNum >= 40 && weightNum <= 150;

  // Convert kg to pounds
  const kgToPounds = (kg: number): string => {
    const pounds = Math.round(kg * 2.20462);
    return `${pounds} lbs`;
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-primary">Your Weight</h2>
      <WheelSelector
        value={weight}
        onChange={onWeightChange}
        minValue={40}
        maxValue={150}
        step={1}
        unit="kg"
        alternateUnit={{
          label: "lbs",
          conversionFn: kgToPounds
        }}
        className="mb-8"
      />
      <Button 
        onClick={onNext} 
        disabled={!isValidWeight} 
        variant="primary"
        className="w-full py-4 px-6 touch-manipulation min-h-[48px]"
        aria-label="Continue to next step"
      >
        Continue
      </Button>
    </div>
  );
};

export default WeightStep;