import React from "react";
import { generatePost } from "../../../utils/ai";
import type { ToneOption, Post } from "../../types";

interface GenerateAdButtonProps {
  selectedTone: ToneOption;
  onPostGenerated: (post: Post) => void;
}

export const GenerateAdButton: React.FC<GenerateAdButtonProps> = ({
  selectedTone,
  onPostGenerated,
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    try {
      // Prompt générique mais pertinent pour une publicité
      const defaultPrompt = "Crée une publicité engageante pour un produit inconnu.";

      const text = await generatePost(defaultPrompt, selectedTone);
      const imageUrl =
        "https://media.giphy.com/media/xUPGcEghH2dZdXvZSw/giphy.gif "; // GIF par défaut

      onPostGenerated({
        text,
        gifUrl: imageUrl,
        emoji: "💡",
      });
    } catch (error) {
      console.error("Erreur lors de la génération :", error);
      onPostGenerated({
        text: "Impossible de générer la publicité. Veuillez réessayer.",
        gifUrl:
          "https://media.tenor.com/m/5qJSNxD7VhEAAAAC/sorry-error.gif ",
        emoji: "⚠️",
      });
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
    >
      {loading ? "Génération..." : "Générer une pub avec IA"}
    </button>
  );
};