import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  className, 
  variant = 'default', 
  size = 'md',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center rounded-full font-medium";
  
  const variants = {
    default: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
    primary: "bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100",
    secondary: "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200",
    outline: "border border-slate-300 text-slate-900 dark:border-slate-600 dark:text-slate-100",
    success: "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100",
    warning: "bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100",
    danger: "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100",
  };
  
  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-xs px-2.5 py-0.5",
    lg: "text-sm px-3 py-1",
  };
  
  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;