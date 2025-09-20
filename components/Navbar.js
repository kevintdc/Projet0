export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <span className="text-xl font-bold">Toudic Development</span>
        <div className="space-x-6">
          <a href="#home" className="hover:text-indigo-400">
            Accueil
          </a>
          <a href="#services" className="hover:text-indigo-400">
            Services
          </a>
          <a href="#portfolio" className="hover:text-indigo-400">
            Portfolio
          </a>
          <a href="#contact" className="hover:text-indigo-400">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
