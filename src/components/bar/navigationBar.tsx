import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { LogIn } from 'lucide-react'; // npm install react-icons

interface NavItem {
  name: string;
  href: string;
}

interface INavbarProps {
  elements: NavItem[];
}

const NavigationBar: React.FC<INavbarProps> = ({ elements }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold font-serif tracking-wide drop-shadow-sm">
          <span className="text-blue-400">The</span>End.
          <span className="text-purple-400">Page</span>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-8 items-center">
          {elements.map(({ name, href }, index) => (
            <li key={index} className="group relative cursor-pointer">
              <a
                href={href}
                className="text-lg font-medium text-white hover:text-blue-400 transition"
              >
                {name == 'Connexion' ? (
                  <span className="">
                    <LogIn />
                  </span>
                ) : (
                  <span>{name}</span>
                )}
                <span className="block h-[2px] bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left mt-1 w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="space-y-4">
            {elements.map(({ name, href }, index) => (
              <li key={index}>
                <a
                  href={href}
                  className="flex items-center space-x-2 text-lg font-medium text-white hover:text-blue-400 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {name === 'Connexion' && <LogIn size={18} />}
                  <span>{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export { NavigationBar };
