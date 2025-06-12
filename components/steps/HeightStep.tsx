import React from 'react';
import Button from '../ui/Button';
import WheelSelector from '../ui/WheelSelector';

interface HeightStepProps {
  height: string; 
  onHeightChange: (height: string) => void;
  onNext: () => void;
}

const HeightStep: React.FC<HeightStepProps> = ({ height, onHeightChange, onNext }) => {
  // Convert feet and inches to a string representation
  const cmToFeetAndInches = (cm: number): string => {
    const totalInches = Math.round(cm / 2.54);
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    return `${feet}' ${inches}"`;
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-primary">Your Height</h2>
      <WheelSelector
        value={height}
        onChange={onHeightChange}
        minValue={150}
        maxValue={200}
        step={1}
        unit="cm"
        alternateUnit={{
          label: "ft/in",
          conversionFn: cmToFeetAndInches
        }}
        className="mb-8"
      />
      <Button onClick={onNext} disabled={!height} variant="primary">
        Continue
      </Button>
    </div>
  );
};

export default HeightStep;