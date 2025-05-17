import { useState } from 'react';
import { AuthForm } from '@/components/auth/authForm';
import { useAuth } from '@/hooks/useAuth.ts';

const LoginCn = () => {
  const [estConnexion, setEstConnexion] = useState(true);
  const [indexCouleur, setIndexCouleur] = useState(0);

  const moods = [
    {
      titre: 'Ils sont partis avec des arcs-en-ciel 🌈',
      citation:
        '« J’ai quitté avec le sourire et un GIF de licorne. Merci TheEnd.Page ! »',
      nom: 'Camille R.',
      entreprise: 'Ancienne cheffe de projet chez RainbowCorp',
    },
    {
      titre: 'Ils ont quitté en mode cool 😎',
      citation:
        '« J’ai laissé un mix Spotify et une photo de moi en lunettes de soleil. »',
      nom: 'Max B.',
      entreprise: 'Ex-marketer chez ChillAgency',
    },
    {
      titre: 'Ils ont disparu comme des fantômes 👻',
      citation: '« Une démission stylée, un message mystérieux, et pouf ! »',
      nom: 'Léa G.',
      entreprise: 'Ex-designer chez PhantomStudio',
    },
    {
      titre: 'Ils ont sauté de joie 🐸',
      citation: '« Une page drôle, absurde, mais libératrice. Ribbit. »',
      nom: 'Julien K.',
      entreprise: 'Ancien dev chez FrogTech',
    },
  ];
  const emojis = ['🌈', '😎', '👻', '🐸'];
  const couleurs = [
    'bg-teal-500',
    'bg-blue-600',
    'bg-purple-600',
    'bg-green-600',
  ];
  const couleurPanneau = couleurs[indexCouleur];

  const { error } = useAuth();

  const basculerFormulaire = () => setEstConnexion(!estConnexion);

  return (
    <div className="flex min-h-screen font-sans">
      {/* Formulaire */}
      <div className="flex-1 flex flex-col justify-center items-center bg-gray-900 text-white p-8">
        <div className="w-full max-w-md">
          {/* Branding & Pitch */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold">Vous voulez du fun ?</h1>
            <p className="mt-2 text-gray-300">
              Créez votre page de départ inoubliable. Que ce soit un job, un
              projet ou une histoire d’amour, partagez votre dernier mot avec
              style.
            </p>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-center">
            {estConnexion ? 'Connexion' : 'Inscription'}
          </h2>

          <AuthForm
            fields={
              estConnexion
                ? [
                    {
                      name: 'email',
                      label: 'Email',
                      type: 'email',
                      placeholder: 'jean@example.com',
                    },
                    {
                      name: 'password',
                      label: 'Mot de passe',
                      type: 'password',
                      placeholder: '••••••••',
                    },
                  ]
                : [
                    {
                      name: 'email',
                      label: 'Email',
                      type: 'email',
                      placeholder: 'jean@example.com',
                    },
                    {
                      name: 'username',
                      label: "Nom d'utilisateur",
                      type: 'text',
                      placeholder: 'jean_dupont',
                    },
                    {
                      name: 'password',
                      label: 'Mot de passe',
                      type: 'password',
                      placeholder: '••••••••',
                    },
                    {
                      name: 'confirmPassword',
                      label: 'Confirmer le mot de passe',
                      type: 'password',
                      placeholder: '••••••••',
                    },
                  ]
            }
            buttonText={estConnexion ? 'Connexion' : "S'inscrire"}
            buttonColor={couleurs[indexCouleur]}
          />
          {error && (
            <p className="text-red-500 text-center text-sm mt-2">{error}</p>
          )}

          <button
            onClick={basculerFormulaire}
            className="mt-4 ${couleurPanneau} text-sm text-teal-400 hover:underline text-center w-full"
          >
            {estConnexion
              ? 'Pas encore de compte ? Inscrivez-vous'
              : 'Vous avez déjà un compte ? Connectez-vous'}
          </button>
        </div>
      </div>

      {/* Panneau visuel */}
      <div
        className={`flex-1 ${couleurPanneau} text-white p-12 flex flex-col justify-center relative transition-colors duration-500`}
      >
        {/* Choix du mood */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {emojis.map((emoji, idx) => (
            <button
              key={emoji}
              onClick={() => setIndexCouleur(idx)}
              className={`text-2xl p-2 rounded-full bg-white shadow hover:scale-110 transition-transform duration-200 ${
                indexCouleur === idx ? 'ring-2 ring-offset-2 ring-white' : ''
              }`}
              aria-label={`Changer la couleur en ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Texte principal avec animation + largeur élargie */}
        <div className="transition-opacity duration-500 ease-in-out animate-fade-up-slow relative z-10">
          <h2 className="text-4xl font-bold mb-4 max-w-2xl">
            {moods[indexCouleur].titre}
          </h2>
          <p className="text-lg max-w-2xl mb-6 italic">
            {moods[indexCouleur].citation}
          </p>
          <div className="font-semibold">{moods[indexCouleur].nom}</div>
          <div className="text-sm">{moods[indexCouleur].entreprise}</div>
        </div>

        {/* Bloc description */}
        <div className="mt-8 p-6 bg-white text-black rounded-lg shadow max-w-2xl transition-all duration-300">
          <h3 className="font-semibold mb-2">
            Votre dernière page, votre dernier mot
          </h3>
          <p className="text-sm">
            Personnalisez votre départ : choisissez un ton, ajoutez des GIFs,
            une musique, et partagez avec vos proches.
            <br />
            Transformez une fin en souvenir inoubliable.
          </p>
        </div>
      </div>
    </div>
  );
};

export { LoginCn };
