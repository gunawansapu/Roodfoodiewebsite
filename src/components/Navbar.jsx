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
      <nav className="bg-[linear-gradient(135deg,_#ef4444,_#8b5cf6,_#1e3a8a)] 
  dark:bg-[linear-gradient(135deg,_#000000,_#1a1a40,_#373b44,_#ff416c,_#ff4b2b)] 
  text-gray-100 dark:text-gray-200 
  shadow-xl border-b border-gray-300 dark:border-gray-800 
  fixed top-0 left-0 right-0 z-50 transition-colors duration-500">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="text-xl font-bold select-none text-yellow-300 dark:text-yellow-400">
            RoodFoodie
          </NavLink>

          {/* Hamburger */}
         <div>
  <button 
    onClick={toggleMenu}
    className="md:hidden focus:outline-none 
               text-cyan-100 dark:text-cyan-300 
               hover:text-red-500 dark:hover:text-pink-400 
               transition-colors duration-300"
  >
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
                    ? 'text-yellow-300 dark:text-yellow-400 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-yellow-300 dark:after:bg-yellow-400'
                    : 'text-gray-100 dark:text-gray-300 hover:text-yellow-300 dark:hover:text-yellow-400 hover:after:content-[""] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-1 hover:after:bg-yellow-300 dark:hover:after:bg-yellow-400'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {/* Mobile Drawer */}
<div
  className={`fixed top-0 left-0 h-full w-4/5
    bg-gradient-to-r from-red-600 via-pink-600 to-orange-500
    dark:bg-[linear-gradient(135deg,_#000000,_#0f172a,_#7e22ce,_#ec4899)] 
    backdrop-blur-md backdrop-saturate-150
    text-white dark:text-gray-200 
    shadow-2xl border-r border-yellow-200/20 dark:border-pink-500/30
    rounded-tr-3xl rounded-br-xl
    z-50 transform transition-transform duration-300 ease-in-out 
    ${
      isOpen
        ? 'translate-x-0 opacity-100'
        : '-translate-x-full opacity-0'
    }`}
>
  <div className="p-6 pt-20 space-y-4">
    {navLinks.map(link => (
      <NavLink
        key={link.name}
        to={link.path}
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          `block relative text-lg font-medium px-3 py-2 rounded-lg transition duration-200 ease-in-out
          ${
            isActive
              ? 'text-yellow-200 dark:text-yellow-400 bg-white/10 dark:bg-white/10'
              : 'hover:text-yellow-200 dark:hover:text-yellow-400 hover:bg-white/5 dark:hover:bg-white/5'
          }`
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
