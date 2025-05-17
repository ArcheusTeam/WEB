import { useState } from "react";
import geminiService from "../services/geminiService";
import { getRandomGif } from "../services/gifService";
import { toneConfig } from "../../utils/toneConfig";
import type { Post, ToneOption } from "../types";

const useGenerateContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const generateContent = async (tone: ToneOption, prompt: string): Promise<Post | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Faire les appels API en parallèle pour être plus efficace
      const [text, gifUrl] = await Promise.all([
        geminiService.generateContent(tone, prompt),
        getRandomGif(tone)
      ]);
      
      // Vérifier que le ton existe dans la configuration
      if (!(tone in toneConfig)) {
        throw new Error(`Tone '${tone}' is not supported`);
      }
      
      // Sélectionner un emoji aléatoire parmi les options pour ce ton
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
      
      const post: Post = {
        text,
        gifUrl,
        emoji: randomEmoji
      };
      
      return post;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : typeof err === 'string' 
          ? err 
          : 'Une erreur est survenue lors de la génération';
      setError(errorMessage);
      console.error('Error generating content:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    generateContent,
    isLoading,
    error
  };
};

export default useGenerateContent;