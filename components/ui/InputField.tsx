import React from 'react';
import { HeightOption } from '../../types';

interface CommonFieldProps {
  label: string;
  id: string;
  error?: string;
  className?: string;
}

interface InputFieldProps extends CommonFieldProps {
  type: 'text' | 'number' | 'email' | 'password';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  name?: string;
}

interface SelectFieldProps extends CommonFieldProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: HeightOption[];
  placeholder?: string;
  name?: string;
}

// Styles are now mostly controlled by global input, select in index.html for base appearance.
// Tailwind classes here are for layout and specific overrides if needed.
const commonFieldContainerStyles = "mb-6";
const commonLabelStyles = "block text-xs font-semibold text-secondary uppercase tracking-wider mb-2";
const commonInputBaseStyles = `
  w-full px-4 py-3 rounded-xl text-sm 
  text-primary placeholder-text-tertiary placeholder-opacity-70 appearance-none
  transition-all duration-200 ease-in-out
  focus:outline-none 
  /* Base bg, border, focus are handled by global input/select styles in index.html */
`;


export const InputField: React.FC<InputFieldProps> = ({ 
  label, id, type, value, onChange, placeholder, min, max, error, className, name 
}) => {
  return (
    <div className={`${commonFieldContainerStyles} ${className}`}>
      <label htmlFor={id} className={commonLabelStyles}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        className={commonInputBaseStyles} // Uses global input styling now
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export const SelectField: React.FC<SelectFieldProps> = ({ 
  label, id, value, onChange, options, placeholder, error, className, name 
}) => {
  const [arrowSvg, setArrowSvg] = React.useState('');

  React.useEffect(() => {
    // Debounce or ensure this runs after styles are fully applied if issues persist
    const attemptGetColor = () => {
      const secondaryTextColor = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary-color').trim();
      if (secondaryTextColor) {
        setArrowSvg(encodeURIComponent(`
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='${secondaryTextColor.replace("#", "%23")}'>
            <path fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/>
          </svg>
        `));
      } else {
        // Retry if color not available on first pass (e.g. initial render)
        // setTimeout(attemptGetColor, 50); 
      }
    };
    attemptGetColor();
  }, []);


  return (
    <div className={`${commonFieldContainerStyles} ${className}`}>
      <label htmlFor={id} className={commonLabelStyles}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name || id}
          value={value}
          onChange={onChange}
          className={`${commonInputBaseStyles} pr-10`} // Uses global select styling
          style={{ 
            backgroundImage: arrowSvg ? `url("data:image/svg+xml,${arrowSvg}")` : 'none', 
            backgroundPosition: 'right 0.85rem center', 
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1em 1em' 
          }}
        >
          {placeholder && <option value="" >{placeholder}</option>}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
};