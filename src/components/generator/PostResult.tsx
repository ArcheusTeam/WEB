import React from "react";

import ActionButtons from "./ActionButtons";
import type { Post, ToneOption } from "../../types";
import { toneConfig } from "../../../utils/toneConfig";

interface PostResultProps {
  post: Post;
  tone: ToneOption;
  onRegenerate: () => void;
  onShare: () => void;
  onDownload: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

const PostResult: React.FC<PostResultProps> = ({
  post,
  tone,
  onRegenerate,
  onShare,
  onDownload,
  onBack,
  isLoading = false
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800"
          disabled={isLoading}
        >
          ← Nouvelle création
        </button>
        
        <ActionButtons 
          onRegenerate={onRegenerate}
          onShare={onShare}
          onDownload={onDownload}
          isLoading={isLoading}
        />
      </div>
      
      <div 
        id="publication-container"
        className={`rounded-lg overflow-hidden shadow-xl ${toneConfig[tone].shadow}`}
      >
        {/* Post content */}
        <div className={`${toneConfig[tone].bgColor} p-6 ${toneConfig[tone].textColor}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold capitalize flex items-center">
              {toneConfig[tone].emoji} Style {tone}
            </h3>
            <span className="text-sm opacity-75">Généré maintenant</span>
          </div>
          
          <div className="rounded overflow-hidden mb-4">
            <img 
              src={post.gifUrl} 
              alt={`GIF ${tone}`} 
              className="w-full h-64 object-cover"
            />
          </div>
          
          <p className="text-lg mb-4">
            {post.text} {post.emoji}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <span className="text-2xl cursor-pointer hover:opacity-80 transition-opacity">❤️</span>
              <span className="text-2xl cursor-pointer hover:opacity-80 transition-opacity">👍</span>
              <span className="text-2xl cursor-pointer hover:opacity-80 transition-opacity">😂</span>
            </div>
            <span className="text-sm opacity-75">#PowTone</span>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src="/api/placeholder/40/40" 
              alt="Avatar" 
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium">Vous</span>
          </div>
          <div className="flex space-x-4">
            <span className="text-gray-500">❤️ 12</span>
            <span className="text-gray-500">💬 3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostResult;