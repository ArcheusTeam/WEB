import axios from 'axios';
import type { ToneOption } from '../types';

// Clé API depuis les variables d'environnement, avec support pour différents formats potentiels
const getApiKey = (): string => {
  // Essayer d'abord le format standard VITE_GEMINI_API_KEY
  const standardKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (standardKey) return standardKey;

  // Essayer le format alternatif GEMINI_API (au cas où l'utilisateur l'aurait défini ainsi)
  const alternativeKey = import.meta.env.GEMINI_API;
  if (alternativeKey) {
    // Si la clé est enveloppée dans des guillemets, les supprimer
    return alternativeKey.replace(/^["'](.*)["']$/, '$1');
  }
  
  return '';
};

const GEMINI_API_KEY = getApiKey();
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Service pour communiquer avec l'API Gemini
 */
class GeminiService {
  /**
   * Génère du contenu publicitaire via l'API Gemini
   * @param tone - Le ton à utiliser pour la génération
   * @param prompt - Le prompt utilisateur 
   * @returns Le texte généré
   */
  async generateContent(tone: ToneOption, prompt: string): Promise<string> {
    try {
      // Vérifier si la clé API est disponible
      if (!GEMINI_API_KEY) {
        console.error('La clé API Gemini n\'est pas configurée correctement.');
        console.log('Veuillez définir VITE_GEMINI_API_KEY=votre_clé_api dans le fichier .env');
        console.log('Format actuel détecté dans .env : GEMINI_API:"votre_clé_api"');
        console.log('Formats acceptés : VITE_GEMINI_API_KEY=votre_clé_api ou GEMINI_API=votre_clé_api');
        
        // Générer un texte de remplacement pour pouvoir tester l'application
        return `[Mode démo] Publication ${tone} à propos de ${prompt}. La clé API Gemini n'est pas configurée correctement.`;
      }

      // Construire un prompt adapté pour générer une publicité selon le ton demandé
      const geminiPrompt = `
        Tu es un créateur de publicités créatif.
        Génère une publicité courte et percutante dans un ton ${tone} basée sur cette demande: "${prompt}".
        La publicité doit être concise, impactante et vraiment capturer l'essence du ton ${tone}.
        Ne dépasse pas 280 caractères.
      `;

      // Appel à l'API Gemini
      const response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                { text: geminiPrompt }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 800,
          }
        }
      );

      // Extraction du texte généré
      const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      if (!generatedText) {
        throw new Error('Aucun texte généré par Gemini');
      }

      return generatedText.trim();
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API Gemini:', error);
      if (axios.isAxiosError(error)) {
        console.error('Détails de l\'erreur:', error.response?.data || error.message);
        
        // Si l'erreur est liée à la clé API
        if (error.response?.status === 400 || error.response?.status === 401 || error.response?.status === 403) {
          console.warn('Vérifiez que votre clé API est correcte et active');
          return `[Erreur d'API] Vérifiez votre clé Gemini. Problème détecté: ${error.response?.data?.error?.message || error.message}`;
        }
        
        throw new Error(`Erreur de communication avec l'API Gemini: ${error.message}`);
      }
      throw error;
    }
  }
}

export default new GeminiService(); 