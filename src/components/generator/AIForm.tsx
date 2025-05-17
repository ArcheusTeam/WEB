import React, { useState } from "react";
import { generatePost } from "../../../utils/ai";

import type { ToneOption, Post } from "../../types";

interface AIFormProps {
  selectedTone: ToneOption;
  onPostGenerated: (post: Post) => void;
}

const AIForm: React.FC<AIFormProps> = ({ selectedTone, onPostGenerated }) => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    const text = await generatePost(prompt, selectedTone as ToneOption);

    const imageUrl = image
      ? URL.createObjectURL(image)
      : "https://media.giphy.com/media/xUPGcEghH2dZdXvZSw/giphy.gif";

    onPostGenerated({
      text,
      gifUrl: imageUrl,
      emoji: "💡"
    });

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Décrivez votre pub..."
        className="w-full p-2 border rounded"
      />
      <div
        className="border-dashed border-2 p-4 rounded text-center"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {image ? (
          <img src={URL.createObjectURL(image)} alt="Preview" className="max-h-48 mx-auto" />
        ) : (
          "Glissez-déposez une image ici"
        )}
      </div>
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


