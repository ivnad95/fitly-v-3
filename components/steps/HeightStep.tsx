import React, { useEffect } from 'react';
import Button from '../ui/Button';
import WheelSelector from '../ui/WheelSelector';

interface HeightStepProps {
  height: string; 
  onHeightChange: (height: string) => void;
  onNext: () => void;
}

const HeightStep: React.FC<HeightStepProps> = ({ height, onHeightChange, onNext }) => {
  // Set default height if empty
  useEffect(() => {
    if (!height) {
      onHeightChange('175'); // Default to 175 cm
    }
  }, [height, onHeightChange]);

  // Convert feet and inches to a string representation
  const cmToFeetAndInches = (cm: number): string => {
    const totalInches = Math.round(cm / 2.54);
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    return `${feet}' ${inches}"`;
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col">
      <div className="flex-shrink-0 text-center mb-3">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">Your Height</h2>
      </div>
      <div className="flex-1 flex flex-col justify-center min-h-0 pb-6">
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
          className="mb-4"
        />
        <div className="mt-auto pt-4 pb-4 px-4">
          <Button 
            onClick={onNext} 
            disabled={!height} 
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

export default HeightStep;