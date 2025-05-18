import React, { useState } from 'react';
import { searchGifs } from '../../../utils/giphy';
import type { ToneOption } from '../../types';

interface GIFGeneratorProps {
  selectedTone: ToneOption;
  onGifSelected: (gifUrl: string) => void;
}

const GIFGenerator: React.FC<GIFGeneratorProps> = ({ selectedTone, onGifSelected }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifUrls, setGifUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    const urls = await searchGifs(searchTerm);
    setGifUrls(urls);
    setLoading(false);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Rechercher un GIF</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Rechercher un GIF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSearch}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Recherche..." : "Rechercher"}
          </button>
        </div>

        {gifUrls.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gifUrls.map((url, index) => (
              <button
                key={index}
                onClick={() => onGifSelected(url)}
                className="rounded-lg p-2 border border-gray-300 hover:border-indigo-500 transition-colors"
              >
                <img
                  src={url}
                  alt={`GIF ${index + 1}`}
                  className="w-full rounded-lg"
                />
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="text-center text-gray-600">Recherche en cours...</div>
        )}

        {!gifUrls.length && !loading && (
          <div className="text-center text-gray-600">
            {searchTerm ? "Aucun GIF trouvé" : "Entrez un terme de recherche"}
          </div>
        )}
      </div>
    </div>
  );
};

export default GIFGenerator;
