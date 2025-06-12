import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  className?: string;
  size?: 'normal' | 'large';
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  disabled = false, 
  variant = 'primary', 
  type = 'button',
  fullWidth = true,
  className = '',
  size = 'normal'
}) => {
  // Base styles for all glass buttons
  const baseGlassStyles = `
    rounded-xl font-semibold 
    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
    focus-visible:outline-none 
    transform active:scale-[0.97]
    border
    backdrop-filter backdrop-blur-[30px] saturate-[160%] -webkit-backdrop-filter backdrop-blur-[30px] saturate-[160%]
    /* Shared complex shadow for buttons, slightly simplified from main panel for performance if needed */
    shadow-[0_10px_20px_rgba(0,0,0,0.15),_0_3px_6px_rgba(0,0,0,0.1),_inset_-1px_-1px_3px_var(--glass-inner-shadow-dark),_inset_0px_0px_15px_2px_var(--glass-inner-reflection-subtle),_inset_0px_1px_12px_0px_var(--glass-glow-accent),_inset_0px_3px_10px_1px_var(--glass-highlight-diffused),_inset_0px_1px_2px_0px_var(--glass-highlight-sharp)]
    hover:shadow-[0_12px_25px_rgba(0,0,0,0.18),_0_4px_8px_rgba(0,0,0,0.12),_inset_-1px_-1px_4px_var(--glass-inner-shadow-dark),_inset_0px_0px_20px_3px_var(--glass-inner-reflection-subtle),_inset_0px_2px_15px_0px_var(--glass-glow-accent-stronger),_inset_0px_4px_12px_2px_var(--glass-highlight-diffused),_inset_0px_2px_3px_0px_var(--glass-highlight-sharp)]
    active:shadow-[0_5px_10px_rgba(0,0,0,0.1),_inset_0_1px_3px_rgba(0,0,0,0.2)]
  `;
  
  const sizeStyles = size === 'large' ? 'px-8 py-3.5 text-base' : 'px-5 py-2.5 text-sm';

  // Primary: Accent-tinted glass
  const primaryStyles = `
    bg-[rgba(var(--accent-color-rgb),0.15)] hover:bg-[rgba(var(--accent-color-rgb),0.2)] active:bg-[rgba(var(--accent-color-rgb),0.25)]
    text-white /* Primary text on accent buttons */
    border-[var(--panel-border-color-selected)] hover:border-[rgba(var(--accent-color-rgb),0.4)]
  `;
  
  // Secondary: Clearer glass button
  const secondaryStyles = `
    bg-[var(--panel-base-bg-color)] hover:bg-[rgba(255,255,255,0.08)] active:bg-[rgba(255,255,255,0.1)]
    text-primary /* Default light text for secondary buttons */
    border-[var(--panel-border-color)] hover:border-[var(--panel-border-color-hover)]
  `;

  const disabledStyles = "opacity-50 cursor-not-allowed !shadow-none active:!scale-100 !backdrop-filter-none !saturate-100";

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseGlassStyles}
        ${sizeStyles}
        ${variant === 'primary' ? primaryStyles : secondaryStyles}
        ${disabled ? disabledStyles : ''}
        ${widthStyle}
        ${className}
      `}
      style={{ willChange: 'transform, opacity, background-color, border-color, box-shadow' }}
    >
      {children}
    </button>
  );
};

export default Button;