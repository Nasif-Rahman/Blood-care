import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/register', label: 'Register' },
  { path: '/search', label: 'Search Donors' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/site-info', label: 'Site Info' },

  
  { path: '/admin/login', label: 'Admin' }, // ✅ Admin Panel link
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-red-200 shadow-md sticky top-0 z-50">
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
                isActive(path) ? 'text-red-600' : 'text-black'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
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
