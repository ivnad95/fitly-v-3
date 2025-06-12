import React, { useState, useEffect } from 'react';

interface BodyShapeOptionCardProps {
  imageUrl: string;
  label: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

const BodyShapeOptionCard: React.FC<BodyShapeOptionCardProps> = ({ imageUrl, label, description, isSelected, onClick }) => {
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
        p-3 sm:p-4
        min-h-[180px] sm:min-h-[220px] md:min-h-[240px]
        flex flex-col items-center justify-between 
        focus-visible:outline-none
        hover:!bg-[var(--panel-bg-color-hover)] hover:border-[var(--panel-border-color-hover)]
      `}
      style={{ willChange: 'transform, opacity, background-color, border-color, box-shadow' }}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      {/* Image directly on the glass panel */}
      <div className="w-full flex-grow flex items-center justify-center mb-3 sm:mb-4 px-2 bg-black bg-opacity-20 rounded-xl py-2">
        {!imageError ? (
          <img
            src={imageSrc}
            alt={`${label} body shape`}
            aria-hidden="true"
            onError={() => setImageError(true)}
            className={`
              max-w-[60%] sm:max-w-[60%] max-h-[120px] sm:max-h-[160px] object-contain 
              transform transition-all duration-300 ease-in-out
              ${isSelected 
                ? 'scale-[1] opacity-100 img-silhouette-selected group-hover:scale-[1.03]' 
                : 'scale-[0.9] opacity-80 img-silhouette-idle group-hover:scale-[0.95] group-hover:opacity-95'
              }
            `}
            style={{ mixBlendMode: 'screen' }}
          />
        ) : (
          <div className="text-secondary text-sm">Image not available</div>
        )}
      </div>

      {/* Text area below the image, directly on the glass */}
      <div className="text-center w-full mt-auto pt-2">
        <div className={`
          text-base sm:text-lg font-semibold mb-0.5 sm:mb-1
          ${isSelected ? 'text-primary' : 'text-secondary group-hover:text-primary'}
          transition-colors duration-200
          `}
        >
          {label}
        </div>
        <p className={`
          text-xs sm:text-sm leading-snug
          ${isSelected ? 'text-secondary' : 'text-tertiary group-hover:text-secondary'}
          transition-colors duration-200
          `}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default BodyShapeOptionCard;