import React, { useState, useCallback, useEffect } from 'react';
import { QuizData, SizeResult, ScreenView, Gender, BellyShapeKey, ChestShapeKey } from './types';
import { TOTAL_QUIZ_STEPS, initialQuizData } from './constants';
import WelcomeScreen from './components/WelcomeScreen';
import QuizCard from './components/QuizCard';
import StepIndicator from './components/StepIndicator';
import GenderStep from './components/steps/GenderStep';
import HeightStep from './components/steps/HeightStep';
import WeightStep from './components/steps/WeightStep';
import AgeStep from './components/steps/AgeStep';
import BodyShapeStep from './components/steps/BodyShapeStep';
import LoadingScreen from './components/LoadingScreen';
import ResultsScreen from './components/ResultsScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('welcome');
  const [currentStep, setCurrentStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>(initialQuizData);
  const [results, setResults] = useState<SizeResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const [quizContentVisible, setQuizContentVisible] = useState(false);

  useEffect(() => {
    // This effect manages the visibility for QuizCard animations
    if (currentScreen === 'quiz' && !isCalculating) {
      setQuizContentVisible(true);
    } else {
      setQuizContentVisible(false);
    }
  }, [currentScreen, currentStep, isCalculating]); // currentStep is important here for re-triggering


  const handleStartQuiz = useCallback(() => {
    setQuizData(initialQuizData); 
    setResults(null);
    setCurrentScreen('quiz');
    setCurrentStep(1); // Explicitly set step 1 to trigger visibility
    // setQuizContentVisible(true); // Let useEffect handle this
  }, []);

  const updateQuizData = useCallback(<K extends keyof QuizData>(key: K, value: QuizData[K]) => {
    setQuizData((prev: QuizData) => ({ ...prev, [key]: value }));
  }, []);

  const handleNextStep = useCallback(() => {
    // Hide current step content to trigger exit animation
    setQuizContentVisible(false); 

    setTimeout(() => {
      if (currentStep < TOTAL_QUIZ_STEPS) {
        setCurrentStep((prev: number) => prev + 1);
        // setQuizContentVisible(true); // Let useEffect handle this for entry animation
      } else {
        // setCurrentScreen('quiz'); // Stays on quiz screen while calculating
        setIsCalculating(true);
        // QuizContentVisible is already false, LoadingScreen will appear
        setTimeout(() => {
          const calculatedResults = calculateSizes(quizData);
          setResults(calculatedResults);
          setIsCalculating(false);
          setCurrentScreen('results'); 
          // ResultsScreen visibility is handled by its own isVisible prop tied to currentScreen
        }, 2000); 
      }
    }, 350); // Duration should be slightly longer than card exit animation (300ms)
  }, [currentStep, quizData]);

  const handleGenderSelect = useCallback((gender: Gender) => {
    updateQuizData('gender', gender);
    handleNextStep();
  }, [updateQuizData, handleNextStep]);

  const handleBellyShapeSelect = useCallback((shape: BellyShapeKey) => {
    updateQuizData('bellyShape', shape);
    handleNextStep();
  }, [updateQuizData, handleNextStep]);

  const handleChestShapeSelect = useCallback((shape: ChestShapeKey) => {
    updateQuizData('chestShape', shape);
    handleNextStep();
  }, [updateQuizData, handleNextStep]);


  const calculateSizes = (data: QuizData): SizeResult => {
    const { gender, height, weight, bellyShape, chestShape } = data;
    const bmi = weight > 0 && height > 0 ? weight / ((height / 100) ** 2) : 0;
    
    let topSize: string, bottomSize: string, shoeSizeUKNum: number, shoeSizeEUNum: number;

    if (gender === 'male') {
        if (chestShape === 'slimmer') topSize = bmi < 22 ? 'S' : bmi < 25 ? 'M' : 'L';
        else if (chestShape === 'broader') topSize = bmi < 20 ? 'M' : bmi < 23 ? 'L' : 'XL';
        else topSize = bmi < 21 ? 'S' : bmi < 24 ? 'M' : bmi < 27 ? 'L' : 'XL';
        
        if (bellyShape === 'flatter') bottomSize = bmi < 22 ? '30-32' : bmi < 25 ? '32-34' : '34-36';
        else if (bellyShape === 'rounded') bottomSize = bmi < 21 ? '32-34' : bmi < 24 ? '34-36' : '36-38';
        else bottomSize = bmi < 22 ? '30-32' : bmi < 25 ? '32-34' : bmi < 28 ? '34-36' : '36-38';
        
        shoeSizeUKNum = Math.max(6, Math.min(12, Math.round((height - 100) / 10) + (weight > 80 ? 0.5 : 0) - (weight < 60 ? 0.5 : 0) ));
    } else { // female
        if (chestShape === 'slimmer') topSize = bmi < 20 ? 'XS' : bmi < 23 ? 'S' : 'M';
        else if (chestShape === 'broader') topSize = bmi < 19 ? 'S' : bmi < 22 ? 'M' : 'L';
        else topSize = bmi < 20 ? 'XS' : bmi < 23 ? 'S' : bmi < 26 ? 'M' : 'L';
        
        if (bellyShape === 'flatter') bottomSize = bmi < 21 ? 'UK 6-8' : bmi < 24 ? 'UK 8-10' : 'UK 10-12';
        else if (bellyShape === 'rounded') bottomSize = bmi < 20 ? 'UK 8-10' : bmi < 23 ? 'UK 10-12' : 'UK 12-14';
        else bottomSize = bmi < 21 ? 'UK 6-8' : bmi < 24 ? 'UK 8-10' : bmi < 27 ? 'UK 10-12' : 'UK 12-14';
        
        shoeSizeUKNum = Math.max(3, Math.min(9, Math.round((height - 105) / 10) + (weight > 70 ? 0.5 : 0) - (weight < 50 ? 0.5 : 0)));
    }
    shoeSizeEUNum = shoeSizeUKNum + 33; // Approximation

    let fitRecommendation: string, fitDescription: string;
    if (bellyShape === 'flatter' && chestShape === 'slimmer') {
        fitRecommendation = 'Fitted';
        fitDescription = 'Slim-fit styles will complement your body shape.';
    } else if (bellyShape === 'rounded' || chestShape === 'broader') {
        fitRecommendation = 'Relaxed';
        fitDescription = 'Comfortable, loose-fitting styles recommended.';
    } else {
        fitRecommendation = 'Regular';
        fitDescription = 'Standard fit styles will work well for you.';
    }

    return {
        topSize,
        bottomSize,
        shoeSizeUK: shoeSizeUKNum.toFixed(shoeSizeUKNum % 1 === 0 ? 0 : 1),
        shoeSizeEU: shoeSizeEUNum.toFixed(shoeSizeEUNum % 1 === 0 ? 0 : 1),
        fitRecommendation,
        fitDescription
    };
  };

  const handleRestartQuiz = useCallback(() => {
    // Hide results screen immediately or with animation if desired
    // For simplicity, direct switch:
    setCurrentScreen('welcome'); 
    
    // Reset state for a fresh quiz
    setQuizData(initialQuizData);
    setCurrentStep(1);
    setResults(null);
    setIsCalculating(false);
    // WelcomeScreen visibility is handled by its own isVisible prop
  }, []);

  const renderStepContent = () => {
    // Step titles are now styled within their respective components
    switch (currentStep) {
      case 1:
        return <GenderStep selectedGender={quizData.gender} onSelectGender={handleGenderSelect} />;
      case 2:
        return <HeightStep height={String(quizData.height || 175)} onHeightChange={(h: string) => updateQuizData('height', parseInt(h) || 175)} onNext={handleNextStep} />;
      case 3:
        return <WeightStep weight={String(quizData.weight || 70)} onWeightChange={(w: string) => updateQuizData('weight', parseInt(w) || 70)} onNext={handleNextStep} />;
      case 4:
        return <AgeStep age={String(quizData.age || 25)} onAgeChange={(a: string) => updateQuizData('age', parseInt(a) || 25)} onNext={handleNextStep} />;
      case 5:
        return <BodyShapeStep gender={quizData.gender} shapeType="belly" selectedShape={quizData.bellyShape} onSelectShape={handleBellyShapeSelect as (shape: BellyShapeKey | ChestShapeKey) => void} title="Select Your Belly Shape" subtitle="Choose the side view that best matches your belly shape"/>;
      case 6:
        return <BodyShapeStep gender={quizData.gender} shapeType="chest" selectedShape={quizData.chestShape} onSelectShape={handleChestShapeSelect as (shape: BellyShapeKey | ChestShapeKey) => void} title="Select Your Chest Shape" subtitle="Choose the front view that best matches your chest/torso shape"/>;
      default:
        return null;
    }
  };
  
  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center p-3 antialiased overflow-hidden touch-manipulation">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center h-full py-safe max-h-[100dvh]">
        <WelcomeScreen onStartQuiz={handleStartQuiz} isVisible={currentScreen === 'welcome'} />

        {/* Quiz content area: Only renders the QuizCard if currentScreen is 'quiz' AND not calculating */}
        {currentScreen === 'quiz' && !isCalculating && (
          <QuizCard isVisible={quizContentVisible} className="w-full h-full flex flex-col" animationType="slide">
            <div className="flex-1 flex flex-col justify-center">
              <StepIndicator currentStep={currentStep} totalSteps={TOTAL_QUIZ_STEPS} />
              <div className="flex-1 flex flex-col justify-center min-h-0">
                {renderStepContent()}
              </div>
            </div>
          </QuizCard>
        )}
        
        {/* Loading Screen: Only renders if currentScreen is 'quiz' AND isCalculating */}
        {currentScreen === 'quiz' && isCalculating && (
           <LoadingScreen isVisible={true} />
        )}
        
        <ResultsScreen results={results} onRestartQuiz={handleRestartQuiz} isVisible={currentScreen === 'results'} />
      </div>
    </div>
  );
};

export default App;