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
    <div className="w-full max-w-sm mx-auto flex flex-col">
      <div className="flex-shrink-0 text-center mb-4">
        <h2 className="text-xl font-bold text-primary mb-1">{title}</h2>
        <p className="text-secondary text-sm px-1">{subtitle}</p>
      </div>
      <div className="flex-1 flex flex-col justify-center min-h-0">
        <div className="flex flex-col gap-2 px-2 items-center"> {/* Vertical layout for square buttons */}
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
    </div>
  );
};

export default BodyShapeStep;