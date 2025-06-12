import React, { useEffect, useRef, useState } from 'react';

interface WheelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  minValue: number;
  maxValue: number;
  step?: number;
  unit: string;
  alternateUnit?: {
    label: string;
    conversionFn: (value: number) => string;
  };
  className?: string;
}

const WheelSelector: React.FC<WheelSelectorProps> = ({
  value,
  onChange,
  minValue,
  maxValue,
  step = 1,
  unit,
  alternateUnit,
  className = '',
}) => {
  const [currentUnit, setCurrentUnit] = useState<'primary' | 'alternate'>('primary');
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Generate values array based on min, max, and step
  const generateValues = () => {
    const values = [];
    for (let i = minValue; i <= maxValue; i += step) {
      values.push(i);
    }
    return values;
  };

  const values = generateValues();

  // Format display text based on current unit
  const formatDisplayText = (val: number) => {
    if (currentUnit === 'primary') {
      return `${val} ${unit}`;
    } else if (alternateUnit) {
      return alternateUnit.conversionFn(val);
    }
    return `${val} ${unit}`;
  };

  // Scroll to the selected value
  const scrollToValue = (val: string, behavior: ScrollBehavior = 'smooth') => {
    if (!wheelRef.current) return;
    
    const numValue = parseInt(val);
    if (isNaN(numValue)) return;
    
    const valueIndex = values.indexOf(numValue);
    if (valueIndex === -1) return;
    
    const itemHeight = 50; // Height of each selector item
    const scrollTop = valueIndex * itemHeight;
    
    wheelRef.current.scrollTo({ top: scrollTop, behavior });
  };

  // Update active item based on scroll position
  const updateActiveItem = () => {
    if (!wheelRef.current) return;
    
    const itemHeight = 50;
    const centeredIndex = Math.round(wheelRef.current.scrollTop / itemHeight);
    const items = wheelRef.current.querySelectorAll('.selector-item');
    
    items.forEach((item, index) => {
      const htmlItem = item as HTMLElement;
      if (index === centeredIndex) {
        htmlItem.style.transform = 'scale(1) rotateX(0deg)';
        htmlItem.style.opacity = '1';
        htmlItem.style.color = 'var(--text-primary-color, #EFF6FF)';
        
        // Update the selected value
        const newValue = htmlItem.dataset.value || '';
        if (newValue !== value) {
          onChange(newValue);
        }
      } else {
        htmlItem.style.transform = 'scale(0.75) rotateX(-20deg)';
        htmlItem.style.opacity = '0.4';
        htmlItem.style.color = 'var(--text-tertiary-color, #6B7280)';
      }
    });
  };

  // Toggle between units
  const toggleUnit = () => {
    if (!alternateUnit) return;
    
    setCurrentUnit(prev => prev === 'primary' ? 'alternate' : 'primary');
  };

  // Initialize wheel and scroll to initial value
  useEffect(() => {
    if (wheelRef.current && !isInitialized) {
      scrollToValue(value, 'auto');
      setIsInitialized(true);
      setTimeout(updateActiveItem, 0);
    }
  }, [wheelRef.current, value, isInitialized]);

  // Handle scroll events
  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel) return;

    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      requestAnimationFrame(updateActiveItem);
      
      const timeout = setTimeout(() => {
        const itemHeight = 50;
        const snappedScrollTop = Math.round(wheel.scrollTop / itemHeight) * itemHeight;
        wheel.scrollTo({ top: snappedScrollTop, behavior: 'smooth' });
      }, 100);
      
      setScrollTimeout(timeout);
    };

    wheel.addEventListener('scroll', handleScroll);
    return () => {
      wheel.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  // Scroll to new value when it changes externally
  useEffect(() => {
    if (isInitialized && value) {
      scrollToValue(value);
    }
  }, [value]);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Current Value Display */}
      <div 
        className="text-center text-5xl font-extrabold text-primary my-6"
        style={{ textShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }}
      >
        {value ? formatDisplayText(parseInt(value)) : ''}
      </div>

      {/* Unit Toggle (if alternate unit is provided) */}
      {alternateUnit && (
        <div className="flex justify-center mb-6">
          <div className="relative p-1 rounded-full flex items-center w-40 bg-black bg-opacity-30">
            <div 
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-blue-500 rounded-full transition-transform duration-300"
              style={{ transform: currentUnit === 'primary' ? 'translateX(0%)' : 'translateX(calc(100% + 4px))' }}
            ></div>
            <button 
              className={`relative z-10 w-1/2 py-1.5 text-sm font-semibold transition-colors duration-300 ${currentUnit === 'primary' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setCurrentUnit('primary')}
            >
              {unit}
            </button>
            <button 
              className={`relative z-10 w-1/2 py-1.5 text-sm font-semibold transition-colors duration-300 ${currentUnit === 'alternate' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setCurrentUnit('alternate')}
            >
              {alternateUnit.label}
            </button>
          </div>
        </div>
      )}

      {/* Selector Wheel */}
      <div className="relative h-[220px] overflow-hidden" style={{
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
        maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
      }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[50px] pointer-events-none border-t-2 border-b-2 border-blue-500 border-opacity-50" style={{
          background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.05), transparent)'
        }}></div>
        <div 
          ref={wheelRef} 
          className="h-full overflow-y-scroll scrollbar-hide"
          style={{
            scrollSnapType: 'y mandatory',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          <div className="h-[85px] flex-shrink-0"></div>
          {values.map(val => (
            <div 
              key={val}
              className="selector-item h-[50px] flex items-center justify-center text-2xl font-medium text-gray-500 transition-all duration-400"
              data-value={val.toString()}
              style={{
                scrollSnapAlign: 'center',
                transform: 'scale(0.75) rotateX(-20deg)',
                opacity: '0.4'
              }}
            >
              {formatDisplayText(val)}
            </div>
          ))}
          <div className="h-[85px] flex-shrink-0"></div>
        </div>
      </div>
    </div>
  );
};

export default WheelSelector;