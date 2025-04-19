import React from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  className,
}) => {
  const [hasError, setHasError] = React.useState(false);

  const handleError = () => setHasError(true);

  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
  };

  const getFallbackInitials = () => {
    if (fallback) return fallback.charAt(0);
    if (alt) {
      const words = alt.split(' ');
      if (words.length === 1) return words[0].charAt(0);
      return `${words[0].charAt(0)}${words[1].charAt(0)}`;
    }
    return 'U';
  };

  return (
    <div 
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700',
        sizes[size],
        className
      )}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={handleError}
        />
      ) : (
        <span className="font-medium text-slate-900 dark:text-slate-100">
          {getFallbackInitials()}
        </span>
      )}
    </div>
  );
};

export default Avatar;