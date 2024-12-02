import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Layout } from './Layout';

type ImageCountSelectProps = {
  onSelectImageCount: (count: number) => void;
  playerNames: string[];
};

export function ImageCountSelect({ onSelectImageCount, playerNames }: ImageCountSelectProps) {
  const imageOptions = [
    { count: 3, label: '3 PREGUNTES' },
    { count: 4, label: '4 PREGUNTES' },
    { count: 5, label: '5 PREGUNTES' },
  ];

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
        {imageOptions.map(({ count, label }) => (
          <button
            key={count}
            onClick={() => onSelectImageCount(count)}
            className="flex items-center justify-between px-8 py-4 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-200 shadow-lg transform hover:scale-105"
          >
            <span className="text-2xl font-bold">{label}</span>
            <ChevronRight className="w-6 h-6" />
          </button>
        ))}
      </div>
    </Layout>
  );
}