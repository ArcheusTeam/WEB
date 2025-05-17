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

// Constantes pour les GIFs (simulées ici)
export const gifsByTone: Record<ToneOption, string[]> = {
  dramatique: [
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300"
  ],
  ironique: [
    "/api/placeholder/400/300",
    "/api/placeholder/400/300", 
    "/api/placeholder/400/300"
  ],
  cringe: [
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300"
  ],
  classe: [
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300"
  ],
  touchant: [
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300"
  ],
  absurde: [
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300"
  ],
  "passif-agressif": [
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300"
  ],
  honnête: [
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300"
  ],
};

// Exemples de textes par ton pour la démonstration
export const sampleTextsByTone: Record<ToneOption, string[]> = {
  dramatique: [
    "La vie n'est qu'une suite de déceptions, même ma cafetière m'a abandonné ce matin...",
    "Chaque notification manquée est une opportunité perdue à jamais dans l'abîme du temps.",
    "Le silence assourdissant de mon téléphone reflète le vide de mon existence."
  ],
  ironique: [
    "Oh super, encore une mise à jour qui 'améliore l'expérience utilisateur'. Exactement ce dont j'avais besoin.",
    "Non mais vraiment, j'adore quand mon wifi décide de faire une pause méditation en pleine réunion importante.",
    "Merci la météo pour cette 'légère bruine' qui a transformé ma coiffure en serpillière."
  ],
  cringe: [
    "Trop LOL ce matin j'ai mis mon sweat à l'envers et j'ai pas capté pendant 2h #VieDOuf #CommeDisentLesJeunes",
    "Moi: *existe* / Mon chat: et si je renversais ton café? UwU #CatLife #TropMignonPourÊtrePuni",
    "Quand ton crush like ta photo de 2018 et que tu dois faire semblant que c'était pas un accident 👁️👄👁️"
  ],
  classe: [
    "L'élégance réside dans la sobriété des mots et la justesse des silences.",
    "Un esprit cultivé brille non par l'étalage de son savoir, mais par la finesse de son discernement.",
    "La véritable distinction s'exprime dans les détails que seuls les plus attentifs sauront apprécier."
  ],
  touchant: [
    "Parfois, ce sont les messages jamais envoyés qui portent les mots les plus sincères.",
    "Dans chaque regard échangé réside un univers de sentiments que les mots ne peuvent contenir.",
    "Ce n'est pas le temps qui guérit, mais l'amour qui transforme nos cicatrices en constellations."
  ],
  absurde: [
    "Ma plante d'intérieur a postulé pour devenir astronaute, mais elle a échoué à cause de son manque d'expérience en apesanteur.",
    "J'ai demandé à mon ombre de me laisser tranquille, maintenant elle boude dans un coin et refuse de me suivre.",
    "Mon grille-pain organise des soirées karaoké quand je dors, c'est pour ça que les miettes chantent faux le matin."
  ],
  "passif-agressif": [
    "Non mais c'est cool de répondre après 3 jours, j'avais rien de mieux à faire que d'attendre 😊",
    "Waouh, merci d'avoir laissé la vaisselle s'empiler, ça donne tellement de caractère à la cuisine 👍",
    "Oh, tu as encore oublié notre rendez-vous? Pas grave, mon temps n'a aucune valeur de toute façon 🙃"
  ],
  honnête: [
    "On passe plus de temps à documenter nos vies qu'à les vivre pleinement.",
    "La plupart de nos insécurités viennent de nous comparer aux highlight reels des autres.",
    "Personne ne pense autant à tes erreurs que toi-même."
  ],
};