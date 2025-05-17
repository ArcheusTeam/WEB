import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingTiers = [
    {
      name: 'BASIC',
      description:
        "Découvre TheEnd.page gratuitement. Accès limité à l'IA et aux options de création.",
      monthlyPrice: 0,
      annualPrice: 0,
      buttonText: 'Essayer gratuitement',
      buttonVariant: 'secondary' as const,
      badge: 'Découverte',
      badgeColor: 'bg-white text-black',
      bgColor: 'bg-white text-black',
      features: [
        'Création de pages de fin publiques limitée',
        "Accès restreint à l'IA de génération de contenu",
        'Participation au Hall of Fame (si ta page perce !)',
      ],
    },
    {
      name: 'PREMIUM',
      description:
        'La version ultime : pour les créateurs les plus inspirés et les fins les plus marquantes.',
      monthlyPrice: 14.99,
      annualPrice: 149.99,
      buttonText: 'Passer à Premium',
      buttonVariant: 'outline' as const,
      badge: 'Ultime',
      badgeColor: 'bg-yellow-400 text-black',
      bgColor: 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black',
      features: [
        'Tout dans PLATINUM, plus :',
        'Accès complet à l’IA générationnelle',
        'Personnalisation avancée (typographies, animations, etc.)',
        'Boost de visibilité automatique',
        'Support prioritaire',
      ],
    },
    {
      name: 'PLATINUM',
      description:
        'Pour ceux qui veulent briller avec plus de puissance, plus de visibilité, plus d’IA.',
      monthlyPrice: 4.99,
      annualPrice: 49.99,
      buttonText: 'Passer à Platinum',
      buttonVariant: 'default' as const,
      badge: 'Populaire',
      badgeColor: 'bg-gray-300 text-black',
      bgColor: 'bg-[#d1d5db] text-black',
      features: [
        'Tout dans BASIC, plus :',
        'IA de création plus avancée',
        'Visibilité priorisée dans le Hall of Fame',
        'Pages de fin avec options visuelles avancées',
      ],
    },
  ];

  return (
    <section className="w-screen h-full bg-gradient-to-b from-black to-black text-white py-20 px-4">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#7F55B1] rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-500 rounded-full blur-xl"></div>
      </div>
      {/* Toggle */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-4">
          <span className="text-sm">Mensuel</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
            />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-[#7F55B1] transition-colors"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
          </label>
          <span className="text-sm">Annuel</span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingTiers.map((tier, _) => (
          <Card
            key={tier.name}
            className={`h-full flex flex-col rounded-2xl shadow-xl border border-white/10 ${tier.bgColor} transition duration-300 hover:scale-105`}
          >
            <CardHeader className="relative">
              {/* Badge */}
              <div
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${tier.badgeColor}`}
              >
                {tier.badge}
              </div>
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <CardDescription className="text-base mt-2">
                {tier.description}
              </CardDescription>
              <div className="text-4xl font-bold mt-6">
                ${isAnnual ? tier.annualPrice : tier.monthlyPrice}
                <span className="text-base font-normal ml-1">
                  /{isAnnual ? 'an' : 'mois'}
                </span>
              </div>
            </CardHeader>

            <CardContent className="flex-grow flex flex-col justify-between">
              <div>
                <Button
                  variant={tier.buttonVariant}
                  className="w-full mt-4 cursor-pointer mb-6"
                >
                  {tier.buttonText}
                </Button>
                <ul className="space-y-3 text-sm">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#7F55B1]">●</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export { PricingSection };
