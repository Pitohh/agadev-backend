import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface CardProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  to?: string;
  href?: string;
  icon?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt = '',
  to,
  href,
  icon,
  className = '',
}) => {
  const cardContent = (
    <>
      {imageSrc && (
        <div className="h-48 overflow-hidden">
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start">
          {icon && <div className="mr-3 text-green-medium">{icon}</div>}
          <h3 className="font-semibold text-xl mb-2 text-green-medium">{title}</h3>
        </div>
        <p className="text-blue-black/80 mb-4">{description}</p>
        {(to || href) && (
          <div className="text-sm font-medium text-copper hover:text-copper/80 transition-colors">
          <div className="text-sm font-medium text-yellow-400 hover:text-yellow-300 transition-colors">
            En savoir plus →
          </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className={clsx(
      'bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg',
      className
    )}>
      {to ? (
        <Link to={to} className="block h-full">
          {cardContent}
        </Link>
      ) : href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </div>
  );
};

export default Card;