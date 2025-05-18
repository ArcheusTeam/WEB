import React from "react";

const Header: React.FC = () => {
  return (
    <header className="py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center">Générateur de Publication Stylée</h1>
        <p className="text-center mt-2 text-indigo-100">
          Exprimez-vous avec style et partagez vos créations
        </p>
      </div>
    </header>
  );
};

export default Header;