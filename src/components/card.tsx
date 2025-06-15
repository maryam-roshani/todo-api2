import React from 'react';

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-2">{title}:</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;
