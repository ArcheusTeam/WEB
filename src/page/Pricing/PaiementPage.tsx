import React, { useState } from 'react';

const PaymentPage: React.FC = () => {
    const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const offers = [
        { id: '1', name: 'Créateur', price: 4.99, description: 'Ajoutez des images et boostez vos pages.' },
        { id: '2', name: 'Légende', price: 9.99, description: 'Accès au Hall of Fame + stats détaillées.' },
    ];

    const handleFakeCheckout = () => {
        if (!selectedOffer) return;
        setIsSubmitting(true);

        setTimeout(() => {
            // Simulation d'un paiement réussi
            alert('Paiement simulé avec succès ✅');
            window.location.href = '/success'; // ou utiliser navigate() si tu es dans React Router
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1A1A2E] via-[#2E2E4A] to-[#4A2A5E] text-white flex items-center justify-center py-20">
            <div className="max-w-2xl px-6 space-y-8">
                <h1 className="text-4xl font-bold text-center">Paiement sécurisé</h1>
                <div className="grid gap-4">
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className={`p-6 rounded-lg cursor-pointer border-2 transition-all ${
                                selectedOffer === offer.id
                                    ? 'border-[#7F55B1] bg-[#7F55B1]/20'
                                    : 'border-gray-700 hover:border-[#7F55B1]'
                            }`}
                            onClick={() => setSelectedOffer(offer.id)}
                        >
                            <h3 className="text-xl font-semibold">{offer.name}</h3>
                            <p className="text-gray-300">{offer.description}</p>
                            <p className="text-2xl mt-2">{offer.price} €</p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleFakeCheckout}
                    disabled={!selectedOffer || isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-transform ${
                        !selectedOffer || isSubmitting
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-[#7F55B1] hover:bg-[#6A4596] hover:scale-105'
                    } text-white`}
                >
                    {isSubmitting ? 'Redirection...' : 'Procéder au paiement'}
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;