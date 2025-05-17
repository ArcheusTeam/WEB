# Guide de dépannage

Ce document vous aide à résoudre les problèmes courants rencontrés lors de l'utilisation du générateur de publicités.

## Problèmes avec les clés API

### Message "La clé API Gemini n'est pas configurée correctement"

**Cause possible**: Le format de la clé API dans le fichier `.env` est incorrect.

**Solutions**:
1. Vérifiez que votre fichier `.env` contient exactement cette ligne:
   ```
   VITE_GEMINI_API_KEY=votre_clé_api_sans_guillemets
   ```

2. Si vous utilisez le format alternatif, assurez-vous qu'il est sous cette forme:
   ```
   GEMINI_API=votre_clé_api_sans_guillemets
   ```

3. Assurez-vous de ne pas avoir d'espaces autour du signe égal.

4. Après avoir modifié le fichier `.env`, redémarrez l'application.

### Format actuel détecté dans .env: GEMINI_API:"votre_clé_api"

**Problème**: Les guillemets autour de la valeur ne sont pas correctement interprétés.

**Solution**:
1. Ouvrez votre fichier `.env`
2. Remplacez `GEMINI_API:"AIzaSyCscWRp8e1Md5nUt_28RD84Y784z1JeNdo"`
3. Par `VITE_GEMINI_API_KEY=AIzaSyCscWRp8e1Md5nUt_28RD84Y784z1JeNdo`
4. Redémarrez l'application

### Génération d'images avec des images de secours au lieu d'images générées

**Cause**: La clé API Stability n'est pas configurée ou n'est pas valide.

**Solutions**:
1. Vérifiez que vous avez obtenu une clé API Stability valide depuis [stability.ai](https://stability.ai)
2. Vérifiez que votre fichier `.env` contient:
   ```
   VITE_STABILITY_API_KEY=votre_clé_stability_api
   ```
3. Si vous ne souhaitez pas utiliser Stability AI, vous pouvez utiliser le mode DALL-E qui utilise des images de stock de haute qualité adaptées au ton de votre publication.

## Erreurs courantes

### Pas de texte généré

Si aucun texte n'est généré lorsque vous utilisez le générateur:

1. Vérifiez les erreurs dans la console de votre navigateur (F12)
2. Assurez-vous que votre clé API Gemini est active et valide
3. Essayez d'utiliser le mode standard si vous avez des problèmes avec le mode Gemini

### Image générée ne correspond pas au texte

Les images générées peuvent ne pas correspondre parfaitement au texte en raison des limitations des modèles AI. Pour améliorer les résultats:

1. Essayez d'utiliser des prompts plus clairs et plus descriptifs
2. Alternez entre les modèles Stability AI et DALL-E pour voir lequel donne les meilleurs résultats
3. N'hésitez pas à régénérer plusieurs fois pour obtenir différentes variations

## Besoin d'aide supplémentaire?

Si vous rencontrez d'autres problèmes:

1. Vérifiez que vous utilisez les dernières versions des bibliothèques
2. Consultez les journaux dans la console de votre navigateur
3. Soumettez un rapport de problème sur le dépôt GitHub avec les détails de l'erreur 