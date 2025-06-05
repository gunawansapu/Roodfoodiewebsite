import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'Wishlist', path: '/wishlist' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-red-500 via-purple-600 to-blue-800 text-gray-100 shadow-lg border-b border-gray-300 fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo + Toggle */}
          <div className="flex items-center gap-3">
            <NavLink to="/" className="text-xl font-bold select-none text-yellow-300">
              RoodFoodie
            </NavLink>
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none text-yellow-300 hover:text-black transition-colors duration-200">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-2 py-1 transition-colors duration-200
                  ${isActive
                    ? 'text-yellow-300 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-yellow-300'
                    : 'text-gray-100 hover:text-yellow-300 hover:after:content-[""] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-1 hover:after:bg-yellow-300'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 bg-gradient-to-r from-red-500 via-purple-600 to-blue-800 text-gray-100 shadow-lg border-b border-gray-300 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 pt-20 space-y-4">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block relative text-lg px-2 py-1 transition
                ${isActive
                  ? 'text-yellow-300 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-yellow-300'
                  : 'hover:text-yellow-300 hover:after:content-[""] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-1 hover:after:bg-yellow-300'}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
