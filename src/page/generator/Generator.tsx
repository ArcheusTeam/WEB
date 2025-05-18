import React, { useState } from "react";
import type { Post, ToneOption } from "../../types";
import { toneConfig, tonePrompts } from "../../../utils/toneConfig";
import AIForm from "../../components/generator/AIForm";

const Generator: React.FC = () => {
  const [selectedTone, setSelectedTone] = useState<ToneOption | null>(null);
  const [post, setPost] = useState<Post | null>(null);

  const handleToneClick = (tone: ToneOption) => {
    setSelectedTone(tone);
    setPost(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Générateur de Contenu</h1>

        {/* Section de Choix du Ton */}
        {!selectedTone ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Object.keys(toneConfig) as ToneOption[]).map((tone) => (
              <button
                key={tone}
                onClick={() => handleToneClick(tone)}
                className={`p-6 rounded-lg text-center ${toneConfig[tone].bgColor} ${toneConfig[tone].textColor} shadow-lg hover:scale-105 transition`}
              >
                <div className="text-3xl">{toneConfig[tone].emoji}</div>
                <div className="mt-2 font-semibold capitalize">{tone}</div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <button onClick={() => setSelectedTone(null)} className="text-blue-500 underline">
              ⬅ Retour au choix de ton
            </button>

            {/* Section de Génération */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Créer avec l'IA</h2>
              <AIForm selectedTone={selectedTone} onPostGenerated={setPost} />

              {/* Résultat */}
              {post && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Publication générée</h3>
                  <p className="mb-4">{post.text}</p>
                  <img 
                    src={post.gifUrl} 
                    alt="Image générée" 
                    className="rounded-md max-h-64 object-contain mb-4" 
                  />
                  <div className="text-2xl mb-4">{post.emoji}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generator;
