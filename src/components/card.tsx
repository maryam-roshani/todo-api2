import React from 'react';

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-sm text-sm">
      <p className="font-semibold mb-2 text-nowrap">{title}:</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;
