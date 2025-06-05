// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Testimonials from './pages/Testimonials';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Wishlist from './components/Wishlist';  // ini harusnya di pages, bukan components biar rapi
import ProductDetail from "./pages/ProductDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./pages/Checkout";
import ScrollToHash from './components/ScrollToHash';  // import komponen baru

import { WishlistProvider } from './context/WishlistContext';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <WishlistProvider>
      <Router>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          <main className="w-full max-w-screen-xl mx-auto min-h-screen pt-16 px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <ScrollToHash /> {/* PASANG DI SINI */}
          </main>
<ToastContainer />
          <Footer />
        </div>
      </Router>
    </WishlistProvider>
  );
}

export default App;
