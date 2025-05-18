import React from "react";
import type { ToneOption } from "../../types";
import { toneConfig } from "../../../utils/toneConfig";


interface ToneSelectorProps {
  onSelectTone: (tone: ToneOption) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ onSelectTone }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center">Choisissez votre style</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(Object.keys(toneConfig) as ToneOption[]).map((tone) => (
          <button
            key={tone}
            onClick={() => onSelectTone(tone)}
            className={`
              flex flex-col items-center justify-center p-6 rounded-lg 
              ${toneConfig[tone].bgColor} 
              ${toneConfig[tone].textColor} 
              hover:opacity-90 transition-all transform hover:scale-105 
              shadow-lg ${toneConfig[tone].shadow}
            `}
          >
            <span className="text-4xl mb-2">{toneConfig[tone].emoji}</span>
            <span className="text-lg font-medium capitalize">{tone}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;