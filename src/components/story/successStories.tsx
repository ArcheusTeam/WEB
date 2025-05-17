import React from 'react';

const SuccessStoriesSection: React.FC = () => {
  const stories = [
    {
      name: 'Jean Dupont',
      text: "J'ai quitté mon job avec une page dramatique qui a marqué mes collègues à jamais. Merci TheEnd.page !",
    },
    {
      name: 'Marie Leclerc',
      text: 'Mon départ ironique est devenu viral dans le Hall of Fame. Une expérience mémorable !',
    },
    {
      name: 'Ali Raharison',
      text: 'J’ai pu rendre mon pot de départ inoubliable grâce à une page émouvante. Beaucoup d’émotions !',
    },
    {
      name: 'Sarah Benyahia',
      text: 'Mon message de départ a touché toute mon équipe. Simple à créer et très puissant !',
    },
  ];

  return (
    <section className="relative min-h-screen bg-black text-white flex items-center justify-center py-24 overflow-hidden">
      {/* Halo décoratif */}
      <div className="absolute -top-20 -left-32 w-96 h-96 bg-[#7F55B1] rounded-full blur-[120px] opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-400 rounded-full blur-[100px] opacity-10 animate-pulse-slow"></div>

      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-14 animate-fade-in-up">
          ✨ Histoires de succès
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-3xl mx-auto animate-slide-up">
          Nos utilisateurs transforment leurs départs en moments inoubliables.
          Découvrez leurs témoignages.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-xl shadow-lg hover:shadow-purple-900/30 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up delay-150"
            >
              <h3 className="text-xl font-semibold text-[#E0B0FF] mb-2">
                {story.name}
              </h3>
              <p className="text-gray-200 italic leading-relaxed">{`“${story.text}”`}</p>
            </div>
          ))}
        </div>

        <a
          href="/login"
          className="mt-12 inline-block bg-[#7F55B1] hover:bg-[#6A4596] text-white font-semibold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-800/50 animate-bounce-in"
        >
          Créez votre propre histoire
        </a>
      </div>
    </section>
  );
};

export { SuccessStoriesSection };
