import React, { useState } from "react";
import { generatePost } from "../../../utils/ai";
import { toneToGifMap, toneConfig } from "../../../utils/toneConfig";
import type { ToneOption, Post } from "../../types";

interface AIFormProps {
  selectedTone: ToneOption;
  onPostGenerated: (post: Post) => void;
}

const AIForm: React.FC<AIFormProps> = ({ selectedTone, onPostGenerated }) => {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const text = await generatePost("", selectedTone as ToneOption);

    const imageUrl = toneToGifMap[selectedTone];

    onPostGenerated({
      text,
      gifUrl: imageUrl,
      emoji: toneConfig[selectedTone].emoji
    });

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleGenerate}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        disabled={loading}
      >
        {loading ? "Génération..." : "Générer la publication"}
      </button>
    </div>
  );
};

export default AIForm;


