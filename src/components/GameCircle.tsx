import React from 'react';

type GameCircleProps = {
  index: number;
  filled: boolean;
};

export function GameCircle({ index, filled }: GameCircleProps) {
  const imageSrc = `/camel${index + 1}.svg`;
  
  return (
    <div className="w-[160px] h-[80px] relative">
      <img
        src={imageSrc}
        alt={`Camel ${index + 1}`}
        className="w-full h-full transition-all duration-300"
        style={{
          opacity: filled ? 1 : 0,
          transform: filled ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.3s ease-in-out',
          animation: filled ? 'sway 3s ease-in-out infinite' : 'none',
          transformOrigin: 'bottom center'
        }}
      />
    </div>
  );
}