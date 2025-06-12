import React, { useState, useEffect } from 'react';

interface QuizCardProps {
  children: React.ReactNode;
  isVisible: boolean;
  className?: string;
  animationType?: 'slide' | 'fade';
}

const QuizCard: React.FC<QuizCardProps> = ({ children, isVisible, className = '', animationType = 'slide' }) => {
  const [internalVisible, setInternalVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Small delay to ensure the element is in the DOM before animating in
      const timer = setTimeout(() => setInternalVisible(true), 10); 
      return () => clearTimeout(timer);
    } else {
      setInternalVisible(false);
    }
  }, [isVisible]);

  const baseClasses = "liquid-glass-panel p-3 sm:p-5 md:p-6 mx-auto transform transition-all";
  // Smoother, slightly springy easing, common in iOS animations
  const easing = "ease-[cubic-bezier(0.32,0.72,0,1)]"; 

  let animationClasses = "";
  if (animationType === 'slide') {
    animationClasses = internalVisible 
      ? `opacity-100 translate-x-0 scale-100 duration-600 ${easing}` 
      // Assuming slide comes from the right. Adjust translate-x if direction changes.
      : `opacity-0 translate-x-12 scale-95 duration-300 ${easing}`; 
  } else { // fade
    animationClasses = internalVisible 
      ? `opacity-100 translate-y-0 scale-100 duration-600 ${easing}` 
      : `opacity-0 translate-y-5 scale-95 duration-300 ${easing}`;
  }
  
  return (
    <div 
      className={`${baseClasses} ${className} ${animationClasses}`}
      style={{ willChange: 'transform, opacity, background-color, border-color, box-shadow' }}
    >
      {children}
    </div>
  );
};

export default QuizCard;