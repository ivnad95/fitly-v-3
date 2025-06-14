import React from 'react';
import { ProductType } from '../../types';

interface OptionCardProps {
  iconClass: string;
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ iconClass, text, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      className={`
        liquid-glass-panel 
        p-4 rounded-2xl text-center cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
        focus-visible:outline-none 
        hover:!bg-[var(--panel-bg-color-hover)] hover:border-[rgba(255,255,255,0.2)]
      `}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      <div className={`text-2xl mb-2 transition-colors duration-300
        ${isSelected ? 'text-accent' : 'text-[rgba(var(--accent-color-rgb),0.7)]' }`}>
        <i className={iconClass}></i>
      </div>
      <div className={`font-semibold text-xs transition-colors duration-300
        ${isSelected ? 'text-primary' : 'text-secondary'}`}>
        {text}
      </div>
    </div>
  );
};

interface ProductTypeStepProps {
  selectedProductType: ProductType;
  onSelectProductType: (productType: ProductType) => void;
}

const ProductTypeStep: React.FC<ProductTypeStepProps> = ({ selectedProductType, onSelectProductType }) => {
  const productOptions = [
    { type: 'Polo' as ProductType, icon: 'fas fa-shirt', text: 'Polo' },
    { type: 'T-Shirt' as ProductType, icon: 'fas fa-tshirt', text: 'T-Shirt' },
    { type: 'Trousers' as ProductType, icon: 'fas fa-user-tie', text: 'Trousers' },
    { type: 'Midlayer' as ProductType, icon: 'fas fa-layer-group', text: 'Midlayer' },
    { type: 'Hoodie' as ProductType, icon: 'fas fa-user-ninja', text: 'Hoodie' }
  ];

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-primary">Select Product Type</h2>
      <p className="text-secondary text-sm text-center mb-8">Choose the type of clothing you're looking for</p>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {productOptions.slice(0, 4).map((product) => (
          <OptionCard
            key={product.type}
            iconClass={product.icon}
            text={product.text}
            isSelected={selectedProductType === product.type}
            onClick={() => onSelectProductType(product.type)}
          />
        ))}
        <div className="col-span-2">
          <OptionCard
            iconClass={productOptions[4].icon}
            text={productOptions[4].text}
            isSelected={selectedProductType === productOptions[4].type}
            onClick={() => onSelectProductType(productOptions[4].type)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductTypeStep;