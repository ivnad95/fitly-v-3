import React from 'react';
import { SelectField } from '../ui/InputField';
import Button from '../ui/Button';
import { heightOptions } from '../../constants';
import { HeightOption } from '../../types';

interface HeightStepProps {
  height: string; 
  onHeightChange: (height: string) => void;
  onNext: () => void;
}

const HeightStep: React.FC<HeightStepProps> = ({ height, onHeightChange, onNext }) => {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-primary">Your Height</h2>
      <SelectField
        id="height-input"
        label="Height (cm)"
        value={height}
        onChange={(e) => onHeightChange(e.target.value)}
        options={heightOptions as HeightOption[]}
        placeholder="Select your height"
        className="mb-8"
      />
      <Button onClick={onNext} disabled={!height} variant="primary">
        Continue
      </Button>
    </div>
  );
};

export default HeightStep;