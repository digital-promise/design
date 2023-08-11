import React from 'react';
import './button.css';

interface ButtonProps {
  /**
   * Which of three styles of button to display
   */
  variant?: 'solid' | 'outline' | 'text';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  variant = 'solid',
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={['button', `button--${variant}`].join(' ')}
      {...props}
    >
      {label}
    </button>
  );
};
