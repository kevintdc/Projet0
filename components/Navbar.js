import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { label: "Accueil", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-50 bg-[#003479] text-white shadow-md md:h-20 h-14">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-full">
          {/* Nom d'entreprise - visible uniquement sur desktop */}
          <div className="text-xl font-bold hidden md:block">Toudic Dev</div>

          {/* Liens desktop */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map(({ label, href }) => (
              <a key={href} href={href} className="hover:text-[#76b1ff]">
                {label}
              </a>
            ))}
          </nav>

          {/* Icône hamburger - visible uniquement sur mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl focus:outline-none"
            aria-label="Ouvrir le menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      {/* Menu mobile - visible uniquement quand menuOpen === true */}
      <div
        className={`md:hidden bg-[#00285a]/90 px-6 py-4 space-y-4 fixed top-14 left-0 w-full z-40 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-60 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {navLinks.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="block text-lg hover:text-[#76b1ff] transition"
          >
            {label}
          </a>
        ))}
      </div>
    </>
  );
}
