import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  to?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  to,
  children,
  ...props
}) => {
  const baseClasses = clsx(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      'bg-green-medium hover:bg-green-medium/90 text-white focus:ring-green-medium/50': variant === 'primary',
      'bg-copper hover:bg-copper/90 text-white focus:ring-copper/50': variant === 'secondary',
      'bg-transparent border-2 border-green-medium text-green-medium hover:bg-green-medium hover:text-white focus:ring-green-medium/50': variant === 'outline',
    },
    {
      'text-sm px-3 py-1.5': size === 'sm',
      'text-base px-4 py-2': size === 'md',
      'text-lg px-6 py-3': size === 'lg',
    },
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;