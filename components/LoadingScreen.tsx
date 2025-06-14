import React from 'react';
import QuizCard from './QuizCard';

interface LoadingScreenProps {
    isVisible: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({isVisible}) => {
  if(!isVisible) return null;

  return (
    <QuizCard isVisible={isVisible} className="w-full max-w-md mx-auto text-center" animationType="fade">
        <div className="py-8 sm:py-10">
            <div 
              className="w-12 h-12 sm:w-14 sm:h-14 border-4 border-[rgba(var(--accent-color-rgb),0.2)] rounded-full animate-spin mx-auto mb-6 sm:mb-8"
              style={{ borderTopColor: 'var(--accent-color-hex)', boxShadow: '0 0 10px rgba(var(--accent-color-rgb),0.3)' }}
            ></div>
            <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-2">Analysing...</h2>
            <p className="text-secondary text-sm">Calculating your personalized recommendations...</p>
        </div>
    </QuizCard>
  );
};

export default LoadingScreen;