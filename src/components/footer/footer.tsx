import React from 'react';

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Présentation */}
        <div>
          <h3 className="text-white font-bold text-xl mb-4">TheEnd.page</h3>
          <p className="text-sm leading-relaxed">
            Créez facilement vos pages personnalisées grâce à notre IA avancée,
            boostez votre visibilité et gérez vos contenus simplement.
            Accessibilité, sécurité et innovation au cœur de notre service.
          </p>
        </div>

        {/* Liens utiles */}
        <nav className="flex flex-col space-y-3">
          <h4 className="text-white font-semibold text-lg mb-3">
            Liens utiles
          </h4>
          <a href="/" className="hover:text-[#7F55B1] transition">
            Accueil
          </a>
          <a href="/pricing" className="hover:text-[#7F55B1] transition">
            Tarifs
          </a>
          <a href="/faq" className="hover:text-[#7F55B1] transition">
            FAQ
          </a>
          <a href="/contact" className="hover:text-[#7F55B1] transition">
            Contact
          </a>
        </nav>

        {/* Ressources */}
        <nav className="flex flex-col space-y-3">
          <h4 className="text-white font-semibold text-lg mb-3">Ressources</h4>
          <a href="/docs" className="hover:text-[#7F55B1] transition">
            Documentation
          </a>
          <a href="/blog" className="hover:text-[#7F55B1] transition">
            Blog
          </a>
          <a href="/api" className="hover:text-[#7F55B1] transition">
            API
          </a>
          <a href="/privacy-policy" className="hover:text-[#7F55B1] transition">
            Politique de confidentialité
          </a>
          <a
            href="/confidentiality-contract"
            className="hover:text-[#7F55B1] transition"
          >
            Contrat de confidentialité
          </a>
        </nav>

        {/* Communauté & Contact */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-white font-semibold text-lg mb-3">
            Communauté & Contact
          </h4>
          <div className="flex space-x-4 mb-3">
            <a
              href="https://discord.gg/yourserver"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#7F55B1] transition"
            >
              Discord
            </a>
            <a
              href="https://twitter.com/theendpage"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#7F55B1] transition"
            >
              Twitter
            </a>
            <a
              href="https://github.com/theendpage"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#7F55B1] transition"
            >
              GitHub
            </a>
          </div>
          <p>
            📧{' '}
            <a
              href="mailto:support@theend.page"
              className="hover:text-[#7F55B1] transition"
            >
              support@theend.page
            </a>
          </p>
          <p>📞 +33 1 23 45 67 89</p>

          {/* Newsletter simple */}
          <form className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Votre email"
              aria-label="Inscription newsletter"
              className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-[#7F55B1]"
              required
            />
            <button
              type="submit"
              className="bg-[#7F55B1] text-white px-5 py-2 rounded-md hover:bg-[#6a449d] transition"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </div>

      <hr className="border-gray-700 mt-10" />

      {/* Bas de page */}
      <div className="max-w-7xl mx-auto mt-6 text-center text-xs text-gray-500">
        <p>
          TheEnd.page garantit la confidentialité et la sécurité de vos données.
          Nous nous engageons à respecter les meilleures pratiques RGPD et
          standards internationaux.
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} TheEnd.page. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export { FooterSection };
