import React from 'react';
import Button from './ui/Button';
import QuizCard from './QuizCard';

interface WelcomeScreenProps {
  onStartQuiz: () => void;
  isVisible: boolean;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartQuiz, isVisible }) => {
  if (!isVisible) return null; 

  return (
    <QuizCard isVisible={isVisible} className="w-full max-w-md mx-auto" animationType="fade">
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-5xl sm:text-6xl font-bold text-primary mb-3">FitMe</h1>
        <p className="text-secondary text-lg sm:text-xl">Find your perfect clothing size.</p>
      </div>
      <div className="text-center mb-10 sm:mb-12">
        <i className="fas fa-tshirt text-6xl sm:text-7xl text-accent mb-6 sm:mb-8"></i>
        <p className="text-secondary text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
          Get personalized size recommendations for clothing and shoes based on your body measurements and shape.
        </p>
      </div>
      <Button onClick={onStartQuiz} fullWidth variant="primary" size="large" className="font-semibold">
        <i className="fas fa-play mr-2.5"></i>
        Start
      </Button>
    </QuizCard>
  );
};

export default WelcomeScreen;