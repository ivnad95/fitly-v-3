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
        p-5 sm:p-6
        aspect-[4/5] w-full
        flex flex-col items-center justify-center 
        focus-visible:outline-none
        hover:!bg-[var(--panel-bg-color-hover)] hover:border-[var(--panel-border-color-hover)]
      `}
      style={{ willChange: 'transform, opacity, background-color, border-color, box-shadow' }}
      onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      {/* Image directly on the glass panel */}
      <div className="w-full flex-grow flex items-center justify-center mb-3 sm:mb-4">
        {!imageError ? (
          <img
            src={imageSrc}
            alt={`${label} body shape`}
            aria-hidden="true"
            onError={() => setImageError(true)}
            className={`
              max-w-full max-h-[180px] sm:max-h-[220px] md:max-h-[240px] object-contain 
              transform transition-all duration-300 ease-in-out
              ${isSelected 
                ? 'scale-[1.1] opacity-100 group-hover:scale-[1.15]' 
                : 'scale-[1] opacity-80 group-hover:scale-[1.05] group-hover:opacity-95'
              }
            `}
          />
        ) : (
          <div className="text-secondary text-sm">Image not available</div>
        )}
      </div>

      {/* Label only */}
      <div className="text-center">
        <h3 className="text-sm sm:text-base font-semibold text-white">
          {label}
        </h3>
      </div>
    </div>
  );
};

export default BodyShapeOptionCard;