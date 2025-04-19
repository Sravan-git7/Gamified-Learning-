import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    className, 
    variant = 'primary', 
    size = 'md', 
    icon, 
    iconPosition = 'left',
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600",
      outline: "border border-slate-300 bg-transparent hover:bg-slate-100 active:bg-slate-200 dark:border-slate-600 dark:hover:bg-slate-800 dark:active:bg-slate-700",
      ghost: "bg-transparent hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-800 dark:active:bg-slate-700",
      danger: "bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-800",
    };
    
    const sizes = {
      sm: "text-xs px-2.5 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2 gap-2",
      lg: "text-base px-6 py-3 gap-3",
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="inline-flex">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="inline-flex">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;