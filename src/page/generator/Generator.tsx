import React, { useState } from "react";
import type { DisplayState, Post, ToneOption } from "../../types";
import useGenerateContent from "../../hooks/useGenerateContent";
import Header from "../../components/generator/Header";
import ToneSelector from "../../components/generator/ToneSelector";
import PromptForm from "../../components/generator/PromptForm";
import PostResult from "../../components/generator/PostResult";
import Footer from "../../components/generator/Footer";
import { shareContent } from "../../services/shareService";
import { toast } from "react-toastify";
// @ts-ignore
import useGeminiGeneration from "../../hooks/useGeminiGeneration";
import imageGenerationService from "../../services/imageGenerationService";

const App: React.FC = () => {
  const [selectedTone, setSelectedTone] = useState<ToneOption | null>(null);
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [post, setPost] = useState<Post | null>(null);
  const [displayState, setDisplayState] = useState<DisplayState>("selection");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [useGemini, setUseGemini] = useState(false);
  const [imageModel, setImageModel] = useState<'stability' | 'dalle'>('stability');
  const [isDemo, setIsDemo] = useState(false);
  
  const { generateContent, isLoading, error } = useGenerateContent();
  const { generateWithGemini, isGeminiLoading, geminiError } = useGeminiGeneration();

  // Gérer le choix d'un ton
  const handleToneSelect = (tone: ToneOption) => {
    setSelectedTone(tone);
    setDisplayState("generation");
  };

  // Gérer la génération de contenu
  const handleGenerate = async (prompt: string) => {
    if (!selectedTone) return;
    
    setUserPrompt(prompt);
    
    let generatedPost;
    try {
      if (useGemini) {
        generatedPost = await generateWithGemini(selectedTone, prompt);
      } else {
        generatedPost = await generateContent(selectedTone, prompt);
      }
      
      // Vérifier si nous sommes en mode démo (texte contenant [Mode démo])
      if (generatedPost && generatedPost.text.includes('[Mode démo]')) {
        setIsDemo(true);
        toast.info("Application en mode démo. Configurez VITE_GEMINI_API_KEY pour utiliser l'API Gemini.");
      } else {
        setIsDemo(false);
      }
      
      if (generatedPost) {
        setPost(generatedPost);
        setDisplayState("result");
      }
    } catch (error) {
      console.error("Erreur lors de la génération:", error);
      toast.error("Une erreur est survenue lors de la génération");
    }
  };

  // Revenir à la sélection de ton
  const handleBack = () => {
    setDisplayState("selection");
    setSelectedTone(null);
    setPost(null);
    setGeneratedImage(null);
  };

  // Télécharger en PNG
  const handleDownload = async () => {
    if (!selectedTone) return;
    
    const fileName = generateFileName(selectedTone);
    const success = await downloadDomElementAsImage("publication-container", fileName);
    
    if (success) {
      toast.success("Publication téléchargée avec succès!");
    } else {
      toast.error("Une erreur est survenue lors du téléchargement.");
    }
  };

  // Gérer le partage
  const handleShare = async () => {
    if (!post || !selectedTone) return;
    
    const result = await shareContent(post.text, selectedTone);
    toast.info(result.message);
  };

  // Régénérer avec le même ton
  const handleRegenerate = async () => {
    if (!selectedTone || !userPrompt) return;
    
    let generatedPost;
    if (useGemini) {
      generatedPost = await generateWithGemini(selectedTone, userPrompt);
    } else {
      generatedPost = await generateContent(selectedTone, userPrompt);
    }
    
    if (generatedPost) {
      setPost(generatedPost);
    }
  };

  // Basculer entre l'utilisation de Gemini ou du générateur par défaut
  const toggleGeminiMode = () => {
    setUseGemini(!useGemini);
    toast.info(useGemini ? "Mode standard activé" : "Mode Gemini activé");
  };

  // Basculer entre les modèles de génération d'images
  const toggleImageModel = () => {
    const newModel = imageModel === 'stability' ? 'dalle' : 'stability';
    setImageModel(newModel);
    toast.info(`Modèle de génération d'images: ${newModel === 'stability' ? 'Stability AI' : 'DALL-E'}`);
  };

  // Générer une image basée sur le texte
  const handleGenerateImage = async () => {
    if (!post || !selectedTone) return;
    
    try {
      setIsGeneratingImage(true);
      
      // Le texte pour la génération d'image (nettoyé des balises mode démo)
      const cleanText = post.text.replace(/\[Mode démo\]|\[Erreur d'API\]/g, '').trim();
      
      // Vérifier si le texte est trop court après nettoyage
      const promptText = cleanText.length > 10 
        ? cleanText 
        : `Publicité sur le thème ${selectedTone} pour ${userPrompt}`;
      
      let imageUrl;
      
      if (imageModel === 'stability') {
        imageUrl = await imageGenerationService.generateImage(selectedTone, promptText);
      } else {
        imageUrl = await imageGenerationService.generateDalleImage(selectedTone, promptText);
      }
      
      if (imageUrl) {
        setGeneratedImage(imageUrl);
        toast.success("Image générée avec succès!");
      } else {
        toast.error("Échec de la génération d'image");
      }
    } catch (error) {
      console.error("Erreur lors de la génération d'image:", error);
      toast.error("Une erreur est survenue lors de la génération d'image");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {(error || geminiError) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error || geminiError}</p>
          </div>
        )}
        
        {isDemo && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            <p><strong>Mode démonstration</strong> - Fonctionnalités limitées car la clé API n'est pas configurée.</p>
            <p className="text-sm">Ajoutez VITE_GEMINI_API_KEY à votre fichier .env pour activer toutes les fonctionnalités.</p>
          </div>
        )}
        
        {displayState === "selection" && (
          <>
            <div className="flex justify-end mb-4">
              <button 
                onClick={toggleGeminiMode}
                className={`px-4 py-2 rounded-lg text-white ${useGemini ? 'bg-purple-600' : 'bg-blue-600'}`}
              >
                {useGemini ? 'Utiliser générateur standard' : 'Utiliser Gemini AI'}
              </button>
            </div>
            <ToneSelector onSelectTone={handleToneSelect} />
          </>
        )}

        {displayState === "generation" && selectedTone && (
          <PromptForm 
            tone={selectedTone}
            onBack={handleBack}
            onGenerate={handleGenerate}
            isGenerating={isLoading || isGeminiLoading}
            useGemini={useGemini}
          />
        )}

        {displayState === "result" && post && selectedTone && (
          <div className="space-y-6">
            <PostResult 
              post={post}
              tone={selectedTone}
              onBack={handleBack}
              onRegenerate={handleRegenerate}
              onShare={handleShare}
              onDownload={handleDownload}
              isLoading={isLoading || isGeminiLoading}
            />
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Générer une image pour votre texte</h3>
                <button
                  onClick={toggleImageModel}
                  className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  {imageModel === 'stability' ? 'Passer à DALL-E' : 'Passer à Stability AI'}
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <button
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                  className={`px-4 py-2 bg-green-600 text-white rounded-lg ${isGeneratingImage ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700'}`}
                >
                  {isGeneratingImage ? 'Génération en cours...' : `Générer une image (${imageModel === 'stability' ? 'Stability AI' : 'DALL-E'})`}
                </button>
                
                {generatedImage && (
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.download = `image_${generateFileName(selectedTone)}`;
                      link.href = generatedImage;
                      link.click();
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Télécharger l'image
                  </button>
                )}
              </div>
              
              {generatedImage && (
                <div className="mt-4 border rounded-lg overflow-hidden">
                  <img 
                    src={generatedImage} 
                    alt="Image générée" 
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;

// Génère un nom de fichier basé sur le ton sélectionné et la date actuelle
function generateFileName(selectedTone: ToneOption): string {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const formattedTime = `${date.getHours()}-${date.getMinutes()}`;
  // Utiliser directement la valeur du ton comme nom de fichier
  return `${selectedTone.replace(/\s+/g, '-').toLowerCase()}_${formattedDate}_${formattedTime}.png`;
}

// Télécharge un élément DOM en tant qu'image
function downloadDomElementAsImage(elementId: string, fileName: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        console.error(`Element with ID ${elementId} not found`);
        resolve(false);
        return;
      }

      // Importation dynamique de html2canvas
      import('html2canvas').then((html2canvasModule) => {
        const html2canvas = html2canvasModule.default;
        
        html2canvas(element, { 
          scale: 2,
          useCORS: true,
          logging: false
        }).then((canvas: HTMLCanvasElement) => {
          const link = document.createElement('a');
          link.download = fileName;
          link.href = canvas.toDataURL('image/png');
          link.click();
          resolve(true);
        }).catch((err: Error) => {
          console.error('Error generating canvas:', err);
          resolve(false);
        });
      }).catch((err: Error) => {
        console.error('Error importing html2canvas:', err);
        resolve(false);
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      resolve(false);
    }
  });
}

