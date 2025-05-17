import { gifsByTone } from "../../utils/toneConfig";
import type { ToneOption } from "../types";


// Simuler la récupération d'un GIF depuis une API externe
export const getRandomGif = async (tone: ToneOption): Promise<string> => {
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Sélection aléatoire d'un GIF depuis notre liste pré-définie
  const gifIndex = Math.floor(Math.random() * gifsByTone[tone].length);
  return gifsByTone[tone][gifIndex];
};

// Pour une implémentation réelle avec Giphy ou Tenor
export const searchGifs = async (tone: ToneOption, searchTerms: string): Promise<string> => {
  // Dans une implémentation réelle, on ferait un appel API à Giphy ou Tenor
  // const response = await fetch(
  //   `https://api.giphy.com/v1/gifs/search?api_key=YOUR_API_KEY&q=${encodeURIComponent(searchTerms)}&limit=10`
  // );
  // const data = await response.json();
  // return data.data[0]?.images.original.url || fallbackGif;
  
  // Pour notre démo, on renvoie un GIF de notre collection locale
  return getRandomGif(tone);
};

// Mapping de requêtes de recherche pour chaque ton
export const gifSearchQueries: Record<ToneOption, string[]> = {
  dramatique: ["dramatic", "sad", "disappointed", "crying"],
  ironique: ["sarcastic", "eyeroll", "yeah right", "ironic"],
  cringe: ["cringe", "awkward", "embarrassed", "yikes"],
  classe: ["elegant", "sophisticated", "classy", "luxury"],
  touchant: ["heartwarming", "emotional", "touching", "tears of joy"],
  absurde: ["weird", "random", "absurd", "nonsense"],
  "passif-agressif": ["passive aggressive", "fake smile", "thumbs up", "whatever"],
  honnête: ["honest", "truth", "reality", "facts"]
};