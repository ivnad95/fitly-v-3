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
    <div className="liquid-glass-panel p-3 sm:p-4 rounded-2xl text-center"> {/* Updated radius */}
        <h3 className="text-primary font-semibold text-base sm:text-lg mb-1 sm:mb-2">{title}</h3>
        <p className="text-white text-xl sm:text-2xl font-bold mb-1">{value}</p>
        <p className="text-secondary text-xs sm:text-sm">{description}</p>
    </div>
);

const ResultsScreen: React.FC<ResultsScreenProps> = ({ results, onRestartQuiz, isVisible }) => {
  if (!isVisible) return null; 

  if (!results) {
    return (
        <QuizCard isVisible={isVisible} className="w-full max-w-md mx-auto" animationType="fade">
             <div className="text-center py-8">
                <i className="fas fa-exclamation-circle text-3xl sm:text-4xl text-secondary mb-4"></i>
                <p className="text-secondary text-sm sm:text-base mb-6">No results to display. Please complete the quiz.</p>
                <Button onClick={onRestartQuiz} variant="primary" size="large">
                    <i className="fas fa-redo mr-2"></i>
                    Take Quiz Again
                </Button>
             </div>
        </QuizCard>
    );
  }

  return (
    <QuizCard isVisible={isVisible} className="w-full max-w-md mx-auto" animationType="fade">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Your Size Recommendations</h1>
        <p className="text-secondary text-sm sm:text-base">Based on your provided information</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <ResultItem title="Top Size" value={results.topSize} description="Estimated for your chest" />
        <ResultItem title="Bottom Size" value={results.bottomSize} description="Estimated for your waist/hips" />
        <ResultItem title="Shoe Size (UK)" value={`UK ${results.shoeSizeUK}`} description="United Kingdom sizing" />
        <ResultItem title="Shoe Size (EU)" value={`EU ${results.shoeSizeEU}`} description="European sizing" />
        {/* Fit Recommendation can span full width or be styled as other items */}
        <div className="sm:col-span-2">
            <ResultItem title="Fit Recommendation" value={results.fitRecommendation} description={results.fitDescription} />
        </div>
      </div>
      <Button onClick={onRestartQuiz} variant="primary" size="large">
        <i className="fas fa-redo mr-2.5"></i>
        Take Quiz Again
      </Button>
    </QuizCard>
  );
};

export default ResultsScreen;