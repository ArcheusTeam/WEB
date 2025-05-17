# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Générateur de Publicités avec Gemini AI

Ce projet est un générateur de publicités qui utilise l'IA pour créer des textes publicitaires selon différents tons (dramatique, ironique, classe, etc.) et peut également générer des images associées.

## Fonctionnalités

- Génération de textes publicitaires avec différents tons émotionnels
- Support de Gemini AI pour une génération de texte avancée
- Génération d'images pour accompagner vos publicités
- Interface utilisateur intuitive et réactive
- Téléchargement des créations en PNG
- Partage sur les réseaux sociaux

## Installation

1. Clonez ce dépôt
2. Installez les dépendances

```bash
npm install
```

3. Créez un fichier `.env.local` à la racine avec les clés API suivantes :

```
VITE_GEMINI_API_KEY=votre_clé_api_gemini
VITE_STABILITY_API_KEY=votre_clé_api_stability
```

Pour obtenir les clés API :
- Gemini AI : [https://ai.google.dev/](https://ai.google.dev/)
- Stability AI : [https://stability.ai/](https://stability.ai/)

4. Lancez l'application en mode développement

```bash
npm run dev
```

## Utilisation

1. Accédez à la page générateur à l'adresse `/generator`
2. Choisissez un ton pour votre publicité
3. Sélectionnez le mode Gemini AI ou standard
4. Entrez un prompt décrivant ce que vous souhaitez
5. Générez votre publicité
6. Optionnellement, générez une image associée
7. Téléchargez ou partagez votre création

## Technologies

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Gemini AI API
- Stability AI pour la génération d'images

## Développement

Pour contribuer à ce projet :

1. Créez une branche pour votre fonctionnalité
2. Développez et testez votre fonctionnalité
3. Créez une Pull Request

## Licence

MIT

# Configuration des clés API

Pour utiliser pleinement les fonctionnalités de génération, vous devez configurer les clés API suivantes :

## Configuration de Gemini API

1. Obtenez une clé API Gemini sur [Google AI Studio](https://ai.google.dev/)
2. Créez un fichier `.env` à la racine du projet avec :
   ```
   VITE_GEMINI_API_KEY=votre_clé_api_ici
   ```

**Note**: Le service supporte également le format alternatif `GEMINI_API=votre_clé_api_ici` mais il est recommandé d'utiliser le préfixe VITE_.

## Configuration de Stability API (optionnel)

Pour la génération d'images avec Stability AI :
1. Obtenez une clé API sur [Stability AI](https://stability.ai/)
2. Ajoutez-la à votre fichier `.env` :
   ```
   VITE_STABILITY_API_KEY=votre_clé_stability_ici
   ```

## Modes de fonctionnement

L'application propose plusieurs modes de fonctionnement selon les clés API disponibles :

1. **Mode complet** - Toutes les clés API sont configurées
2. **Mode semi-fonctionnel** - Sans Stability API, utilise des images de stock Unsplash
3. **Mode démo** - Sans Gemini API, utilise des textes prédéfinis

Même en mode démo, l'application reste fonctionnelle et vous pouvez tester l'interface sans clés API.
