import React, { useState, useEffect } from 'react';

interface BodyShapeOptionCardProps {
  imageUrl: string;
  label: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

const BodyShapeOptionCard: React.FC<BodyShapeOptionCardProps> = ({ imageUrl, label, description: _description, isSelected, onClick }) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    // Ensure the image URL is properly loaded from the public directory
    const loadImage = async () => {
      try {
        // If the URL starts with a slash, it's a relative path from the public directory
        if (imageUrl.startsWith('/')) {
          setImageSrc(imageUrl);
        } else {
          // Otherwise, use the URL as is
          setImageSrc(imageUrl);
        }
        setImageError(false);
      } catch (error) {
        console.error('Error loading image:', error);
        setImageError(true);
      }
    };

    loadImage();
  }, [imageUrl]);

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      className={`
        liquid-glass-panel group
        rounded-2xl cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] overflow-hidden
        p-4 sm:p-5
        aspect-square w-full
        flex flex-col items-center justify-center 
        focus-visible:outline-none
        hover:!bg-[var(--panel-bg-color-hover)] hover:border-[var(--panel-border-color-hover)]
        ${isSelected 
          ? 'scale-[1.02] border-[var(--accent-color-hex)] bg-[var(--panel-bg-color-active)]' 
          : 'scale-100 hover:scale-[1.01]'
        }
      `}
      style={{ willChange: 'transform, opacity, background-color, border-color, box-shadow' }}
      onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      {/* Image */}
      <div className="w-16 h-16 flex items-center justify-center mb-3 flex-shrink-0">
        {!imageError ? (
          <img
            src={imageSrc}
            alt={`${label} body shape`}
            aria-hidden="true"
            onError={() => setImageError(true)}
            className={`
              w-full h-full object-contain 
              transform transition-all duration-300 ease-in-out
              ${isSelected 
                ? 'scale-[1.05] opacity-100' 
                : 'scale-[1] opacity-80 group-hover:scale-[1.02] group-hover:opacity-95'
              }
            `}
          />
        ) : (
          <div className="text-secondary text-xs">Image not available</div>
        )}
      </div>

      {/* Label */}
      <div className="text-center">
        <h3 className="text-sm sm:text-base font-semibold text-white">
          {label}
        </h3>
      </div>
    </div>
  );
};

export default BodyShapeOptionCard;