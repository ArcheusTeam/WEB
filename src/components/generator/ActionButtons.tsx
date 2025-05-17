import React from "react";
import { Download, Share2, RefreshCw } from "lucide-react";

interface ActionButtonsProps {
  onRegenerate: () => void;
  onShare: () => void;
  onDownload: () => void;
  isLoading?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onRegenerate, 
  onShare, 
  onDownload,
  isLoading = false
}) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={onRegenerate}
        disabled={isLoading}
        className={`
          p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        title="Régénérer"
      >
        <RefreshCw className={`h-5 w-5 text-gray-700 ${isLoading ? 'animate-spin' : ''}`} />
      </button>
      
      <button
        onClick={onShare}
        disabled={isLoading}
        className={`
          p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        title="Partager"
      >
        <Share2 className="h-5 w-5 text-gray-700" />
      </button>
      
      <button
        onClick={onDownload}
        disabled={isLoading}
        className={`
          p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        title="Télécharger"
      >
        <Download className="h-5 w-5 text-gray-700" />
      </button>
    </div>
  );
};

export default ActionButtons;