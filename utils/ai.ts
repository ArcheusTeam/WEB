import { env } from '../env';
import type { ToneOption } from '../src/types';
import { tonePrompts, toneConfig } from './toneConfig';

const mistralApiKey = env.VITE_MISTRAL_API_KEY;
const geminiApiKey = env.VITE_GEMINI_API_KEY;

// Debug amélioré
console.debug('API Keys Status:', {
  mistral: mistralApiKey ? '✅ Present' : '❌ Missing',
  gemini: geminiApiKey ? '✅ Present' : '❌ Missing'
});

export const generatePost = async (prompt: string, tone: ToneOption): Promise<string> => {
  // Construction du prompt enrichi avec les consignes de style
  const enhancedPrompt = `${tonePrompts[tone]}\n\nRègles strictes:
  - 150 mots maximum
  - Utiliser les émojis caractéristiques: ${toneConfig[tone].emoji}
  - Style: ${tone} (voir exemples)
  - Hashtag final: #${tone} ${toneConfig[tone].emoji}
  - Langue: Français naturel et fluide`;

  // Configuration dynamique selon le ton
  const temperature = {
    dramatique: 0.8,
    ironique: 0.9,
    cringe: 1.0,
    classe: 0.6,
    touchant: 0.7,
    absurde: 1.2,
    "passif-agressif": 0.85,
    honnête: 0.75
  }[tone];

  try {
    // 🔵 Tentative avec Mistral
    const mistralResponse = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${mistralApiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-tiny",
        messages: [
          {
            role: "system",
            content: `Tu es un expert en création de contenu. Adapte ton style au ton demandé.`
          },
          { 
            role: "user", 
            content: enhancedPrompt
          }
        ],
        temperature,
        max_tokens: 350
      }),
      signal: AbortSignal.timeout(15000)
    });

    if (!mistralResponse.ok) {
      const errorData = await mistralResponse.json();
      throw new Error(`API Mistral: ${errorData.error?.message || mistralResponse.statusText}`);
    }

    const mistralData = await mistralResponse.json();
    let result = mistralData.choices[0]?.message?.content?.trim();

    // Post-traitement pour garantir le hashtag
    if (result && !result.includes(`#${tone}`)) {
      result += `\n#${tone} ${toneConfig[tone].emoji}`;
    }

    return result || "[Erreur: Aucun contenu généré par Mistral]";

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    console.warn(`Échec Mistral (${errorMessage}), tentative avec Gemini...`);

    // 🟢 Fallback vers Gemini
    try {
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `${enhancedPrompt}\n\nTon spécifique à utiliser: ${tone}`
              }]
            }],
            generationConfig: {
              temperature,
              maxOutputTokens: 350,
              topP: 0.95
            }
          }),
          signal: AbortSignal.timeout(15000)
        }
      );

      if (!geminiResponse.ok) {
        const errorData = await geminiResponse.json();
        throw new Error(`API Gemini: ${errorData.error?.message || geminiResponse.statusText}`);
      }

      const geminiData = await geminiResponse.json();
      let text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      // Post-traitement Gemini
      if (text && !text.includes('#')) {
        text += `\n#${tone} ${toneConfig[tone].emoji}`;
      }

      return text || "[Erreur: Aucun contenu généré par Gemini]";

    } catch (fallbackError) {
      console.error('Échec des deux APIs:', 
        fallbackError instanceof Error ? fallbackError.message : fallbackError);
      
      // Message d'erreur adapté au ton
      const errorMessages = {
        dramatique: "😱 Catastrophe! Le service est en panne... 💔",
        ironique: "Bien sûr, les APIs choisissent MAINTENANT de ne pas répondre... 🙄",
        cringe: "Oups... ça marche po 😬 #Fail",
        classe: "Service temporairement indisponible. Veuillez réessayer ultérieurement. ✨",
        touchant: "Désolé, nous rencontrons des difficultés techniques... 🥺",
        absurde: "Les licornes ont mangé nos serveurs 🦄🍴 #Oups",
        "passif-agressif": "C'est vrai qu'on ADORE quand les APIs ne répondent pas... 😊🔪",
        honnête: "La vérité? On a un problème technique. 💯"
      };

      throw new Error(errorMessages[tone] || "Erreur de génération. Veuillez réessayer.");
    }
  }
};