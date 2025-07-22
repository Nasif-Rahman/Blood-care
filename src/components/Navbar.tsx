import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/register', label: 'Register' },
  { path: '/search', label: 'Search Donors' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/login', label: 'Login' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-red-600 select-none">
           BloodCare
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`font-medium hover:text-red-600 transition ${
                isActive(path) ? 'text-red-600' : 'text-gray-800'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
       
      </div>

      {/* Mobile menu items */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pb-4 space-y-2">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`block font-medium py-2 ${
                isActive(path) ? 'text-red-600' : 'text-gray-800'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
