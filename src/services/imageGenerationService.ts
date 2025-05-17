import axios from 'axios';
import type { ToneOption } from '../types';

// Clé API depuis les variables d'environnement
const STABILITY_API_KEY = import.meta.env.VITE_STABILITY_API_KEY || '';

// Options pour la génération d'images par ton
const toneImagePrompts: Record<ToneOption, string> = {
  'dramatique': 'dramatic dark moody cinematic scene, high contrast, emotional impact',
  'ironique': 'satirical ironic advertisement style, subtle humor, double meaning',
  'cringe': 'awkward uncomfortable situation, embarrassing scenario, cringey aesthetic',
  'classe': 'elegant luxury high-end advertisement, sophisticated, premium quality, minimalist',
  'touchant': 'emotional heartwarming scene, soft lighting, genuine human connection',
  'absurde': 'surreal absurd nonsensical scene, bizarre juxtaposition, dream-like quality',
  'passif-agressif': 'passive aggressive note, subtle tension, forced smile',
  'honnête': 'authentic genuine straightforward documentary style, raw honesty'
};

// Collection d'images de secours pour chaque ton
const fallbackImages: Record<ToneOption, string[]> = {
  'dramatique': [
    'https://images.unsplash.com/photo-1518050346340-aa2ec3bb424b',
    'https://images.unsplash.com/photo-1509114397022-ed747cca3f65'
  ],
  'ironique': [
    'https://images.unsplash.com/photo-1527628173875-3c7bfd28ad78',
    'https://images.unsplash.com/photo-1573726788201-7ca35f6d392a'
  ],
  'cringe': [
    'https://images.unsplash.com/photo-1490904961171-d442ca1a6394',
    'https://images.unsplash.com/photo-1517437702514-dff24657057a'
  ],
  'classe': [
    'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1',
    'https://images.unsplash.com/photo-1581974944026-5d6ed762f617'
  ],
  'touchant': [
    'https://images.unsplash.com/photo-1531983412531-1f49a365ffed',
    'https://images.unsplash.com/photo-1516589091380-5d8e87df6999'
  ],
  'absurde': [
    'https://images.unsplash.com/photo-1561059584-f9e321bf9878',
    'https://images.unsplash.com/photo-1519750783826-6a50e5ac3252'
  ],
  'passif-agressif': [
    'https://images.unsplash.com/photo-1523286877159-d9636545890c',
    'https://images.unsplash.com/photo-1517101724602-c257fe568157'
  ],
  'honnête': [
    'https://images.unsplash.com/photo-1485178575877-1a9f997507be',
    'https://images.unsplash.com/photo-1454988501794-2992f706932e'
  ]
};

// Obtenir une image de secours aléatoire pour un ton donné
const getFallbackImage = (tone: ToneOption): string => {
  const options = fallbackImages[tone] || fallbackImages['classe'];
  const randomIndex = Math.floor(Math.random() * options.length);
  return `${options[randomIndex]}?fit=crop&w=1024&h=1024&auto=format&q=80`;
};

/**
 * Service pour générer des images basées sur du texte
 */
class ImageGenerationService {
  /**
   * Génère une image à partir d'un prompt et d'un ton
   * @param tone - Le ton de l'image
   * @param prompt - Le prompt utilisateur
   * @returns URL de l'image générée (data URL ou URL externe)
   */
  async generateImage(tone: ToneOption, promptText: string): Promise<string> {
    try {
      // Vérifier si la clé API est disponible
      if (!STABILITY_API_KEY) {
        console.log('Clé API Stability non configurée. Utilisation d\'une image de secours.');
        return getFallbackImage(tone);
      }

      // Améliorer le prompt en ajoutant des détails spécifiques au ton
      const enhancedPrompt = `${promptText}. ${toneImagePrompts[tone]}`;
      
      // Appel à l'API Stability AI
      const response = await axios.post(
        'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
        {
          text_prompts: [{ text: enhancedPrompt }],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          samples: 1,
          steps: 30,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${STABILITY_API_KEY}`,
          }
        }
      );

      // Extraire l'image encodée en base64
      const imageData = response.data?.artifacts?.[0]?.base64;
      
      if (!imageData) {
        throw new Error('Aucune image générée par l\'API');
      }

      return `data:image/png;base64,${imageData}`;
    } catch (error) {
      console.error('Erreur lors de la génération d\'image:', error);
      
      // Utiliser Unsplash comme source d'images de secours de haute qualité
      return getFallbackImage(tone);
    }
  }

  /**
   * Alternative utilisant des modèles d'IA pour générer des images correspondant au texte
   * Mode démo si aucune clé n'est configurée
   */
  async generateDalleImage(tone: ToneOption, promptText: string): Promise<string> {
    try {
      // Si aucune clé API n'est configurée, utiliser une image de secours
      // Dans une implémentation réelle, vous appelleriez l'API DALL-E ici
      console.log('Mode démo DALL-E: utilisation d\'images prédéfinies');

      // Simuler un délai pour l'appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return getFallbackImage(tone);
    } catch (error) {
      console.error('Erreur lors de la génération d\'image avec DALL-E:', error);
      return getFallbackImage(tone);
    }
  }
}

export default new ImageGenerationService(); 