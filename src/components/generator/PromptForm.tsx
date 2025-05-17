import React, { useState } from "react";

import { Send } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import type { ToneOption } from "../../types";
import { toneConfig, tonePrompts } from "../../../utils/toneConfig";

interface PromptFormProps {
  tone: ToneOption;
  onBack: () => void;
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
  useGemini?: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ 
  tone, 
  onBack, 
  onGenerate, 
  isGenerating,
  useGemini = false
}) => {
  const [prompt, setPrompt] = useState<string>(tonePrompts[tone]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  const geminiPlaceholder = `Décrivez ce que vous souhaitez dans votre publicité. Gemini AI va générer un texte dans un ton ${tone}.`;
  const standardPlaceholder = `Décrivez ce que vous souhaitez générer...`;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <button 
          onClick={onBack}
          className="mr-2 text-gray-600 hover:text-gray-800"
          disabled={isGenerating}
        >
          ← Retour
        </button>
        <h2 className="text-xl font-bold flex items-center">
          <span className="mr-2">{toneConfig[tone].emoji}</span>
          Style <span className="capitalize ml-1">{tone}</span>
          {useGemini && <span className="ml-2 text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">Gemini AI</span>}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="prompt" className="block text-gray-700 mb-2">
            {useGemini ? "Votre prompt pour Gemini:" : "Votre prompt:"}
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full border rounded-lg p-3 h-32"
            placeholder={useGemini ? geminiPlaceholder : standardPlaceholder}
            disabled={isGenerating}
          />
        </div>
        
        <button
          type="submit"
          disabled={isGenerating}
          className={`
            w-full py-3 rounded-lg 
            ${useGemini ? 'bg-purple-600 text-white' : `${toneConfig[tone].bgColor} ${toneConfig[tone].textColor}`}
            font-medium flex items-center justify-center
            ${isGenerating ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}
          `}
        >
          {isGenerating ? (
            <LoadingSpinner message={useGemini ? "Gemini réfléchit..." : "Génération en cours..."} />
          ) : (
            <span className="flex items-center">
              <Send className="mr-2 h-5 w-5" />
              {useGemini ? "Générer avec Gemini AI" : "Générer ma publication"}
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default PromptForm;