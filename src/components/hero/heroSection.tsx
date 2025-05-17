import { useState, useEffect } from 'react';

const HeroSection: React.FC = () => {
    const [textIndex, setTextIndex] = useState<number>(0);
    const exitTones: string[] = ['dramatique', 'ironique', 'cringe', 'classe', 'touchant', 'absurde', 'passif-agressif', 'honnête'];
    const toneColors: { [key: string]: string } = {
        dramatique: 'bg-gradient-to-br from-[#7F55B1] via-red-900 to-gray-900',
        ironique: 'bg-gradient-to-br from-[#7F55B1] via-yellow-600 to-gray-900',
        cringe: 'bg-gradient-to-br from-[#7F55B1] via-pink-500 to-gray-900',
        classe: 'bg-gradient-to-br from-[#7F55B1] via-gray-700 to-gray-900',
        touchant: 'bg-gradient-to-br from-[#7F55B1] via-green-600 to-gray-900',
        absurde: 'bg-gradient-to-br from-[#7F55B1] via-orange-500 to-gray-900',
        'passif-agressif': 'bg-gradient-to-br from-[#7F55B1] via-purple-700 to-gray-900',
        honnête: 'bg-gradient-to-br from-[#7F55B1] via-teal-500 to-gray-900',
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % exitTones.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className={`relative min-h-screen ${toneColors[exitTones[textIndex]]} text-white flex flex-col justify-center items-center overflow-hidden transition-colors duration-500`}>
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#7F55B1] rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-500 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-6">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-fade-in">
                    Claquez la porte.<br />Avec style.
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 animate-slide-up">
                    Bienvenue sur <span className="text-[#7F55B1] font-bold">TheEnd.page</span> : la plateforme où chaque départ devient une légende. Créez votre page de sortie unique, choisissez votre ton —{' '}
                    <span className="text-green-400 font-semibold transition-all duration-500 text-5xl">{exitTones[textIndex]}</span> — et faites de votre fin un moment inoubliable.
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-slide-up">
                    <button className="bg-[#7F55B1] hover:bg-[#6A4596] cursor-pointer text-white font-semibold py-3 px-6 rounded-full transition transform hover:scale-105">
                        Créez votre page
                    </button>
                    <button className="bg-transparent border-2 cursor-pointer border-green-500 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded-full transition transform hover:scale-105">
                        Découvrez le Hall of Fame
                    </button>
                </div>

                {/* Hall of Fame Voting Teaser */}
                <div className="mt-8 animate-fade-in">
                    <p className="text-lg md:text-xl max-w-3xl mx-auto mb-4">
                        Les meilleures pages rejoignent le prestigieux <span className="text-green-400 font-bold">Hall of Fame</span>. Votez pour les départs les plus épiques et aidez-les à devenir immortels !
                    </p>
                    <div className="flex justify-center gap-3">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center animate-bounce">
                            <svg className="w-6 h-6 text-[#7F55B1]" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11l2-2 2 2v4H9V7z" />
                            </svg>
                        </div>
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center animate-bounce delay-100">
                            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-7V7l-2 2-2-2v4h4z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated Decorative Text */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-sm opacity-50 animate-pulse">
                Parce que certaines fins méritent un podium.
            </div>
        </section>
    );
};

export {HeroSection};