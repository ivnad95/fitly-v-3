import React from 'react';
import { SizeResult } from '../types';
import Button from './ui/Button';
import QuizCard from './QuizCard';

interface ResultsScreenProps {
  results: SizeResult | null;
  onRestartQuiz: () => void;
  isVisible: boolean;
}

interface ResultItemProps {
    title: string;
    value: string;
    description: string;
}

const ResultItem: React.FC<ResultItemProps> = ({ title, value, description }) => (
    // Each ResultItem is now also a liquid-glass-panel for consistency
    <div className="liquid-glass-panel p-2 rounded-xl text-center"> 
        <h3 className="text-primary font-semibold text-xs mb-1">{title}</h3>
        <p className="text-white text-base font-bold mb-0.5">{value}</p>
        <p className="text-secondary text-xs leading-tight">{description}</p>
    </div>
);

const ResultsScreen: React.FC<ResultsScreenProps> = ({ results, onRestartQuiz, isVisible }) => {
  if (!isVisible) return null; 

  if (!results) {
    return (
        <QuizCard isVisible={isVisible} className="w-full max-w-sm mx-auto" animationType="fade">
             <div className="text-center py-6">
                <i className="fas fa-exclamation-circle text-2xl text-secondary mb-3"></i>
                <p className="text-secondary text-sm mb-4">No results to display. Please complete the quiz.</p>
                <Button onClick={onRestartQuiz} variant="primary" size="large">
                    <i className="fas fa-redo mr-2"></i>
                    Start Over
                </Button>
             </div>
        </QuizCard>
    );
  }

  return (
    <QuizCard isVisible={isVisible} className="w-full max-w-sm mx-auto h-fit" animationType="fade">
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-primary mb-1">Your Size Recommendations</h1>
        <p className="text-secondary text-xs">Based on your provided information</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <ResultItem title="Top Size" value={results.topSize} description="Estimated for your chest" />
        <ResultItem title="Bottom Size" value={results.bottomSize} description="Estimated for your waist" />
        {/* Fit Recommendation spans full width */}
        <div className="col-span-2">
            <ResultItem title="Fit Recommendation" value={results.fitRecommendation} description={results.fitDescription} />
        </div>
      </div>
      <Button onClick={onRestartQuiz} variant="primary" size="large" className="w-full">
        <i className="fas fa-redo mr-2"></i>
        Start Over
      </Button>
    </QuizCard>
  );
};

export default ResultsScreen;