import React from 'react';
import clsx from 'clsx';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  center = false, 
  className = '' 
}) => {
  return (
    <div className={clsx(
      'mb-12',
      center && 'text-center',
      className
    )}>
      <h2 className="text-3xl lg:text-4xl font-bold text-green-medium mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-blue-black/80 max-w-3xl mt-2">
          {subtitle}
        </p>
      )}
      <div className={clsx(
        'h-1 bg-yellow-400 w-20 mt-4',
        center && 'mx-auto'
      )} />
    </div>
  );
};

export default SectionTitle;