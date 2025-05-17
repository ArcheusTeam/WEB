import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '../ui/carousel';

const logos = [
  { src: '/logos/novity.jpeg', alt: 'Novity Logo' },
  { src: '/logos/etech.png', alt: 'Etech Logo' },
  { src: '/logos/24h-webcup.png', alt: 'Webcup Logo' },
  { src: '/logos/fulldigits.jpeg', alt: 'Fulldigits Logo' },
  { src: '/logos/yas.jpeg', alt: 'Yas Logo' },
  { src: '/logos/bocasay.jpeg', alt: 'Bocasay Logo' },
  { src: '/logos/ingenosya.jpeg', alt: 'Ingenosya Logo' },
  { src: '/logos/vivetic.png', alt: 'Vivetic Logo' },
];

const TestimonialSection: React.FC = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetApi = useCallback((carouselApi: CarouselApi) => {
    setApi(carouselApi);
  }, []);

  useEffect(() => {
    if (!api || isUserInteracting) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 1000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, [api, isUserInteracting]);

  // Handle user interaction (pause auto-scrolling)
  useEffect(() => {
    if (!api) return;

    const onDragStart = () => {
      setIsUserInteracting(true);
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };

    const onDragEnd = () => {
      // Resume auto-scrolling after 5 seconds of inactivity
      interactionTimeoutRef.current = setTimeout(() => {
        setIsUserInteracting(false);
      }, 5000);
    };

    api.on('dragStart' as any, onDragStart);
    api.on('dragEnd' as any, onDragEnd);

    return () => {
      api.off('dragStart' as any, onDragStart);
      api.off('dragEnd' as any, onDragEnd);
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, [api]);

  return (
    <section className="relative min-h-screen w-screen bg-black text-white flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#7F55B1] rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-500 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-10 animate-fade-in">
          Nos Partenaires & Soutiens
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 animate-slide-up">
          Un grand merci à nos précieux partenaires qui rendent TheEnd.page
          possible. Leur soutien et leur expertise sont au cœur de notre succès.
        </p>

        <Carousel
          setApi={handleSetApi}
          opts={{ loop: true, align: 'center' }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="space-x-6">
            {logos.map((logo, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <div className="flex items-center justify-center w-40 h-40 bg-gray-900 bg-opacity-70 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mx-auto">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialSection;
