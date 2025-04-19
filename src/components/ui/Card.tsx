import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  interactive?: boolean;
}

const Card: React.FC<CardProps> = ({
  className,
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  interactive = false,
  ...props
}) => {
  const baseStyles = "rounded-lg transition-all";
  
  const variants = {
    default: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800",
    outline: "border border-slate-200 dark:border-slate-800",
    elevated: "bg-white dark:bg-slate-900 shadow-md dark:shadow-slate-800/30",
  };
  
  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };
  
  const hoverStyles = hover ? "hover:shadow-md dark:hover:shadow-slate-800/30" : "";
  const interactiveStyles = interactive ? "cursor-pointer active:scale-[0.98]" : "";
  
  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        paddings[padding],
        hoverStyles,
        interactiveStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn("mb-3", className)} {...props}>
    {children}
  </div>
);

const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h3 className={cn("text-lg font-medium text-slate-900 dark:text-white", className)} {...props}>
    {children}
  </h3>
);

const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => (
  <p className={cn("text-sm text-slate-500 dark:text-slate-400", className)} {...props}>
    {children}
  </p>
);

const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn("", className)} {...props}>
    {children}
  </div>
);

const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn("mt-4 flex items-center", className)} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;