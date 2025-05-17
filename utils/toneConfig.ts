import type { ToneConfig, ToneOption } from "../src/types";

// Configuration des couleurs et emojis pour chaque ton
export const toneConfig: Record<ToneOption, ToneConfig> = {
  dramatique: { 
    bgColor: "bg-purple-800", 
    textColor: "text-white", 
    emoji: "😱", 
    shadow: "shadow-purple-500"
  },
  ironique: { 
    bgColor: "bg-blue-600", 
    textColor: "text-white", 
    emoji: "🙄", 
    shadow: "shadow-blue-400"
  },
  cringe: { 
    bgColor: "bg-orange-500", 
    textColor: "text-white", 
    emoji: "😬", 
    shadow: "shadow-orange-300"
  },
  classe: { 
    bgColor: "bg-gray-800", 
    textColor: "text-white", 
    emoji: "✨", 
    shadow: "shadow-gray-600"
  },
  touchant: { 
    bgColor: "bg-pink-600", 
    textColor: "text-white", 
    emoji: "🥺", 
    shadow: "shadow-pink-400"
  },
  absurde: { 
    bgColor: "bg-green-500", 
    textColor: "text-white", 
    emoji: "🤪", 
    shadow: "shadow-green-300"
  },
  "passif-agressif": { 
    bgColor: "bg-yellow-500", 
    textColor: "text-black", 
    emoji: "😊", 
    shadow: "shadow-yellow-300"
  },
  honnête: { 
    bgColor: "bg-red-600", 
    textColor: "text-white", 
    emoji: "💯", 
    shadow: "shadow-red-400"
  },
};

// Exemples de prompts pour chaque ton
export const tonePrompts: Record<ToneOption, string> = {
  dramatique: "Écris un message dramatique à propos de la vie quotidienne",
  ironique: "Crée un commentaire ironique sur les tendances actuelles",
  cringe: "Génère un texte cringe qui fait référence aux mèmes actuels",
  classe: "Rédige un message élégant et sophistiqué",
  touchant: "Compose un message émouvant qui touche le cœur",
  absurde: "Invente quelque chose de complètement absurde et décalé",
  "passif-agressif": "Écris un message passif-agressif sur un inconvénient mineur",
  honnête: "Exprime une vérité brutalement honnête sur la société",
};
