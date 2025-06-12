import React from 'react';
import { Gender, BellyShapeKey, ChestShapeKey, BodyShapeCategory, ChestShapeCategory } from '../../types';
import BodyShapeOptionCard from '../ui/BodyShapeOptionCard';
import { bodyShapeImages, bellyShapeDescriptions, chestShapeDescriptions } from '../../constants';

type ShapeType = 'belly' | 'chest';
type ShapeKey = BellyShapeKey | ChestShapeKey;

interface BodyShapeStepProps {
  gender: Gender;
  shapeType: ShapeType;
  selectedShape: ShapeKey;
  onSelectShape: (shape: ShapeKey) => void;
  title: string;
  subtitle: string;
}

const BodyShapeStep: React.FC<BodyShapeStepProps> = ({
  gender,
  shapeType,
  selectedShape,
  onSelectShape,
  title,
  subtitle,
}) => {
  if (!gender) return <p className="text-center text-red-400">Please select a gender in Step 1 first.</p>;

  const shapes = bodyShapeImages[gender][shapeType] as BodyShapeCategory | ChestShapeCategory;
  const descriptions = shapeType === 'belly' ? bellyShapeDescriptions : chestShapeDescriptions;

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-1.5 text-primary">{title}</h2>
      <p className="text-center text-secondary mb-3 sm:mb-4 text-sm">{subtitle}</p>
      <div className="grid grid-cols-1 gap-2 sm:gap-3 mb-4 sm:mb-6"> {/* Always single column for better mobile fit */}
        {Object.entries(shapes).map(([key, imageUrl]) => (
          <BodyShapeOptionCard
            key={key}
            imageUrl={imageUrl}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            description={descriptions[key as keyof typeof descriptions]}
            isSelected={selectedShape === key}
            onClick={() => onSelectShape(key as ShapeKey)}
          />
        ))}
      </div>
    </div>
  );
};

export default BodyShapeStep;