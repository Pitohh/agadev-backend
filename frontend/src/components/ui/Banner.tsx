import React from 'react';
import clsx from 'clsx';
import Button from './Button';

interface BannerProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  buttonText?: string;
  buttonLink?: string;
  overlay?: boolean;
  height?: 'small' | 'medium' | 'large' | 'full';
  className?: string;
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  backgroundImage,
  buttonText,
  buttonLink,
  overlay = true,
  height = 'medium',
  className = '',
}) => {
  return (
    <div 
      className={clsx(
        'relative flex items-center justify-center bg-center bg-cover bg-no-repeat',
        {
          'h-[300px] md:h-[400px]': height === 'small',
          'h-[400px] md:h-[500px]': height === 'medium',
          'h-[500px] md:h-[600px]': height === 'large',
          'h-screen': height === 'full',
        },
        className
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {overlay && (
        <div className="absolute inset-0 bg-blue-black/60" />
      )}
      <div className="container-custom relative z-10 text-center text-white">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 animate-slide-up text-white">
            {subtitle}
          </p>
        )}
        {buttonText && buttonLink && (
          <Button to={buttonLink} variant="primary" size="lg">
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Banner;