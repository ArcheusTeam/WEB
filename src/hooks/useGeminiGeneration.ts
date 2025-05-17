import { useState } from 'react';
import type { Post, ToneOption } from '../types';
import geminiService from '../services/geminiService';

const useGeminiGeneration = () => {
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);
  const [geminiError, setGeminiError] = useState<string | null>(null);

  const generateWithGemini = async (tone: ToneOption, prompt: string): Promise<Post | null> => {
    setIsGeminiLoading(true);
    setGeminiError(null);

    try {
      // Utiliser le service Gemini pour générer le texte
      const generatedText = await geminiService.generateContent(tone, prompt);

      // Sélection d'un emoji approprié au ton
      const emojiMap: Record<ToneOption, string[]> = {
        'dramatique': ['😱', '😭', '💔', '🌑', '⚡'],
        'ironique': ['🙄', '😏', '🤷‍♂️', '🎭', '👀'],
        'cringe': ['😬', '🤦‍♂️', '🙈', '🫣', '🤡'],
        'classe': ['💎', '👑', '✨', '🥂', '🤵'],
        'touchant': ['❤️', '🥹', '🫂', '🕊️', '✨'],
        'absurde': ['🤪', '🫠', '🙃', '👽', '🌈'],
        'passif-agressif': ['🙂', '😊', '👍', '⚠️', '🔪'],
        'honnête': ['👉', '💯', '✅', '🚫', '🤝']
      };
      
      const emojis = emojiMap[tone] || ['👍', '😊', '✨', '📢', '🔥'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

      // Génération d'un GIF approprié (simulé)
      // Dans une application réelle, vous utiliseriez une API comme Giphy ou Tenor
      const gifBaseUrls = {
        'dramatique': 'https://media.giphy.com/media/ckGndVa23sCk9pae4l/giphy.gif',
        'ironique': 'https://media.giphy.com/media/I5xVnGJRHZZf2/giphy.gif',
        'cringe': 'https://media.giphy.com/media/WpaVhEcp3Qo2TjwyI1/giphy.gif',
        'classe': 'https://media.giphy.com/media/l1J9wKizQOn7ifyow/giphy.gif',
        'touchant': 'https://media.giphy.com/media/lqVVqkqMolh9S/giphy.gif',
        'absurde': 'https://media.giphy.com/media/xTiTnHvXHHxOTcdmxO/giphy.gif',
        'passif-agressif': 'https://media.giphy.com/media/ewVSfWRc9a1kosDx7g/giphy.gif',
        'honnête': 'https://media.giphy.com/media/ftdBBVHqULmXK/giphy.gif'
      };
      
      const gifUrl = gifBaseUrls[tone] || 'https://media.giphy.com/media/xUPGcEghH2dZdXvZSw/giphy.gif';

      return {
        text: generatedText,
        gifUrl,
        emoji: randomEmoji
      };
    } catch (error) {
      console.error('Erreur lors de la génération avec Gemini:', error);
      setGeminiError(error instanceof Error ? error.message : 'Erreur lors de la génération avec Gemini');
      return null;
    } finally {
      setIsGeminiLoading(false);
    }
  };

  return {
    generateWithGemini,
    isGeminiLoading,
    geminiError
  };
};

export default useGeminiGeneration; 