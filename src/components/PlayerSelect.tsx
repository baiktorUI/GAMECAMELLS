import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Layout } from './Layout';

type PlayerSelectProps = {
  onSelectPlayers: (count: number, names: string[]) => void;
};

export function PlayerSelect({ onSelectPlayers }: PlayerSelectProps) {
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  const handleCountSelect = (count: number) => {
    setSelectedCount(count);
    setPlayerNames(Array(count).fill(''));
  };

  const handleNameChange = (index: number, name: string) => {
    if (name.length <= 10) {
      const newNames = [...playerNames];
      newNames[index] = name;
      setPlayerNames(newNames);
    }
  };

  const handleSubmit = () => {
    if (selectedCount && playerNames.every(name => name.trim())) {
      onSelectPlayers(selectedCount, playerNames);
    }
  };

  const playerOptions = [
    { count: 2, label: '2 FINALISTES' },
    { count: 3, label: '3 FINALISTES' },
    { count: 4, label: '4 FINALISTES' },
  ];

  return (
    <Layout>
      {!selectedCount ? (
        <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
          {playerOptions.map(({ count, label }) => (
            <button
              key={count}
              onClick={() => handleCountSelect(count)}
              className="flex items-center justify-between px-8 py-4 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-200 shadow-lg transform hover:scale-105"
            >
              <span className="text-2xl font-bold">{label}</span>
              <ChevronRight className="w-6 h-6" />
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4 max-w-xl mx-auto">
          {playerNames.map((name, index) => (
            <div key={index}>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder={`Finalista ${index + 1}`}
                maxLength={10}
                className="w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder-white/70 border-2 border-white/30 focus:border-white/50 focus:outline-none text-lg"
              />
            </div>
          ))}
          <button
            onClick={handleSubmit}
            disabled={!playerNames.every(name => name.trim())}
            className="w-full mt-4 px-8 py-4 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-xl font-bold"
          >
            Començar Joc
          </button>
        </div>
      )}
    </Layout>
  );
}