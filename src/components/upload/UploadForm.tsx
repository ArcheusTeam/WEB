import React, { useState, useCallback, useRef } from 'react';

interface UploadFormProps {
  onPublish: (content: string, image?: File) => void;
}

export const UploadForm: React.FC<{ onPublish: (content: string, image?: File) => void }> = ({ onPublish }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setImage(file);
      } else {
        alert('Veuillez sélectionner une image');
      }
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else if (file) {
      alert('Veuillez sélectionner une image');
    }
  }, []);

  const handlePublish = () => {
    if (!content.trim()) {
      alert('Veuillez écrire quelque chose');
      return;
    }

    onPublish(content, image || undefined);
    setContent('');
    setImage(null);
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300 transition-all duration-200 ${
          dragActive ? 'border-purple-500' : ''
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleChange}
          className="hidden"
        />
        <div className="text-center">
          <div className="text-4xl text-purple-600 mb-2">⬆</div>
          <p className="text-sm text-gray-500 mb-2">Drag and drop une image ici</p>
          <p className="text-sm text-gray-500">ou</p>
          <button
            type="button"
            className="mt-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            Sélectionner une image
          </button>
          {image && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="max-w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <textarea
          placeholder="Écrivez quelque chose..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="button"
          onClick={handlePublish}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Publier
        </button>
      </div>
    </div>
  );
};
