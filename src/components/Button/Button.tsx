import React from 'react';
import './button.css';

interface ButtonProps {
  /**
   * Which of three styles of button to display
   */
  variant?: 'solid' | 'outline' | 'text';
  /**
   * Button initiates a dangerous action
   */
  danger?: boolean;
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Add disabled attribute
   */
  disabled?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  variant = 'solid',
  danger = false,
  label,
  ...props
}: ButtonProps) => {
  const classname = ['button', `button--${variant}`];
  if (danger) {
    classname.push('danger');
  }
  return (
    <button
      type="button"
      className={classname.join(' ')}
      {...props}
    >
      {label}
    </button>
  );
};
