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
    <div className="liquid-glass-panel p-4 sm:p-5 text-center rounded-xl"> {/* Slightly smaller radius for items */}
        <h3 className="text-xs font-semibold text-tertiary mb-1 uppercase tracking-wider">{title}</h3>
        <p className="text-xl sm:text-2xl font-bold text-accent mb-1.5">{value}</p>
        <p className="text-xs text-secondary opacity-90">{description}</p>
    </div>
);

const ResultsScreen: React.FC<ResultsScreenProps> = ({ results, onRestartQuiz, isVisible }) => {
  if (!isVisible) return null; 

  if (!results) {
    return (
        <QuizCard isVisible={isVisible} className="max-w-lg w-full" animationType="fade">
             <div className="text-center py-10">
                <i className="fas fa-exclamation-circle text-4xl text-secondary mb-4"></i>
                <p className="text-secondary">No results to display. Please complete the quiz.</p>
             </div>
             <Button onClick={onRestartQuiz} variant="primary" size="large">
                <i className="fas fa-redo mr-2"></i>
                Take Quiz Again
            </Button>
        </QuizCard>
    );
  }

  return (
    <QuizCard isVisible={isVisible} className="max-w-lg w-full" animationType="fade">
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">Your Size Recommendations</h1>
        <p className="text-secondary">Based on your provided information</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-8 sm:mb-10">
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