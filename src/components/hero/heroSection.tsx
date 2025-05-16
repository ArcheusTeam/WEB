import HERO_IMAGE from "@/assets/hero-image.png";

const HeroSection = () => {
    return (
        <section className="relative hero-section h-screen bg-[url('/bg/neon.png')] bg-cover bg-center text-white flex flex-col overflow-hidden">
            <div className="flex flex-1 items-center justify-center z-10">
                <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl">
                    <div className="md:w-1/2 space-y-6">
                        <h1 className="text-6xl md:text-8xl font-bold leading-tight animate-slide-in">
                            <span className="block perspective-text">HERE AND NOW</span>
                            <span className="block perspective-text text-blue-500">F</span>
                            <span className="block perspective-text">UTURE</span>
                        </h1>
                        <p className="text-gray-400 max-w-md animate-slide-in" style={{ animationDelay: "0.3s" }}>
                            People who think about the future, about how to improve their lives, and take action in this
                            direction, have a plan of action.
                        </p>
                        <button
                            className="mt-4 px-6 py-3 bg-transparent border border-white text-white rounded-full hover:bg-blue-500 hover:border-blue-500 transition-all animate-slide-in"
                            style={{ animationDelay: "0.6s" }}>
                            Go back
                        </button>
                    </div>
                </div>
            </div>

            {/* IMAGE collée en bas */}
            <div className="absolute top-20 left-96 transform w-full max-h-[250px] z-0">
                <img
                    src={HERO_IMAGE}
                    className="w-full h-full object-contain object-bottom"
                    alt="hero section image"
                    title="hero section image"
                />
            </div>
        </section>
    );
};

export { HeroSection };
