import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/roodfoodie",
    svg: (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5z" />
        <path d="M12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM17.5 6.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/roodfoodie",
    svg: (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M22 12a10 10 0 10-11.5 9.85v-6.96H8.07v-2.9h2.42v-2.2c0-2.4 1.44-3.74 3.65-3.74 1.06 0 2.17.19 2.17.19v2.4h-1.23c-1.21 0-1.59.76-1.59 1.54v1.82h2.7l-.43 2.9h-2.27v6.96A10 10 0 0022 12z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/roodfoodie",
    svg: (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M8.29 20.25c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.36 8.36 0 0022 5.92a8.19 8.19 0 01-2.36.65 4.11 4.11 0 001.8-2.27 8.22 8.22 0 01-2.6.99 4.1 4.1 0 00-7 3.74 11.63 11.63 0 01-8.44-4.28 4.1 4.1 0 001.27 5.47A4.07 4.07 0 012 9.71v.05a4.1 4.1 0 003.3 4.02 4.07 4.07 0 01-1.85.07 4.1 4.1 0 003.82 2.85A8.23 8.23 0 012 18.58a11.62 11.62 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/roodfoodie",
    svg: (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-12h4v2h.1a4 4 0 014-2zM6 9H2v12h4zM4 3a2 2 0 110 4 2 2 0 010-4z" />
      </svg>
    ),
  },
];

function Footer() {
  return (
    <motion.footer
      className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-500 text-white py-12 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Tentang */}
        <div>
          <h3 className="text-xl font-bold mb-4">RoodFoodie</h3>
          <p className="text-sm leading-relaxed">
            RoodFoodie berkomitmen untuk menyediakan makanan lezat dan berkualitas, serta layanan terbaik bagi pelanggan kami. Kami percaya bahwa makanan bukan hanya kebutuhan, tapi pengalaman.
          </p>
        </div>

        {/* Link Cepat */}
      <div>
        <h3 className="text-xl font-bold mb-4">Link Cepat</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/testimonials"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Testimonials
            </Link>
          </li>
          <li>
            <Link
              to="/gallery"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Galerry
            </Link>
          </li>
           <li>
            <Link
              to="/blog"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Blog
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/wishlist"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Wishlist
            </Link>
          </li>
        </ul>
      </div>

        {/* Ikuti Kami */}
        <div>
          <h3 className="text-xl font-bold mb-4">Ikuti Kami</h3>
          <div className="flex gap-6">
            {socialLinks.map(({ name, href, svg }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                {svg}
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs opacity-80">
            &copy; {new Date().getFullYear()} RoodFoodie. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
