// ✅ VERSION AMÉLIORÉE avec design ergonomique + sélection de l'offre avant paiement

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Paypal, Banknote } from 'lucide-react';

const PricingSection: React.FC = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  const pricingTiers = [
    {
      id: '1',
      name: 'BASIC',
      description: "Découvre TheEnd.page gratuitement. Accès limité à l'IA et aux options de création.",
      monthlyPrice: 0,
      annualPrice: 0,
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
      id: '2',
      name: 'PLATINUM',
      description: 'Plus de puissance, de visibilité et d’IA.',
      monthlyPrice: 4.99,
      annualPrice: 49.99,
      badge: 'Populaire',
      badgeColor: 'bg-gray-300 text-black',
      bgColor: 'bg-[#d1d5db] text-black',
      features: [
        'Tout dans BASIC, plus :',
        'IA de création plus avancée',
        'Visibilité priorisée dans le Hall of Fame',
        'Pages de fin visuellement avancées',
      ],
    },
    {
      id: '3',
      name: 'PREMIUM',
      description: 'La version ultime pour les fins les plus marquantes.',
      monthlyPrice: 14.99,
      annualPrice: 149.99,
      badge: 'Ultime',
      badgeColor: 'bg-yellow-400 text-black',
      bgColor: 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black',
      features: [
        'Tout dans PLATINUM, plus :',
        'Accès complet à l’IA générationnelle',
        'Personnalisation avancée (typographies, animations, etc.)',
        'Support prioritaire',
      ],
    },
  ];

  const handleContinue = () => {
    if (!selectedOffer) return;
    navigate(`/payment?offer=${selectedOffer}&mode=${isAnnual ? 'annual' : 'monthly'}`);
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A1A2E] via-[#2E2E4A] to-[#4A2A5E] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 animate-fade-in">Choisissez votre abonnement</h1>

          {/* Toggle */}
          <div className="flex justify-center mb-10">
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

          {/* Offers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
                <div
                    key={tier.id}
                    onClick={() => setSelectedOffer(tier.id)}
                    className={`relative p-6 rounded-2xl transition-transform duration-300 border-2 cursor-pointer shadow-lg hover:scale-[1.02] ${
                        selectedOffer === tier.id
                            ? 'border-[#7F55B1] bg-white text-black'
                            : 'border-transparent bg-gray-900 text-white hover:border-[#7F55B1]'
                    }`}
                >
              <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${tier.badgeColor}`}>
                {tier.badge}
              </span>
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="mb-4 text-sm text-gray-300 min-h-[60px]">{tier.description}</p>
                  <p className="text-3xl font-bold">
                    ${isAnnual ? tier.annualPrice : tier.monthlyPrice}
                    <span className="text-sm font-normal">/{isAnnual ? 'an' : 'mois'}</span>
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-[#7F55B1] mt-1" />
                          <span>{feature}</span>
                        </li>
                    ))}
                  </ul>
                </div>
            ))}
          </div>

          {/* Continue Button */}
          <div className="mt-12 text-center">
            <button
                onClick={handleContinue}
                disabled={!selectedOffer}
                className={`py-3 px-8 rounded-full font-semibold transition-transform text-white ${
                    selectedOffer ? 'bg-[#7F55B1] hover:bg-[#6A4596] hover:scale-105' : 'bg-gray-500 cursor-not-allowed'
                }`}
            >
              Continuer vers le paiement
            </button>
          </div>
        </div>
      </div>
  );
};

export { PricingSection };
