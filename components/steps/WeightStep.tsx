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
    <div className="w-full max-w-sm mx-auto flex flex-col">
      <div className="flex-shrink-0 text-center mb-3">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">Your Weight</h2>
      </div>
      <div className="flex-1 flex flex-col justify-center min-h-0 pb-6">
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
          className="mb-4"
        />
        <div className="mt-auto pt-4 pb-4 px-4">
          <Button 
            onClick={onNext} 
            disabled={!isValidWeight} 
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

export default WeightStep;