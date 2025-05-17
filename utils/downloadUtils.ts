export const downloadDomElementAsImage = async (
  elementId: string,
  fileName: string = "publication.png"
): Promise<boolean> => {
  try {
    // Note: Dans une implémentation réelle, vous importeriez html2canvas
    // import html2canvas from "html2canvas";
    
    // Cette fonction simule le comportement que vous auriez avec html2canvas
    console.log(`Téléchargement de l'élément ${elementId} sous le nom ${fileName}`);
    
    // Simulation d'une conversion réussie
    // Dans une implémentation réelle avec html2canvas:
    /*
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Élément non trouvé");
    }
    
    const canvas = await html2canvas(element, {
      allowTaint: true,
      useCORS: true,
      scale: 2 // Pour une meilleure qualité
    });
    
    const dataUrl = canvas.toDataURL("image/png");
    
    // Créer un lien de téléchargement
    const link = document.createElement("a");
    link.download = fileName;
    link.href = dataUrl;
    link.click();
    */
    
    return true;
  } catch (error) {
    console.error("Erreur lors du téléchargement:", error);
    return false;
  }
};

// Fonction pour générer un nom de fichier unique
export const generateFileName = (tone: string): string => {
  const date = new Date();
  const timestamp = `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}_${date
    .getHours()
    .toString()
    .padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}`;
  
  return `publication_${tone}_${timestamp}.png`;
};