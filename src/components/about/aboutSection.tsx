import { Sparkles, ThumbsUp, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export const AboutSection = () => {
  const [hasViewed, setHasViewed] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) setHasViewed(true);
  }, [inView]);

  const features = [
    {
      icon: <Sparkles size={32} className="text-blue-500" />,
      title: 'Exprimez la Fin',
      description:
        'Rendez hommage, tournez en dérision ou sublimez un dernier moment. Que ce soit une relation, un projet ou un job, chaque fin mérite son histoire.',
    },
    {
      icon: <ThumbsUp size={32} className="text-green-500" />,
      title: 'Votez & Partagez',
      description:
        'Chaque page peut recevoir des votes : une manière simple et fun de faire briller les créations les plus originales ou touchantes. Partagez et laissez parler la communauté.',
    },
    {
      icon: <Trophy size={32} className="text-yellow-500" />,
      title: 'Hall of Fame',
      description:
        'Les pages les plus populaires sont automatiquement ou manuellement sélectionnées dans le Hall of Fame. C’est ici que reposent les meilleures fins de l’histoire de TheEnd.Page.',
    },
  ];

  return (
    <section
      ref={ref}
      className="w-screen h-full py-20 bg-transparent to-black text-white"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Pourquoi TheEnd.Page ?</h2>
        <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
          TheEnd.Page est un lieu pour clore avec style, humour ou émotion.
          Créez une page unique pour marquer un tournant, faites réagir la
          communauté, et laissez votre empreinte dans le Hall of Fame.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={hasViewed ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: index * 0.2,
                duration: 0.6,
                ease: 'easeOut',
              }}
              className="bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-md border border-white/10 hover:scale-[1.03] transition-transform duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
