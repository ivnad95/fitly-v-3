import React, { useEffect, useRef, useState, useCallback } from 'react';

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
  const wheelRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const lastTouchRef = useRef<{ y: number; time: number } | null>(null);
  const velocityRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);

  // Mobile-optimized constants for better UX
  const ITEM_HEIGHT = 50; // Reduced for more compact wheel selector
  const VISIBLE_ITEMS = 5; // Number of visible items
  const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2);
  const FRICTION = 0.85; // More aggressive friction for faster deceleration
  const MIN_VELOCITY = 0.2; // Lower threshold for better responsiveness
  const VELOCITY_MULTIPLIER = 24; // Increased velocity scaling for much faster scrolling
  const generateValues = () => {
    const values = [];
    for (let i = minValue; i <= maxValue; i += step) {
      values.push(i);
    }
    return values;
  };

  const values = generateValues();

  // Set default value if empty
  useEffect(() => {
    if (!value && values.length > 0) {
      // Set to middle value as default
      const defaultIndex = Math.floor(values.length / 2);
      const defaultValue = values[defaultIndex].toString();
      onChange(defaultValue);
    }
  }, [value, values, onChange]);

  // Format display text based on current unit
  const formatDisplayText = (val: number) => {
    if (currentUnit === 'primary') {
      return `${val} ${unit}`;
    } else if (alternateUnit) {
      return alternateUnit.conversionFn(val);
    }
    return `${val} ${unit}`;
  };

  // Improved momentum-based scrolling
  const applyMomentum = useCallback(() => {
    if (!wheelRef.current || Math.abs(velocityRef.current) < MIN_VELOCITY) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      snapToNearestItem();
      return;
    }

    const wheel = wheelRef.current;
    const newScrollTop = wheel.scrollTop + velocityRef.current;
    
    // Apply boundaries
    const maxScroll = (values.length - 1) * ITEM_HEIGHT;
    const boundedScrollTop = Math.max(0, Math.min(newScrollTop, maxScroll));
    
    wheel.scrollTop = boundedScrollTop;
    velocityRef.current *= FRICTION;
    
    updateActiveItem();
    animationRef.current = requestAnimationFrame(applyMomentum);
  }, [values.length]);

  // Smooth scroll to value with optimized easing
  const scrollToValue = useCallback((val: string, behavior: 'auto' | 'smooth' = 'smooth') => {
    if (!wheelRef.current) return;
    
    const numValue = parseInt(val);
    if (isNaN(numValue)) return;
    
    const valueIndex = values.indexOf(numValue);
    if (valueIndex === -1) return;
    
    const scrollTop = valueIndex * ITEM_HEIGHT;
    
    if (behavior === 'auto') {
      wheelRef.current.scrollTop = scrollTop;
    } else {
      // Smooth scroll with CSS transition
      wheelRef.current.style.scrollBehavior = 'smooth';
      wheelRef.current.scrollTop = scrollTop;
      // Reset scroll behavior after animation
      setTimeout(() => {
        if (wheelRef.current) {
          wheelRef.current.style.scrollBehavior = 'auto';
        }
      }, 300);
    }
  }, [values]);

  // Enhanced active item update with better visual feedback
  const updateActiveItem = useCallback(() => {
    if (!wheelRef.current) return;
    
    const currentScrollTop = wheelRef.current.scrollTop;
    const centeredIndex = Math.round(currentScrollTop / ITEM_HEIGHT);
    const items = wheelRef.current.querySelectorAll('.selector-item');
    
    items.forEach((item, index) => {
      const htmlItem = item as HTMLElement;
      const distance = Math.abs(index - centeredIndex);
      const isCenter = distance === 0;
      
      // Enhanced scaling and opacity with smoother transitions
      const scale = isCenter ? 1 : Math.max(0.75, 1 - distance * 0.12);
      const opacity = isCenter ? 1 : Math.max(0.4, 1 - distance * 0.3);
      
      htmlItem.style.transform = `scale(${scale})`;
      htmlItem.style.opacity = opacity.toString();
      htmlItem.style.color = isCenter ? 'rgb(239, 246, 255)' : 'rgb(156, 163, 175)';
      
      // Update the selected value with better debouncing
      if (isCenter) {
        const newValue = htmlItem.dataset.value || '';
        if (newValue !== value) {
          onChange(newValue);
        }
      }
    });
  }, [value, onChange]);

  // Improved snap to nearest item
  const snapToNearestItem = useCallback(() => {
    if (!wheelRef.current) return;
    
    const currentScrollTop = wheelRef.current.scrollTop;
    const nearestIndex = Math.round(currentScrollTop / ITEM_HEIGHT);
    const targetScrollTop = nearestIndex * ITEM_HEIGHT;
    
    if (Math.abs(currentScrollTop - targetScrollTop) > 1) {
      wheelRef.current.style.scrollBehavior = 'smooth';
      wheelRef.current.scrollTop = targetScrollTop;
      setTimeout(() => {
        if (wheelRef.current) {
          wheelRef.current.style.scrollBehavior = 'auto';
        }
      }, 200);
    }
  }, []);

  // Initialize wheel and set default
  useEffect(() => {
    if (wheelRef.current && !isInitialized && value) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        scrollToValue(value, 'auto');
        updateActiveItem();
        setIsInitialized(true);
      }, 50);
    }
  }, [wheelRef.current, value, isInitialized, scrollToValue, updateActiveItem]);

  // Enhanced touch and scroll handling for mobile
  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel) return;

    let isUserScrolling = false;
    let scrollEndTimer: NodeJS.Timeout;

    const handleTouchStart = (e: TouchEvent) => {
      isUserScrolling = true;
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      const touch = e.touches[0];
      lastTouchRef.current = { y: touch.clientY, time: Date.now() };
      velocityRef.current = 0;
      
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isUserScrolling || !lastTouchRef.current) return;
      
      const touch = e.touches[0];
      const currentTime = Date.now();
      const deltaY = lastTouchRef.current.y - touch.clientY;
      const deltaTime = currentTime - lastTouchRef.current.time;
      
      if (deltaTime > 0) {
        velocityRef.current = deltaY / deltaTime * VELOCITY_MULTIPLIER; // Use the new velocity multiplier for faster response
      }
      
      lastTouchRef.current = { y: touch.clientY, time: currentTime };
      requestAnimationFrame(updateActiveItem);
    };

    const handleTouchEnd = () => {
      isUserScrolling = false;
      
      // Start momentum scrolling if velocity is significant
      if (Math.abs(velocityRef.current) >= MIN_VELOCITY) {
        applyMomentum();
      } else {
        snapToNearestItem();
      }
    };

    const handleScroll = () => {
      if (!isUserScrolling) return;
      
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      requestAnimationFrame(updateActiveItem);
      
      scrollEndTimer = setTimeout(() => {
        if (!isUserScrolling) {
          snapToNearestItem();
        }
      }, 30); // Reduced timeout for faster snapping
    };

    // Enhanced wheel event for desktop
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      isUserScrolling = true;
      
      const wheel = wheelRef.current;
      if (!wheel) return;
      
      // Enhanced wheel scrolling with better velocity
      wheel.scrollTop += e.deltaY * 1.5; // Increased wheel sensitivity for faster scrolling
      requestAnimationFrame(updateActiveItem);
      
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        isUserScrolling = false;
        snapToNearestItem();
      }, 100); // Faster snapping for wheel events
    };

    // Enhanced CSS properties for smooth scrolling
    wheel.style.scrollBehavior = 'auto';
    wheel.style.overscrollBehavior = 'contain';
    (wheel.style as any).webkitOverflowScrolling = 'touch'; // iOS smooth scrolling
    wheel.style.transform = 'translateZ(0)'; // Force hardware acceleration
    wheel.style.willChange = 'scroll-position, transform'; // Optimize for scrolling
    
    // Event listeners with proper options
    wheel.addEventListener('touchstart', handleTouchStart, { passive: true });
    wheel.addEventListener('touchmove', handleTouchMove, { passive: true });
    wheel.addEventListener('touchend', handleTouchEnd, { passive: true });
    wheel.addEventListener('scroll', handleScroll, { passive: true });
    wheel.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      wheel.removeEventListener('touchstart', handleTouchStart);
      wheel.removeEventListener('touchmove', handleTouchMove);
      wheel.removeEventListener('touchend', handleTouchEnd);
      wheel.removeEventListener('scroll', handleScroll);
      wheel.removeEventListener('wheel', handleWheel);
      
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [applyMomentum, snapToNearestItem, updateActiveItem]);

  // Scroll to new value when it changes externally
  useEffect(() => {
    if (isInitialized && value) {
      scrollToValue(value, 'smooth');
    }
  }, [value, isInitialized, scrollToValue]);  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Current Value Display */}
      <div 
        className="text-center text-3xl font-extrabold text-primary mb-6"
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

      {/* Mobile-Optimized Selector Wheel */}
      <div 
        className="relative overflow-hidden"
        style={{
          height: `${VISIBLE_ITEMS * ITEM_HEIGHT}px`,
          width: '100%',
          maxWidth: '280px',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
        }}
      >
        {/* Center selection indicator */}
        <div 
          className="absolute left-1/2 pointer-events-none border-t-2 border-b-2 border-blue-500 border-opacity-40 z-10"
          style={{
            top: `${CENTER_INDEX * ITEM_HEIGHT}px`,
            height: `${ITEM_HEIGHT}px`,
            width: '100%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.05), transparent)'
          }}
        ></div>
        
        <div 
          ref={wheelRef} 
          className="h-full overflow-y-scroll scrollbar-hide"
          style={{
            scrollSnapType: 'y mandatory',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            overscrollBehavior: 'contain',
            willChange: 'scroll-position'
          }}
        >
          {/* Top padding for centering */}
          <div style={{ height: `${CENTER_INDEX * ITEM_HEIGHT}px` }} className="flex-shrink-0"></div>
          
          {values.map(val => (
            <div 
              key={val}
              className="selector-item flex items-center justify-center text-lg font-medium text-gray-500 transition-all duration-200 touch-manipulation"
              data-value={val.toString()}
              style={{
                height: `${ITEM_HEIGHT}px`,
                scrollSnapAlign: 'center',
                transform: 'scale(0.75)',
                opacity: '0.4',
                willChange: 'transform, opacity, color',
                userSelect: 'none'
              }}
            >
              {formatDisplayText(val)}
            </div>
          ))}

          {/* Bottom padding for centering */}
          <div style={{ height: `${CENTER_INDEX * ITEM_HEIGHT}px` }} className="flex-shrink-0"></div>
        </div>
      </div>
    </div>
  );
};

export default WheelSelector;