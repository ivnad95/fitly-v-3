import React from 'react';
import { SizeResult, ProductType } from '../types';
import Button from './ui/Button';
import QuizCard from './QuizCard';

// Size conversion functions for international sizing
const convertSizes = (baseSize: string, productType: ProductType, gender: 'male' | 'female') => {
  if (productType === 'Trousers') {
    // For trousers, convert waist measurements
    if (gender === 'male') {
      // Male waist sizes (already in inches format like "30-32")
      const waistInches = baseSize.split('-')[0]; // Get the first number
      const waist = parseInt(waistInches);
      return {
        uk: `UK ${baseSize}"`,
        eu: `EU ${waist + 16}-${waist + 18}`,
        usa: `US ${baseSize}"`,
        aus: `AU ${baseSize}"`
      };
    } else {
      // Female UK dress sizes (like "UK 8-10")
      const ukSize = baseSize.replace('UK ', '');
      const size = parseInt(ukSize.split('-')[0]);
      const endSize = parseInt(ukSize.split('-')[1] || size);
      return {
        uk: baseSize,
        eu: `EU ${size + 28}-${endSize + 28}`,
        usa: `US ${Math.max(0, size - 4)}-${Math.max(0, endSize - 4)}`,
        aus: `AU ${size}-${endSize}`
      };
    }
  } else {
    // For tops (Polo, T-Shirt, Midlayer, Hoodie)
    const topSizeMap = {
      male: {
        'XS': { uk: 'UK XS', eu: 'EU 44', usa: 'US XS', aus: 'AU XS' },
        'S': { uk: 'UK S', eu: 'EU 46-48', usa: 'US S', aus: 'AU S' },
        'M': { uk: 'UK M', eu: 'EU 48-50', usa: 'US M', aus: 'AU M' },
        'L': { uk: 'UK L', eu: 'EU 50-52', usa: 'US L', aus: 'AU L' },
        'XL': { uk: 'UK XL', eu: 'EU 52-54', usa: 'US XL', aus: 'AU XL' },
        'XXL': { uk: 'UK XXL', eu: 'EU 54-56', usa: 'US XXL', aus: 'AU XXL' }
      },
      female: {
        'XS': { uk: 'UK 6-8', eu: 'EU 32-34', usa: 'US 0-2', aus: 'AU 6-8' },
        'S': { uk: 'UK 8-10', eu: 'EU 34-36', usa: 'US 2-4', aus: 'AU 8-10' },
        'M': { uk: 'UK 10-12', eu: 'EU 36-38', usa: 'US 4-6', aus: 'AU 10-12' },
        'L': { uk: 'UK 12-14', eu: 'EU 38-40', usa: 'US 6-8', aus: 'AU 12-14' },
        'XL': { uk: 'UK 14-16', eu: 'EU 40-42', usa: 'US 8-10', aus: 'AU 14-16' }
      }
    };
    
    const sizeConversions = topSizeMap[gender][baseSize as keyof typeof topSizeMap[typeof gender]];
    return sizeConversions || { uk: baseSize, eu: baseSize, usa: baseSize, aus: baseSize };
  }
};

const getFitMessage = (productType: ProductType, topSize: string, bottomSize: string): { title: string; description: string } => {
  const isTopProduct = productType !== 'Trousers';
  const size = isTopProduct ? topSize : bottomSize;
  
  switch (productType) {
    case 'Polo':
      return {
        title: `${productType} Recommendation`,
        description: `Size ${size} polo offers a comfortable fit with room for movement while maintaining a clean, professional silhouette.`
      };
    case 'T-Shirt':
      return {
        title: `${productType} Recommendation`,
        description: `Size ${size} t-shirt provides the perfect balance of comfort and style for everyday casual wear.`
      };
    case 'Trousers':
      return {
        title: `${productType} Recommendation`,
        description: `Size ${size} trousers will provide a comfortable fit with proper proportions for a polished appearance.`
      };
    case 'Midlayer':
      return {
        title: `${productType} Recommendation`,
        description: `Size ${size} midlayer offers excellent layering capability with comfortable fit over base layers while allowing freedom of movement.`
      };
    case 'Hoodie':
      return {
        title: `${productType} Recommendation`,
        description: `Size ${size} hoodie provides a relaxed, comfortable fit perfect for casual wear and layering.`
      };
    default:
      return {
        title: 'Size Recommendation',
        description: 'Perfect fit based on your measurements.'
      };
  }
};

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
      <div className="grid grid-cols-1 gap-2.5 mb-4">
        {/* Product-specific size recommendation */}
        {(() => {
          const isTopProduct = results.productType !== 'Trousers';
          const baseSize = isTopProduct ? results.topSize : results.bottomSize;
          const sizeType = isTopProduct ? 'Top Size' : 'Waist Size';
          const fitMessage = getFitMessage(results.productType, results.topSize, results.bottomSize);
          const sizeConversions = convertSizes(baseSize, results.productType, results.gender as 'male' | 'female');
          
          return (
            <>
              <ResultItem 
                title={fitMessage.title} 
                value={baseSize}
                description={fitMessage.description} 
              />
              
              {/* International size conversions */}
              <div className="grid grid-cols-2 gap-2">
                <ResultItem 
                  title="UK Size" 
                  value={sizeConversions.uk}
                  description="United Kingdom sizing" 
                />
                <ResultItem 
                  title="EU Size" 
                  value={sizeConversions.eu}
                  description="European sizing" 
                />
                <ResultItem 
                  title="US Size" 
                  value={sizeConversions.usa}
                  description="United States sizing" 
                />
                <ResultItem 
                  title="AU Size" 
                  value={sizeConversions.aus}
                  description="Australian sizing" 
                />
              </div>
            </>
          );
        })()}
      </div>
      <Button onClick={onRestartQuiz} variant="primary" size="large" className="w-full">
        <i className="fas fa-redo mr-2"></i>
        Start Over
      </Button>
    </QuizCard>
  );
};

export default ResultsScreen;