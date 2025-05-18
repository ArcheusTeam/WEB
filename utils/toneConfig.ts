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

export const tonePrompts: Record<ToneOption, string> = {
  dramatique: "Écris un message dramatique sur la fin d’un projet ou d’une relation, en utilisant des images numériques métaphoriques,pour évoquer la profondeur de la perte.",
  ironique: "Crée un commentaire ironique sur la manière dont les gens annoncent leur départ d’un projet ou d’une relation aujourd’hui, comme s’il s’agissait d’un statut Instagram ou d’une story éphémère. Utilise un ton léger et provocateur",
  cringe: "Rédige un texte cringe qui raconte de façon maladroite et exagérément vulgaire comment un événement important — comme une rupture ou une démission — a viré au mème improbable. Inclut des références à des mèmes populaires et des situations gênantes du quotidien",
  classe: "Rédige un message élégant et poétique sur la notion de fin, en tissant des analogies entre les émotions humaines et des éléments du numérique (flux, sauvegarde, mise à jour). Reste sobre mais touchant",
  touchant: "Compose un message émouvant qui transforme un moment de rupture ou d’abandon en quelque chose de profondément humain. Mets en avant les sentiments cachés derrière l’écran, avec tendresse et authenticité",
  absurde: "Invente une histoire totalement absurde dans laquelle une  fin ordinaire se transforme en événement surnaturellement théâtral : rupture, démission ou abandon prennent une tournure absurde et spectaculaire.",
  "passif-agressif": "Écris un message passif-agressif adressé à quelqu’un qui a rendu une fin plus difficile qu’elle ne devait l’être, en parlant entre les lignes sans jamais être direct. Utilise un langage poli mais chargé de sous-entendus",
  honnête: "Exprime brutalement et sans fard une vérité inconfortable sur la façon dont notre société traite les fins, qu’il s’agisse de relations, de carrières ou de projets. Sois cru, sincère et percutant",
};
